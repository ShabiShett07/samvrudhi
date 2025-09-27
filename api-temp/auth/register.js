const { sql } = require('@vercel/postgres');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async function handler(request, response) {
  // Enable CORS
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      address,
      userType,
      // Landlord specific fields
      properties,
      experience,
      // Worker specific fields
      services,
      hourlyRate,
      availability,
      certifications
    } = request.body;

    // Validation
    if (!firstName || !lastName || !email || !phone || !password || !address || !userType) {
      return response.status(400).json({ error: 'Missing required fields' });
    }

    if (!['landlord', 'worker'].includes(userType)) {
      return response.status(400).json({ error: 'Invalid user type' });
    }

    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUser.rows.length > 0) {
      return response.status(409).json({ error: 'User already exists with this email' });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const userResult = await sql`
      INSERT INTO users (email, password, user_type, first_name, last_name, phone, address)
      VALUES (${email}, ${hashedPassword}, ${userType}, ${firstName}, ${lastName}, ${phone}, ${address})
      RETURNING id, email, user_type, first_name, last_name, created_at
    `;

    const user = userResult.rows[0];

    // Create profile based on user type
    if (userType === 'landlord') {
      if (!properties || !experience) {
        return response.status(400).json({ error: 'Missing landlord profile fields' });
      }

      await sql`
        INSERT INTO landlord_profiles (user_id, properties, experience)
        VALUES (${user.id}, ${properties}, ${experience})
      `;
    } else if (userType === 'worker') {
      if (!services || !experience || !hourlyRate || !availability) {
        return response.status(400).json({ error: 'Missing worker profile fields' });
      }

      await sql`
        INSERT INTO worker_profiles (user_id, services, experience, hourly_rate, availability, certifications)
        VALUES (${user.id}, ${services}, ${experience}, ${hourlyRate}, ${availability}, ${certifications || ''})
      `;
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        userType: user.user_type
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Return success response
    return response.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        userType: user.user_type,
        firstName: user.first_name,
        lastName: user.last_name,
        createdAt: user.created_at
      },
      token
    });

  } catch (error) {
    console.error('Registration error:', error);

    if (error.message.includes('duplicate key')) {
      return response.status(409).json({ error: 'User already exists with this email' });
    }

    return response.status(500).json({
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
const { sql } = require('@vercel/postgres');

module.exports = async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('landlord', 'worker')),
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        address TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create landlord_profiles table
    await sql`
      CREATE TABLE IF NOT EXISTS landlord_profiles (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        properties VARCHAR(20) NOT NULL,
        experience VARCHAR(20) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create worker_profiles table
    await sql`
      CREATE TABLE IF NOT EXISTS worker_profiles (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        services TEXT[] NOT NULL,
        experience VARCHAR(20) NOT NULL,
        hourly_rate INTEGER NOT NULL,
        availability VARCHAR(20) NOT NULL,
        certifications TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create indexes for better performance
    await sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_users_user_type ON users(user_type);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_landlord_profiles_user_id ON landlord_profiles(user_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_worker_profiles_user_id ON worker_profiles(user_id);`;

    return response.status(200).json({
      message: 'Database initialized successfully',
      tables: ['users', 'landlord_profiles', 'worker_profiles']
    });
  } catch (error) {
    console.error('Database initialization error:', error);
    return response.status(500).json({
      error: 'Failed to initialize database',
      details: error.message
    });
  }
}
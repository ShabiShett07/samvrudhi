// API utility functions for Vercel integration

// Temporarily disable API calls - use localStorage only
const API_BASE_URL = 'DISABLED_API';

class APIError extends Error {
  constructor(message, status, response) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.response = response;
  }
}

async function makeRequest(endpoint, options = {}) {
  // API is temporarily disabled - always throw error to trigger localStorage fallback
  throw new APIError(
    'API temporarily disabled - using localStorage',
    0,
    null
  );
}

// Auth API functions
export const authAPI = {
  register: async (userData) => {
    // Use localStorage only for now - API is being fixed
    console.log('Using localStorage registration (API temporarily disabled)');

    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

    // Save user data to localStorage
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const existingUser = users.find(user => user.email === userData.email);

    if (existingUser) {
      throw new APIError('User already exists with this email', 409, null);
    }

    const newUser = {
      id: Date.now(),
      email: userData.email,
      userType: userData.userType,
      firstName: userData.firstName,
      lastName: userData.lastName,
      createdAt: new Date().toISOString(),
      ...userData
    };

    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));

    // Generate a mock token
    const token = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    return {
      message: 'User registered successfully!',
      user: {
        id: newUser.id,
        email: newUser.email,
        userType: newUser.userType,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        createdAt: newUser.createdAt
      },
      token
    };
  },

  login: async (credentials) => {
    // Login not implemented with localStorage yet
    throw new APIError('Login feature coming soon!', 501, null);
  },
};

// Database initialization (admin function)
export const adminAPI = {
  initializeDatabase: async () => {
    throw new APIError('Database initialization not available in localStorage mode', 501, null);
  },
};

// User management
export const userAPI = {
  getProfile: async () => {
    throw new APIError('User profile not available in localStorage mode', 501, null);
  },

  updateProfile: async (updates) => {
    throw new APIError('Profile updates not available in localStorage mode', 501, null);
  },

  // Temporary function to view registered users (localStorage)
  getAllUsers: () => {
    return JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  },

  // Clear all temporary user data
  clearAllUsers: () => {
    localStorage.removeItem('registeredUsers');
  }
};

// Auth token management
export const tokenManager = {
  save: (token) => {
    localStorage.setItem('authToken', token);
  },

  get: () => {
    return localStorage.getItem('authToken');
  },

  remove: () => {
    localStorage.removeItem('authToken');
  },

  isValid: () => {
    const token = tokenManager.get();
    if (!token) return false;

    try {
      // Basic JWT structure check
      const parts = token.split('.');
      if (parts.length !== 3) return false;

      // Decode payload to check expiration
      const payload = JSON.parse(atob(parts[1]));
      const now = Date.now() / 1000;

      return payload.exp > now;
    } catch {
      return false;
    }
  },
};

export { APIError };
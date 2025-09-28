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
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new APIError(
        data.error || 'An error occurred',
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }

    // Network or parsing error
    throw new APIError(
      'Network error. Please check your connection.',
      0,
      null
    );
  }
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
    return makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
};

// Database initialization (admin function)
export const adminAPI = {
  initializeDatabase: async () => {
    return makeRequest('/init-db', {
      method: 'POST',
    });
  },
};

// User management
export const userAPI = {
  getProfile: async () => {
    return makeRequest('/user/profile');
  },

  updateProfile: async (updates) => {
    return makeRequest('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
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
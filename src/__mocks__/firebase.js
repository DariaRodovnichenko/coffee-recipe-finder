export const getAuth = jest.fn(() => ({
  currentUser: null, // Add this to prevent undefined errors
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn((callback) => callback(null)), // Mock auth state listener
}));

export const getDatabase = jest.fn(() => ({
  ref: jest.fn(),
  set: jest.fn(),
  get: jest.fn(() => Promise.resolve({ exists: () => false })),
}));

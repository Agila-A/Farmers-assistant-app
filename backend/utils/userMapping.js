const User = require('../models/user.model');

// Get or create a user based on their Firebase UID
const getOrCreateUser = async (firebaseUid, userName) => {
  try {
    // First, try to find an existing user with this Firebase UID
    let user = await User.findOne({
      where: {
        firebaseUid: firebaseUid
      }
    });
    
    // If user doesn't exist, create a new one
    if (!user) {
      user = await User.create({
        name: userName || firebaseUid, // Use provided name or Firebase UID as fallback
        firebaseUid: firebaseUid
      });
    }
    
    return user;
  } catch (error) {
    console.error('Error getting or creating user:', error);
    throw error;
  }
};

// Get user by Firebase UID
const getUserByFirebaseUid = async (firebaseUid) => {
  try {
    const user = await User.findOne({
      where: {
        firebaseUid: firebaseUid
      }
    });
    return user;
  } catch (error) {
    console.error('Error getting user by Firebase UID:', error);
    throw error;
  }
};

module.exports = {
  getOrCreateUser,
  getUserByFirebaseUid
};
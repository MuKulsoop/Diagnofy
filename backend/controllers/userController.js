import User from '../models/User.js';

// @desc    Complete user onboarding
// @route   PUT /api/users/onboarding
export const completeOnboarding = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      specialization,
      experienceLevel,
      institutionName,
      location,
      currentRole,
      yearOfStudy,
      interests
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        specialization,
        experienceLevel,
        institutionName,
        location,
        currentRole,
        yearOfStudy,
        interests,
        onboardingCompleted: true
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Onboarding completed successfully',
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        onboardingCompleted: updatedUser.onboardingCompleted,
        specialization: updatedUser.specialization,
        experienceLevel: updatedUser.experienceLevel
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
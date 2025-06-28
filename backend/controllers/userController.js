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

    const updateFields = {
      specialization,
      experienceLevel,
      institutionName,
      location,
      currentRole,
      yearOfStudy,
      interests,
      onboardingCompleted: true,
      tokens: 100,
      successPoints: 0,
      badgeTier: "Intern",
      earnedBadges: [],
      unlockedModules: [],
      totalDiagnosed: 0,
      totalCured: 0,
      totalDeaths: 0,
      canWriteBlogs: false
    };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "Onboarding completed successfully",
      user: updatedUser
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

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      specialization: user.specialization,
      experienceLevel: user.experienceLevel,
      institutionName: user.institutionName,
      location: user.location,
      currentRole: user.currentRole,
      yearOfStudy: user.yearOfStudy,
      interests: user.interests,
      onboardingCompleted: user.onboardingCompleted,
      badgeTier: user.badgeTier,
      tokens: user.tokens,
      successPoints: user.successPoints,
      earnedBadges: user.earnedBadges,
      unlockedModules: user.unlockedModules,
      totalDiagnosed: user.totalDiagnosed,
      totalCured: user.totalCured,
      totalDeaths: user.totalDeaths,
      canWriteBlogs: user.canWriteBlogs,
      createdAt: user.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

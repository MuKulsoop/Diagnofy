import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,

  // Medical profile
  specialization: {
    type: String,
    enum: ["General", "Pediatrics", "Cardiology", "Neurology", "Gynecology", "Emergency", "Other"]
  },
  experienceLevel: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"]
  },
  institutionName: String,
  
  location: {
    city: String,
    state: String,
    country: String
  },
  currentRole: {
    type: String,
    enum: ["Student", "Intern", "Resident", "Practitioner"]
  },
  yearOfStudy: Number,
  interests: [String],
  onboardingCompleted: {
    type: Boolean,
    default: false
  },

  // Gamification
  tokens: {
    type: Number,
    default: 100 // Default startup tokens
  },
  successPoints: {
    type: Number,
    default: 0
  },
  badgeTier: {
    type: String,
    enum: ["Intern", "Resident", "Attending", "Consultant", "Medical Legend"],
    default: "Intern"
  },
  earnedBadges: [{
    badgeName: String,
    earnedAt: {
      type: Date,
      default: Date.now
    }
  }],

  // Blog privileges
  canWriteBlogs: {
    type: Boolean,
    default: false
  },

  // Module unlocking
  unlockedModules: [String], // e.g., ["Cardiology-Basics", "Emergency-Advanced"]

  // Performance
  totalDiagnosed: {
    type: Number,
    default: 0
  },
  totalCured: {
    type: Number,
    default: 0
  },
  totalDeaths: {
    type: Number,
    default: 0
  },

  // Chronic patients tracking (stores patient/session IDs)
  chronicPatientSessions: [String],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Password hashing middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Password comparison method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);

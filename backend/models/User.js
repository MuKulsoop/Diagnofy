import mongoose from 'mongoose';
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
  name: String,
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: String,
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
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
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
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
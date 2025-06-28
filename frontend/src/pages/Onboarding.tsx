import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stethoscope, Eye, EyeOff, HeartPulse, Syringe, Pill } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      navigate('/onboarding');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Medical-themed floating icons
  const floatingIcons = [
    { icon: <HeartPulse className="text-red-300" />, position: 'top-10 left-1/4' },
    { icon: <Syringe className="text-blue-300" />, position: 'top-1/3 right-10' },
    { icon: <Pill className="text-green-300" />, position: 'bottom-20 left-10' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Floating medical icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          initial={{ y: 0, opacity: 0 }}
          animate={{ 
            y: [0, -20, 0],
            opacity: [0, 1, 1],
          }}
          transition={{
            duration: 8 + index * 2,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: index * 0.5,
            ease: "easeInOut"
          }}
          className={`absolute ${item.position} text-4xl z-0`}
        >
          {item.icon}
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 relative overflow-hidden">
          {/* Pulse animation behind logo */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-100 to-red-100 -z-10"
          />

          {/* Logo */}
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="text-center mb-8"
          >
            <motion.div
              whileHover={{ rotate: -10, scale: 1.1 }}
              className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <Stethoscope className="w-8 h-8 text-white" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-gray-900"
            >
              Create Account
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 mt-2"
            >
              Join thousands of medical professionals
            </motion.p>
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 overflow-hidden"
              >
                <p className="text-red-600 text-sm">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form with staggered inputs */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Input
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="relative"
            >
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                whileTap={{ scale: 0.9 }}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="pt-2"
            >
              <Button
                type="submit"
                loading={loading}
                className="w-full"
                size="lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Create Account
              </Button>
            </motion.div>
          </form>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                Sign In
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
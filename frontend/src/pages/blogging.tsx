import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  Clock, 
  Heart, 
  Eye, 
  MessageCircle, 
  Share2, 
  Bookmark,
  Search,
  Filter,
  TrendingUp,
  Award,
  BookOpen,
  Users,
  BarChart3,
  LogOut,
  ChevronRight,
  Activity,
  Stethoscope,
  Wind,
  Brain,
  Plus,
  Tag,
  ThumbsUp,
  ArrowRight
} from 'lucide-react';

export default function MedicalBlog() {
  const [activeSection, setActiveSection] = useState('blog');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'modules', label: 'Modules', icon: BookOpen },
    { id: 'patients', label: 'Patients Progress Room', icon: Users },
    { id: 'leaderboard', label: 'Leaderboard', icon: Award },
    { id: 'blog', label: 'Mediverse Journal', icon: Activity, active: true },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const categories = [
    { id: 'all', label: 'All Posts', count: 48 },
    { id: 'cardiology', label: 'Cardiology', count: 12 },
    { id: 'neurology', label: 'Neurology', count: 8 },
    { id: 'emergency', label: 'Emergency Medicine', count: 15 },
    { id: 'research', label: 'Research & Studies', count: 13 }
  ];

  const featuredPost = {
    title: "Revolutionary AI Diagnostic Tool Shows 95% Accuracy in Early Cancer Detection",
    excerpt: "A groundbreaking study reveals how machine learning algorithms are transforming medical diagnosis, potentially saving thousands of lives through earlier detection.",
    author: "Dr. Sarah Johnson",
    date: "June 28, 2025",
    readTime: "8 min read",
    views: "2.4k",
    likes: 234,
    comments: 45,
    category: "Research & Studies",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
    featured: true
  };

  const blogPosts = [
    {
      id: 1,
      title: "Understanding Cardiac Arrhythmias: A Comprehensive Guide for Medical Students",
      excerpt: "Learn about the different types of cardiac arrhythmias, their causes, symptoms, and treatment approaches in this detailed medical guide.",
      author: "Dr. Michael Chen",
      date: "June 27, 2025",
      readTime: "6 min read",
      views: "1.8k",
      likes: 156,
      comments: 23,
      category: "Cardiology",
      image: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      title: "Emergency Response Protocols: Critical Care in the First Hour",
      excerpt: "Time-sensitive medical procedures that can make the difference between life and death in emergency situations.",
      author: "Dr. Emily Rodriguez",
      date: "June 26, 2025",
      readTime: "5 min read",
      views: "3.2k",
      likes: 289,
      comments: 67,
      category: "Emergency Medicine",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "Neuroplasticity and Recovery: Latest Advances in Stroke Rehabilitation",
      excerpt: "Exploring how the brain's ability to reorganize itself is revolutionizing stroke patient recovery outcomes.",
      author: "Dr. James Wilson",
      date: "June 25, 2025",
      readTime: "7 min read",
      views: "1.5k",
      likes: 198,
      comments: 34,
      category: "Neurology",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=250&fit=crop"
    },
    {
      id: 4,
      title: "Telemedicine Revolution: Improving Healthcare Access in Rural Areas",
      excerpt: "How digital health technologies are bridging the gap between patients and healthcare providers in underserved communities.",
      author: "Dr. Lisa Park",
      date: "June 24, 2025",
      readTime: "4 min read",
      views: "2.1k",
      likes: 167,
      comments: 29,
      category: "Research & Studies",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop"
    },
    {
      id: 5,
      title: "Antibiotic Resistance: Current Challenges and Future Solutions",
      excerpt: "Understanding the growing threat of antibiotic-resistant bacteria and innovative approaches to combat this global health crisis.",
      author: "Dr. Robert Kumar",
      date: "June 23, 2025",
      readTime: "9 min read",
      views: "1.9k",
      likes: 143,
      comments: 52,
      category: "Research & Studies",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=250&fit=crop"
    },
    {
      id: 6,
      title: "Pediatric Emergency Medicine: Special Considerations for Young Patients",
      excerpt: "Key differences in treating pediatric emergencies and age-specific protocols every emergency physician should know.",
      author: "Dr. Amanda Foster",
      date: "June 22, 2025",
      readTime: "6 min read",
      views: "1.3k",
      likes: 178,
      comments: 41,
      category: "Emergency Medicine",
      image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=400&h=250&fit=crop"
    }
  ];

  const trendingTopics = [
    { tag: "AI in Medicine", posts: 15 },
    { tag: "Telemedicine", posts: 12 },
    { tag: "Mental Health", posts: 18 },
    { tag: "Precision Medicine", posts: 9 },
    { tag: "Medical Education", posts: 22 }
  ];

  const getCategoryIcon = (category) => {
    switch(category.toLowerCase()) {
      case 'cardiology': return Heart;
      case 'neurology': return Brain;
      case 'emergency medicine': return Activity;
      case 'research & studies': return TrendingUp;
      default: return BookOpen;
    }
  };

  const getCategoryColor = (category) => {
    switch(category.toLowerCase()) {
      case 'cardiology': return 'text-red-500 bg-red-50';
      case 'neurology': return 'text-purple-500 bg-purple-50';
      case 'emergency medicine': return 'text-green-500 bg-green-50';
      case 'research & studies': return 'text-blue-500 bg-blue-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200">
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">Diagnofy</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeSection;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-6 left-4 right-4">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Mediverse Journal</h1>
              <p className="text-orange-100">Stay updated with the latest medical insights and research</p>
            </div>
            <button className="bg-white text-orange-500 px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:bg-orange-50 transition-colors shadow-lg">
              <Plus className="w-5 h-5" />
              <span>Write Article</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles, topics, or authors..."
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-200 shadow-lg"
            />
          </div>
        </div>

        <div className="p-8">
          {/* Categories */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Categories</h2>
              <button className="text-orange-500 hover:text-orange-600 flex items-center space-x-1 font-medium">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Featured Post */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Featured Article</h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(featuredPost.category)}`}>
                      {featuredPost.category}
                    </span>
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 line-clamp-2">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{featuredPost.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{featuredPost.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{featuredPost.comments}</span>
                      </div>
                    </div>
                    
                    <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Posts */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Recent Articles</h2>
                <button className="text-orange-500 hover:text-orange-600 flex items-center space-x-1 font-medium">
                  <span>View All</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-6">
                {blogPosts.map((post) => {
                  const CategoryIcon = getCategoryIcon(post.category);
                  return (
                    <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-48 md:h-full object-cover"
                          />
                        </div>
                        <div className="md:w-2/3 p-6">
                          <div className="flex items-center space-x-2 mb-3">
                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${getCategoryColor(post.category)}`}>
                              <CategoryIcon className="w-3 h-3" />
                            </div>
                            <span className="text-sm font-medium text-gray-600">{post.category}</span>
                          </div>
                          
                          <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 hover:text-orange-500 transition-colors cursor-pointer">
                            {post.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center space-x-4">
                              <span>{post.author}</span>
                              <span>{post.date}</span>
                              <span>{post.readTime}</span>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
                                <span>{post.views}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <ThumbsUp className="w-4 h-4" />
                                <span>{post.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageCircle className="w-4 h-4" />
                                <span>{post.comments}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending Topics */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Trending Topics</h3>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <Tag className="w-4 h-4 text-orange-500" />
                        <span className="font-medium text-gray-800">{topic.tag}</span>
                      </div>
                      <span className="text-sm text-gray-500">{topic.posts} posts</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
                <p className="text-orange-100 mb-4 text-sm">Get the latest medical insights delivered to your inbox weekly.</p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-200"
                  />
                  <button className="w-full bg-white text-orange-500 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Popular Authors */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Popular Authors</h3>
                <div className="space-y-4">
                  {['Dr. Sarah Johnson', 'Dr. Michael Chen', 'Dr. Emily Rodriguez'].map((author, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{author}</div>
                        <div className="text-sm text-gray-500">{Math.floor(Math.random() * 20) + 5} articles</div>
                      </div>
                      <button className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                        Follow
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
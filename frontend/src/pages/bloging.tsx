import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Heart, MessageCircle, Bookmark, Calendar, User, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BlogsHome: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: 'Mastering ECG Interpretation: A Step-by-Step Guide',
      excerpt: 'Learn the systematic approach to reading ECGs with confidence. This comprehensive guide covers rhythm analysis, axis determination, and common pathological patterns.',
      author: {
        name: 'Dr. Sarah Chen',
        avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
        level: 'Medical Legend'
      },
      publishedAt: '2 days ago',
      readTime: '8 min read',
      likes: 124,
      comments: 18,
      tags: ['Cardiology', 'Diagnostics', 'Tips'],
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: true
    },
    {
      id: 2,
      title: 'Optimizing Token Usage in Diagnofy: Advanced Strategies',
      excerpt: 'Discover proven techniques to maximize your diagnostic accuracy while minimizing token expenditure. Learn from top performers on the leaderboard.',
      author: {
        name: 'Dr. Michael Rodriguez',
        avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400',
        level: 'Consultant'
      },
      publishedAt: '4 days ago',
      readTime: '6 min read',
      likes: 89,
      comments: 12,
      tags: ['Strategy', 'Tips', 'Gamification'],
      image: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: false
    },
    {
      id: 3,
      title: 'Case Study: Complex Chest Pain in a 45-Year-Old',
      excerpt: 'Walk through a challenging case that stumped many residents. Learn the diagnostic reasoning and key decision points that led to the correct diagnosis.',
      author: {
        name: 'Dr. Emily Watson',
        avatar: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=400',
        level: 'Attending'
      },
      publishedAt: '1 week ago',
      readTime: '12 min read',
      likes: 156,
      comments: 24,
      tags: ['Case Study', 'Cardiology', 'Emergency'],
      image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: false
    },
    {
      id: 4,
      title: 'The Psychology of Medical Decision Making',
      excerpt: 'Explore cognitive biases that affect clinical judgment and learn strategies to improve diagnostic accuracy through better decision-making processes.',
      author: {
        name: 'Dr. James Park',
        avatar: 'https://images.pexels.com/photos/4021521/pexels-photo-4021521.jpeg?auto=compress&cs=tinysrgb&w=400',
        level: 'Consultant'
      },
      publishedAt: '1 week ago',
      readTime: '10 min read',
      likes: 98,
      comments: 15,
      tags: ['Psychology', 'Decision Making', 'Tips'],
      image: 'https://images.pexels.com/photos/4173624/pexels-photo-4173624.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: false
    },
    {
      id: 5,
      title: 'Building Your Medical Knowledge Base: Study Techniques',
      excerpt: 'Effective methods for retaining medical knowledge and applying it in clinical scenarios. Tips from successful Diagnofy users.',
      author: {
        name: 'Dr. Lisa Thompson',
        avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
        level: 'Resident'
      },
      publishedAt: '2 weeks ago',
      readTime: '7 min read',
      likes: 67,
      comments: 9,
      tags: ['Education', 'Study Tips', 'Learning'],
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400',
      featured: false
    }
  ];

  const tags = ['all', 'Cardiology', 'Tips', 'Case Study', 'Strategy', 'Emergency', 'Education', 'Psychology'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Medical Knowledge Hub</h1>
          <p className="text-gray-600 text-lg">
            Learn from the community, share insights, and stay updated with the latest in medical practice
          </p>
        </div>
        <Link
          to="/blogs/write"
          className="bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors duration-200 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Write Article
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              {tags.map(tag => (
                <option key={tag} value={tag}>
                  {tag === 'all' ? 'All Topics' : tag}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Featured Article */}
      {featuredPost && (
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl overflow-hidden text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                  Featured Article
                </span>
              </div>
              <h2 className="text-3xl font-bold leading-tight">{featuredPost.title}</h2>
              <p className="text-primary-100 text-lg">{featuredPost.excerpt}</p>
              <div className="flex items-center space-x-6 text-primary-200">
                <div className="flex items-center space-x-2">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm">{featuredPost.author.name}</span>
                </div>
                <span className="text-sm">{featuredPost.readTime}</span>
                <span className="text-sm">{featuredPost.publishedAt}</span>
              </div>
              <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors duration-200">
                Read Article
              </button>
            </div>
            <div className="hidden lg:block">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover rounded-lg opacity-90"
              />
            </div>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regularPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 group">
            <div className="relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                  {post.tags[0]}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

              {/* Author Info */}
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900 text-sm">{post.author.name}</p>
                  <p className="text-gray-500 text-xs">{post.author.level}</p>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.publishedAt}</span>
                  </span>
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Engagement */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <button className="flex items-center space-x-1 hover:text-error-500 transition-colors duration-200">
                    <Heart className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-primary-500 transition-colors duration-200">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </button>
                </div>
                <button className="text-gray-400 hover:text-warning-500 transition-colors duration-200">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.slice(1).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-primary-50 hover:text-primary-600 cursor-pointer transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters.</p>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-secondary-50 border border-secondary-200 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-secondary-900 mb-4">Share Your Knowledge</h3>
        <p className="text-secondary-700 mb-6 max-w-2xl mx-auto">
          Have insights from your medical practice or Diagnofy experience? Write an article and help fellow medical professionals learn and grow.
        </p>
        <Link
          to="/blogs/write"
          className="inline-flex items-center bg-secondary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary-600 transition-colors duration-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          Start Writing
        </Link>
      </div>
    </div>
  );
};

export default BlogsHome;
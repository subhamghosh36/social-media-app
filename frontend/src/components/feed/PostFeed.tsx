'use client';
import React from 'react';
import { CreatePost } from './CreatePost';
import { PostCard } from './PostCard';

const MOCK_POSTS = [
  {
    id: '1',
    author: { name: 'Sarah Jenkins', username: 'SarahJ' },
    content: 'Just finished hiking the scenic trails at Blackwood Mountain! The views were spectacular. #adventure #hiking #outdoors',
    mediaUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop',
    likes: 128,
    comments: 24,
    timestamp: '2h ago'
  },
  {
    id: '2',
    author: { name: 'Liam Chen', username: 'LiamC' },
    content: 'Excited to share my latest article on accessible design! Read the full piece on my blog.',
    likes: 75,
    comments: 18,
    timestamp: '4h ago'
  }
];

export const PostFeed = () => {
  return (
    <div className="max-w-2xl mx-auto w-full pb-20">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 hidden md:block">Home</h1>
      
      <CreatePost />
      
      <div className="flex flex-col">
        {MOCK_POSTS.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

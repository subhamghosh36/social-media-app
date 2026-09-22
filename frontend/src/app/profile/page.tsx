'use client';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { MapPin, Link as LinkIcon } from 'lucide-react';
import { PostCard } from '@/components/feed/PostCard';

const MOCK_PROFILE = {
  name: 'Maya Chen',
  username: 'mayachen',
  bio: 'Adventure seeker 🌿 | Digital Nomad | Lover of mountains, coffee, and code. Currently exploring Kyoto. ✨',
  location: 'Kyoto, Japan',
  website: 'linktr.ee/mayachen',
  followers: '89.3K',
  following: '612',
  posts: '1,245',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
  coverUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&h=400&fit=crop'
};

export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto pb-20">
      {/* Cover Photo */}
      <div className="relative w-full h-48 md:h-64 bg-gray-200 rounded-b-2xl overflow-hidden">
        <Image src={MOCK_PROFILE.coverUrl} alt="Cover" fill className="object-cover" />
      </div>

      {/* Profile Header Info */}
      <div className="px-4 relative mb-8">
        <div className="flex justify-between items-end -mt-16 md:-mt-20 mb-4">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white overflow-hidden bg-white shadow-sm z-10">
            <Image src={MOCK_PROFILE.avatarUrl} alt={MOCK_PROFILE.name} fill className="object-cover" />
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" className="px-6 rounded-full font-semibold">Follow</Button>
            <Button variant="outline" className="px-6 rounded-full font-semibold">Message</Button>
          </div>
        </div>

        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{MOCK_PROFILE.name}</h1>
          <p className="text-gray-500">@{MOCK_PROFILE.username}</p>
        </div>

        <p className="text-gray-800 mb-4 max-w-xl">{MOCK_PROFILE.bio}</p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{MOCK_PROFILE.location}</span>
          </div>
          <div className="flex items-center gap-1 text-teal-600 hover:underline cursor-pointer">
            <LinkIcon className="w-4 h-4" />
            <span>{MOCK_PROFILE.website}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 border-b border-gray-100 pb-6">
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 text-lg">{MOCK_PROFILE.posts}</span>
            <span className="text-gray-500 text-sm">Posts</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 text-lg">{MOCK_PROFILE.followers}</span>
            <span className="text-gray-500 text-sm">Followers</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 text-lg">{MOCK_PROFILE.following}</span>
            <span className="text-gray-500 text-sm">Following</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex w-full mb-6 border-b border-gray-100">
        <button className="flex-1 py-4 text-center font-medium text-teal-600 border-b-2 border-teal-600">Posts</button>
        <button className="flex-1 py-4 text-center font-medium text-gray-500 hover:text-gray-700">Media</button>
      </div>

      {/* User's Posts Feed */}
      <div className="flex flex-col gap-6 px-4">
        <PostCard post={{
          id: 'p1',
          author: { name: MOCK_PROFILE.name, username: MOCK_PROFILE.username, avatarUrl: MOCK_PROFILE.avatarUrl },
          content: 'Kyoto is absolutely beautiful this time of year! Highly recommend visiting the bamboo forest.',
          mediaUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&fit=crop',
          likes: 2400,
          comments: 182,
          timestamp: '1 day ago'
        }} />
      </div>
    </div>
  );
}

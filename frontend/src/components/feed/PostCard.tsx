import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import Image from 'next/image';

interface PostProps {
  post: {
    id: string;
    author: { name: string; username: string; avatarUrl?: string };
    content: string;
    mediaUrl?: string | null;
    likes: number;
    comments: number;
    timestamp: string;
  };
}

export const PostCard: React.FC<PostProps> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-100 to-teal-100 flex items-center justify-center text-indigo-700 font-bold overflow-hidden">
            {post.author.avatarUrl ? (
              <img src={post.author.avatarUrl} alt={post.author.name} className="w-full h-full object-cover" />
            ) : (
              post.author.name.charAt(0)
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 leading-tight">{post.author.name}</h3>
            <p className="text-sm text-gray-500">@{post.author.username} • {post.timestamp}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-800 mb-4 whitespace-pre-wrap">{post.content}</p>
      
      {post.mediaUrl && (
        <div className="relative w-full h-64 md:h-96 mb-4 rounded-xl overflow-hidden bg-gray-100">
          <Image 
            src={post.mediaUrl} 
            alt="Post attachment" 
            fill 
            className="object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between text-gray-500 border-t border-gray-50 pt-4 mt-2">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-2 transition-colors ${liked ? 'text-red-500' : 'hover:text-red-500'}`}
        >
          <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
          <span className="text-sm font-medium">{likeCount}</span>
        </button>
        
        <button className="flex items-center gap-2 hover:text-indigo-500 transition-colors">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">{post.comments}</span>
        </button>
        
        <button className="flex items-center gap-2 hover:text-green-500 transition-colors">
          <Share2 className="w-5 h-5" />
          <span className="text-sm font-medium">Share</span>
        </button>
        
        <button className="flex items-center gap-2 hover:text-yellow-500 transition-colors">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

'use client';
import React, { useState, useRef } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import { Button } from '../ui/Button';

export const CreatePost = () => {
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handlePost = () => {
    if (!content.trim() && !preview) return;
    
    // TODO: Send FormData to API
    console.log('Posting:', { content, hasImage: !!preview });
    
    setContent('');
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex-shrink-0"></div>
        <div className="flex-1">
          <textarea
            className="w-full bg-transparent resize-none outline-none text-gray-800 placeholder-gray-400 min-h-[60px] pt-2"
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          
          {/* Image Preview */}
          {preview && (
            <div className="relative mt-2 mb-4">
              <img src={preview} alt="Upload preview" className="rounded-xl max-h-64 w-auto object-cover" />
              <button 
                onClick={() => setPreview(null)}
                className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 text-white rounded-full transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-gray-50 pt-3 mt-2">
            <div className="flex gap-2 text-indigo-500">
              <button 
                onClick={() => fileInputRef.current?.click()} 
                className="p-2 hover:bg-indigo-50 rounded-full transition-colors"
                title="Upload Image"
              >
                <ImageIcon className="w-5 h-5" />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <Button 
              onClick={handlePost}
              disabled={!content.trim() && !preview}
              className="px-6 rounded-full"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

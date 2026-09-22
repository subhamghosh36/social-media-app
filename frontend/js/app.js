// State
let isAuthenticated = localStorage.getItem('auth') === 'true';
let currentImagePreview = null;
let socket = null;

let posts = [
  {
    id: 'p1', name: 'Sarah Jenkins', username: 'SarahJ', time: '2h ago',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    content: 'Just finished hiking! The views were spectacular. #adventure',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop',
    likes: 128, comments: 24, isLiked: false
  },
  {
    id: 'p2', name: 'Liam Chen', username: 'LiamC', time: '4h ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    content: 'Excited to share my latest article on accessible design! Read it on my blog.',
    likes: 75, comments: 18, isLiked: false
  }
];

// Initialize UI
function init() {
  lucide.createIcons();
  
  if (isAuthenticated) {
    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('appShell').classList.add('active');
    renderFeed();
    renderProfilePosts();
    
    if (typeof io !== 'undefined') {
      socket = io('http://localhost:5000');
    }
  } else {
    document.getElementById('loginPage').classList.add('active');
    document.getElementById('appShell').classList.remove('active');
  }
}

// Navigation
function navigate(viewId) {
  // Hide all views
  document.getElementById('feedView').classList.add('hidden');
  document.getElementById('profileView').classList.add('hidden');
  
  // Show target view
  document.getElementById(viewId + 'View').classList.remove('hidden');

  // Update sidebar active states
  document.getElementById('nav-feed').className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors text-gray-600 hover:bg-gray-50 font-medium";
  document.getElementById('nav-profile').className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors text-gray-600 hover:bg-gray-50 font-medium";
  
  const activeBtn = document.getElementById('nav-' + viewId);
  activeBtn.className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors text-indigo-600 bg-indigo-50 font-medium";
  
  lucide.createIcons();
}

// Auth
function handleLogin(e) {
  e.preventDefault();
  localStorage.setItem('auth', 'true');
  isAuthenticated = true;
  init();
}

function handleLogout() {
  localStorage.removeItem('auth');
  isAuthenticated = false;
  if (socket) socket.disconnect();
  init();
}

// Posts & Likes
function generatePostHTML(post) {
  return `
    <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
      <div class="flex items-center gap-3 mb-4">
        <img src="${post.avatar}" class="w-10 h-10 rounded-full object-cover">
        <div>
          <h3 class="font-semibold text-gray-900 leading-tight">${post.name}</h3>
          <p class="text-sm text-gray-500">@${post.username} • ${post.time}</p>
        </div>
      </div>
      <p class="text-gray-900 mb-4 whitespace-pre-wrap">${post.content}</p>
      ${post.image ? `<img src="${post.image}" class="w-full rounded-xl mb-4 max-h-96 object-cover">` : ''}
      <div class="flex items-center justify-between text-gray-500 border-t border-gray-50 pt-4">
        <button onclick="toggleLike('${post.id}')" class="flex items-center gap-2 transition-colors ${post.isLiked ? 'text-red-500' : 'hover:text-red-500'}">
          <i data-lucide="heart" class="w-5 h-5 ${post.isLiked ? 'fill-current' : ''}"></i>
          <span class="text-sm font-medium">${post.likes}</span>
        </button>
        <button class="flex items-center gap-2 hover:text-indigo-500">
          <i data-lucide="message-circle" class="w-5 h-5"></i>
          <span class="text-sm font-medium">${post.comments}</span>
        </button>
        <button class="flex items-center gap-2 hover:text-green-500">
          <i data-lucide="share-2" class="w-5 h-5"></i>
          <span class="text-sm font-medium">Share</span>
        </button>
      </div>
    </div>
  `;
}

function toggleLike(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;
  post.isLiked = !post.isLiked;
  post.likes += post.isLiked ? 1 : -1;
  renderFeed();
  renderProfilePosts();
}

function renderFeed() {
  document.getElementById('feedPosts').innerHTML = posts.map(generatePostHTML).join('');
  lucide.createIcons();
}

function renderProfilePosts() {
  const profilePost = {
    id: 'p3', name: 'Maya Chen', username: 'mayachen', time: '1 day ago',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    content: 'Kyoto is absolutely beautiful this time of year! Highly recommend visiting the bamboo forest.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&fit=crop',
    likes: 2400, comments: 182, isLiked: true
  };
  document.getElementById('profilePosts').innerHTML = generatePostHTML(profilePost);
  lucide.createIcons();
}

// Media Upload
function previewImage(event) {
  const file = event.target.files[0];
  if (file) {
    currentImagePreview = URL.createObjectURL(file);
    document.getElementById('imagePreview').src = currentImagePreview;
    document.getElementById('imagePreviewContainer').classList.remove('hidden');
  }
}

function removeImage() {
  currentImagePreview = null;
  document.getElementById('fileInput').value = '';
  document.getElementById('imagePreviewContainer').classList.add('hidden');
}

function submitPost() {
  const content = document.getElementById('postInput').value;
  if (!content.trim() && !currentImagePreview) return;

  posts.unshift({
    id: 'p' + Date.now(),
    name: 'Current User',
    username: 'current_user',
    time: 'Just now',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    content: content,
    image: currentImagePreview,
    likes: 0,
    comments: 0,
    isLiked: false
  });

  document.getElementById('postInput').value = '';
  removeImage();
  renderFeed();
}

// Start app
document.addEventListener('DOMContentLoaded', init);

// State
let isAuthenticated = false;
try {
  isAuthenticated = localStorage.getItem('auth') === 'true';
} catch (e) {
  console.warn('localStorage access restricted in this environment.');
}

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

// Safely create icons
function safelyCreateIcons() {
  try {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  } catch (e) {
    console.warn('Lucide icons failed to load.', e);
  }
}

// Initialize UI
function init() {
  safelyCreateIcons();
  
  if (isAuthenticated) {
    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('appShell').classList.add('active');
    renderFeed();
    renderProfilePosts();
    
    try {
      if (typeof io !== 'undefined') {
        socket = io('http://localhost:5000');
      }
    } catch (e) {
      console.warn('Socket connection failed.');
    }
  } else {
    document.getElementById('loginPage').classList.add('active');
    document.getElementById('appShell').classList.remove('active');
  }
}

// Navigation
function navigate(viewId) {
  document.getElementById('feedView').classList.add('hidden');
  document.getElementById('profileView').classList.add('hidden');
  document.getElementById('notificationsView').classList.add('hidden');
  
  document.getElementById(viewId + 'View').classList.remove('hidden');

  document.getElementById('nav-feed').className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors text-gray-600 hover:bg-gray-50 font-medium";
  document.getElementById('nav-profile').className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors text-gray-600 hover:bg-gray-50 font-medium";
  document.getElementById('nav-notifications').className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors text-gray-600 hover:bg-gray-50 font-medium";
  
  const activeBtn = document.getElementById('nav-' + viewId);
  if (activeBtn) {
    activeBtn.className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors text-indigo-600 bg-indigo-50 font-medium";
  }
  
  if (viewId === 'notifications') {
    renderNotifications();
  }
  
  safelyCreateIcons();
}

// Auth
function handleLogin(e) {
  e.preventDefault();
  try { localStorage.setItem('auth', 'true'); } catch(e) {}
  isAuthenticated = true;
  init();
}

function handleLogout() {
  try { localStorage.removeItem('auth'); } catch(e) {}
  isAuthenticated = false;
  if (socket) socket.disconnect();
  init();
}

// Real Interactive Features
let isFollowingProfile = false;
let followerCount = 89300;

function toggleFollow() {
  isFollowingProfile = !isFollowingProfile;
  followerCount += isFollowingProfile ? 1 : -1;
  
  const btn = document.getElementById('profileFollowBtn');
  const display = document.getElementById('followerCountDisplay');
  
  if (isFollowingProfile) {
    btn.innerText = 'Following';
    btn.className = 'px-6 py-2 bg-gray-200 text-gray-900 rounded-full font-semibold hover:bg-gray-300 transition-colors';
  } else {
    btn.innerText = 'Follow';
    btn.className = 'px-6 py-2 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-colors';
  }
  
  display.innerText = (followerCount / 1000).toFixed(1) + 'K';
}

function renderNotifications() {
  const notifs = [
    { type: 'like', text: 'Sarah Jenkins liked your recent photo.', time: '2m ago', icon: 'heart', color: 'text-red-500' },
    { type: 'comment', text: 'Liam Chen commented on your post.', time: '1h ago', icon: 'message-circle', color: 'text-indigo-500' },
    { type: 'follow', text: 'Maya Chen started following you.', time: '3h ago', icon: 'user-plus', color: 'text-green-500' }
  ];
  
  document.getElementById('notificationList').innerHTML = notifs.map(n => `
    <div class="flex items-center gap-4 p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
      <div class="p-2 bg-gray-100 rounded-full ${n.color}">
        <i data-lucide="${n.icon}" class="w-5 h-5"></i>
      </div>
      <div class="flex-1">
        <p class="text-gray-900 font-medium">${n.text}</p>
        <p class="text-xs text-gray-500">${n.time}</p>
      </div>
    </div>
  `).join('');
}

function sharePost(id, btnElement) {
  // Simulate copying to clipboard
  const originalHtml = btnElement.innerHTML;
  btnElement.innerHTML = `<i data-lucide="check" class="w-5 h-5 text-green-500"></i><span class="text-sm font-medium text-green-500">Copied!</span>`;
  safelyCreateIcons();
  
  setTimeout(() => {
    btnElement.innerHTML = originalHtml;
    safelyCreateIcons();
  }, 2000);
}

function toggleComments(id) {
  const commentSection = document.getElementById(`comments-${id}`);
  if (commentSection.classList.contains('hidden')) {
    commentSection.classList.remove('hidden');
    commentSection.classList.add('fade-in');
  } else {
    commentSection.classList.add('hidden');
  }
}

function postComment(id) {
  const input = document.getElementById(`comment-input-${id}`);
  const text = input.value.trim();
  if (!text) return;
  
  const commentList = document.getElementById(`comment-list-${id}`);
  const newComment = document.createElement('div');
  newComment.className = 'flex gap-2 text-sm';
  newComment.innerHTML = `
    <span class="font-bold text-gray-900">You</span>
    <span class="text-gray-700">${text}</span>
  `;
  commentList.appendChild(newComment);
  
  input.value = '';
  
  // Increment comment count
  const post = posts.find(p => p.id === id);
  if (post) {
    post.comments++;
    renderFeed(); // Re-render to update the count
    
    // Auto-open comments again since re-render resets it
    setTimeout(() => {
      document.getElementById(`comments-${id}`).classList.remove('hidden');
    }, 10);
  }
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
        <button onclick="toggleComments('${post.id}')" class="flex items-center gap-2 hover:text-indigo-500 transition-colors">
          <i data-lucide="message-circle" class="w-5 h-5"></i>
          <span class="text-sm font-medium">${post.comments}</span>
        </button>
        <button onclick="sharePost('${post.id}', this)" class="flex items-center gap-2 hover:text-green-500 transition-colors">
          <i data-lucide="share-2" class="w-5 h-5"></i>
          <span class="text-sm font-medium">Share</span>
        </button>
      </div>
      
      <!-- Hidden Interactive Comments Section -->
      <div id="comments-${post.id}" class="hidden mt-4 pt-4 border-t border-gray-50">
        <div id="comment-list-${post.id}" class="space-y-2 mb-3">
           <div class="flex gap-2 text-sm">
             <span class="font-bold text-gray-900">user_404</span>
             <span class="text-gray-700">This is awesome! 🔥</span>
           </div>
        </div>
        <div class="flex gap-2">
          <input type="text" id="comment-input-${post.id}" class="flex-1 px-3 py-1.5 border rounded-full text-sm outline-none focus:border-indigo-500 transition-colors" placeholder="Write a comment...">
          <button onclick="postComment('${post.id}')" class="px-4 py-1.5 bg-indigo-600 text-white rounded-full text-sm font-medium hover:bg-indigo-700">Post</button>
        </div>
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
  safelyCreateIcons();
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
  safelyCreateIcons();
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

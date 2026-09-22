const App = {
  // State
  isAuthenticated: localStorage.getItem('auth') === 'true',
  socket: null,
  
  state: {
    posts: [
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
    ],
    previewImage: null
  },

  // Interactions
  toggleLike: (postId) => {
    const post = App.state.posts.find(p => p.id === postId) || { id: 'p3', likes: 2400, isLiked: true }; // Fallback for profile post
    post.isLiked = !post.isLiked;
    post.likes += post.isLiked ? 1 : -1;
    
    // Direct DOM manipulation for fast response
    const btn = document.getElementById(`like-btn-${postId}`);
    const count = document.getElementById(`like-count-${postId}`);
    if (btn && count) {
      if (post.isLiked) {
        btn.classList.add('liked');
        btn.style.color = 'var(--danger)';
      } else {
        btn.classList.remove('liked');
        btn.style.color = '';
      }
      count.innerText = post.likes;
    }
  },

  focusComment: (postId) => {
    alert(`Comment dialog opened for post: ${postId}`);
  },

  handleImageSelect: (e) => {
    const file = e.target.files[0];
    if (file) {
      App.state.previewImage = URL.createObjectURL(file);
      document.getElementById('imagePreview').src = App.state.previewImage;
      document.getElementById('imagePreviewContainer').style.display = 'block';
    }
  },

  removeImage: () => {
    App.state.previewImage = null;
    document.getElementById('postImage').value = '';
    document.getElementById('imagePreviewContainer').style.display = 'none';
  },

  submitPost: () => {
    const content = document.getElementById('postContent').value;
    if (!content.trim() && !App.state.previewImage) return;

    const newPost = {
      id: 'p' + Date.now(),
      name: 'Current User',
      username: 'current_user',
      time: 'Just now',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
      content: content,
      image: App.state.previewImage,
      likes: 0,
      comments: 0,
      isLiked: false
    };

    App.state.posts.unshift(newPost);
    App.removeImage();
    App.router(); // re-render feed
  },

  initSocket: () => {
    if (typeof io !== 'undefined' && !App.socket) {
      App.socket = io('http://localhost:5000');
      App.socket.on('connect', () => {
        console.log('Connected to real-time WebSockets!');
      });
    }
  },

  // Router core
  routes: {
    '/': { view: Pages.Feed, protected: true },
    '/profile': { view: Pages.Profile, protected: true },
    '/login': { view: Pages.Login, protected: false },
    '/register': { view: Pages.Register, protected: false }
  },

  navigateTo: (url) => {
    history.pushState(null, null, url);
    App.router();
  },

  router: () => {
    let path = location.pathname;
    
    // Default fallback
    if (!App.routes[path]) {
      path = '/';
      history.replaceState(null, null, path);
    }

    const route = App.routes[path];

    // Auth Guard
    if (route.protected && !App.isAuthenticated) {
      App.navigateTo('/login');
      return;
    }
    if (!route.protected && App.isAuthenticated) {
      App.navigateTo('/');
      return;
    }

    const appDiv = document.getElementById('app');
    
    // Render
    if (route.protected) {
      appDiv.innerHTML = Components.Layout(route.view(), path);
      App.initSocket(); // Init socket only on protected pages
    } else {
      appDiv.innerHTML = route.view();
    }
  },

  // Auth Handlers
  handleLogin: (e) => {
    e.preventDefault();
    localStorage.setItem('auth', 'true');
    App.isAuthenticated = true;
    App.navigateTo('/');
  },

  handleRegister: (e) => {
    e.preventDefault();
    localStorage.setItem('auth', 'true');
    App.isAuthenticated = true;
    App.navigateTo('/');
  },

  logout: () => {
    localStorage.removeItem('auth');
    App.isAuthenticated = false;
    if (App.socket) {
      App.socket.disconnect();
      App.socket = null;
    }
    App.navigateTo('/login');
  }
};

// Global Event Listeners for Client-Side Routing
document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      App.navigateTo(e.target.href);
    }
  });

  // Handle browser back/forward buttons
  window.addEventListener('popstate', App.router);

  // Initial load
  App.router();
});

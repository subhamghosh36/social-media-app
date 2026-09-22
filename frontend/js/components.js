// Component Library (Template string returns)

const Components = {
  Navbar: () => `
    <nav class="navbar">
      <div class="flex items-center gap-2">
        <h2 style="color: var(--primary)">ConnectNow</h2>
      </div>
      <div>
        <button class="btn btn-outline" onclick="App.logout()">Logout</button>
      </div>
    </nav>
  `,

  Sidebar: (currentPath) => {
    const links = [
      { path: '/', label: 'Home' },
      { path: '/profile', label: 'Profile' }
    ];
    
    let linksHtml = links.map(l => `
      <a href="${l.path}" class="sidebar-link ${currentPath === l.path ? 'active' : ''}" data-link>
        ${l.label}
      </a>
    `).join('');

    return `
      <aside class="sidebar">
        ${linksHtml}
        <button class="btn btn-primary btn-full" style="margin-top: 2rem;">Post</button>
      </aside>
    `;
  },

  Layout: (contentHtml, currentPath) => `
    ${Components.Navbar()}
    ${Components.Sidebar(currentPath)}
    <main class="main-content">
      <div class="container">
        ${contentHtml}
      </div>
    </main>
  `,

  PostCard: (post) => `
    <div class="post-card" id="post-${post.id}">
      <div class="post-header">
        <img src="${post.avatar}" class="avatar" alt="avatar" />
        <div>
          <h4 style="margin-bottom:0">${post.name}</h4>
          <small style="color: var(--text-muted)">@${post.username} • ${post.time}</small>
        </div>
      </div>
      <p style="margin-bottom: 1rem; white-space: pre-wrap;">${post.content}</p>
      ${post.image ? `<img src="${post.image}" style="width:100%; border-radius:0.5rem; margin-bottom:1rem; object-fit: cover; max-height: 400px;" />` : ''}
      <div class="post-actions">
        <button onclick="App.toggleLike('${post.id}')" id="like-btn-${post.id}" class="${post.isLiked ? 'liked' : ''}" style="${post.isLiked ? 'color: var(--danger)' : ''}">
          ❤️ <span id="like-count-${post.id}">${post.likes}</span>
        </button>
        <button onclick="App.focusComment('${post.id}')">💬 ${post.comments}</button>
        <button>🔄 Share</button>
      </div>
    </div>
  `,

  CreatePost: () => `
    <div class="post-card" style="margin-bottom:2rem;">
      <div class="create-post">
        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" class="avatar" />
        <div style="flex: 1;">
          <textarea id="postContent" placeholder="What's happening?"></textarea>
          
          <div id="imagePreviewContainer" class="image-preview">
            <img id="imagePreview" src="" />
            <button class="remove-image" onclick="App.removeImage()">✕</button>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border); padding-top:1rem; mt: 1rem;">
            <div style="color: var(--primary); cursor: pointer;" onclick="document.getElementById('postImage').click()">
              📷 Photo
            </div>
            <input type="file" id="postImage" accept="image/*" style="display:none;" onchange="App.handleImageSelect(event)" />
            <button class="btn btn-primary" onclick="App.submitPost()">Post</button>
          </div>
        </div>
      </div>
    </div>
  `
};

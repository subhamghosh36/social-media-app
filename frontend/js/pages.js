const Pages = {
  Login: () => `
    <div class="auth-wrapper">
      <div class="auth-card">
        <h2 style="text-align:center; margin-bottom: 1.5rem;">Welcome Back</h2>
        <form id="loginForm" onsubmit="App.handleLogin(event)">
          <div class="input-group">
            <label>Email Address</label>
            <input type="email" name="email" required />
          </div>
          <div class="input-group">
            <label>Password</label>
            <input type="password" name="password" required />
          </div>
          <button type="submit" class="btn btn-primary btn-full">Sign In</button>
        </form>
        <p style="text-align:center; margin-top:1.5rem; font-size:0.875rem;">
          Don't have an account? <a href="/register" data-link style="color:var(--primary)">Register</a>
        </p>
      </div>
    </div>
  `,

  Register: () => `
    <div class="auth-wrapper">
      <div class="auth-card">
        <h2 style="text-align:center; margin-bottom: 1.5rem;">Create Account</h2>
        <form id="registerForm" onsubmit="App.handleRegister(event)">
          <div class="input-group">
            <label>Username</label>
            <input type="text" name="username" required />
          </div>
          <div class="input-group">
            <label>Email Address</label>
            <input type="email" name="email" required />
          </div>
          <div class="input-group">
            <label>Password</label>
            <input type="password" name="password" required />
          </div>
          <button type="submit" class="btn btn-primary btn-full">Sign Up</button>
        </form>
        <p style="text-align:center; margin-top:1.5rem; font-size:0.875rem;">
          Already have an account? <a href="/login" data-link style="color:var(--primary)">Sign In</a>
        </p>
      </div>
    </div>
  `,

  Feed: () => {
    // In a real app, this would come from a backend API
    const posts = App.state.posts;

    let feedHtml = `
      <div style="margin-bottom: 2rem;">
        <h2>Home</h2>
      </div>
      ${Components.CreatePost()}
    `;

    feedHtml += posts.map(p => Components.PostCard(p)).join('');

    return feedHtml;
  },

  Profile: () => {
    return `
      <div>
        <div style="height: 200px; background: #ddd; border-radius: 1rem 1rem 0 0;"></div>
        <div style="padding: 1rem; position: relative;">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop" style="width:120px; height:120px; border-radius:50%; border:4px solid white; position:absolute; top:-60px;" />
          <div style="display:flex; justify-content:flex-end;">
            <button class="btn btn-outline">Edit Profile</button>
          </div>
          <div style="margin-top: 1rem;">
            <h2>Maya Chen</h2>
            <p style="color:var(--text-muted)">@mayachen</p>
            <p style="margin-top:1rem;">Adventure seeker | Digital Nomad</p>
          </div>
        </div>
      <!-- User's Posts Feed -->
      <div style="margin-top: 2rem;">
        ${Components.PostCard({
          id: 'p3',
          name: 'Maya Chen', username: 'mayachen', time: '1 day ago',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
          content: 'Kyoto is absolutely beautiful this time of year! Highly recommend visiting the bamboo forest.',
          image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&fit=crop',
          likes: 2400, comments: 182, isLiked: true
        })}
      </div>
  }
}
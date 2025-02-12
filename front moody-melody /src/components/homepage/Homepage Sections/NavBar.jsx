import "../HomePage.css";

function NavBar() {
  return (
    <>
      {/* Left Section */}
      <aside className="sidebar">
        <a href="#" className="menu-item profile">
          <div className="icon">👤</div>
          <span className="text">Profile</span>
        </a>
        <nav className="menu">
          <a href="#" className="menu-item">
            <div className="icon">📚</div>
            <span className="text">Feed</span>
          </a>
          <a href="#" className="menu-item">
            <div className="icon">🔥</div>
            <span className="text">Trending</span>
          </a>
          <a href="#" className="menu-item active">
            <div className="icon">▶️</div>
            <span className="text">Player</span>
          </a>
          <a href="#" className="menu-item">
            <div className="icon">❤️</div>
            <span className="text">Favorites</span>
          </a>
          <a href="#" className="menu-item">
            <div className="icon">📚</div>
            <span className="text">Library</span>
          </a>
        </nav>
        <a href="#" className="menu-item settings">
          <div className="icon">⚙️</div>
          <span className="text">Settings</span>
        </a>
      </aside>
    </>
  );
}

export default NavBar;

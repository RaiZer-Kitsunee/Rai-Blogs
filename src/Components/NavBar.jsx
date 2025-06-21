import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link className="home-title" to="/">
        <h2>Rai Blogs</h2>
      </Link>
      <div className="tags">
        <Link className="nav-a" to="/">
          Home
        </Link>
        <Link className="nav-a" to="/create">
          New Blog
        </Link>
        <Link className="nav-a" to="/Authors">
          Authors
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;

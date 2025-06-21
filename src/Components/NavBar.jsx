import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <h2>Rai Blogs</h2>
      </Link>
      <div className="tags">
        <Link to="/">Home</Link>
        <Link to="/create">New Blog</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
};

export default NavBar;

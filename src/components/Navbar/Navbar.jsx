import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="nav-logo">✓</span>
        <h2 className="nav-title">TaskFlow</h2>
      </div>
      <span className="nav-sub">Stay organized. Stay productive.</span>
    </nav>
  );
}
export default Navbar;

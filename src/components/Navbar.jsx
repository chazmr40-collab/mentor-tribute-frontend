import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const tab = ({ isActive }) => ({
    color: isActive ? "#000" : "#555",
    fontWeight: isActive ? 700 : 500,
    textDecoration: "none"
  });

  return (
    <header style={{ borderBottom: "1px solid #eee", padding: "12px 20px", display: "flex", gap: 16, alignItems: "center", position: "sticky", top: 0, background: "#fff", zIndex: 1 }}>
      <Link to="/" style={{ textDecoration: "none", color: "#111", fontWeight: 800 }}>Mentor Tribute</Link>
      <nav style={{ display: "flex", gap: 12 }}>
        <NavLink to="/" style={tab}>Home</NavLink>
        <NavLink to="/tributes" style={tab}>Tributes</NavLink>
      </nav>
    </header>
  );
}
<a href="mailto:youremail@example.com">Contact</a>

import React, { useState, useEffect } from "react";

const Sidebar = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const [isVisible, setIsVisible] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      const wideScreen = window.innerWidth > 768;
      setIsOpen(wideScreen);
      setIsVisible(wideScreen);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isVisible) return null; // 👈 Sidebar and button hidden on small screens

  const sidebarStyle = {
    width: isOpen ? "200px" : "0",
    background: "#2E7D1E",
    color: "white",
    height: "100vh",
    padding: isOpen ? "20px" : "0",
    position: "fixed",
    top: 0,
    left: 0,
    overflowX: "hidden",
    transition: "all 0.3s ease",
    boxShadow: isOpen ? "2px 0 5px rgba(0,0,0,0.2)" : "none",
    zIndex: 1000,
  };

  const linkStyle = {
    display: isOpen ? "block" : "none",
    padding: "10px 0",
    color: "white",
    cursor: "pointer",
  };

  const hamburgerStyle = {
    position: "fixed",
    top: "20px",
    left: isOpen ? "210px" : "20px",
    background: "#2E7D1E",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    zIndex: 1100,
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} style={hamburgerStyle}>
        {isOpen ? "✖" : "☰"}
      </button>
      <div style={sidebarStyle}>
        {isOpen && (
          <>
            <h2>AgriTech Admin</h2>
            <p style={linkStyle} onClick={() => onNavigate("dashboard")}>
              Dashboard
            </p>
            <p style={linkStyle} onClick={() => onNavigate("products")}>
              Products
            </p>
            <p style={linkStyle} onClick={() => onNavigate("vendors")}>
              Vendors
            </p>
            <p style={linkStyle} onClick={() => onNavigate("categories")}>
              Categories
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;

import React, { useState, useEffect } from "react";

const AdminLogin = ({ onLogin }) => {
  const [isSmallDevice, setIsSmallDevice] = useState(window.innerWidth < 500);

  useEffect(() => {
    const handleResize = () => setIsSmallDevice(window.innerWidth < 500);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    padding: isSmallDevice ? "10px" : "0",
    background: "linear-gradient(135deg, #f5f5f5 0%, #e8eaf6 50%, #fafafa 100%)",
    fontFamily: "'Poppins', sans-serif",
  };

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.25)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    padding: isSmallDevice ? "30px 20px" : "50px 40px",
    borderRadius: "18px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: isSmallDevice ? "100%" : "90%",
    maxWidth: "380px",
    border: "1px solid rgba(0, 0, 0, 0.1)",
  };

  const titleStyle = {
    fontSize: isSmallDevice ? "22px" : "28px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#2E7D1E",
    letterSpacing: "1px",
  };

  const subtitleStyle = {
    fontSize: isSmallDevice ? "14px" : "18px",
    fontWeight: "500",
    marginBottom: "25px",
    color: "#555",
  };

  const inputStyle = {
    width: "100%",
    padding: isSmallDevice ? "10px" : "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: isSmallDevice ? "13px" : "14px",
    boxSizing: "border-box",
    background: "#fff",
    color: "#333",
  };

  const buttonStyle = {
    width: "100%",
    padding: isSmallDevice ? "10px" : "12px",
    marginTop: "10px",
    background: "linear-gradient(90deg, #2E7D1E, #43A047)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: isSmallDevice ? "14px" : "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s ease",
  };

  const googleBtnStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginTop: "18px",
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: isSmallDevice ? "8px" : "10px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: isSmallDevice ? "12px" : "14px",
    color: "#333",
    transition: "all 0.3s ease",
  };

  const dividerStyle = {
    margin: isSmallDevice ? "15px 0" : "20px 0",
    color: "#777",
    fontSize: isSmallDevice ? "12px" : "14px",
    opacity: "0.8",
  };

  const forgotPasswordStyle = {
    display: "block",
    textAlign: "right",
    marginTop: "5px",
    color: "#2E7D1E",
    fontSize: isSmallDevice ? "11px" : "13px",
    textDecoration: "none",
  };

  const googleLogo =
    "https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png";

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Admin Portal</h2>
        <h3 style={subtitleStyle}>Login to Continue</h3>

        <input type="email" placeholder="Email address" style={inputStyle} />
        <input type="password" placeholder="Password" style={inputStyle} />

        <a href="#" style={forgotPasswordStyle}>
          Forgot Password?
        </a>

        <button
          style={buttonStyle}
          onMouseOver={(e) =>
            (e.target.style.background =
              "linear-gradient(90deg, #388E3C, #66BB6A)")
          }
          onMouseOut={(e) =>
            (e.target.style.background =
              "linear-gradient(90deg, #2E7D1E, #43A047)")
          }
          onClick={() => onLogin && onLogin()}
        >
          Log In
        </button>

        <div style={dividerStyle}>or</div>

        <div
          style={googleBtnStyle}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "rgba(255, 255, 255, 1)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
          }}
        >
          <img src={googleLogo} alt="Google" width="18" height="18" />
          <span>Sign in with Google</span>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

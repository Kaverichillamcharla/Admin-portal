import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ProductsPage from "./pages/ProductsPage";
import Vendors from "./pages/Vendors";
import Categories from "./pages/Categories";
import AdminLogin from "./pages/AdminLogin."; 

const App = () => {
  // default page - you can set to "adminlogin" to open login first
  const [page, setPage] = useState("adminlogin");

  const renderPage = () => {
    if (page === "products") return <ProductsPage />;
    if (page === "vendors") return <Vendors />;
    if (page === "categories") return <Categories />;
    if (page === "adminlogin")
      return (
        <AdminLogin
          onLogin={() => {
            // called by AdminLogin after successful auth
            setPage("dashboard");
          }}
        />
      );
    return <Dashboard />;
  };

  const styles = {
    layout: {
      display: "flex",
      minHeight: "100vh",
      background: "#f4f6f8",
      fontFamily: "Arial, sans-serif",
    },
    // when sidebar is visible, content has left margin; otherwise it is full width
    content: (sidebarVisible) => ({
      flex: 1,
      padding: "20px",
      marginLeft: sidebarVisible ? "200px" : 0, // match your Sidebar width
      transition: "margin 0.2s ease",
      boxSizing: "border-box",
    }),
    // wrapper for full-screen centered login (optional)
    centerWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      minHeight: "100vh",
      padding: "20px",
    },
  };

  const sidebarVisible = page !== "adminlogin";

  return (
    <div style={styles.layout}>
      {sidebarVisible && <Sidebar onNavigate={setPage} />}

      <main style={styles.content(sidebarVisible)}>
        {/* If login page, wrap it so it stays centered */}
        {page === "adminlogin" ? (
          <div style={styles.centerWrapper}>{renderPage()}</div>
        ) : (
          renderPage()
        )}
      </main>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";

const CategoryPage = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Fertilizers", products: 12 },
    { id: 2, name: "Seeds", products: 8 },
    { id: 3, name: "Farm Equipment", products: 5 },
  ]);

  const [search, setSearch] = useState("");
  const [modalData, setModalData] = useState({ id: null, name: "", products: 0 });
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setModalData({ id: null, name: "", products: 0 });
    setIsEdit(false);
    setShowModal(true);
  };

  const openEditModal = (category) => {
    setModalData(category);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  const handleSave = () => {
    if (!modalData.name) {
      alert("Please enter a category name");
      return;
    }

    if (isEdit) {
      setCategories(categories.map((c) => (c.id === modalData.id ? modalData : c)));
    } else {
      setCategories([...categories, { ...modalData, id: categories.length + 1 }]);
    }

    setShowModal(false);
  };

  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Poppins, sans-serif",
      backgroundColor: "#f9f9f9",
      minHeight: "100vh",
    },
    header: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between",
      alignItems: isMobile ? "stretch" : "center",
      gap: isMobile ? "10px" : "0",
      marginBottom: "20px",
    },
    title: {
      fontSize: isMobile ? "20px" : "24px",
      fontWeight: "bold",
      color: "#2E7D1E",
      textAlign: isMobile ? "center" : "left",
    },
    searchContainer: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: "10px",
      alignItems: "center",
    },
    search: {
      padding: "10px",
      width: isMobile ? "100%" : "250px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      outline: "none",
    },
    addButton: {
      padding: "10px 16px",
      backgroundColor: "#2E7D1E",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    tableWrapper: {
      overflowX: "auto",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      minWidth: "500px",
    },
    th: {
      textAlign: "left",
      padding: "12px",
      backgroundColor: "#e8f5e9",
      color: "#2E7D1E",
      fontWeight: "600",
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #ddd",
      fontSize: isMobile ? "14px" : "16px",
    },
    actionBtn: {
      marginRight: "10px",
      padding: "6px 10px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      fontSize: "14px",
    },
    editBtn: {
      backgroundColor: "#007bff",
      color: "white",
    },
    deleteBtn: {
      backgroundColor: "#dc3545",
      color: "white",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      padding: "10px",
    },
    modal: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "10px",
      width: isMobile ? "90%" : "350px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "8px 0",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "14px",
    },
    saveBtn: {
      backgroundColor: "#28a745",
      color: "white",
      width: "100%",
      padding: "10px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.title}>📦 Category Management</span>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="🔍 Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.search}
          />
          <button style={styles.addButton} onClick={openAddModal}>
            ➕ Add Category
          </button>
        </div>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Category Name</th>
              <th style={styles.th}>Products Count</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((cat) => (
              <tr key={cat.id}>
                <td style={styles.td}>{cat.name}</td>
                <td style={styles.td}>{cat.products}</td>
                <td style={styles.td}>
                  <button
                    style={{ ...styles.actionBtn, ...styles.editBtn }}
                    onClick={() => openEditModal(cat)}
                  >
                    Edit
                  </button>
                  <button
                    style={{ ...styles.actionBtn, ...styles.deleteBtn }}
                    onClick={() => handleDelete(cat.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>{isEdit ? "✏️ Edit Category" : "➕ Add Category"}</h3>
            <input
              style={styles.input}
              type="text"
              placeholder="Category Name"
              value={modalData.name}
              onChange={(e) =>
                setModalData({ ...modalData, name: e.target.value })
              }
            />
            <input
              style={styles.input}
              type="number"
              placeholder="No. of Products"
              value={modalData.products}
              onChange={(e) =>
                setModalData({
                  ...modalData,
                  products: parseInt(e.target.value) || 0,
                })
              }
            />
            <button style={styles.saveBtn} onClick={handleSave}>
              {isEdit ? "Update Category" : "Save Category"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;

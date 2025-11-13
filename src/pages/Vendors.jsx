import React, { useState } from "react";

const VendorPage = () => {
  const [vendors, setVendors] = useState([
    { id: 1, name: "GreenGrow Farms", contact: "9876543210", rating: 4.8, location: "Hyderabad", status: "Active" },
    { id: 2, name: "AgriSupply Co.", contact: "9123456780", rating: 4.2, location: "Delhi", status: "Inactive" },
    { id: 3, name: "FarmFresh Organics", contact: "9988776655", rating: 4.5, location: "Bangalore", status: "Active" },
  ]);

  const [search, setSearch] = useState("");
  const [modalData, setModalData] = useState({ id: null, name: "", contact: "", rating: "", location: "", status: "Active" });
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // Filter vendors
  const filteredVendors = vendors.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.location.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setModalData({ id: null, name: "", contact: "", rating: "", location: "", status: "Active" });
    setIsEdit(false);
    setShowModal(true);
  };

  const openEditModal = (vendor) => {
    setModalData(vendor);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setVendors(vendors.filter((v) => v.id !== id));
  };

  const handleSave = () => {
    if (!modalData.name || !modalData.contact) {
      alert("Please fill all fields");
      return;
    }
    if (isEdit) {
      setVendors(vendors.map((v) => (v.id === modalData.id ? modalData : v)));
    } else {
      setVendors([...vendors, { ...modalData, id: vendors.length + 1 }]);
    }
    setShowModal(false);
  };

  const styles = {
    container: { padding: "30px", fontFamily: "Arial, sans-serif"
     },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
    title: { fontSize: "22px", fontWeight: "bold" },
    search: { padding: "8px", width: "250px", borderRadius: "6px", border: "1px solid #ccc" },
    addButton: { padding: "8px 16px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" },
    table: { width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" },
    th: { textAlign: "left", padding: "12px", backgroundColor: "#f4f4f4" },
    td: { padding: "12px", borderBottom: "1px solid #ddd" },
    actionBtn: { marginRight: "10px", padding: "6px 10px", borderRadius: "5px", border: "none", cursor: "pointer" },
    editBtn: { backgroundColor: "#007bff", color: "white" },
    deleteBtn: { backgroundColor: "#dc3545", color: "white" },
    modalOverlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" },
    modal: { backgroundColor: "white", padding: "20px", borderRadius: "10px", width: "400px" },
    input: { width: "100%", padding: "8px", margin: "6px 0", borderRadius: "5px", border: "1px solid #ccc" },
    saveBtn: { ...this, backgroundColor: "#28a745", color: "white", width: "100%", padding: "10px", border: "none", borderRadius: "6px", cursor: "pointer" },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.title}>Vendors Management</span>
        <div>
          <input
            type="text"
            placeholder="Search by name or location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.search}
          />
          <button style={styles.addButton} onClick={openAddModal}>
            + Add Vendor
          </button>
        </div>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Contact</th>
            <th style={styles.th}>Rating</th>
            <th style={styles.th}>Location</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredVendors.map((vendor) => (
            <tr key={vendor.id}>
              <td style={styles.td}>{vendor.name}</td>
              <td style={styles.td}>{vendor.contact}</td>
              <td style={styles.td}>{vendor.rating}</td>
              <td style={styles.td}>{vendor.location}</td>
              <td style={styles.td}>{vendor.status}</td>
              <td style={styles.td}>
                <button
                  style={{ ...styles.actionBtn, ...styles.editBtn }}
                  onClick={() => openEditModal(vendor)}
                >
                  Edit
                </button>
                <button
                  style={{ ...styles.actionBtn, ...styles.deleteBtn }}
                  onClick={() => handleDelete(vendor.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>{isEdit ? "Edit Vendor" : "Add Vendor"}</h3>
            <input
              style={styles.input}
              type="text"
              placeholder="Vendor Name"
              value={modalData.name}
              onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
            />
            <input
              style={styles.input}
              type="text"
              placeholder="Contact"
              value={modalData.contact}
              onChange={(e) => setModalData({ ...modalData, contact: e.target.value })}
            />
            <input
              style={styles.input}
              type="number"
              placeholder="Rating"
              value={modalData.rating}
              onChange={(e) => setModalData({ ...modalData, rating: e.target.value })}
            />
            <input
              style={styles.input}
              type="text"
              placeholder="Location"
              value={modalData.location}
              onChange={(e) => setModalData({ ...modalData, location: e.target.value })}
            />
            <select
              style={styles.input}
              value={modalData.status}
              onChange={(e) => setModalData({ ...modalData, status: e.target.value })}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <button style={styles.saveBtn} onClick={handleSave}>
              {isEdit ? "Update Vendor" : "Save Vendor"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default VendorPage;

import React, { useState } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState([
    { id: "AGR-1001", name: "Organic Paddy Seeds", vendor: "GreenFarm Co.", category: "Seeds", stock: "1200 units", price: 50, status: "Active", sustainability: "Organic" },
    { id: "AGR-1002", name: "Pest-Guard Pesticide 5L", vendor: "ChemAgro Corp.", category: "Pesticides", stock: "50 units", price: 75.5, status: "Active", sustainability: "-" },
    { id: "AGR-1003", name: "Drip Irrigation Kit", vendor: "AquaFlow Tools", category: "Equipment", stock: "Vendor Stock", price: 350, status: "Pending", sustainability: "-" },
  ]);

  const [modal, setModal] = useState({ open: false, mode: "", product: {} });
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  // CRUD Handlers
  const handleAdd = () => setModal({ open: true, mode: "Add", product: {} });
  const handleEdit = (p) => setModal({ open: true, mode: "Edit", product: p });
  const handleDelete = (id) => setProducts(products.filter((p) => p.id !== id));

  const handleSave = () => {
    if (modal.mode === "Add") {
      setProducts([...products, { ...modal.product, id: `AGR-${Math.floor(Math.random() * 9000) + 1000}` }]);
    } else {
      setProducts(products.map((p) => (p.id === modal.product.id ? modal.product : p)));
    }
    setModal({ open: false, mode: "", product: {} });
  };

  // Search + Sort
  const filtered = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sortBy === "name" ? a.name.localeCompare(b.name)
      : sortBy === "price" ? a.price - b.price
      : 0
    );

  const styles = {
    container: { padding: "30px", background: "#f8fafc", fontFamily: "Arial" },
    header: { display: "flex", justifyContent: "space-between", marginBottom: "20px" },
    title: { fontSize: "24px", fontWeight: "600" },
    controls: { display: "flex", gap: "10px" },
    input: { padding: "8px", border: "1px solid #ccc", borderRadius: "4px" },
    select: { padding: "8px", border: "1px solid #ccc", borderRadius: "4px" },
    button: { padding: "8px 12px", border: "none", borderRadius: "4px", background: "#2563eb", color: "#fff", cursor: "pointer" },
    table: { width: "100%", borderCollapse: "collapse", background: "#fff" },
    th: { background: "#e5e7eb", padding: "12px", textAlign: "left", fontWeight: "600", borderBottom: "2px solid #ddd" },
    td: { padding: "10px", borderBottom: "1px solid #ddd" },
    actionBtn: { marginRight: "5px", padding: "4px 8px", border: "none", borderRadius: "3px", cursor: "pointer" },
    editBtn: { background: "#22c55e", color: "#fff" },
    deleteBtn: { background: "#ef4444", color: "#fff" },
    modalBg: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" },
    modal: { background: "#fff", padding: "20px", borderRadius: "8px", width: "400px" },
    modalTitle: { fontWeight: "600", fontSize: "18px", marginBottom: "10px" },
    modalInput: { width: "100%", marginBottom: "10px", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Product Master Table</h2>
        <div style={styles.controls}>
          <input style={styles.input} placeholder="Search Product..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <select style={styles.select} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
          <button style={styles.button} onClick={handleAdd}>+ Add Product</button>
        </div>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Vendor</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Stock</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id}>
              <td style={styles.td}>{p.id}</td>
              <td style={styles.td}>{p.name}</td>
              <td style={styles.td}>{p.vendor}</td>
              <td style={styles.td}>{p.category}</td>
              <td style={styles.td}>{p.stock}</td>
              <td style={styles.td}>${p.price}</td>
              <td style={styles.td}>{p.status}</td>
              <td style={styles.td}>
                <button style={{ ...styles.actionBtn, ...styles.editBtn }} onClick={() => handleEdit(p)}>Edit</button>
                <button style={{ ...styles.actionBtn, ...styles.deleteBtn }} onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal.open && (
        <div style={styles.modalBg}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitle}>{modal.mode} Product</h3>
            <input style={styles.modalInput} placeholder="Product Name"
              value={modal.product.name || ""} onChange={(e) => setModal({ ...modal, product: { ...modal.product, name: e.target.value } })} />
            <input style={styles.modalInput} placeholder="Vendor"
              value={modal.product.vendor || ""} onChange={(e) => setModal({ ...modal, product: { ...modal.product, vendor: e.target.value } })} />
            <input style={styles.modalInput} placeholder="Category"
              value={modal.product.category || ""} onChange={(e) => setModal({ ...modal, product: { ...modal.product, category: e.target.value } })} />
            <input style={styles.modalInput} placeholder="Stock"
              value={modal.product.stock || ""} onChange={(e) => setModal({ ...modal, product: { ...modal.product, stock: e.target.value } })} />
            <input style={styles.modalInput} placeholder="Price"
              type="number" value={modal.product.price || ""} onChange={(e) => setModal({ ...modal, product: { ...modal.product, price: e.target.value } })} />
            <input style={styles.modalInput} placeholder="Status"
              value={modal.product.status || ""} onChange={(e) => setModal({ ...modal, product: { ...modal.product, status: e.target.value } })} />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button style={{ ...styles.button, background: "#6b7280" }} onClick={() => setModal({ open: false })}>Cancel</button>
              <button style={styles.button} onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductsPage;

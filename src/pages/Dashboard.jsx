import React, { useState } from "react";

/**
 * AgritechDashboard.jsx
 * Fixed image URLs (stable picsum.photos IDs) for reliable loading.
 * Added Logout button (calls optional onLogout prop or clears localStorage token and redirects).
 */

const sampleSales = [
  { month: "Jan", value: 200 },
  { month: "Feb", value: 220 },
  { month: "Mar", value: 300 },
  { month: "Apr", value: 285 },
  { month: "May", value: 420 },
  { month: "Jun", value: 360 },
  { month: "Jul", value: 410 },
];

const topProducts = [
  { id: 1, name: "Organic Paddy Seeds", sold: 320, revenue: "$4,200" },
  { id: 2, name: "Drip Irrigation Kit", sold: 190, revenue: "$3,400" },
  { id: 3, name: "Eco Fertilizer", sold: 150, revenue: "$2,300" },
];

export default function AgritechDashboard({ onLogout }) {
  const [query, setQuery] = useState("");
  const [range, setRange] = useState("Last 30 days");

  // SVG chart dimensions
  const width = 760;
  const height = 240;
  const padding = 40;

  // compute points for line chart
  const maxValue = Math.max(...sampleSales.map((s) => s.value));
  const points = sampleSales
    .map((d, i) => {
      const x =
        padding + (i * (width - padding * 2)) / Math.max(1, sampleSales.length - 1);
      const y = padding + (1 - d.value / maxValue) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  const handleExport = () => {
    const rows = [["Product", "Sold", "Revenue"], ...topProducts.map(p => [p.name, p.sold, p.revenue])];
    const csv = rows.map(r => r.map(cell => `"${String(cell).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "top_products.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Logout: if parent passes onLogout, call it; otherwise fallback
  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;

    if (typeof onLogout === "function") {
      try {
        onLogout();
      } catch (err) {
        console.error("onLogout prop threw an error:", err);
      }
    } else {
      // default fallback behavior: clear token and redirect to /login
      try {
        localStorage.removeItem("token"); // adjust key as per your auth implementation
      } catch (e) {
        console.warn("Could not access localStorage:", e);
      }
      // redirect to login page (adjust route as needed)
      window.location.href = "/login";
    }
  };

  // fixed, stable product images (replace these URLs with your own hosted images when ready)
  const productImages = {
    1: "https://as1.ftcdn.net/v2/jpg/10/18/41/42/1000_F_1018414204_slajqwEJK41TZ9N7c9V55N8jgu0jnNJB.jpg",
    2: "https://plus.unsplash.com/premium_photo-1661825536186-19606cd9a0f1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=719",
    3: "https://picsum.photos/id/1056/400/400",
  };

  // fixed vendor images
  const vendorImages = {
    0: "https://picsum.photos/id/1005/100/100",
    1: "https://picsum.photos/id/1011/100/100",
  };

  const styles = {
    page: {
      fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
      background: "#F4F7FA",
      minHeight: "100vh",
      padding: 22,
    },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
    title: { fontSize: 28, fontWeight: 700, color: "#0f1724" },
    actionBar: { display: "flex", gap: 10, alignItems: "center" },
    input: {
      padding: "8px 12px",
      borderRadius: 8,
      border: "1px solid #E5E7EB",
      outline: "none",
      minWidth: 180,
    },
    kpiRow: { display: "flex", gap: 16, marginBottom: 18, flexWrap: "wrap" },
    kpi: {
      background: "#fff",
      padding: 18,
      borderRadius: 12,
      boxShadow: "0 6px 14px rgba(15,23,42,0.06)",
      display: "flex",
      alignItems: "center",
      gap: 14,
      minWidth: 180,
      flex: "1 1 220px",
    },
    kpiIcon: { width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" },
    mainGrid: { display: "grid", gridTemplateColumns: "1fr 360px", gap: 18, alignItems: "start" },
    glassCard: {
      background: "#fff",
      borderRadius: 12,
      padding: 18,
      boxShadow: "0 8px 20px rgba(15,23,42,0.06)",
    },
    salesHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
    smallMuted: { color: "#6B7280", fontSize: 13 },
    vendorList: { display: "flex", flexDirection: "column", gap: 10 },
    vendorRow: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 },
    btnPrimary: {
      background: "#0ea5a8",
      color: "#fff",
      border: "none",
      padding: "8px 12px",
      borderRadius: 8,
      cursor: "pointer",
    },
    btnGhost: {
      background: "transparent",
      color: "#0f1724",
      border: "1px solid #E5E7EB",
      padding: "6px 10px",
      borderRadius: 8,
      cursor: "pointer",
    },
    table: { width: "100%", borderCollapse: "collapse", fontSize: 14 },
    th: { textAlign: "left", padding: "8px 6px", color: "#111827", fontWeight: 600 },
    td: { padding: "8px 6px", color: "#374151", borderTop: "1px solid #F3F4F6" },
    imgSmall: { width: 44, height: 44, objectFit: "cover", borderRadius: 8 },
  };

  const placeholder = "https://via.placeholder.com/400x400.png?text=Image+unavailable";

  return (
    <div style={styles.page}>
      <style>{`
        @media (max-width: 900px) {
          .main-grid { grid-template-columns: 1fr !important; }
          .kpi-row { flex-direction: column; }
        }
        .chart-point { transition: r 120ms ease, fill 120ms ease; }
        .chart-line { fill: rgba(14,165,168,0.06); stroke: #1D4ED8; stroke-width: 2.5; stroke-linejoin: round; stroke-linecap: round; }
      `}</style>

      <div style={styles.header}>
        <div>
          <div style={styles.title}>Agritech Dashboard</div>
          <div style={{ ...styles.smallMuted, marginTop: 6 }}>Admin overview • All farms & marketplaces</div>
        </div>

        <div style={styles.actionBar}>
          <input
            aria-label="search"
            placeholder="Search products, vendors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={styles.input}
          />
          <select value={range} onChange={(e) => setRange(e.target.value)} style={styles.input}>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Year to date</option>
          </select>
          <button style={styles.btnGhost} onClick={() => alert("Add product — hook this up!")}>
            + Add product
          </button>
          <button style={styles.btnGhost} onClick={handleExport}>Export CSV</button>
          {/* NEW: Logout button */}
          <button
            style={{ ...styles.btnGhost, background: "#ef4444", color: "#fff", border: "none" }}
            onClick={handleLogout}
            title="Logout"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="kpi-row" style={styles.kpiRow}>
        <div style={styles.kpi}>
          <div style={styles.kpiIcon}><img alt="prod" src="https://picsum.photos/id/1040/80/80" style={{ width: 36, height: 36 }} onError={(e)=>{e.currentTarget.src=placeholder}} /></div>
          <div>
            <div style={{ color: "#6B7280", fontSize: 13 }}>Total Products</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>128</div>
          </div>
        </div>

        <div style={styles.kpi}>
          <div style={styles.kpiIcon}><img alt="vendor" src="https://picsum.photos/id/1005/80/80" style={{ width: 36, height: 36 }} onError={(e)=>{e.currentTarget.src=placeholder}} /></div>
          <div>
            <div style={{ color: "#6B7280", fontSize: 13 }}>Vendors</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>32</div>
          </div>
        </div>

        <div style={styles.kpi}>
          <div style={styles.kpiIcon}><img alt="cat" src="https://picsum.photos/id/1016/80/80" style={{ width: 36, height: 36 }} onError={(e)=>{e.currentTarget.src=placeholder}} /></div>
          <div>
            <div style={{ color: "#6B7280", fontSize: 13 }}>Categories</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>14</div>
          </div>
        </div>

        <div style={styles.kpi}>
          <div style={styles.kpiIcon}><img alt="revenue" src="https://picsum.photos/id/1025/80/80" style={{ width: 36, height: 36 }} onError={(e)=>{e.currentTarget.src=placeholder}} /></div>
          <div>
            <div style={{ color: "#6B7280", fontSize: 13 }}>Monthly Revenue</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#2E7D1E" }}>$24,800</div>
          </div>
        </div>
      </div>

      <div className="main-grid" style={styles.mainGrid}>
        {/* Left: Sales + Top products */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ ...styles.glassCard }}>
            <div style={styles.salesHeader}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>Sales Overview</div>
                <div style={styles.smallMuted}>Sales across the year</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={styles.smallMuted}>Range: {range}</div>
                <button style={styles.btnGhost} onClick={() => alert("Download chart as image — implement if needed")}>Download</button>
              </div>
            </div>

            {/* SVG Chart */}
            <div style={{ overflow: "hidden", borderRadius: 10 }}>
              <svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{ display: "block" }} role="img" aria-label="Sales line chart">
                {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
                  const y = padding + t * (height - padding * 2);
                  return <line key={i} x1={padding} x2={width - padding} y1={y} y2={y} stroke="#EEF2FF" strokeWidth="1" />;
                })}

                <polyline
                  className="chart-line"
                  points={points}
                  fill="none"
                  stroke="rgba(29,78,216,0.08)"
                />

                <polygon
                  points={`${points} ${width - padding},${height - padding} ${padding},${height - padding}`}
                  fill="rgba(29,78,216,0.06)"
                />

                <polyline
                  points={points}
                  fill="none"
                  stroke="#1D4ED8"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />

                {sampleSales.map((d, i) => {
                  const x =
                    padding + (i * (width - padding * 2)) / Math.max(1, sampleSales.length - 1);
                  const y = padding + (1 - d.value / maxValue) * (height - padding * 2);
                  return (
                    <g key={i}>
                      <circle className="chart-point" cx={x} cy={y} r={4} fill="#fff" stroke="#1D4ED8" strokeWidth="2" />
                      <title>{`${d.month}: ${d.value}`}</title>
                    </g>
                  );
                })}

                {sampleSales.map((d, i) => {
                  const x =
                    padding + (i * (width - padding * 2)) / Math.max(1, sampleSales.length - 1);
                  return (
                    <text key={i} x={x} y={height - padding / 2} fontSize="11" textAnchor="middle" fill="#6B7280">
                      {d.month}
                    </text>
                  );
                })}

                <text x={10} y={padding} fontSize="11" fill="#9CA3AF">{maxValue}</text>
                <text x={10} y={height - padding} fontSize="11" fill="#9CA3AF">0</text>
              </svg>
            </div>
          </div>

          <div style={{ ...styles.glassCard }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div><div style={{ fontWeight: 700 }}>Top Products</div><div style={styles.smallMuted}>By units sold</div></div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={styles.btnGhost} onClick={() => alert("Filter clicked")}>Filter</button>
                <button style={styles.btnGhost} onClick={() => alert("View all")}>View all</button>
              </div>
            </div>

            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Product</th>
                  <th style={styles.th}>Sold</th>
                  <th style={styles.th}>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p) => (
                  <tr key={p.id}>
                    <td style={styles.td}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <img
                          alt={p.name}
                          style={styles.imgSmall}
                          src={productImages[p.id]}
                          onError={(e) => { e.currentTarget.src = placeholder; }}
                        />
                        <div>
                          <div style={{ fontWeight: 600 }}>{p.name}</div>
                          <div style={styles.smallMuted}>SKU: AGR-{1000 + p.id}</div>
                        </div>
                      </div>
                    </td>
                    <td style={styles.td}>{p.sold}</td>
                    <td style={styles.td}>{p.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column: recent activity, vendor approvals */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={styles.glassCard}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <div>
                <div style={{ fontWeight: 700 }}>Recent Activity</div>
                <div style={styles.smallMuted}>Latest updates from the marketplace</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={styles.btnGhost} onClick={() => alert("Mark all read")}>Mark all read</button>
              </div>
            </div>

            <ul style={{ paddingLeft: 18, margin: 0 }}>
              <li style={{ marginBottom: 8 }}>Added new product: <strong>Organic Paddy Seeds</strong></li>
              <li style={{ marginBottom: 8 }}>Updated product price: <strong>Drip Irrigation Kit</strong></li>
              <li style={{ marginBottom: 8 }}>New vendor: <strong>GreenFarm Co.</strong></li>
              <li style={{ marginBottom: 8 }}>Low stock alert: <strong>Eco Fertilizer</strong></li>
            </ul>
          </div>

          <div style={styles.glassCard}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <div>
                <div style={{ fontWeight: 700 }}>Vendor Approvals</div>
                <div style={styles.smallMuted}>Pending vendor requests</div>
              </div>
              <div style={{ color: "#6B7280", fontSize: 13 }}>2 pending</div>
            </div>

            <div style={styles.vendorList}>
              {[
                { name: "GreenFarm Co.", location: "Kerala" },
                { name: "AgroPlus", location: "Punjab" },
              ].map((v, i) => (
                <div key={i} style={styles.vendorRow}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <img alt="vendor" src={vendorImages[i]} style={{ width: 48, height: 48, borderRadius: 8 }} onError={(e)=>{e.currentTarget.src=placeholder}} />
                    <div>
                      <div style={{ fontWeight: 600 }}>{v.name}</div>
                      <div style={styles.smallMuted}>{v.location}</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={{ ...styles.btnPrimary, background: "#2E7D1E" }} onClick={() => alert(`Approved ${v.name}`)}>Approve</button>
                    <button style={{ ...styles.btnGhost }} onClick={() => alert(`Rejected ${v.name}`)}>Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.glassCard}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Quick Insights</div>
            <div style={styles.smallMuted}>Automated suggestions</div>
            <ul style={{ marginTop: 8 }}>
              <li>Consider promoting "Drip Irrigation Kit" — strong units sold but low conversion rate.</li>
              <li>Restock "Eco Fertilizer" (low inventory)</li>
              <li>Run a vendor verification audit for recently onboarded vendors.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


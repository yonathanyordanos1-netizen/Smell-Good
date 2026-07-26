import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

interface DemoOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  paymentMethod: string;
  createdAt: string;
}

const demoOrders: DemoOrder[] = [
  { id: "ORD-001", customerName: "Abebe Kebede", customerEmail: "abebe@example.com", customerPhone: "+251 911 123 456", customerAddress: "Bole, Addis Ababa", items: [{ name: "Black Diamond Intense", quantity: 1, price: 21000 }, { name: "Emerald", quantity: 2, price: 13000 }], total: 47000, status: "pending", paymentMethod: "Telebirr", createdAt: "2026-07-26" },
  { id: "ORD-002", customerName: "Sara Tadesse", customerEmail: "sara@example.com", customerPhone: "+251 922 654 321", customerAddress: "CMC, Addis Ababa", items: [{ name: "Brazilian Tobacco", quantity: 1, price: 9000 }], total: 9000, status: "confirmed", paymentMethod: "Cash on Delivery", createdAt: "2026-07-25" },
  { id: "ORD-003", customerName: "Meron Alemu", customerEmail: "meron@example.com", customerPhone: "+251 933 789 012", customerAddress: "Kazanchis, Addis Ababa", items: [{ name: "Club de Nuits", quantity: 1, price: 10500 }, { name: "Royal Oud", quantity: 1, price: 18000 }, { name: "Emerald", quantity: 1, price: 13000 }], total: 41500, status: "shipped", paymentMethod: "Telebirr", createdAt: "2026-07-24" },
  { id: "ORD-004", customerName: "Henok Desta", customerEmail: "henok@example.com", customerPhone: "+251 944 567 890", customerAddress: "Summit, Addis Ababa", items: [{ name: "Leather & Smoke", quantity: 1, price: 16000 }], total: 16000, status: "delivered", paymentMethod: "Telebirr", createdAt: "2026-07-20" },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<DemoOrder | null>(null);
  const [section, setSection] = useState<"orders" | "products">("orders");

  // --- Orders ---
  const convexOrders = useQuery(api.orders.getAll);
  const updateStatusMutation = useMutation(api.orders.updateStatus);

  const orders: DemoOrder[] = convexOrders
    ? convexOrders.map((o) => ({
        id: o._id,
        customerName: o.customerName,
        customerEmail: o.customerEmail,
        customerPhone: o.customerPhone || "",
        customerAddress: o.customerAddress,
        items: o.items.map((i) => ({ name: i.productName, quantity: i.quantity, price: i.price })),
        total: o.total,
        status: o.status as DemoOrder["status"],
        paymentMethod: o.paymentMethod,
        createdAt: new Date(o.createdAt).toLocaleDateString(),
      }))
    : demoOrders;

  const filteredOrders = activeTab === "all" ? orders : orders.filter((o) => o.status === activeTab);

  const updateStatus = async (orderId: string, newStatus: DemoOrder["status"]) => {
    if (orderId.startsWith("ORD-")) return;
    try { await updateStatusMutation({ id: orderId as any, status: newStatus }); }
    catch (err) { console.warn("Failed to update order:", err); }
  };

  // --- Products ---
  const convexProducts = useQuery(api.products.getAll);
  const createProduct = useMutation(api.products.create);
  const updateProduct = useMutation(api.products.update);
  const removeProduct = useMutation(api.products.remove);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [addForm, setAddForm] = useState({
    name: "", slug: "", description: "", price: "", imageUrl: "", category: "",
    notes: "", volume: "", inStock: true, featured: false,
  });
  const [editPrices, setEditPrices] = useState<Record<string, string>>({});
  const [editStock, setEditStock] = useState<Record<string, boolean>>({});
  const [editFeatured, setEditFeatured] = useState<Record<string, boolean>>({});
  const [savingPrice, setSavingPrice] = useState<string | null>(null);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.name || !addForm.price) return;
    try {
      await createProduct({
        name: addForm.name,
        slug: addForm.slug || addForm.name.toLowerCase().replace(/\s+/g, "-"),
        description: addForm.description || "A premium fragrance.",
        price: parseInt(addForm.price) || 0,
        imageUrl: addForm.imageUrl || "/images/perfumes/default.jpg",
        category: addForm.category || "Uncategorized",
        notes: addForm.notes ? addForm.notes.split(",").map((n) => n.trim()) : [],
        volume: addForm.volume || undefined,
        inStock: addForm.inStock,
        featured: addForm.featured,
      });
      setShowAddForm(false);
      setAddForm({ name: "", slug: "", description: "", price: "", imageUrl: "", category: "", notes: "", volume: "", inStock: true, featured: false });
    } catch (err) { console.warn("Failed to create product:", err); }
  };

  const handleUpdatePrice = async (productId: string) => {
    const newPrice = editPrices[productId];
    if (!newPrice) return;
    setSavingPrice(productId);
    try {
      await updateProduct({ id: productId as any, price: parseInt(newPrice) });
      setSavingPrice(null);
    } catch (err) { console.warn("Failed to update price:", err); setSavingPrice(null); }
  };

  const handleUpdateStock = async (productId: string, inStock: boolean) => {
    try { await updateProduct({ id: productId as any, inStock }); }
    catch (err) { console.warn("Failed to update stock:", err); }
  };

  const handleUpdateFeatured = async (productId: string, featured: boolean) => {
    try { await updateProduct({ id: productId as any, featured }); }
    catch (err) { console.warn("Failed to update featured:", err); }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try { await removeProduct({ id: productId as any }); }
    catch (err) { console.warn("Failed to delete product:", err); }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-ET", { style: "currency", currency: "ETB", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);

  const tabs = [
    { key: "all", label: "All Orders", count: orders.length },
    { key: "pending", label: "Pending", count: orders.filter((o) => o.status === "pending").length },
    { key: "confirmed", label: "Confirmed", count: orders.filter((o) => o.status === "confirmed").length },
    { key: "shipped", label: "Shipped", count: orders.filter((o) => o.status === "shipped").length },
    { key: "delivered", label: "Delivered", count: orders.filter((o) => o.status === "delivered").length },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-ocean text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-['Playfair_Display']">Admin Dashboard</h1>
              <p className="text-gray-300 mt-1">Manage orders and products</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-sm">Online</span>
              </div>
            </div>
          </div>
          {/* Section tabs */}
          <div className="flex gap-4 mt-6 border-t border-white/10 pt-4">
            <button onClick={() => setSection("orders")} className={`text-sm font-medium transition-colors ${section === "orders" ? "text-white" : "text-gray-400 hover:text-white"}`}>📋 Orders</button>
            <button onClick={() => setSection("products")} className={`text-sm font-medium transition-colors ${section === "products" ? "text-white" : "text-gray-400 hover:text-white"}`}>🧴 Products</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ========== ORDERS SECTION ========== */}
        {section === "orders" && (
          <>
            {convexOrders === undefined ? (
              <div className="text-center py-20">
                <div className="w-12 h-12 border-4 border-ocean border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-500">Loading orders...</p>
              </div>
            ) : selectedOrder ? (
              /* Order Detail View */
              <div>
                <button onClick={() => setSelectedOrder(null)} className="flex items-center gap-2 text-gray-600 hover:text-ocean mb-6 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  Back to Orders
                </button>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">Order {selectedOrder.id?.substring(0, 8) || selectedOrder.id}</h2>
                          <p className="text-gray-500 text-sm mt-1">Placed on {selectedOrder.createdAt}</p>
                        </div>
                        <span className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize ${statusColors[selectedOrder.status]}`}>{selectedOrder.status}</span>
                      </div>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                        <div className="flex flex-wrap gap-2">
                          {["pending", "confirmed", "shipped", "delivered", "cancelled"].map((status) => (
                            <button key={status} onClick={() => updateStatus(selectedOrder.id, status as DemoOrder["status"])}
                              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${selectedOrder.status === status ? "bg-ocean text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{status}</button>
                          ))}
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-4">Ordered Items</h3>
                      <div className="space-y-3">
                        {selectedOrder.items.map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div><p className="font-medium text-gray-900">{item.name}</p><p className="text-sm text-gray-500">Qty: {item.quantity}</p></div>
                            <p className="font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                        ))}
                        <div className="flex justify-between pt-3 border-t border-gray-200">
                          <span className="font-bold text-gray-900">Total</span>
                          <span className="font-bold text-ocean text-lg">{formatPrice(selectedOrder.total)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                      <h3 className="font-semibold text-gray-900 mb-4">Customer Details</h3>
                      <div className="space-y-3 text-sm">
                        <div><span className="text-gray-500">Name</span><p className="font-medium text-gray-900">{selectedOrder.customerName}</p></div>
                        <div><span className="text-gray-500">Email</span><p className="font-medium text-gray-900">{selectedOrder.customerEmail}</p></div>
                        <div><span className="text-gray-500">Phone</span><p className="font-medium text-gray-900">{selectedOrder.customerPhone}</p></div>
                        <div><span className="text-gray-500">Address</span><p className="font-medium text-gray-900">{selectedOrder.customerAddress}</p></div>
                        <div><span className="text-gray-500">Payment</span><p className="font-medium text-gray-900">{selectedOrder.paymentMethod}</p></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Orders List */
              <div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {tabs.map((tab) => (
                    <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === tab.key ? "bg-ocean text-white shadow-md" : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"}`}>
                      {tab.label}
                      <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>{tab.count}</span>
                    </button>
                  ))}
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Order</th>
                          <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Customer</th>
                          <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Items</th>
                          <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Total</th>
                          <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Payment</th>
                          <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Status</th>
                          <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Date</th>
                          <th className="text-right px-6 py-4 text-sm font-semibold text-gray-500">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((order) => (
                          <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id?.substring(0, 8) || order.id}</td>
                            <td className="px-6 py-4"><p className="text-sm font-medium text-gray-900">{order.customerName}</p><p className="text-xs text-gray-400">{order.customerEmail}</p></td>
                            <td className="px-6 py-4 text-sm text-gray-600">{order.items.length} {order.items.length === 1 ? "item" : "items"}</td>
                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">{formatPrice(order.total)}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{order.paymentMethod}</td>
                            <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColors[order.status]}`}>{order.status}</span></td>
                            <td className="px-6 py-4 text-sm text-gray-500">{order.createdAt}</td>
                            <td className="px-6 py-4 text-right">
                              <button onClick={() => setSelectedOrder(order)} className="text-sm font-medium text-ocean hover:text-ocean/70 transition-colors">View</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {filteredOrders.length === 0 && <div className="text-center py-16"><p className="text-gray-400">No orders found.</p></div>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{formatPrice(orders.reduce((sum, o) => sum + o.total, 0))}</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{orders.length}</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm">Pending Orders</p>
                    <p className="text-2xl font-bold text-yellow-600 mt-1">{orders.filter((o) => o.status === "pending").length}</p>
                  </div>
                </div>
                {!convexOrders && (
                  <div className="mt-6 p-4 bg-aqua/10 rounded-xl text-sm text-gray-600">
                    <p className="font-medium text-ocean mb-1">📋 Demo Mode</p>
                    Showing demo orders. Real orders from customers will appear here.
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* ========== PRODUCTS SECTION ========== */}
        {section === "products" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 font-['Playfair_Display']">
                Products {convexProducts ? `(${convexProducts.length})` : ""}
              </h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-2 bg-ocean text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-ocean/90 transition-all duration-200 shadow-lg hover:shadow-xl btn-press active:scale-[0.98]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {showAddForm ? "Cancel" : "Add Product"}
              </button>
            </div>

            {/* Add Product Form */}
            {showAddForm && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Add New Product</h3>
                <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Name *</label>
                    <input type="text" value={addForm.name} onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} required
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Slug</label>
                    <input type="text" value={addForm.slug} onChange={(e) => setAddForm({ ...addForm, slug: e.target.value })}
                      placeholder="auto-generated"
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Price (ETB) *</label>
                    <input type="number" value={addForm.price} onChange={(e) => setAddForm({ ...addForm, price: e.target.value })} required
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                    <input type="text" value={addForm.category} onChange={(e) => setAddForm({ ...addForm, category: e.target.value })}
                      placeholder="e.g. Fresh, Oriental"
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Volume</label>
                    <input type="text" value={addForm.volume} onChange={(e) => setAddForm({ ...addForm, volume: e.target.value })}
                      placeholder="e.g. 100ml"
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Image URL</label>
                    <input type="text" value={addForm.imageUrl} onChange={(e) => setAddForm({ ...addForm, imageUrl: e.target.value })}
                      placeholder="/images/perfumes/..."
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm" />
                  </div>
                  <div className="sm:col-span-2 lg:col-span-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                    <textarea value={addForm.description} onChange={(e) => setAddForm({ ...addForm, description: e.target.value })} rows={2}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm resize-none" />
                  </div>
                  <div className="sm:col-span-2 lg:col-span-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Fragrance Notes (comma separated)</label>
                    <input type="text" value={addForm.notes} onChange={(e) => setAddForm({ ...addForm, notes: e.target.value })}
                      placeholder="Bergamot, Vanilla, Musk"
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean text-sm" />
                  </div>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={addForm.inStock} onChange={(e) => setAddForm({ ...addForm, inStock: e.target.checked })}
                        className="w-4 h-4 text-ocean rounded" />
                      <span className="text-sm text-gray-700">In Stock</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={addForm.featured} onChange={(e) => setAddForm({ ...addForm, featured: e.target.checked })}
                        className="w-4 h-4 text-coral rounded" />
                      <span className="text-sm text-gray-700">Featured</span>
                    </label>
                  </div>
                  <div className="sm:col-span-2 lg:col-span-3 flex justify-end">
                    <button type="submit"
                      className="bg-ocean text-white px-8 py-3 rounded-xl text-sm font-semibold hover:bg-ocean/90 transition-all btn-press active:scale-[0.98]">
                      Create Product
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Products Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Product</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Category</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Price</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Volume</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Stock</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Featured</th>
                      <th className="text-right px-6 py-4 text-sm font-semibold text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {convexProducts === undefined ? (
                      <tr><td colSpan={7} className="text-center py-12"><div className="w-8 h-8 border-4 border-ocean border-t-transparent rounded-full animate-spin mx-auto" /></td></tr>
                    ) : convexProducts.length === 0 ? (
                      <tr><td colSpan={7} className="text-center py-12 text-gray-400">No products yet. Add your first product above.</td></tr>
                    ) : (
                      convexProducts.map((product) => (
                        <tr key={product._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-aqua/20 shrink-0">
                                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{product.name}</p>
                                {editingProduct === product._id ? (
                                  <input type="text" value={editPrices[product._id] || product.price.toString()}
                                    onChange={(e) => setEditPrices({ ...editPrices, [product._id]: e.target.value })}
                                    className="mt-1 w-24 px-2 py-1 text-xs border border-ocean rounded-lg focus:outline-none" />
                                ) : (
                                  <p className="text-xs text-gray-400">{product.slug}</p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                          <td className="px-6 py-4">
                            {savingPrice === product._id ? (
                              <span className="text-sm text-gray-400 italic">Saving...</span>
                            ) : editingProduct === product._id ? (
                              <div className="flex items-center gap-1">
                                <input type="number" value={editPrices[product._id] || product.price}
                                  onChange={(e) => setEditPrices({ ...editPrices, [product._id]: e.target.value })}
                                  className="w-20 px-2 py-1 text-sm border border-ocean rounded-lg focus:outline-none" />
                                <button onClick={() => { handleUpdatePrice(product._id); setEditingProduct(null); }}
                                  className="p-1 text-green-600 hover:text-green-700">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                </button>
                                <button onClick={() => setEditingProduct(null)} className="p-1 text-gray-400 hover:text-gray-600">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-900">{formatPrice(product.price)}</span>
                                <button onClick={() => { setEditingProduct(product._id); setEditPrices({ ...editPrices, [product._id]: product.price.toString() }); }}
                                  className="p-1 text-gray-400 hover:text-ocean transition-colors">
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                </button>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{product.volume || "-"}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleUpdateStock(product._id, !product.inStock)}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-all hover:scale-105 ${
                                product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}
                            >
                              {product.inStock ? "In Stock" : "Out of Stock"}
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleUpdateFeatured(product._id, !product.featured)}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-all hover:scale-105 ${
                                product.featured ? "bg-coral/20 text-[#a66e00]" : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {product.featured ? "Featured" : "Standard"}
                            </button>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => handleDeleteProduct(product._id)}
                              className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                              title="Delete product"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

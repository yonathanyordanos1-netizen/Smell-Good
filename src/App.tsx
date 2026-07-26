import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { CartProvider } from "./context/CartContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";

function ConvexWrapper({ children }: { children: React.ReactNode }) {
  const convexUrl = import.meta.env.VITE_CONVEX_URL as string | undefined;

  // Demo mode: if no Convex URL is configured, skip the provider
  if (!convexUrl) {
    return <>{children}</>;
  }

  try {
    const convex = new ConvexReactClient(convexUrl, {
      skipConvexDeploymentCheck: true,
    });
    return <ConvexProvider client={convex}>{children}</ConvexProvider>;
  } catch (e) {
    console.warn("Convex initialization failed, running in demo mode:", e);
    return <>{children}</>;
  }
}

function App() {
  return (
    <ConvexWrapper>
      <CartProvider>
        <Router>
          <Routes>
            {/* Pages with Navbar & Footer */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:slug" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </ConvexWrapper>
  );
}

export default App;

import { useParams, Link, useNavigate } from "react-router-dom";
import { useProduct, useProducts } from "../hooks/useProducts";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  const { product, isLoading } = useProduct(slug);
  const { products } = useProducts();

  if (isLoading && !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-ocean border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Link to="/shop" className="text-ocean hover:underline">
            &larr; Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(product.price);

  const handleAddToCart = () => {
    addItem({
      productId: (product._id || `static:${product.slug}`) as any,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      volume: product.volume,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-10">
          <Link to="/" className="hover:text-ocean transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-ocean transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-br from-aqua/30 to-white shadow-lg">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {!product.inStock && (
              <div className="absolute top-4 left-4 bg-ocean text-white px-4 py-2 rounded-full text-sm font-semibold">
                Out of Stock
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <p className="text-ocean font-semibold text-sm uppercase tracking-widest mb-2">
              {product.category}
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 font-['Playfair_Display'] mb-4">
              {product.name}
            </h1>
            {product.volume && (
              <p className="text-gray-400 text-sm mb-4">{product.volume}</p>
            )}

            <p className="text-3xl font-bold text-ocean mb-6">
              {formattedPrice}
            </p>

            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Fragrance Notes */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-900 mb-3">
                Fragrance Notes
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.notes.map((note) => (
                  <span
                    key={note}
                    className="px-4 py-2 bg-aqua/20 text-ocean rounded-full text-sm font-medium"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 min-w-[200px] px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                  addedToCart
                    ? "bg-green-500 text-white"
                    : product.inStock
                    ? "bg-ocean text-white hover:bg-ocean/90 shadow-lg hover:shadow-xl"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {addedToCart ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Added to Cart!
                  </span>
                ) : (
                  "Add to Cart"
                )}
              </button>
            </div>

            {/* Additional info */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-ocean" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-600">100% Authentic</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-ocean" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-sm text-gray-600">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-ocean" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-sm text-gray-600">Secure Checkout</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-ocean" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-sm text-gray-600">Free Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-16 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 font-['Playfair_Display'] mb-8">
              Related Fragrances
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rp) => (
                  <Link
                    key={rp.slug}
                    to={`/shop/${rp.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-aqua/30 to-white">
                      <img
                        src={rp.imageUrl}
                        alt={rp.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-900 group-hover:text-ocean transition-colors">
                        {rp.name}
                      </h3>
                      <p className="text-ocean font-bold mt-1">
                        {new Intl.NumberFormat("en-ET", { style: "currency", currency: "ETB", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(rp.price)}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

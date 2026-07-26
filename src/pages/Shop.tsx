import { useState } from "react";
import { Link } from "react-router-dom";
import { getAllCategories } from "../data/products";
import { useProducts } from "../hooks/useProducts";
import AnimatedSection from "../components/AnimatedSection";

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("default");
  const { products } = useProducts();

  const categories = ["All", ...getAllCategories(products)];

  let filtered = selectedCategory === "All"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  switch (sortBy) {
    case "price-asc":
      filtered = [...filtered].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered = [...filtered].sort((a, b) => b.price - a.price);
      break;
    case "name":
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <AnimatedSection animation="fade-up" duration={700}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 font-['Playfair_Display'] mb-4">
              Our Collection
            </h1>
            <p className="text-gray-500 text-lg max-w-xl">
              Explore our curated selection of premium perfumes. Each fragrance is a masterpiece waiting to be discovered.
            </p>
          </div>
        </AnimatedSection>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <AnimatedSection animation="fade-up" duration={500}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-ocean text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:border-ocean"
          >
            <option value="default">Sort by: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name: A-Z</option>
          </select>
        </div>
        </AnimatedSection>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, productIndex) => {
              const formattedPrice = new Intl.NumberFormat("en-ET", {
                style: "currency",
                currency: "ETB",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(product.price);

              return (
                <AnimatedSection key={product.slug} animation="fade-up" delay={productIndex * 50} duration={500} threshold={0.02}>
                  <Link
                    to={`/shop/${product.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-ocean/30 card-glow block"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-aqua/30 to-white">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {!product.inStock && (
                        <div className="absolute top-3 left-3 bg-ocean text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                          Out of Stock
                        </div>
                      )}
                    </div>
                    <div className="p-5 transition-all duration-300 group-hover:bg-ocean/[0.02]">
                      <p className="text-gray-400 text-xs uppercase tracking-widest mb-1 transition-colors duration-200 group-hover:text-ocean/60">{product.category}</p>
                      <h3 className="text-base font-semibold text-gray-900 group-hover:text-ocean transition-colors duration-200">
                        {product.name}
                      </h3>
                      {product.volume && <p className="text-gray-400 text-xs mt-1 transition-colors duration-200 group-hover:text-ocean/40">{product.volume}</p>}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 transition-all duration-300 group-hover:border-ocean/20">
                        <span className="text-lg font-bold text-ocean transition-transform duration-200 group-hover:scale-105 origin-left">{formattedPrice}</span>
                        <span className="text-xs font-medium transition-all duration-300 text-gray-400 group-hover:text-ocean group-hover:translate-x-1 inline-flex items-center gap-1">
                          View
                          <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

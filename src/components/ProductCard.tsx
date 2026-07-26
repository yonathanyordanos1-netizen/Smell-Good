import { Link } from "react-router-dom";
import type { Doc } from "convex/_generated/dataModel";

interface ProductCardProps {
  product: Doc<"products">;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <Link
      to={`/shop/${product.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-ocean/30 card-glow"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-aqua/30 to-white">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Quick view badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-ocean text-xs font-semibold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-3 group-hover:translate-y-0 shadow-lg">
          Quick View
        </div>

        {/* Out of stock badge */}
        {!product.inStock && (
          <div className="absolute top-3 left-3 bg-ocean text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            Out of Stock
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 transition-all duration-300 group-hover:bg-ocean/[0.02]">
        {product.category && (
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-1 transition-colors duration-200 group-hover:text-ocean/60">
            {product.category}
          </p>
        )}
        <h3 className="text-base font-semibold text-gray-900 group-hover:text-ocean transition-colors duration-200 line-clamp-1">
          {product.name}
        </h3>
        {product.volume && (
          <p className="text-gray-400 text-xs mt-1 transition-colors duration-200 group-hover:text-ocean/40">{product.volume}</p>
        )}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 transition-all duration-300 group-hover:border-ocean/20">
          <span className="text-lg font-bold text-ocean transition-transform duration-200 group-hover:scale-105 origin-left">
            {formattedPrice}
          </span>
          <span className="text-xs font-medium transition-all duration-300 text-gray-400 group-hover:text-ocean group-hover:translate-x-1 inline-flex items-center gap-1">
            Add to Cart
            <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

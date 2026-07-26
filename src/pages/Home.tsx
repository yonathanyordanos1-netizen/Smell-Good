import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import AnimatedSection from "../components/AnimatedSection";

export default function Home() {
  const { products } = useProducts();
  const featuredProducts = products.filter((p) => p.featured);
  // If static data fallback, use the original indexed image mapping
  const getImage = (index: number, p: typeof products[0]) => {
    return p.imageUrl;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-ocean via-[#0a1f3a] to-ocean overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: "-1.5s" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <AnimatedSection animation="fade-up" duration={800}>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-aqua/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/80 text-sm font-medium">New Collection Available</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white font-['Playfair_Display'] leading-tight mb-6">
                Smell Good
                <br />
                <span className="bg-gradient-to-r from-coral to-[#d48a00] bg-clip-text text-transparent">
                  Every Day
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-300 max-w-xl mb-10 leading-relaxed">
                Discover fresh, aquatic fragrances crafted for those who love clean and invigorating scents.
                Each scent is a breath of fresh air — find yours at Smell Good.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 bg-white text-ocean px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-100 hover:shadow-2xl hover:-translate-y-0.5 active:scale-[0.98] btn-press shadow-xl"
                >
                  Explore Collection
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5 active:scale-[0.98] btn-press"
                >
                  Our Story
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up" duration={700}>
            <div className="text-center mb-16">
              <p className="text-ocean font-semibold text-sm uppercase tracking-widest mb-3">
                Best Sellers
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 font-['Playfair_Display']">
                Fresh Fragrances
              </h2>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                Our most beloved scents, chosen by discerning customers around the world.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <AnimatedSection key={product.slug} animation="fade-up" delay={index * 100} duration={500} threshold={0.05}>
                <Link
                  to={`/shop/${product.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-ocean/30 card-glow block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-aqua/30 to-white">
                    <img
                      src={getImage(index, product)}
                      alt={product.name}
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-5 transition-all duration-300 group-hover:bg-ocean/[0.02]">
                    <p className="text-gray-400 text-xs uppercase tracking-widest mb-1 transition-colors duration-200 group-hover:text-ocean/60">{product.category}</p>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-ocean transition-colors duration-200">
                      {product.name}
                    </h3>
                    {product.volume && <p className="text-gray-400 text-sm mt-1 transition-colors duration-200 group-hover:text-ocean/40">{product.volume}</p>}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 transition-all duration-300 group-hover:border-ocean/20">
                      <span className="text-lg font-bold text-ocean transition-transform duration-200 group-hover:scale-105 origin-left">
                        {new Intl.NumberFormat("en-ET", { style: "currency", currency: "ETB", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(product.price)}
                      </span>
                      <span className="text-sm font-medium transition-all duration-300 text-gray-400 group-hover:text-ocean group-hover:translate-x-1 inline-flex items-center gap-1">
                        View
                        <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection animation="fade-up" delay={200}>
            <div className="text-center mt-12">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-ocean text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:bg-ocean/90 hover:-translate-y-0.5 active:scale-[0.98] btn-press shadow-lg hover:shadow-xl"
              >
                View All Products
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-aqua/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up" duration={700}>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-ocean font-['Playfair_Display']">
                Why Smell Good?
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Premium Quality",
                description: "Every fragrance is meticulously crafted using the finest ingredients sourced from around the world.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: "Authentic Scents",
                description: "We guarantee 100% authentic, long-lasting fragrances that capture the true essence of luxury.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
              },
              {
                title: "Fast Delivery",
                description: "Free delivery within Addis Ababa. We ensure your fragrance arrives safely and on time.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <AnimatedSection key={item.title} animation="fade-up" delay={index * 150} duration={500} threshold={0.1}>
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 card-glow border border-gray-100">
                  <div className="w-14 h-14 bg-ocean/10 rounded-xl flex items-center justify-center text-ocean mb-5 transition-all duration-300 group-hover:scale-110 hover:bg-ocean/20 hover:scale-110">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-ocean relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-white rounded-full blur-3xl" style={{ animationDelay: "-2s" }} />
        </div>
        <AnimatedSection animation="scale-in" duration={800}>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white font-['Playfair_Display'] mb-6">
              Ready to Find Your Signature Scent?
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
              Browse our complete collection and discover the fragrance that speaks to you.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-coral text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:bg-coral/90 hover:-translate-y-0.5 active:scale-[0.98] btn-press shadow-xl hover:shadow-2xl"
            >
              Shop Now
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}

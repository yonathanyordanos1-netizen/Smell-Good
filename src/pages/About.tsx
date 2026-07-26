import { Link } from "react-router-dom";
import AnimatedSection from "../components/AnimatedSection";

export default function About() {
  const stats = [
    { label: "Premium Fragrances", value: "18+" },
    { label: "Happy Customers", value: "500+" },
    { label: "Years Experience", value: "5+" },
    { label: "Cities Served", value: "10+" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-ocean via-[#0a1f3a] to-ocean text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-80 h-80 bg-white rounded-full blur-3xl animate-float" />
        </div>
        <AnimatedSection animation="fade-up" duration={800}>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl sm:text-6xl font-bold font-['Playfair_Display'] mb-6">
              Our Story
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Smell Good was born from a passion for fresh, aquatic fragrances. We believe that a fragrance
              is more than a scent — it's an expression of identity, a mood enhancer, and a daily dose of confidence.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Stats */}
      <AnimatedSection animation="fade-up" duration={600}>
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-4xl font-bold text-ocean font-['Playfair_Display']">{stat.value}</p>
                  <p className="text-gray-500 text-sm mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="fade-left" duration={700}>
              <div>
                <h2 className="text-4xl font-bold text-gray-900 font-['Playfair_Display'] mb-6">
                  Crafting Memories, One Scent at a Time
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    At Smell Good, we source the finest ingredients from around the globe to create fragrances
                    that refresh and invigorate. Our master perfumers blend aquatic freshness with citrus vibrancy,
                    ensuring each bottle is a breath of fresh air.
                  </p>
                  <p>
                    Based in Addis Ababa, Ethiopia, we are proud to bring world-class perfumery to East Africa.
                    Every fragrance is carefully curated to suit the unique tastes and preferences of our
                    discerning clientele.
                  </p>
                  <p>
                    Whether you're searching for a signature scent or a special gift, Smell Good offers an
                    experience that goes beyond fragrance. Welcome to a world of fresh elegance.
                  </p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-right" duration={700}>
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-aqua/30 to-ocean/5 flex items-center justify-center transition-all duration-500 hover:shadow-xl hover:shadow-ocean/20">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-ocean rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:scale-110 hover:rotate-3">
                      <span className="text-white font-bold font-['Playfair_Display'] text-5xl">S</span>
                    </div>
                    <p className="text-ocean font-['Playfair_Display'] text-2xl font-bold">Smell Good</p>
                    <p className="text-gray-400 text-sm mt-1">Since 2020</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-aqua/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up" duration={600}>
            <h2 className="text-4xl font-bold text-gray-900 font-['Playfair_Display'] text-center mb-16">
              What We Stand For
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality First",
                description: "We never compromise on quality. Every ingredient is carefully selected and tested to ensure the highest standards.",
              },
              {
                title: "Authenticity",
                description: "We guarantee 100% authentic fragrances. No imitations, no shortcuts — just pure, genuine luxury.",
              },
              {
                title: "Customer Love",
                description: "Our customers are family. We go above and beyond to ensure every interaction with Smell Good is exceptional.",
              },
            ].map((value, index) => (
              <AnimatedSection key={value.title} animation="fade-up" delay={index * 150} duration={500} threshold={0.1}>
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 card-glow border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <AnimatedSection animation="fade-up" duration={600}>
        <section className="py-20 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-900 font-['Playfair_Display'] mb-4">
              Experience the Smell Good Difference
            </h2>
            <p className="text-gray-500 mb-8">
              Visit our store or browse our collection online.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-ocean text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:bg-ocean/90 hover:-translate-y-0.5 active:scale-[0.98] btn-press shadow-lg hover:shadow-xl"
            >
              Browse Collection
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}

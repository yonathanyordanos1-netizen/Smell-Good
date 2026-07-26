import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  const { pathname } = useLocation();
  const [displayPathname, setDisplayPathname] = useState(pathname);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (pathname !== displayPathname) {
      setIsTransitioning(true);
      const timeout = setTimeout(() => {
        // Phase 1: Change the key so the new page mounts with opacity-0
        setDisplayPathname(pathname);
        // Phase 2: After mount, trigger the entrance animation
        requestAnimationFrame(() => {
          setIsTransitioning(false);
        });
      }, 250);
      return () => clearTimeout(timeout);
    }
  }, [pathname, displayPathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [displayPathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 overflow-hidden">
        <div
          key={displayPathname}
          className={`transition-all duration-300 ease-out ${
            isTransitioning
              ? "opacity-0 translate-y-4 scale-[0.98]"
              : "opacity-100 translate-y-0 scale-100"
          }`}
        >
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

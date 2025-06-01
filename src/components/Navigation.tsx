import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@kel/ui-components";

const navItems = [
  { href: "#home", label: "Home", symbol: "◉", code: "HOME", type: "hash" },
  { href: "#about", label: "About", symbol: "◈", code: "ABOUT", type: "hash" },
  {
    href: "#experience",
    label: "Experience",
    symbol: "◊",
    code: "EXP",
    type: "hash",
  },
  {
    href: "#projects",
    label: "Projects",
    symbol: "◆",
    code: "PROJ",
    type: "hash",
  },
  { href: "/blog", label: "Blog", symbol: "◇", code: "BLOG", type: "route" },
  {
    href: "#contact",
    label: "Contact",
    symbol: "◎",
    code: "CONTACT",
    type: "hash",
  },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100);

      if (location.pathname === "/") {
        const sections = navItems
          .filter((item) => item.type === "hash")
          .map((item) => item.href.slice(1));
        const current = sections.find((section) => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 150 && rect.bottom >= 150;
          }
          return false;
        });

        if (current) {
          setActiveSection(current);
        }
      } else if (location.pathname === "/blog") {
        setActiveSection("blog");
      }
    };

    if (location.pathname === "/blog") {
      setActiveSection("blog");
    } else {
      setActiveSection("home");
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavigation = (item: (typeof navItems)[0]) => {
    if (item.type === "hash") {
      if (location.pathname !== "/") {
        window.location.href = `/${item.href}`;
      } else {
        const element = document.getElementById(item.href.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
    setMobileMenuOpen(false);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent,
    item: (typeof navItems)[0]
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (item.type === "hash") {
        handleNavigation(item);
      }
    }
  };

  const isItemActive = (item: (typeof navItems)[0]) => {
    if (item.type === "route") {
      return location.pathname === item.href;
    } else {
      return activeSection === item.href.slice(1);
    }
  };

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2"
      >
        <div className="cyber-card rounded-none p-4 backdrop-blur-md">
          <div className="text-cyan-400 text-xs font-mono mb-4 tracking-wider">
            &gt; NAV_SYSTEM
          </div>
          {navItems.map((item) =>
            item.type === "route" ? (
              <Link
                key={item.href}
                to={item.href}
                aria-label={`Navigate to ${item.label} page`}
                aria-current={isItemActive(item) ? "page" : undefined}
                className={`group relative w-full mb-2 p-2 rounded-none transition-all duration-300 font-mono text-left block ${
                  isItemActive(item)
                    ? "bg-gradient-to-r from-cyan-400/20 to-purple-600/20 border-l-2 border-cyan-400 text-cyan-400"
                    : "hover:bg-cyan-400/10 hover:border-l-2 hover:border-cyan-400/50 text-cyan-100"
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-cyan-400" aria-hidden="true">
                    {item.symbol}
                  </span>
                  <span>{item.code}</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div
                  className="absolute right-full top-1/2 -translate-y-1/2 mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                  role="tooltip"
                  aria-hidden="true"
                >
                  <div className="cyber-card bg-black/90 text-cyan-400 text-xs px-3 py-1 rounded-none whitespace-nowrap font-mono">
                    &gt; {item.label.toUpperCase()}
                  </div>
                </div>
              </Link>
            ) : (
              <button
                key={item.href}
                onClick={() => handleNavigation(item)}
                onKeyDown={(event) => handleKeyDown(event, item)}
                aria-label={`Navigate to ${item.label} section`}
                aria-current={isItemActive(item) ? "page" : undefined}
                className={`group relative w-full mb-2 p-2 rounded-none transition-all duration-300 font-mono text-left ${
                  isItemActive(item)
                    ? "bg-gradient-to-r from-cyan-400/20 to-purple-600/20 border-l-2 border-cyan-400 text-cyan-400"
                    : "hover:bg-cyan-400/10 hover:border-l-2 hover:border-cyan-400/50 text-cyan-100"
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-cyan-400" aria-hidden="true">
                    {item.symbol}
                  </span>
                  <span>{item.code}</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div
                  className="absolute right-full top-1/2 -translate-y-1/2 mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                  role="tooltip"
                  aria-hidden="true"
                >
                  <div className="cyber-card bg-black/90 text-cyan-400 text-xs px-3 py-1 rounded-none whitespace-nowrap font-mono">
                    &gt; {item.label.toUpperCase()}
                  </div>
                </div>
              </button>
            )
          )}
        </div>
      </nav>

      <header
        className={`fixed top-0 w-full z-40 transition-all duration-500 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        role="banner"
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-md" />
        <div className="relative container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="cyber-card rounded-none px-4 py-2 font-mono">
              <span className="text-cyan-400 text-sm">&gt; </span>
              <span className="cyber-text text-lg sm:text-xl font-bold tracking-wider">
                RAQUEL.SOUSA
              </span>
              <span className="text-cyan-400 animate-pulse">_</span>
            </div>

            <nav
              className="hidden md:flex items-center gap-1 cyber-card rounded-none px-4 py-2"
              aria-label="Desktop navigation"
            >
              {navItems.map((item, index) =>
                item.type === "route" ? (
                  <Link
                    key={item.href}
                    to={item.href}
                    aria-label={`Navigate to ${item.label} page`}
                    aria-current={isItemActive(item) ? "page" : undefined}
                    className={`px-3 py-1 text-xs font-mono transition-all duration-300 ${
                      isItemActive(item)
                        ? "text-cyan-400 bg-cyan-400/20"
                        : "text-cyan-100 hover:text-cyan-400 hover:bg-cyan-400/10"
                    }`}
                  >
                    {item.code}
                    {index < navItems.length - 1 && (
                      <span
                        className="text-cyan-400/50 ml-2"
                        aria-hidden="true"
                      >
                        |
                      </span>
                    )}
                  </Link>
                ) : (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item)}
                    onKeyDown={(event) => handleKeyDown(event, item)}
                    aria-label={`Navigate to ${item.label} section`}
                    aria-current={isItemActive(item) ? "page" : undefined}
                    className={`px-3 py-1 text-xs font-mono transition-all duration-300 ${
                      isItemActive(item)
                        ? "text-cyan-400 bg-cyan-400/20"
                        : "text-cyan-100 hover:text-cyan-400 hover:bg-cyan-400/10"
                    }`}
                  >
                    {item.code}
                    {index < navItems.length - 1 && (
                      <span
                        className="text-cyan-400/50 ml-2"
                        aria-hidden="true"
                      >
                        |
                      </span>
                    )}
                  </button>
                )
              )}
            </nav>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden cyber-card border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 touch-target"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-b border-cyan-400/30">
            <nav
              className="container mx-auto px-4 py-4"
              aria-label="Mobile navigation"
            >
              <div className="space-y-2">
                {navItems.map((item) =>
                  item.type === "route" ? (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`block w-full text-left p-3 rounded-none font-mono transition-all duration-300 ${
                        isItemActive(item)
                          ? "bg-gradient-to-r from-cyan-400/20 to-purple-600/20 border-l-4 border-cyan-400 text-cyan-400"
                          : "text-cyan-100 hover:bg-cyan-400/10 hover:border-l-4 hover:border-cyan-400/50"
                      }`}
                      aria-label={`Navigate to ${item.label} page`}
                      aria-current={isItemActive(item) ? "page" : undefined}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-cyan-400" aria-hidden="true">
                          {item.symbol}
                        </span>
                        <span className="text-sm">{item.label}</span>
                      </div>
                    </Link>
                  ) : (
                    <button
                      key={item.href}
                      onClick={() => handleNavigation(item)}
                      className={`block w-full text-left p-3 rounded-none font-mono transition-all duration-300 ${
                        isItemActive(item)
                          ? "bg-gradient-to-r from-cyan-400/20 to-purple-600/20 border-l-4 border-cyan-400 text-cyan-400"
                          : "text-cyan-100 hover:bg-cyan-400/10 hover:border-l-4 hover:border-cyan-400/50"
                      }`}
                      aria-label={`Navigate to ${item.label} section`}
                      aria-current={isItemActive(item) ? "page" : undefined}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-cyan-400" aria-hidden="true">
                          {item.symbol}
                        </span>
                        <span className="text-sm">{item.label}</span>
                      </div>
                    </button>
                  )
                )}
              </div>
            </nav>
          </div>
        )}

        <div
          className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          aria-hidden="true"
        />
      </header>
    </>
  );
}

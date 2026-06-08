import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "kel-ui-components";

const navItems = [
  { href: "#home", label: "Home", symbol: "◉", code: "HOME", type: "hash" as const },
  { href: "#about", label: "About", symbol: "◈", code: "ABOUT", type: "hash" as const },
  { href: "#experience", label: "Experience", symbol: "◊", code: "EXP", type: "hash" as const },
  { href: "#projects", label: "Projects", symbol: "◆", code: "PROJ", type: "hash" as const },
  { href: "/blog", label: "Blog", symbol: "◇", code: "BLOG", type: "route" as const },
  { href: "#contact", label: "Contact", symbol: "◎", code: "CONTACT", type: "hash" as const },
];

function NavItem({ 
  item, 
  variant, 
  isActive, 
  onClick, 
  onKeyDown,
  isLast = false
}: { 
  item: typeof navItems[0]; 
  variant: "sidebar" | "top" | "mobile"; 
  isActive: boolean; 
  onClick: (item: typeof navItems[0]) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>, item: typeof navItems[0]) => void;
  isLast?: boolean;
}) {
  let containerClasses = "";
  let content = null;

  if (variant === "sidebar") {
    containerClasses = `flex items-center gap-3 w-full mb-1 px-3 py-2 rounded-none border-l-2 font-mono text-xs text-left transition-all duration-300 ${isActive ? "bg-gradient-to-r from-cyan-400/20 to-purple-600/20 border-cyan-400 text-cyan-400" : "border-transparent text-cyan-100 hover:bg-cyan-400/10 hover:border-cyan-400/50 hover:text-cyan-400"}`;
    content = (
      <>
        <span
          className="w-4 shrink-0 text-center text-sm leading-none text-cyan-400"
          aria-hidden="true"
        >
          {item.symbol}
        </span>
        <span className="tracking-wider whitespace-nowrap">
          {item.label.toUpperCase()}
        </span>
      </>
    );
  } else if (variant === "top") {
    containerClasses = `flex items-center px-3 py-1 text-xs font-mono transition-all duration-300 ${isActive ? "text-cyan-400 bg-cyan-400/20" : "text-cyan-100 hover:text-cyan-400 hover:bg-cyan-400/10"}`;
    content = (
      <>
        <span>{item.label.toUpperCase()}</span>
        {!isLast && <span className="text-cyan-400/50 ml-2" aria-hidden="true">|</span>}
      </>
    );
  } else if (variant === "mobile") {
    containerClasses = `block w-full text-left p-3 rounded-none font-mono transition-all duration-300 ${isActive ? "bg-gradient-to-r from-cyan-400/20 to-purple-600/20 border-l-4 border-cyan-400 text-cyan-400" : "text-cyan-100 hover:bg-cyan-400/10 hover:border-l-4 hover:border-cyan-400/50"}`;
    content = (
      <div className="flex items-center gap-3">
        <span className="text-cyan-400" aria-hidden="true">{item.symbol}</span>
        <span className="text-sm">{item.label}</span>
      </div>
    );
  }

  if (item.type === "route") {
    return (
      <Link
        to={item.href}
        aria-label={`Navigate to ${item.label} page`}
        aria-current={isActive ? "page" : undefined}
        className={containerClasses}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={() => onClick(item)}
      onKeyDown={(e) => onKeyDown(e, item)}
      aria-label={`Navigate to ${item.label} section`}
      aria-current={isActive ? "page" : undefined}
      className={containerClasses}
    >
      {content}
    </button>
  );
}

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
    event: React.KeyboardEvent<HTMLElement>,
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
        aria-label="Main navigation"
        className="fixed z-50 hidden lg:flex flex-col gap-2"
        style={{ right: '2rem', top: '50%', transform: 'translateY(-50%)' }}
      >
        <div className="cyber-card rounded-none p-4 backdrop-blur-md">
          <div className="text-cyan-400 text-xs font-mono mb-4 tracking-wider">
            &gt; NAV_SYSTEM
          </div>
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              variant="sidebar"
              isActive={isItemActive(item)}
              onClick={handleNavigation}
              onKeyDown={handleKeyDown}
            />
          ))}
        </div>
      </nav>

      <header
        className={`fixed top-0 w-full z-40 transition-all duration-500 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-md z-0" />
        <div className="relative z-10 container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="cyber-card rounded-none px-4 py-2 font-mono">
              <span className="text-cyan-400 text-sm">&gt; </span>
              <span className="cyber-text text-lg sm:text-xl font-bold tracking-wider">
                RAQUEL.SOUSA
              </span>
              <span className="text-cyan-400 animate-pulse">_</span>
            </div>

            <nav
              className="hidden lg:flex items-center gap-1 cyber-card rounded-none px-4 py-2"
              aria-label="Desktop navigation"
            >
              {navItems.map((item, index) => (
                <NavItem
                  key={item.href}
                  item={item}
                  variant="top"
                  isActive={isItemActive(item)}
                  onClick={handleNavigation}
                  onKeyDown={handleKeyDown}
                  isLast={index === navItems.length - 1}
                />
              ))}
            </nav>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden cyber-card border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 touch-target"
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

        <div
          className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        />
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-[72px] left-0 w-full bg-black/95 backdrop-blur-md border-b border-cyan-400/30 shadow-xl z-50">
          <nav
            className="container mx-auto px-4 py-4"
            aria-label="Mobile navigation"
          >
            <div className="space-y-2">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  item={item}
                  variant="mobile"
                  isActive={isItemActive(item)}
                  onClick={handleNavigation}
                  onKeyDown={handleKeyDown}
                />
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

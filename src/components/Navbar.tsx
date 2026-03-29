import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (view: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/?view=${view}`);
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🎈</span>
          <span className="font-extrabold text-lg text-foreground">
            Kinder<span className="text-primary">Scout</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="/?view=map" onClick={handleNavClick("map")} className="text-foreground hover:text-primary transition-colors">Explore</a>
          <button className="text-muted-foreground hover:text-foreground transition-colors">Categories</button>
          <a href="/?view=calendar" onClick={handleNavClick("calendar")} className="text-muted-foreground hover:text-foreground transition-colors">Calendar</a>
          <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Heart className="w-4 h-4" /> Saved
          </button>
          <button className="gradient-hero text-primary-foreground text-sm font-semibold px-5 py-2 rounded-xl hover:opacity-90 transition-opacity">
            Sign In
          </button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-b border-border px-4 py-4 space-y-3">
          <a href="/?view=map" onClick={handleNavClick("map")} className="block text-sm font-medium text-foreground">Explore</a>
          <button className="block text-sm text-muted-foreground w-full text-left">Categories</button>
          <a href="/?view=calendar" onClick={handleNavClick("calendar")} className="block text-sm text-muted-foreground">Calendar</a>
          <button className="flex items-center gap-1 text-sm text-muted-foreground">
            <Heart className="w-4 h-4" /> Saved
          </button>
          <button className="w-full gradient-hero text-primary-foreground text-sm font-semibold px-5 py-2 rounded-xl">
            Sign In
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

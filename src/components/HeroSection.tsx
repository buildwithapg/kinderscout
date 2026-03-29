import { Search, MapPin } from "lucide-react";
import { useState } from "react";
import heroBanner from "@/assets/hero-banner.jpg";

interface HeroSectionProps {
  onSearch: (query: string) => void;
  onLocationChange: (location: string) => void;
}

const HeroSection = ({ onSearch, onLocationChange }: HeroSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    if (location) onLocationChange(location);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Hero image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="Children enjoying activities"
          className="w-full h-full object-cover"
          width={1920}
          height={800}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-background" />
      </div>

      <div className="relative container mx-auto px-4 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-primary-foreground mb-4 animate-fade-in-up">
            Find Amazing Activities
            <span className="block text-secondary">For Your Kids</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Discover camps, classes, workshops and events tailored to your child's age and interests.
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl shadow-card-hover p-2 flex flex-col sm:flex-row gap-2 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center gap-2 flex-1 bg-muted rounded-xl px-4 py-3">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search activities, camps, classes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
              />
            </div>
            <div className="flex items-center gap-2 flex-1 bg-muted rounded-xl px-4 py-3">
              <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="City or ZIP code"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
              />
            </div>
            <button
              type="submit"
              className="gradient-hero text-primary-foreground font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity text-sm"
            >
              Explore
            </button>
          </form>

          {/* Quick suggestions */}
          <div className="flex flex-wrap justify-center gap-2 mt-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            {["Weekend activities", "Free events near me", "STEM classes", "Outdoor adventures"].map((s) => (
              <button
                key={s}
                onClick={() => { setSearchQuery(s); onSearch(s); }}
                className="text-xs bg-primary-foreground/20 text-primary-foreground backdrop-blur-sm px-3 py-1.5 rounded-full hover:bg-primary-foreground/30 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

import { useState, useMemo, useEffect, useRef } from "react";
import { LayoutGrid, List, MapIcon, CalendarDays } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FilterBar from "@/components/FilterBar";
import EventCard from "@/components/EventCard";
import MapView from "@/components/MapView";
import CalendarView from "@/components/CalendarView";
import { AgeGroup, Interest, ActivityType } from "@/data/mockEvents";
import { useEvents } from "@/hooks/useEvents";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { data: events = [], isLoading } = useEvents();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<AgeGroup[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([]);
  const [selectedActivityType, setSelectedActivityType] = useState<ActivityType | null>(null);
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map" | "calendar">("grid");
  const activitiesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const view = searchParams.get("view");
    if (view === "map" || view === "calendar") {
      setViewMode(view);
      searchParams.delete("view");
      setSearchParams(searchParams, { replace: true });
      setTimeout(() => {
        activitiesRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [searchParams, setSearchParams]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          event.title.toLowerCase().includes(q) ||
          event.description.toLowerCase().includes(q) ||
          event.tags.some((t) => t.toLowerCase().includes(q)) ||
          event.location.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      // Age group filter
      if (selectedAgeGroups.length > 0) {
        if (!event.ageGroups.some((ag) => selectedAgeGroups.includes(ag))) return false;
      }

      // Interest filter
      if (selectedInterests.length > 0) {
        if (!event.tags.some((t) => selectedInterests.includes(t as Interest))) return false;
      }

      // Activity type filter
      if (selectedActivityType && event.activityType !== selectedActivityType) return false;

      // Free only filter
      if (showFreeOnly && !event.isFree) return false;

      return true;
    });
  }, [events, searchQuery, selectedAgeGroups, selectedInterests, selectedActivityType, showFreeOnly]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <HeroSection onSearch={setSearchQuery} onLocationChange={setLocation} />

      {/* Main content */}
      <section ref={activitiesRef} className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              {searchQuery ? `Results for "${searchQuery}"` : "Discover Activities"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {filteredEvents.length} activit{filteredEvents.length === 1 ? "y" : "ies"} found
              {location && ` near ${location}`}
            </p>
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-colors ${viewMode === "grid" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-colors ${viewMode === "list" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`p-2 rounded-md transition-colors ${viewMode === "map" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}
            >
              <MapIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`p-2 rounded-md transition-colors ${viewMode === "calendar" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}
            >
              <CalendarDays className="w-4 h-4" />
            </button>
          </div>
        </div>

        <FilterBar
          selectedAgeGroups={selectedAgeGroups}
          selectedInterests={selectedInterests}
          selectedActivityType={selectedActivityType}
          showFreeOnly={showFreeOnly}
          onAgeGroupChange={setSelectedAgeGroups}
          onInterestsChange={setSelectedInterests}
          onActivityTypeChange={setSelectedActivityType}
          onFreeOnlyChange={setShowFreeOnly}
        />

        {/* Events grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-2xl" />
            ))}
          </div>
        ) : viewMode === "map" ? (
          <MapView events={filteredEvents} />
        ) : viewMode === "calendar" ? (
          <CalendarView events={filteredEvents} />
        ) : filteredEvents.length > 0 ? (
          <div className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              : "flex flex-col gap-4"
          }>
            {filteredEvents.map((event, i) => (
              <div key={event.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <EventCard event={event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="text-5xl mb-4 block">🔍</span>
            <h3 className="text-lg font-bold text-foreground mb-1">No activities found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            🎈 <span className="font-semibold text-foreground">KinderScout</span> — Helping parents discover amazing activities for their kids.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

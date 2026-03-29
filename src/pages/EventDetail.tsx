import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin, Star, Tag, Users, Heart, ExternalLink } from "lucide-react";
import { mockEvents } from "@/data/mockEvents";
import Navbar from "@/components/Navbar";

const tagColors: Record<string, string> = {
  Sports: "bg-teal-light text-teal",
  Arts: "bg-lavender-light text-lavender",
  STEM: "bg-coral-light text-coral",
  Music: "bg-sunshine-light text-sunshine",
  Dance: "bg-rose-light text-rose",
  "Outdoor Adventures": "bg-teal-light text-teal",
  Creative: "bg-lavender-light text-lavender",
  Cooking: "bg-sunshine-light text-sunshine",
};

const EventDetail = () => {
  const { id } = useParams();
  const event = mockEvents.find((e) => e.id === id);

  if (!event) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Event not found</h2>
            <Link to="/" className="text-primary hover:underline text-sm">← Back to explore</Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-16">
        {/* Hero */}
        <div className="h-64 md:h-80 bg-gradient-to-br from-coral-light via-sunshine-light to-teal-light flex items-center justify-center">
          <span className="text-7xl">
            {event.tags[0] === "Sports" ? "⚽" :
             event.tags[0] === "Arts" ? "🎨" :
             event.tags[0] === "STEM" ? "🔬" :
             event.tags[0] === "Music" ? "🎵" :
             event.tags[0] === "Dance" ? "💃" :
             event.tags[0] === "Outdoor Adventures" ? "🌲" :
             event.tags[0] === "Cooking" ? "👨‍🍳" : "🎯"}
          </span>
        </div>

        <div className="container mx-auto px-4 -mt-8 relative z-10 pb-16">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to explore
            </Link>

            <div className="bg-card rounded-2xl shadow-card p-6 md:p-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {event.tags.map((tag) => (
                  <span key={tag} className={`text-xs font-semibold px-3 py-1 rounded-full ${tagColors[tag] || "bg-muted text-muted-foreground"}`}>
                    {tag}
                  </span>
                ))}
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground">
                  {event.activityType}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">{event.title}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 fill-sunshine text-sunshine" />
                <span className="text-sm font-semibold text-foreground">{event.rating}</span>
                <span className="text-sm text-muted-foreground">({event.reviewCount} reviews)</span>
                <span className={`ml-auto text-lg font-bold ${event.isFree ? "text-accent" : "text-foreground"}`}>
                  {event.isFree ? "FREE" : `$${event.price}`}
                </span>
              </div>

              {/* Meta details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 p-4 bg-muted rounded-xl">
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="w-4 h-4 text-primary" />
                  <span className="text-foreground">{event.ageSuitability}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-foreground">{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-foreground">
                    {new Date(event.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-foreground">{event.time}</span>
                </div>
              </div>

              {/* Full description */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-foreground mb-2">About This Activity</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{event.fullDescription}</p>
              </div>

              {/* Address */}
              <div className="mb-6 p-4 bg-muted rounded-xl">
                <h3 className="text-sm font-bold text-foreground mb-1">📍 Location & Directions</h3>
                <p className="text-sm text-muted-foreground">{event.address}</p>
              </div>

              {/* Organizer */}
              <div className="mb-6 p-4 bg-muted rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-bold text-foreground">Organized by {event.organizer}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{event.organizerDesc}</p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 gradient-hero text-primary-foreground font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" /> Register Now
                </button>
                <button className="flex items-center justify-center gap-2 border border-border text-foreground font-semibold py-3 px-6 rounded-xl hover:bg-muted transition-colors">
                  <Heart className="w-4 h-4" /> Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetail;

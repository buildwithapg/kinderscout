import { Calendar, MapPin, Star, Clock, Tag } from "lucide-react";
import { Event } from "@/data/mockEvents";
import { Link } from "react-router-dom";

interface EventCardProps {
  event: Event;
}

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

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Link
      to={`/event/${event.id}`}
      className="group bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Image placeholder with gradient */}
      <div className="relative h-44 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-coral-light via-sunshine-light to-teal-light flex items-center justify-center">
          <span className="text-4xl">
            {event.tags[0] === "Sports" ? "⚽" :
             event.tags[0] === "Arts" ? "🎨" :
             event.tags[0] === "STEM" ? "🔬" :
             event.tags[0] === "Music" ? "🎵" :
             event.tags[0] === "Dance" ? "💃" :
             event.tags[0] === "Outdoor Adventures" ? "🌲" :
             event.tags[0] === "Cooking" ? "👨‍🍳" : "🎯"}
          </span>
        </div>
        {/* Price badge */}
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            event.isFree ? "bg-accent text-accent-foreground" : "bg-card text-foreground"
          }`}>
            {event.isFree ? "FREE" : `$${event.price}`}
          </span>
        </div>
        {/* Activity type badge */}
        <div className="absolute top-3 left-3">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-card/80 backdrop-blur-sm text-foreground">
            {event.activityType}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {event.tags.map((tag) => (
            <span key={tag} className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${tagColors[tag] || "bg-muted text-muted-foreground"}`}>
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-bold text-foreground text-base mb-1 group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2 flex-1">
          {event.description}
        </p>

        {/* Meta info */}
        <div className="space-y-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-primary" />
            <span>{event.ageSuitability}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>{new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
            <Clock className="w-3.5 h-3.5 text-primary ml-2" />
            <span>{event.time}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-3 pt-3 border-t border-border">
          <Star className="w-3.5 h-3.5 fill-sunshine text-sunshine" />
          <span className="text-xs font-semibold text-foreground">{event.rating}</span>
          <span className="text-xs text-muted-foreground">({event.reviewCount} reviews)</span>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;

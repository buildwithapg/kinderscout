import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { Event } from "@/data/mockEvents";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Star, Tag } from "lucide-react";
import "leaflet/dist/leaflet.css";

interface MapViewProps {
  events: Event[];
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

const defaultIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapView = ({ events }: MapViewProps) => {
  const center = events.length > 0
    ? { lat: events.reduce((s, e) => s + e.lat, 0) / events.length, lng: events.reduce((s, e) => s + e.lng, 0) / events.length }
    : { lat: 37.7749, lng: -122.4194 };

  return (
    <div className="rounded-2xl overflow-hidden border border-border shadow-card" style={{ height: "500px" }}>
      <MapContainer center={[center.lat, center.lng]} zoom={11} style={{ height: "100%", width: "100%" }} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {events.map((event) => (
          <Marker key={event.id} position={[event.lat, event.lng]} icon={defaultIcon}>
            <Popup maxWidth={280} minWidth={220}>
              <div className="p-1">
                <div className="flex flex-wrap gap-1 mb-1.5">
                  {event.tags.map((tag) => (
                    <span key={tag} className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${tagColors[tag] || "bg-muted text-muted-foreground"}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-bold text-sm text-foreground mb-1">{event.title}</h3>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{event.description}</p>
                <div className="space-y-1 text-xs text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Tag className="w-3 h-3 text-primary" />
                    <span>{event.ageSuitability}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-primary" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-primary" />
                    <span>{new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-sunshine text-sunshine" />
                    <span className="text-xs font-semibold">{event.rating}</span>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${event.isFree ? "bg-accent text-accent-foreground" : "bg-muted text-foreground"}`}>
                    {event.isFree ? "FREE" : `$${event.price}`}
                  </span>
                </div>
                <Link to={`/event/${event.id}`} className="block mt-2 text-center text-xs font-semibold text-primary hover:underline">
                  View Details →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;

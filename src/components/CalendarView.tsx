import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, MapPin, Clock, Star } from "lucide-react";
import { Event } from "@/data/mockEvents";
import { Link } from "react-router-dom";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  addWeeks,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";

interface CalendarViewProps {
  events: Event[];
}

type CalendarMode = "month" | "week";

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

const dotColors: Record<string, string> = {
  Sports: "bg-teal",
  Arts: "bg-lavender",
  STEM: "bg-coral",
  Music: "bg-sunshine",
  Dance: "bg-rose",
  "Outdoor Adventures": "bg-teal",
  Creative: "bg-lavender",
  Cooking: "bg-sunshine",
};

const CalendarView = ({ events }: CalendarViewProps) => {
  const [currentDate, setCurrentDate] = useState(new Date("2026-04-01"));
  const [mode, setMode] = useState<CalendarMode>("month");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, Event[]>();
    events.forEach((event) => {
      const key = format(new Date(event.date), "yyyy-MM-dd");
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(event);
    });
    return map;
  }, [events]);

  const calendarDays = useMemo(() => {
    if (mode === "month") {
      const monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(currentDate);
      const start = startOfWeek(monthStart);
      const end = endOfWeek(monthEnd);
      const days: Date[] = [];
      let day = start;
      while (day <= end) {
        days.push(day);
        day = addDays(day, 1);
      }
      return days;
    } else {
      const weekStart = startOfWeek(currentDate);
      const days: Date[] = [];
      for (let i = 0; i < 7; i++) {
        days.push(addDays(weekStart, i));
      }
      return days;
    }
  }, [currentDate, mode]);

  const navigate = (direction: number) => {
    setCurrentDate((prev) =>
      mode === "month" ? addMonths(prev, direction) : addWeeks(prev, direction)
    );
    setSelectedDate(null);
  };

  const selectedEvents = selectedDate
    ? eventsByDate.get(format(selectedDate, "yyyy-MM-dd")) || []
    : [];

  return (
    <div className="space-y-4">
      {/* Calendar header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-foreground"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="text-lg font-bold text-foreground min-w-[180px] text-center">
            {mode === "month"
              ? format(currentDate, "MMMM yyyy")
              : `Week of ${format(startOfWeek(currentDate), "MMM d")} – ${format(endOfWeek(currentDate), "MMM d, yyyy")}`}
          </h3>
          <button
            onClick={() => navigate(1)}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-foreground"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mode toggle */}
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          <button
            onClick={() => setMode("week")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              mode === "week" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setMode("month")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              mode === "month" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
            }`}
          >
            Month
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className={`grid grid-cols-7 gap-1 ${mode === "week" ? "min-h-[120px]" : ""}`}>
        {calendarDays.map((day) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const dayEvents = eventsByDate.get(dateKey) || [];
          const isCurrentMonth = mode === "month" ? isSameMonth(day, currentDate) : true;
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const hasEvents = dayEvents.length > 0;

          return (
            <button
              key={dateKey}
              onClick={() => setSelectedDate(isSelected ? null : day)}
              className={`relative p-2 rounded-xl text-left transition-all min-h-[72px] ${
                mode === "week" ? "min-h-[100px]" : ""
              } ${
                isSelected
                  ? "bg-primary/10 ring-2 ring-primary"
                  : hasEvents
                  ? "bg-card hover:bg-muted/80 shadow-sm"
                  : "hover:bg-muted/50"
              } ${!isCurrentMonth ? "opacity-30" : ""}`}
            >
              <span
                className={`text-sm font-medium ${
                  isToday(day)
                    ? "bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center"
                    : "text-foreground"
                }`}
              >
                {format(day, "d")}
              </span>

              {/* Event dots / mini labels */}
              {dayEvents.length > 0 && (
                <div className="mt-1 space-y-0.5">
                  {dayEvents.slice(0, mode === "week" ? 3 : 2).map((ev) => (
                    <div
                      key={ev.id}
                      className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-md truncate ${
                        tagColors[ev.tags[0]] || "bg-muted text-muted-foreground"
                      }`}
                    >
                      {ev.title}
                    </div>
                  ))}
                  {dayEvents.length > (mode === "week" ? 3 : 2) && (
                    <span className="text-[9px] text-muted-foreground font-medium">
                      +{dayEvents.length - (mode === "week" ? 3 : 2)} more
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected date detail panel */}
      {selectedDate && (
        <div className="bg-card rounded-2xl border border-border p-5 shadow-card animate-fade-in-up">
          <h4 className="font-bold text-foreground mb-3">
            {format(selectedDate, "EEEE, MMMM d, yyyy")}
          </h4>
          {selectedEvents.length > 0 ? (
            <div className="space-y-3">
              {selectedEvents.map((event) => (
                <Link
                  key={event.id}
                  to={`/event/${event.id}`}
                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                      tagColors[event.tags[0]] || "bg-muted"
                    }`}
                  >
                    {event.tags[0] === "Sports"
                      ? "⚽"
                      : event.tags[0] === "Arts"
                      ? "🎨"
                      : event.tags[0] === "STEM"
                      ? "🔬"
                      : event.tags[0] === "Music"
                      ? "🎵"
                      : event.tags[0] === "Dance"
                      ? "💃"
                      : event.tags[0] === "Outdoor Adventures"
                      ? "🌲"
                      : event.tags[0] === "Cooking"
                      ? "👨‍🍳"
                      : "🎯"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                      {event.title}
                    </h5>
                    <p className="text-xs text-muted-foreground line-clamp-1 mb-1.5">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-primary" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-primary" />
                        {event.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-sunshine text-sunshine" />
                        {event.rating}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${
                      event.isFree ? "bg-accent text-accent-foreground" : "bg-muted text-foreground"
                    }`}
                  >
                    {event.isFree ? "FREE" : `$${event.price}`}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No activities on this day.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarView;

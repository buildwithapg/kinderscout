import { useState } from "react";
import { Filter, X } from "lucide-react";
import { AgeGroup, AGE_GROUP_LABELS, Interest, INTERESTS, ActivityType } from "@/data/mockEvents";

interface FilterBarProps {
  selectedAgeGroups: AgeGroup[];
  selectedInterests: Interest[];
  selectedActivityType: ActivityType | null;
  showFreeOnly: boolean;
  onAgeGroupChange: (groups: AgeGroup[]) => void;
  onInterestsChange: (interests: Interest[]) => void;
  onActivityTypeChange: (type: ActivityType | null) => void;
  onFreeOnlyChange: (free: boolean) => void;
}

const FilterBar = ({
  selectedAgeGroups,
  selectedInterests,
  selectedActivityType,
  showFreeOnly,
  onAgeGroupChange,
  onInterestsChange,
  onActivityTypeChange,
  onFreeOnlyChange,
}: FilterBarProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleAgeGroup = (group: AgeGroup) => {
    onAgeGroupChange(
      selectedAgeGroups.includes(group)
        ? selectedAgeGroups.filter((g) => g !== group)
        : [...selectedAgeGroups, group]
    );
  };

  const toggleInterest = (interest: Interest) => {
    onInterestsChange(
      selectedInterests.includes(interest)
        ? selectedInterests.filter((i) => i !== interest)
        : [...selectedInterests, interest]
    );
  };

  const activeFilterCount =
    selectedAgeGroups.length +
    selectedInterests.length +
    (selectedActivityType ? 1 : 0) +
    (showFreeOnly ? 1 : 0);

  const clearAll = () => {
    onAgeGroupChange([]);
    onInterestsChange([]);
    onActivityTypeChange(null);
    onFreeOnlyChange(false);
  };

  const interestColors: Record<Interest, string> = {
    Sports: "bg-teal-light text-teal",
    Arts: "bg-lavender-light text-lavender",
    STEM: "bg-coral-light text-coral",
    Music: "bg-sunshine-light text-sunshine",
    Dance: "bg-rose-light text-rose",
    "Outdoor Adventures": "bg-teal-light text-teal",
    Creative: "bg-lavender-light text-lavender",
    Cooking: "bg-sunshine-light text-sunshine",
  };

  return (
    <div className="bg-card rounded-2xl shadow-card p-4 mb-6">
      {/* Toggle row */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm font-semibold text-foreground"
        >
          <Filter className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>
        {activeFilterCount > 0 && (
          <button onClick={clearAll} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
            <X className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>

      {/* Expanded filters */}
      {expanded && (
        <div className="mt-4 space-y-4">
          {/* Age Groups */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Age Group</h4>
            <div className="flex flex-wrap gap-2">
              {(Object.entries(AGE_GROUP_LABELS) as [AgeGroup, string][]).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => toggleAgeGroup(key)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    selectedAgeGroups.includes(key)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-muted-foreground border-transparent hover:border-border"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Interests</h4>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    selectedInterests.includes(interest)
                      ? "bg-primary text-primary-foreground border-primary"
                      : `${interestColors[interest]} border-transparent hover:opacity-80`
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Activity Type */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Activity Type</h4>
            <div className="flex flex-wrap gap-2">
              {(["Indoor", "Outdoor", "Hybrid"] as ActivityType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => onActivityTypeChange(selectedActivityType === type ? null : type)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    selectedActivityType === type
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-muted-foreground border-transparent hover:border-border"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Free only */}
          <div>
            <button
              onClick={() => onFreeOnlyChange(!showFreeOnly)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                showFreeOnly
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-muted text-muted-foreground border-transparent hover:border-border"
              }`}
            >
              🎉 Free events only
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;

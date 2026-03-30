import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Event, mapDbEvent } from "@/data/mockEvents";

export function useEvents() {
  return useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) throw error;
      return (data ?? []).map(mapDbEvent);
    },
  });
}

export function useEvent(id: string | undefined) {
  return useQuery<Event | null>({
    queryKey: ["event", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id!)
        .maybeSingle();

      if (error) throw error;
      return data ? mapDbEvent(data) : null;
    },
  });
}

import { create } from "zustand";

interface Activity {
  type: string;
  title: string;
  description: string;
  course: string;
  date: string;
}

interface ActivityState {
  activities: Activity[];
  setActivities: (activities: Activity[]) => void;
}

export const useActivityStore = create<ActivityState>((set) => ({
  activities: [],
  setActivities: (activities: Activity[]) => set({ activities }),
}));

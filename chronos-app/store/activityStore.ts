import { create } from "zustand";

interface Activity {
  courseId: string;
  activityType: string;
  date: string;
  time: string;
  description: string;
  courseName: string;
}

interface ActivityState {
  activities: Activity[];
  setActivities: (activities: Activity[]) => void;
}

export const useActivityStore = create<ActivityState>((set) => ({
  activities: [],
  setActivities: (activities: Activity[]) => set({ activities }),
}));

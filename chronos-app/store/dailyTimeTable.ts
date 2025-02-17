import { create } from "zustand";

interface TimetableItem {
  courseId: string;
  courseName: string;
  slotNo: number;
}

interface TimetableState {
  timetable: TimetableItem[]; 
  setTimetable: (timetable: TimetableItem[]) => void; 
}

export const useTimetableStore = create<TimetableState>((set) => ({
  timetable: [],
  setTimetable: (timetable: TimetableItem[]) => set({ timetable }), 
}));

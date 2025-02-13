import { timetable } from "../functions/_shared/schema.ts";

export default async function seedTimetable(db: any) {
  await db.insert(timetable).values([
    { id: "1", day: "Monday", slotNum: 1, startTime: "09:00:00", endTime: "10:30:00", courseId: "23CSE211", roomNo: "A101" },
    { id: "2", day: "Tuesday", slotNum: 2, startTime: "11:00:00", endTime: "12:30:00", courseId: "23CSE214", roomNo: "A103" },
    { id: "3", day: "Wednesday", slotNum: 3, startTime: "13:00:00", endTime: "14:30:00", courseId: "23CSE213", roomNo: "B303" },
    { id: "4", day: "Thursday", slotNum: 1, startTime: "10:30:00", endTime: "12:00:00", courseId: "23MAT216", roomNo: "B201" },
    { id: "5", day: "Friday", slotNum: 2, startTime: "14:00:00", endTime: "15:30:00", courseId: "22ADM201", roomNo: "C104" },
    { id: "6", day: "Saturday", slotNum: 3, startTime: "16:00:00", endTime: "17:30:00", courseId: "23CSE212", roomNo: "A101" },
    { id: "7", day: "Monday", slotNum: 1, startTime: "09:30:00", endTime: "11:00:00", courseId: "23CSE214", roomNo: "A103" },
    { id: "8", day: "Tuesday", slotNum: 2, startTime: "12:30:00", endTime: "14:00:00", courseId: "23CSE211", roomNo: "A101" },
    { id: "9", day: "Wednesday", slotNum: 3, startTime: "15:00:00", endTime: "16:30:00", courseId: "23MAT216", roomNo: "B201" },
    { id: "10", day: "Thursday", slotNum: 1, startTime: "09:00:00", endTime: "10:30:00", courseId: "23CSE213", roomNo: "B303" },
    { id: "11", day: "Friday", slotNum: 2, startTime: "11:30:00", endTime: "13:00:00", courseId: "22ADM201", roomNo: "C104" },
    { id: "12", day: "Saturday", slotNum: 3, startTime: "14:30:00", endTime: "16:00:00", courseId: "23CSE212", roomNo: "A101" },
  ]);
  console.log("Timetable seeded.");
}

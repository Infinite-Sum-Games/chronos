import { timetable } from "../functions/_shared/schema.ts";

export default async function seedTimetable(db: any) {
  await db.insert(timetable).values([
    { day: "Monday", slotNum: 1, courseId: "23CSE211", roomNo: "A101" },
    { day: "Tuesday", slotNum: 2, courseId: "23CSE214", roomNo: "A103" },
    { day: "Wednesday", slotNum: 3, courseId: "23CSE213", roomNo: "B303" },
    { day: "Thursday", slotNum: 1, courseId: "23MAT216", roomNo: "B201" },
    { day: "Friday", slotNum: 2, courseId: "22ADM201", roomNo: "C104" },
    { day: "Saturday", slotNum: 3, courseId: "23CSE212", roomNo: "A101" },
    { day: "Monday", slotNum: 1, courseId: "23CSE214", roomNo: "A103" },
    { day: "Tuesday", slotNum: 2, courseId: "23CSE211", roomNo: "A101" },
    { day: "Wednesday", slotNum: 3, courseId: "23MAT216", roomNo: "B201" },
    { day: "Thursday", slotNum: 1, courseId: "23CSE213", roomNo: "B303" },
    { day: "Friday", slotNum: 2, courseId: "22ADM201", roomNo: "C104" },
    { day: "Saturday", slotNum: 3, courseId: "23CSE212", roomNo: "A101" },
  ]);
  console.log("Timetable seeded.");
}

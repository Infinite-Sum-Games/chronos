import { slots } from "../functions/_shared/schema.ts";

export default async function seedSlots(db: any) {
  await db.insert(slots).values([
    { date: "2025-02-20", day: "Thursday", slotNum: 1, courseId: "23CSE211", roomNo: "A101" },
    { date: "2025-02-21", day: "Friday", slotNum: 2, courseId: "23CSE214", roomNo: "A103" },
    { date: "2025-02-22", day: "Saturday", slotNum: 3, courseId: "23CSE212", roomNo: "A101" },
    { date: "2025-02-23", day: "Monday", slotNum: 1, courseId: "23MAT216", roomNo: "B201" },
    { date: "2025-02-24", day: "Tuesday", slotNum: 2, courseId: "22ADM201", roomNo: "C104" },
    { date: "2025-02-25", day: "Wednesday", slotNum: 3, courseId: "23CSE213", roomNo: "B303" },
    { date: "2025-02-26", day: "Thursday", slotNum: 1, courseId: "23CSE211", roomNo: "A101" },
    { date: "2025-02-27", day: "Friday", slotNum: 2, courseId: "23CSE214", roomNo: "A103" },
    { date: "2025-02-28", day: "Saturday", slotNum: 3, courseId: "23CSE212", roomNo: "A101" },
    { date: "2025-03-01", day: "Monday", slotNum: 1, courseId: "23MAT216", roomNo: "B201" },
    { date: "2025-03-02", day: "Tuesday", slotNum: 2, courseId: "22ADM201", roomNo: "C104" },
    { date: "2025-03-03", day: "Wednesday", slotNum: 3, courseId: "23CSE213", roomNo: "B303" },
  ]);
  console.log("Slots seeded.");
}

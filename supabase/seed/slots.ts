import { slots } from "../functions/_shared/schema.ts";
import { v4 as uuidv4 } from "uuid";

export default async function seedSlots(db: any) {
  await db.insert(slots).values([
    { id: uuidv4(), date: "2025-02-20", slotNum: 1, courseId: "23CSE211", roomNo: "A101" },
    { id: uuidv4(), date: "2025-02-21", slotNum: 2, courseId: "23CSE214", roomNo: "A103" },
    { id: uuidv4(), date: "2025-02-22", slotNum: 3, courseId: "23CSE212", roomNo: "A101" },
    { id: uuidv4(), date: "2025-02-23", slotNum: 1, courseId: "23MAT216", roomNo: "B201" },
    { id: uuidv4(), date: "2025-02-24", slotNum: 2, courseId: "22ADM201", roomNo: "C104" },
    { id: uuidv4(), date: "2025-02-25", slotNum: 3, courseId: "23CSE213", roomNo: "B303" },
    { id: uuidv4(), date: "2025-02-26", slotNum: 1, courseId: "23CSE211", roomNo: "A101" },
    { id: uuidv4(), date: "2025-02-27", slotNum: 2, courseId: "23CSE214", roomNo: "A103" },
    { id: uuidv4(), date: "2025-02-28", slotNum: 3, courseId: "23CSE212", roomNo: "A101" },
    { id: uuidv4(), date: "2025-03-01", slotNum: 1, courseId: "23MAT216", roomNo: "B201" },
    { id: uuidv4(), date: "2025-03-02", slotNum: 2, courseId: "22ADM201", roomNo: "C104" },
    { id: uuidv4(), date: "2025-03-03", slotNum: 3, courseId: "23CSE213", roomNo: "B303" },
  ]);
  console.log("Slots seeded.");
}

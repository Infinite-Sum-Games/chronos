import { activity } from "../functions/_shared/schema.ts";
import { v4 as uuidv4 } from "uuid";

export default async function seedActivities(db: any) {
  await db.insert(activity).values([
    { id: uuidv4(), date: "2025-02-25", time: "10:00:00", actitvityType: "EXAM", courseId: "23CSE214", description: "Midterm Exam" },
    { id: uuidv4(), date: "2025-02-26", time: "14:00:00", actitvityType: "TUTORIAL", courseId: "23CSE211", description: "Tutorial Session" },
    { id: uuidv4(), date: "2025-02-27", time: "16:00:00", actitvityType: "ASSIGNMENT", courseId: "23CSE212", description: "Assignment 1 Due" },
    { id: uuidv4(), date: "2025-03-01", time: "09:00:00", actitvityType: "EXAM", courseId: "23MAT216", description: "Quiz on Probability" },
    { id: uuidv4(), date: "2025-03-03", time: "12:00:00", actitvityType: "EVALUATION", courseId: "23CSE213", description: "Project Evaluation" },
    { id: uuidv4(), date: "2025-03-05", time: "15:00:00", actitvityType: "OTHERS", courseId: "22ADM201", description: "Workshop on Leadership" },
    { id: uuidv4(), date: "2025-03-07", time: "08:00:00", actitvityType: "EXAM", courseId: "23CSE211", description: "Final Exam" },
    { id: uuidv4(), date: "2025-03-09", time: "11:30:00", actitvityType: "TUTORIAL", courseId: "23CSE214", description: "Doubt Clearing Session" },
    { id: uuidv4(), date: "2025-03-10", time: "17:00:00", actitvityType: "ASSIGNMENT", courseId: "23CSE213", description: "Lab Assignment Due" },
  ]);
  console.log("Activities seeded.");
}

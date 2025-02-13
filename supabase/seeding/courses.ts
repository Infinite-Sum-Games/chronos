import { courses } from "../functions/_shared/schema.ts";

export default async function seedCourses(db: any) {
  await db.insert(courses).values([
    { courseId: "23CSE211", courseName: "DAA ", credits: 3, isElective: false },
    { courseId: "23CSE213", courseName: "COA", credits: 3, isElective: false },
    { courseId: "23MAT216", courseName: "Probability", credits: 4, isElective: false },
    { courseId: "23CSE212", courseName: "Principles of Functional Language", credits: 4, isElective: false },
    { courseId: "23CSE214", courseName: "Operating Systems", credits: 4, isElective: false },
    { courseId: "22ADM201", courseName: "Life Skill for Engineers", credits: 1, isElective: false },
  ]);
  console.log("📖 Courses seeded.");
}

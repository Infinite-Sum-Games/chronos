import { students } from "../functions/_shared/schema.ts";

export default async function seedStudents(db: any) {
  await db.insert(students).values([
    { id: "1", rollNo: "CB.SC.U4CSE22222", name: "Ritesh", isAdmin: true },
    { id: "2", rollNo: "CB.SC.U4CSE23222", name: "Vijay", isAdmin: true },
    { id: "3", rollNo: "CB.SC.U4CSE23212", name: "Adarssh", isAdmin: true },
    { id: "4", rollNo: "CB.SC.U4CSE23214", name: "Mithali", isAdmin: true },
    { id: "5", rollNo: "CB.SC.U4CSE23215", name: "Kiran", isAdmin: false },
    { id: "6", rollNo: "CB.SC.U4CSE23223", name: "Nandgopal", isAdmin: false },
  ]);
  console.log("Students seeded.");
}

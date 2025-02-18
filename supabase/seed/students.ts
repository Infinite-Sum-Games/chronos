import { students } from "../functions/_shared/schema.ts";

export default async function seedStudents(db: any) {
  await db.insert(students).values([
    { id: "1", rollNo: "CB.SC.U4CSE22222", name: "Ritesh", gmailId: "ritesh@gmail.com", isAdmin: true },
    { id: "2", rollNo: "CB.SC.U4CSE23222", name: "Vijay", gmailId: "vijay@gmail.com", isAdmin: true },
    { id: "3", rollNo: "CB.SC.U4CSE23212", name: "Adarssh", gmailId: "adarssh@gmail.com", isAdmin: true },
    { id: "4", rollNo: "CB.SC.U4CSE23214", name: "Mithali", gmailId: "mithali@gmail.com", isAdmin: true },
    { id: "5", rollNo: "CB.SC.U4CSE23215", name: "Kiran", gmailId: "kiran@gmail.com", isAdmin: false },
    { id: "6", rollNo: "CB.SC.U4CSE23223", name: "Nandgopal", gmailId: "nandgopalrnair@gmail.com", isAdmin: false },
  ]);
  console.log("Students seeded.");
}

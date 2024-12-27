import {
    boolean,
    check,
    date,
    integer,
    PgTable,
    pgTable,
    primaryKey,
    text,
    time,
    unique,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";

export const students = pgTable("Students", {
    id: uuid("id").primaryKey(),
    rollNo: varchar("roll_no", { length: 20 }).unique().notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    isAdmin: boolean("isAdmin").default(false),
});

export const courses = pgTable("Courses", {
    courseId: uuid("course_id").primaryKey(),
    courseName: varchar("course_name", { length: 100 }).notNull(),
    credits: integer("credits").notNull(),
    isElective: boolean("isElective").default(false),
    electiveTag: varchar("elective_tag", { length: 50 }),
});

export const slots = pgTable("Slots", {
    id: uuid("id").primaryKey(),
    date: date("date").notNull(),
    slotNum: integer("slot_num").notNull(),
    courseId: uuid("course_id")
        .notNull()
        .references(() => courses.courseId, { onDelete: "cascade" }),
    roomNo: varchar("room_no", { length: 20 }).notNull(),
});

export const activity = pgTable("Activity", {
    id: uuid("id").primaryKey(),
    date: date("date").notNull(),
    time: time("time").notNull(),
    activityType: varchar("activityType", { length: 50 }).notNull(),
    courseId: uuid("course_id")
        .notNull()
        .references(() => courses.courseId, { onDelete: "cascade" }),
    description: text("description"),
});

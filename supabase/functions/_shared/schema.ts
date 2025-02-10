import {
  boolean,
  check,
  date,
  integer,
  pgEnum,
  PgTable,
  pgTable,
  pgTableCreator,
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
  courseId: varchar("course_id").primaryKey(),
  courseName: varchar("course_name", { length: 100 }).notNull(),
  credits: integer("credits").notNull(),
  isElective: boolean("isElective").default(false),
  electiveTag: varchar("elective_tag", { length: 50 }),
});

export const slots = pgTable("Slots", {
  id: uuid("id").primaryKey(),
  date: date("date").notNull(),
  slotNum: integer("slot_num").notNull(),
  courseId: varchar("course_id")
    .notNull()
    .references(() => courses.courseId, { onDelete: "cascade" }),
  roomNo: varchar("room_no", { length: 20 }).notNull(),
});

export const activityTypeEnum = pgEnum("activityType", [
  "EXAM",
  "TUTORIAL",
  "EVALUATION",
  "ASSIGNMENT",
  "OTHERS",
]);

export const activity = pgTable("Activity", {
  id: uuid("id").primaryKey(),
  date: date("date").notNull(),
  time: time("time").notNull(),
  actitvityType: activityTypeEnum("activityType").notNull(),
  courseId: uuid("course_id")
    .notNull()
    .references(() => courses.courseId, { onDelete: "cascade" }),
  description: text("description"),
});

export const timetable = pgTable("Timetable", {
  id: varchar("id").primaryKey(),
  day: varchar("day", { length: 10 }).notNull(),
  slotNum: integer("slot_num").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  courseId: varchar("course_id")
    .notNull()
    .references(() => courses.courseId),
  roomNo: varchar("room_no", { length: 20 }).notNull(),
})


import {
  serial,
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  time,
  uuid,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  rollNo: varchar("roll_no", { length: 20 }).unique().notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  isAdmin: boolean("isAdmin").default(false),
});

export const courses = pgTable("courses", {
  courseId: varchar("course_id").primaryKey(),
  courseName: varchar("course_name", { length: 100 }).notNull(),
  credits: integer("credits").notNull(),
  isElective: boolean("isElective").default(false),
  electiveTag: varchar("elective_tag", { length: 50 }),
});

export const slots = pgTable("slots", {
  id: serial("id").primaryKey(),
  date: date("date").notNull(),
  slotNum: integer("slot_num").notNull(),
  courseId: varchar("course_id")
    .notNull()
    .references(() => courses.courseId, { onDelete: "cascade", onUpdate: "cascade" }),
  roomNo: varchar("room_no", { length: 20 }).notNull(),
});

export const activityTypeEnum = pgEnum("activityType", [
  "EXAM",
  "TUTORIAL",
  "EVALUATION",
  "ASSIGNMENT",
  "OTHERS",
]);

export const activity = pgTable("activity", {
  id: uuid("id").primaryKey(),
  date: date("date").notNull(),
  time: time("time").notNull(),
  actitvityType: activityTypeEnum("activityType").notNull(),
  courseId: varchar("course_id")
    .notNull()
    .references(() => courses.courseId, { onDelete: "cascade", onUpdate: "cascade" }),
  description: text("description"),
});

export const timetable = pgTable("timetable", {
  id: varchar("id").primaryKey(),
  day: varchar("day", { length: 10 }).notNull(),
  slotNum: integer("slot_num").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  courseId: varchar("course_id")
    .notNull()
    .references(() => courses.courseId, { onDelete: "cascade", onUpdate: "cascade" }),
  roomNo: varchar("room_no", { length: 20 }).notNull(),
});

export const otps = pgTable("otps", {
  id: serial("id").primaryKey(),
  otp: varchar("otp", { length: 10 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  expiryAt: timestamp("created_at").notNull(),
});

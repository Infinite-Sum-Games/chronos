CREATE TYPE "public"."activityType" AS ENUM('EXAM', 'TUTORIAL', 'EVALUATION', 'ASSIGNMENT', 'OTHERS');--> statement-breakpoint
CREATE TABLE "Activity" (
	"id" uuid PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"time" time NOT NULL,
	"activityType" "activityType" NOT NULL,
	"course_id" varchar NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "Courses" (
	"course_id" varchar PRIMARY KEY NOT NULL,
	"course_name" varchar(100) NOT NULL,
	"credits" integer NOT NULL,
	"isElective" boolean DEFAULT false,
	"elective_tag" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "Slots" (
	"id" uuid PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"slot_num" integer NOT NULL,
	"course_id" varchar NOT NULL,
	"room_no" varchar(20) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" varchar PRIMARY KEY NOT NULL,
	"roll_no" varchar(20) NOT NULL,
	"name" varchar(100) NOT NULL,
	"isAdmin" boolean DEFAULT false,
	CONSTRAINT "students_roll_no_unique" UNIQUE("roll_no")
);
--> statement-breakpoint
CREATE TABLE "Timetable" (
	"id" varchar PRIMARY KEY NOT NULL,
	"day" varchar(10) NOT NULL,
	"slot_num" integer NOT NULL,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL,
	"course_id" varchar NOT NULL,
	"room_no" varchar(20) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_course_id_Courses_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."Courses"("course_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Slots" ADD CONSTRAINT "Slots_course_id_Courses_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."Courses"("course_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Timetable" ADD CONSTRAINT "Timetable_course_id_Courses_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."Courses"("course_id") ON DELETE no action ON UPDATE no action;
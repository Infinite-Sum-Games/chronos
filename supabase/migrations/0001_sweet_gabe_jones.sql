ALTER TABLE "students" RENAME COLUMN "isAdmin" TO "is_admin";--> statement-breakpoint
ALTER TABLE "slots" ADD COLUMN "day" varchar(10) NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "provider_id" varchar;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "provider_type" varchar;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "gmail_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "timetable" DROP COLUMN "start_time";--> statement-breakpoint
ALTER TABLE "timetable" DROP COLUMN "end_time";
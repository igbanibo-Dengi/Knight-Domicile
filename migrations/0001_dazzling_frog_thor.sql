DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('rent', 'sale');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."type" AS ENUM('residential', 'commercial', 'agricultural', 'mixed-use');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "property" ALTER COLUMN "lat" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "property" ALTER COLUMN "lon" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "property" ALTER COLUMN "plots" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "property" ALTER COLUMN "size" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "property" ALTER COLUMN "beds" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "property" ADD COLUMN "images" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "property" ADD COLUMN "status" "status" DEFAULT 'sale' NOT NULL;--> statement-breakpoint
ALTER TABLE "property" ADD COLUMN "streetAddress" text NOT NULL;--> statement-breakpoint
ALTER TABLE "property" ADD COLUMN "type" "type" DEFAULT 'residential' NOT NULL;
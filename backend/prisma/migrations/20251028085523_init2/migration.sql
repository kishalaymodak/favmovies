/*
  Warnings:

  - The `budget` column on the `Favorite` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `duration` column on the `Favorite` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `year` column on the `Favorite` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Favorite" DROP COLUMN "budget",
ADD COLUMN     "budget" DOUBLE PRECISION,
DROP COLUMN "duration",
ADD COLUMN     "duration" INTEGER,
DROP COLUMN "year",
ADD COLUMN     "year" INTEGER;

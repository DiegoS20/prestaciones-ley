/*
  Warnings:

  - Added the required column `position` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `admissionDate` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "position" VARCHAR(255) NOT NULL,
DROP COLUMN "admissionDate",
ADD COLUMN     "admissionDate" INTEGER NOT NULL;

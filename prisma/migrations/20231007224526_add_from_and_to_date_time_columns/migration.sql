/*
  Warnings:

  - You are about to drop the column `date` on the `Payments` table. All the data in the column will be lost.
  - Added the required column `from` to the `Payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `Payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payments" DROP COLUMN "date",
ADD COLUMN     "from" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "to" TIMESTAMP(3) NOT NULL;

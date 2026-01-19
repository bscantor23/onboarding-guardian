/*
  Warnings:

  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - Added the required column `headline` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rate` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AudienceType" AS ENUM ('NATURAL', 'BUSINESS', 'BOTH');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "description",
ADD COLUMN     "audienceType" "AudienceType" NOT NULL DEFAULT 'BOTH',
ADD COLUMN     "generalInfo" TEXT,
ADD COLUMN     "headline" TEXT NOT NULL,
ADD COLUMN     "rate" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "rateType" TEXT DEFAULT 'EA',
ADD COLUMN     "requirements" TEXT,
ADD COLUMN     "term" TEXT;

/*
  Warnings:

  - The values [BOTH] on the enum `AudienceType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AudienceType_new" AS ENUM ('NATURAL', 'BUSINESS', 'ALL');
ALTER TABLE "public"."Product" ALTER COLUMN "audienceType" DROP DEFAULT;
ALTER TABLE "Product" ALTER COLUMN "audienceType" TYPE "AudienceType_new" USING ("audienceType"::text::"AudienceType_new");
ALTER TYPE "AudienceType" RENAME TO "AudienceType_old";
ALTER TYPE "AudienceType_new" RENAME TO "AudienceType";
DROP TYPE "public"."AudienceType_old";
ALTER TABLE "Product" ALTER COLUMN "audienceType" SET DEFAULT 'ALL';
COMMIT;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "audienceType" SET DEFAULT 'ALL';

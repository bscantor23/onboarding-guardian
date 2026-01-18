-- CreateEnum
CREATE TYPE "OnBoardingStatus" AS ENUM ('REQUESTED', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "Onboarding" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "initialAmount" DECIMAL(18,2) NOT NULL,
    "status" "OnBoardingStatus" NOT NULL DEFAULT 'REQUESTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Onboarding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Onboarding_document_idx" ON "Onboarding"("document");

-- CreateIndex
CREATE INDEX "Onboarding_email_idx" ON "Onboarding"("email");

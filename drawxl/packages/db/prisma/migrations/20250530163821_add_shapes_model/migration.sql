/*
  Warnings:

  - You are about to drop the column `deleted` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the `Drawing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stroke` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Drawing" DROP CONSTRAINT "Drawing_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Drawing" DROP CONSTRAINT "Drawing_userId_fkey";

-- DropForeignKey
ALTER TABLE "Stroke" DROP CONSTRAINT "Stroke_drawingId_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "deleted";

-- DropTable
DROP TABLE "Drawing";

-- DropTable
DROP TABLE "Stroke";

-- CreateTable
CREATE TABLE "Shape" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "startX" DOUBLE PRECISION,
    "startY" DOUBLE PRECISION,
    "endX" DOUBLE PRECISION,
    "endY" DOUBLE PRECISION,
    "centerX" DOUBLE PRECISION,
    "centerY" DOUBLE PRECISION,
    "radius" DOUBLE PRECISION,
    "width" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "color" TEXT,

    CONSTRAINT "Shape_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Shape" ADD CONSTRAINT "Shape_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

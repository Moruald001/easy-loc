/*
  Warnings:

  - You are about to drop the column `statut` on the `APPARTEMENT` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `LOCATAIRE` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `status` to the `APPARTEMENT` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_APPARTEMENT" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "loyer_base" REAL NOT NULL,
    "status" BOOLEAN NOT NULL
);
INSERT INTO "new_APPARTEMENT" ("description", "id", "loyer_base", "nom") SELECT "description", "id", "loyer_base", "nom" FROM "APPARTEMENT";
DROP TABLE "APPARTEMENT";
ALTER TABLE "new_APPARTEMENT" RENAME TO "APPARTEMENT";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "LOCATAIRE_email_key" ON "LOCATAIRE"("email");

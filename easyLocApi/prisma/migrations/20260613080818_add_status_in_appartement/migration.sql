/*
  Warnings:

  - You are about to drop the column `statut_actif` on the `LOCATAIRE` table. All the data in the column will be lost.
  - Added the required column `statut` to the `APPARTEMENT` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_APPARTEMENT" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "loyer_base" REAL NOT NULL,
    "statut" BOOLEAN NOT NULL
);
INSERT INTO "new_APPARTEMENT" ("description", "id", "loyer_base", "nom") SELECT "description", "id", "loyer_base", "nom" FROM "APPARTEMENT";
DROP TABLE "APPARTEMENT";
ALTER TABLE "new_APPARTEMENT" RENAME TO "APPARTEMENT";
CREATE TABLE "new_LOCATAIRE" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "appartement_id" TEXT,
    CONSTRAINT "LOCATAIRE_appartement_id_fkey" FOREIGN KEY ("appartement_id") REFERENCES "APPARTEMENT" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_LOCATAIRE" ("appartement_id", "email", "id", "nom", "prenom", "telephone") SELECT "appartement_id", "email", "id", "nom", "prenom", "telephone" FROM "LOCATAIRE";
DROP TABLE "LOCATAIRE";
ALTER TABLE "new_LOCATAIRE" RENAME TO "LOCATAIRE";
CREATE UNIQUE INDEX "LOCATAIRE_appartement_id_key" ON "LOCATAIRE"("appartement_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

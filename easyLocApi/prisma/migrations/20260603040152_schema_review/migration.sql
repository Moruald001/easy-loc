/*
  Warnings:

  - You are about to drop the column `cree le` on the `UTILISATEUR` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[appartement_id]` on the table `LOCATAIRE` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `montant_loyer` to the `PAIEMENT` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PAIEMENT" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "periode" TEXT NOT NULL,
    "montant_paye" REAL NOT NULL,
    "montant_loyer" REAL NOT NULL,
    "date_encaissement" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pdf_nom_fichier" TEXT,
    "locataire id" TEXT NOT NULL,
    "appartement_id" TEXT NOT NULL,
    CONSTRAINT "PAIEMENT_locataire id_fkey" FOREIGN KEY ("locataire id") REFERENCES "LOCATAIRE" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PAIEMENT_appartement_id_fkey" FOREIGN KEY ("appartement_id") REFERENCES "APPARTEMENT" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PAIEMENT" ("appartement_id", "date_encaissement", "id", "locataire id", "montant_paye", "pdf_nom_fichier", "periode") SELECT "appartement_id", "date_encaissement", "id", "locataire id", "montant_paye", "pdf_nom_fichier", "periode" FROM "PAIEMENT";
DROP TABLE "PAIEMENT";
ALTER TABLE "new_PAIEMENT" RENAME TO "PAIEMENT";
CREATE UNIQUE INDEX "PAIEMENT_locataire id_periode_key" ON "PAIEMENT"("locataire id", "periode");
CREATE TABLE "new_UTILISATEUR" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "cree_le" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_UTILISATEUR" ("email", "id", "name") SELECT "email", "id", "name" FROM "UTILISATEUR";
DROP TABLE "UTILISATEUR";
ALTER TABLE "new_UTILISATEUR" RENAME TO "UTILISATEUR";
CREATE UNIQUE INDEX "UTILISATEUR_email_key" ON "UTILISATEUR"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "LOCATAIRE_appartement_id_key" ON "LOCATAIRE"("appartement_id");

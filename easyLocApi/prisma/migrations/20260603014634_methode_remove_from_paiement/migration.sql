/*
  Warnings:

  - You are about to drop the column `methode` on the `PAIEMENT` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PAIEMENT" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "periode" TEXT NOT NULL,
    "montant_paye" REAL NOT NULL,
    "date_encaissement" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pdf_nom_fichier" TEXT NOT NULL,
    "locataire id" TEXT NOT NULL,
    "appartement_id" TEXT NOT NULL,
    CONSTRAINT "PAIEMENT_locataire id_fkey" FOREIGN KEY ("locataire id") REFERENCES "LOCATAIRE" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PAIEMENT_appartement_id_fkey" FOREIGN KEY ("appartement_id") REFERENCES "APPARTEMENT" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PAIEMENT" ("appartement_id", "date_encaissement", "id", "locataire id", "montant_paye", "pdf_nom_fichier", "periode") SELECT "appartement_id", "date_encaissement", "id", "locataire id", "montant_paye", "pdf_nom_fichier", "periode" FROM "PAIEMENT";
DROP TABLE "PAIEMENT";
ALTER TABLE "new_PAIEMENT" RENAME TO "PAIEMENT";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

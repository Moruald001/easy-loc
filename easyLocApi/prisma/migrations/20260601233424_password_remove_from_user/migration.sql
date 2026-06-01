/*
  Warnings:

  - You are about to drop the column `mot_de_passe` on the `UTILISATEUR` table. All the data in the column will be lost.
  - You are about to drop the column `nom` on the `UTILISATEUR` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UTILISATEUR" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "cree le" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_UTILISATEUR" ("cree le", "email", "id") SELECT "cree le", "email", "id" FROM "UTILISATEUR";
DROP TABLE "UTILISATEUR";
ALTER TABLE "new_UTILISATEUR" RENAME TO "UTILISATEUR";
CREATE UNIQUE INDEX "UTILISATEUR_email_key" ON "UTILISATEUR"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

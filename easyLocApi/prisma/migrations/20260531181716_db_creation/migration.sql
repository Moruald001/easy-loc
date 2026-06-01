-- CreateTable
CREATE TABLE "UTILISATEUR" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL,
    "nom" TEXT,
    "cree le" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "APPARTEMENT" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "loyer_base" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "LOCATAIRE" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "statut_actif" BOOLEAN NOT NULL,
    "appartement_id" TEXT,
    CONSTRAINT "LOCATAIRE_appartement_id_fkey" FOREIGN KEY ("appartement_id") REFERENCES "APPARTEMENT" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PAIEMENT" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "periode" TEXT NOT NULL,
    "montant_paye" REAL NOT NULL,
    "date_encaissement" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "methode" TEXT NOT NULL,
    "pdf_nom_fichier" TEXT NOT NULL,
    "locataire id" TEXT NOT NULL,
    "appartement_id" TEXT NOT NULL,
    CONSTRAINT "PAIEMENT_locataire id_fkey" FOREIGN KEY ("locataire id") REFERENCES "LOCATAIRE" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PAIEMENT_appartement_id_fkey" FOREIGN KEY ("appartement_id") REFERENCES "APPARTEMENT" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UTILISATEUR_email_key" ON "UTILISATEUR"("email");

import prisma from "./prisma";

async function main() {
  console.log("⏳ Début du seeding des données opérationnelles ");

  // 1. Nettoyage des anciennes données pour éviter les conflits de clés uniques
  await prisma.paiement.deleteMany();
  await prisma.locataire.deleteMany();
  await prisma.appartement.deleteMany();
  console.log("🧹 Base de données nettoyée.");

  // 2. Création des Appartements (Biens Immobiliers à Lomé)
  console.log("🏢 Création des appartements...");

  const apptA = await prisma.appartement.create({
    data: {
      nom: "Appartement Chic - Agoè",
      description:
        "Bel appartement T3 moderne situé à Agoè-Nyivé, proche de l'échangeur",
      loyer_base: 150000.0, // Loyer en FCFA (XOF)
    },
  });

  const studio1 = await prisma.appartement.create({
    data: {
      nom: "Studio - Amoutivé",
      description:
        "Studio meublé idéal pour étudiant ou professionnel, centre-ville de Lomé",
      loyer_base: 75000.0, // Loyer en FCFA (XOF)
    },
  });

  const apptB = await prisma.appartement.create({
    data: {
      nom: "Villa F4 - Baguida",
      description:
        "Grande villa avec cour, temporairement vacante en bord de mer",
      loyer_base: 350000.0, // Loyer en FCFA (XOF)
    },
  });

  // 3. Création des Locataires avec numéros de téléphone et noms du Togo
  console.log("👥 Création des locataires...");

  const locataire1 = await prisma.locataire.create({
    data: {
      nom: "KOFFI",
      prenom: "Anani",
      email: "anani.koffi@mail.tg",
      telephone: "+228 90 12 34 56", // Numéro Togocom
      statut_actif: true,
      appartement_id: apptA.id, // Occupe l'appartement d'Agoè
    },
  });

  const locataire2 = await prisma.locataire.create({
    data: {
      nom: "MENSAH",
      prenom: "Abla",
      email: "abla.mensah@mail.tg",
      telephone: "+228 99 88 77 66", // Numéro Moov
      statut_actif: true,
      appartement_id: studio1.id, // Occupe le studio d'Amoutivé
    },
  });

  // 4. Enregistrement de l'historique des Paiements (en FCFA)
  console.log("💳 Génération de l'historique des paiements...");

  // Historique des reçus pour Anani KOFFI (Appartement Agoè)
  await prisma.paiement.createMany({
    data: [
      {
        periode: "2026-03",
        montant_paye: 150000.0,
        date_encaissement: new Date("2026-03-05T08:00:00Z"),
        methode: "T-Money", // Mode de paiement local très courant
        pdf_nom_fichier: "quittance_2026-03_koffi.pdf",
        locataire_id: locataire1.id,
        appartement_id: apptA.id,
      },
      {
        periode: "2026-04",
        montant_paye: 150000.0,
        date_encaissement: new Date("2026-04-04T10:30:00Z"),
        methode: "Flooz", // Autre mode de paiement Mobile Money local
        pdf_nom_fichier: "quittance_2026-04_koffi.pdf",
        locataire_id: locataire1.id,
        appartement_id: apptA.id,
      },
      {
        periode: "2026-05",
        montant_paye: 150000.0,
        date_encaissement: new Date("2026-05-02T16:15:00Z"),
        methode: "Virement", // Banque locale (ex: Ecobank, Orabank)
        pdf_nom_fichier: "quittance_2026-05_koffi.pdf",
        locataire_id: locataire1.id,
        appartement_id: apptA.id,
      },
    ],
  });

  // Paiement récent pour Abla MENSAH (Studio Amoutivé)
  await prisma.paiement.create({
    data: {
      periode: "2026-05",
      montant_paye: 75000.0,
      date_encaissement: new Date("2026-05-06T11:00:00Z"),
      methode: "Espèces",
      pdf_nom_fichier: "quittance_2026-05_mensah.pdf",
      locataire_id: locataire2.id,
      appartement_id: studio1.id,
    },
  });

  console.log("✅ Seeding national togolais terminé avec succès !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur durant le seeding :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

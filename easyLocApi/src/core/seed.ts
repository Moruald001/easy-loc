import prisma from "./prisma";

async function main() {
  console.log("🌱 Début du seed...");

  // 1. Créer les appartements
  const appart1 = await prisma.appartement.create({
    data: {
      nom: "Appartement A",
      description: "Appartement 2 pièces au 1er étage",
      loyer_base: 150000,
    },
  });

  const appart2 = await prisma.appartement.create({
    data: {
      nom: "Studio 1",
      description: "Studio meublé au rez-de-chaussée",
      loyer_base: 80000,
    },
  });

  const appart3 = await prisma.appartement.create({
    data: {
      nom: "Appartement B",
      description: "Appartement 3 pièces au 2ème étage",
      loyer_base: 200000,
    },
  });

  console.log("✅ Appartements créés");

  // 2. Créer les locataires
  const locataire1 = await prisma.locataire.create({
    data: {
      nom: "Dupont",
      prenom: "Jean",
      email: "jean.dupont@gmail.com",
      telephone: "+228 90 00 00 01",
      statut_actif: true,
      appartement_id: appart1.id,
    },
  });

  const locataire2 = await prisma.locataire.create({
    data: {
      nom: "Amégah",
      prenom: "Koffi",
      email: "koffi.amegah@gmail.com",
      telephone: "+228 90 00 00 02",
      statut_actif: true,
      appartement_id: appart2.id,
    },
  });

  const locataire3 = await prisma.locataire.create({
    data: {
      nom: "Mensah",
      prenom: "Afi",
      email: "afi.mensah@gmail.com",
      telephone: "+228 90 00 00 03",
      statut_actif: false, // ancien locataire
      appartement_id: null,
    },
  });

  console.log("✅ Locataires créés");

  // 3. Créer les paiements
  await prisma.paiement.createMany({
    data: [
      // Paiements locataire 1
      {
        periode: "2026-01",
        montant_paye: 150000,
        montant_loyer: 150000,
        locataire_id: locataire1.id,
        appartement_id: appart1.id,
      },
      {
        periode: "2026-02",
        montant_paye: 150000,
        montant_loyer: 150000,
        locataire_id: locataire1.id,
        appartement_id: appart1.id,
      },
      {
        periode: "2026-03",
        montant_paye: 120000, // paiement partiel
        montant_loyer: 150000,
        locataire_id: locataire1.id,
        appartement_id: appart1.id,
      },

      // Paiements locataire 2
      {
        periode: "2026-01",
        montant_paye: 80000,
        montant_loyer: 80000,
        locataire_id: locataire2.id,
        appartement_id: appart2.id,
      },
      {
        periode: "2026-02",
        montant_paye: 80000,
        montant_loyer: 80000,
        locataire_id: locataire2.id,
        appartement_id: appart2.id,
      },

      // Paiements ancien locataire (locataire3 était dans appart3)
      {
        periode: "2025-11",
        montant_paye: 200000,
        montant_loyer: 200000,
        locataire_id: locataire3.id,
        appartement_id: appart3.id,
      },
      {
        periode: "2025-12",
        montant_paye: 200000,
        montant_loyer: 200000,
        locataire_id: locataire3.id,
        appartement_id: appart3.id,
      },
    ],
  });

  console.log("✅ Paiements créés");
  console.log("🎉 Seed terminé avec succès !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur durant le seeding :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

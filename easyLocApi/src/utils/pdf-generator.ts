import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
import prisma from "../core/prisma";
interface infoPaiement {
  paiementId: string;
  locataireId: string;
  appartement: string;
  montant: number;
  charges: number;
  periode: string;
}

export const generatePDF = async (data: infoPaiement): Promise<string> => {
  const templatePath = path.join(__dirname, "../utils/template-recu.html");
  const templateContent = fs.readFileSync(templatePath, "utf-8");
  if (!data.locataireId) {
    throw new Error("ID du locataire est requis.");
  }

  const locataireData = await prisma.locataire.findUnique({
    where: { id: data.locataireId },
    select: { nom: true, prenom: true, telephone: true },
  });

  // Remplacer les placeholders
  const htmlContent = templateContent
    .replace("{{receiptNumber}}", data.paiementId)
    .replace("{{emissionDate}}", new Date().toLocaleDateString())
    .replace(
      "{{locataireName}}",
      locataireData?.nom + " " + locataireData?.prenom || "",
    )
    .replace("{{locataireContact}}", locataireData?.telephone || "")
    .replace("{{rentalPeriod}}", data.periode)
    .replace("{{apartementAddress}}", data.appartement)
    .replace("{{chargesAmount}}", data.charges.toString())
    .replace("{{montant}}", data.montant.toString())
    .replace("{{totalAmount}}", (data.montant + data.charges).toString());

  // Générer le PDF avec Puppeteer
  const pdfDir = path.join(__dirname, "../storage/paiement");
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
  }

  const fileName = `recu_${data.paiementId}_${data.periode}.pdf`;
  const pdfPath = path.join(pdfDir, fileName);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    await page.setContent(htmlContent, {
      waitUntil: "load",
      // ← attend que Tailwind CDN soit chargé
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
    });

    return fileName;
  } finally {
    await browser.close();
  }
};

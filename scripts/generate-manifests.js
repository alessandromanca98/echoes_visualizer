const fs = require("fs");
const path = require("path");

const imagesRoot = path.join(__dirname, "../public/images");

// Estensioni consentite
const validExtensions = [".webp"];

function generateManifestForFolder(folderPath) {
  const files = fs.readdirSync(folderPath);

  const images = files
    .filter(file =>
      validExtensions.includes(path.extname(file).toLowerCase())
    )
    .sort((a, b) => a.localeCompare(b));

  const manifestPath = path.join(folderPath, "manifest.json");

  fs.writeFileSync(
    manifestPath,
    JSON.stringify(images, null, 2)
  );

  console.log(`✅ Manifest aggiornato in: ${folderPath}`);
}

function generateAllManifests() {
  const folders = fs.readdirSync(imagesRoot);

  folders.forEach(folder => {
    const fullPath = path.join(imagesRoot, folder);

    if (fs.statSync(fullPath).isDirectory()) {
      generateManifestForFolder(fullPath);
    }
  });

  console.log("🎉 Tutti i manifest sono stati aggiornati!");
}

generateAllManifests();

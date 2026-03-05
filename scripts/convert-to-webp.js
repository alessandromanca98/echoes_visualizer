//npm run convert-to-webp -- --f echoes
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const imagesRoot = path.join(__dirname, "../public/images");

// Estensioni consentite
const validExtensions = [".jpg", ".jpeg", ".png", ".svg"];

async function convertToWebP(folder){
    const files = fs.readdirSync(path.join(imagesRoot, folder));

    const images = files
    .filter(file =>
      validExtensions.includes(path.extname(file).toLowerCase())
    )
    .sort((a, b) => a.localeCompare(b));

    await Promise.all(images.map(async i => {
        const fileName = path.basename(i, path.extname(i))
        const outputFile = `${fileName}.webp`
      
        await sharp(path.join(imagesRoot, folder, i))
          .webp({ quality: 85 })
          .toFile(path.join(imagesRoot, folder, outputFile));

          fs.unlinkSync(path.join(imagesRoot, folder, i))
      
        console.log(`✅ Converted: ${i} → ${outputFile}`)
      }));
}

const args = process.argv.slice(2) 
const pathIndex = args.indexOf('--f')
const inputFolder = args[pathIndex + 1]

convertToWebP(inputFolder);
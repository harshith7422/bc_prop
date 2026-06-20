const fs = require('fs');
const path = './src/data/properties.js';
let content = fs.readFileSync(path, 'utf8');

// The new images
const newImagesArray = `[
      "/images/The Aura By Blue Sky Brochure_page-0001.jpg",
      "/images/The Aura By Blue Sky Brochure_page-0002.jpg",
      "/images/The Aura By Blue Sky Brochure_page-0003.jpg",
      "/images/The Aura By Blue Sky Brochure_page-0004.jpg",
      "/images/The Aura By Blue Sky Brochure_page-0005.jpg",
      "/images/The Aura By Blue Sky Brochure_page-0006.jpg",
      "/images/The Aura By Blue Sky Brochure_page-0007.jpg",
      "/images/The Aura By Blue Sky Brochure_page-0008.jpg",
      "/images/The Aura By Blue Sky Brochure_page-0009.jpg"
    ]`;

// IDs 7 through 12
for (let id = 7; id <= 12; id++) {
    const idStr = `id: ${id},`;
    let idIdx = content.indexOf(idStr);
    if (idIdx !== -1) {
        // Find next image:
        let imgIdx = content.indexOf('image: "/images/flat_property.png",', idIdx);
        if (imgIdx !== -1) {
            // Replace image:
            const thumbName = `/images/The Aura By Blue Sky Brochure_page-000${id - 6}.jpg`;
            content = content.substring(0, imgIdx) + `image: "${thumbName}",` + content.substring(imgIdx + 'image: "/images/flat_property.png",'.length);
            
            // Now update images array
            let imgsIdx = content.indexOf('images: [', idIdx);
            let endImgsIdx = content.indexOf('],', imgsIdx);
            if (imgsIdx !== -1 && endImgsIdx !== -1) {
                content = content.substring(0, imgsIdx) + 'images: ' + newImagesArray + content.substring(endImgsIdx + 1);
            }
        }
    }
}

fs.writeFileSync(path, content);
console.log("Updated Aura BlueSky images.");

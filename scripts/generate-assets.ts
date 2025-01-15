import sharp from 'sharp';
import fs from 'fs';

async function convertAssets() {
  // Convert icon
  await sharp('assets/icon.svg')
    .resize(1024, 1024)
    .png()
    .toFile('assets/icon.png');

  // Convert adaptive icon
  await sharp('assets/adaptive-icon.svg')
    .resize(1024, 1024)
    .png()
    .toFile('assets/adaptive-icon.png');

  // Convert splash screen
  await sharp('assets/splash.svg')
    .resize(1242, 2436)
    .png()
    .toFile('assets/splash.png');
}

convertAssets().catch(console.error); 
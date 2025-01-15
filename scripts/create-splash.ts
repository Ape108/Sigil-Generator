import sharp from 'sharp';

// Create a solid color splash screen
sharp({
  create: {
    width: 1242,
    height: 2436,
    channels: 4,
    background: '#1F2937'
  }
})
.png()
.toFile('assets/splash.png')
.then(() => console.log('Splash screen created successfully'))
.catch(console.error); 
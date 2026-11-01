const sharp = require('sharp');
const path = require('path');

sharp(path.join(__dirname, '..', 'public', 'profile.heic'))
  .resize(400, 400, { fit: 'cover', position: 'top' })
  .jpeg({ quality: 90 })
  .toFile(path.join(__dirname, '..', 'public', 'profile.jpg'))
  .then(() => console.log('Converted profile.heic -> profile.jpg'))
  .catch(err => console.error('Conversion failed:', err.message));

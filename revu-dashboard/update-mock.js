const fs = require('fs');
let fileContent = fs.readFileSync('lib/mockData.ts', 'utf-8');

const uploaders = [
  { name: 'Baku Foodie', handle: '@baku_foodie', avatar: 'https://i.pravatar.cc/150?u=1' },
  { name: 'Night Owl', handle: '@nightowl_baku', avatar: 'https://i.pravatar.cc/150?u=2' },
  { name: 'Chill Vibes', handle: '@chill_vibes', avatar: 'https://i.pravatar.cc/150?u=3' },
  { name: 'Luxury Lifestyle', handle: '@luxury_baku', avatar: 'https://i.pravatar.cc/150?u=4' },
];

const captions = [
  'Just found this hidden gem! The vibe is 10/10 right now 🔥 #baku #rooftop',
  'Best cocktails in the city! Highly recommend 🍸 #nightlife',
  'Insane views and great music! 🎶🌆 #skyline',
  'Can’t get enough of this place! Definitely coming back 💯 #weekend',
];

fileContent = fileContent.replace(/id: "([^"]+)",/g, (match, id) => {
  const uploader = uploaders[Math.floor(Math.random() * uploaders.length)];
  const caption = captions[Math.floor(Math.random() * captions.length)];
  const visited = Math.random() > 0.5 ? 'true' : 'false';
  
  return `id: "${id}",
    uploader: { name: "${uploader.name}", handle: "${uploader.handle}", avatar: "${uploader.avatar}" },
    caption: "${caption}",
    visited: ${visited},`;
});

fs.writeFileSync('lib/mockData.ts', fileContent);
console.log('Done');

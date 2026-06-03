const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, 'src/components/testimonials/Testimonials.jsx'),
  path.join(__dirname, 'src/components/contact/Contact.jsx')
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Base background edits
  content = content.replace('bg-[#080808]', 'bg-[#F5F5F0] dark:bg-[#080808] transition-colors duration-1000');
  content = content.replace('bg-[#0A0A0A]', 'bg-[#F5F5F0] dark:bg-[#0A0A0A] transition-colors duration-1000');
  
  // Text opacities
  content = content.replace(/text-white\/([0-9]+)/g, 'text-black/$1 dark:text-white/$1');
  
  // Bare text-white 
  content = content.replace(/(?<!dark:)text-white(?!\/)/g, 'text-black dark:text-white');
  
  // Borders
  content = content.replace(/border-white\/([0-9]+)/g, 'border-black/$1 dark:border-white/$1');
  
  // Backgrounds with opacity
  content = content.replace(/bg-white\/([0-9]+)/g, 'bg-black/$1 dark:bg-white/$1');

  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
});

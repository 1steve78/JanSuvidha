const fs = require('fs');

const filesToUpdate = [
    'src/app/admin/dashboard/page.tsx',
    'src/app/dashboard/page.tsx',
];

for (const file of filesToUpdate) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace indigos with emerald
    content = content.replace(/indigo-600/g, 'slate-800');
    content = content.replace(/indigo-700/g, 'slate-900');
    content = content.replace(/indigo-50/g, 'slate-100');
    content = content.replace(/indigo-100/g, 'slate-200');
    content = content.replace(/indigo-200/g, 'slate-300');
    content = content.replace(/indigo-300/g, 'slate-400');
    
    // Replace blue with slate
    content = content.replace(/bg-blue-600/g, 'bg-slate-800');
    content = content.replace(/border-blue-600/g, 'border-slate-800');
    content = content.replace(/text-blue-600/g, 'text-slate-800');

    fs.writeFileSync(file, content);
}

console.log("Theme updated successfully.");

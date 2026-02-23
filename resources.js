import fs from 'fs';

// In a real scenario, this script would generate icons and splash screens.
// For now, we will use this to ensure the resources folder structure exists.

console.log('Ensure resources folder exists...');
if (!fs.existsSync('resources')) {
    fs.mkdirSync('resources');
}
console.log('Resources check complete.');

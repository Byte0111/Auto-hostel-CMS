const fs = require('fs');
const bcrypt = require('bcryptjs');

async function updateSql() {
    console.log('Generating hash...');
    const newHash = await bcrypt.hash('pass123', 10);
    console.log('New hash generated:', newHash);
    
    let content = fs.readFileSync('setup.sql', 'utf8');
    
    // The two incorrect hashes previously found:
    const oldHash1 = '$2b$10$VzNm.2xdEDCWFt3o4RSJ2OcnKgo3CEYLAnqbxywV8j8eSiYXluEzu';
    const oldHash2 = '$2b$10$wwvUegCw8BV/EIde2r84leZY2zYEXUDodOUHzUB17cfdInoVNJVx.';
    
    content = content.split(oldHash1).join(newHash);
    content = content.split(oldHash2).join(newHash);
    
    // Let's also update the comment that mentions "password123" to say "pass123"
    content = content.replace(/password123/g, 'pass123');

    fs.writeFileSync('setup.sql', content);
    console.log('setup.sql updated successfully.');
}

updateSql().catch(console.error);

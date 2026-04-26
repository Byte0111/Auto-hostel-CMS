const pool = require('./config/db');
const bcrypt = require('bcryptjs');

async function updatePasswords() {
    try {
        const hash = await bcrypt.hash('pass123', 10);
        console.log('Generated hash:', hash);
        
        await pool.execute('UPDATE users SET password = ?', [hash]);
        console.log('Passwords updated!');
        
        const [rows] = await pool.execute('SELECT reg_no, password FROM users WHERE reg_no = ?', ['202300182']);
        const testMatch = await bcrypt.compare('pass123', rows[0].password);
        console.log('Verification for 202300182:', testMatch);
        
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

updatePasswords();
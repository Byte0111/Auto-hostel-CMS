const pool = require('./config/db');
const fs = require('fs');

async function resetDB() {
    try {
        console.log('Dropping old tables...');
        await pool.execute('DROP TABLE IF EXISTS complaints');
        await pool.execute('DROP TABLE IF EXISTS users');

        console.log('Reading setup.sql...');
        const sqlScript = fs.readFileSync('setup.sql', 'utf8');
        
        // Split by semicolon and run sequentially
        const queries = sqlScript.split(';').map(q => q.trim()).filter(q => q.length > 0);
        
        console.log('Executing setup.sql commands...');
        for (let query of queries) {
            await pool.query(query); // query() allows multiple statements if pool supports, but doing it sequentially is safer
        }
        
        console.log('Database reconstructed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

resetDB();

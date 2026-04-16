const pool = require('./config/db');

async function test() {
    try {
        console.log('Testing connection...');
        const [rows] = await pool.execute('SELECT 1 + 1 AS result');
        console.log('Database connected successfully:', rows);

        console.log('Fetching users...');
        const [users] = await pool.execute('SELECT * FROM users LIMIT 1');
        console.log('Users found:', users.length);
        
        process.exit(0);
    } catch (err) {
        console.error('Database Error:', err.message);
        process.exit(1);
    }
}
test();

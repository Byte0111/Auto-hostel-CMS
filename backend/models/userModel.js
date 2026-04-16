const db = require('../config/db');

class User {
    static async create(name, reg_no, password, role, room_no) {
        const [result] = await db.execute(
            'INSERT INTO users (name, reg_no, password, role, room_no) VALUES (?, ?, ?, ?, ?)',
            [name, reg_no, password, role, room_no]
        );
        return result.insertId;
    }

    static async findByRegNo(reg_no) {
        const [rows] = await db.execute('SELECT * FROM users WHERE reg_no = ?', [reg_no]);
        return rows[0];
    }
    
    static async findById(id) {
        const [rows] = await db.execute('SELECT id, name, reg_no, role, room_no FROM users WHERE id = ?', [id]);
        return rows[0];
    }
}

module.exports = User;

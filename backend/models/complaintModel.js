const db = require('../config/db');

class Complaint {
    static async create(user_id, category, description, room_no, priority) {
        const [result] = await db.execute(
            'INSERT INTO complaints (user_id, category, description, room_no, priority) VALUES (?, ?, ?, ?, ?)',
            [user_id, category, description, room_no, priority]
        );
        return result.insertId;
    }

    static async findAll(filters) {
        let query = `
            SELECT c.*, u.name as student_name, u.reg_no 
            FROM complaints c
            JOIN users u ON c.user_id = u.id
        `;
        let params = [];
        let conditions = [];

        if (filters.status && filters.status !== 'All') {
            conditions.push('c.status = ?');
            params.push(filters.status);
        }
        if (filters.category && filters.category !== 'All') {
            conditions.push('c.category = ?');
            params.push(filters.category);
        }
        if (filters.priority && filters.priority !== 'All') {
            conditions.push('c.priority = ?');
            params.push(filters.priority);
        }
        if (filters.user_id) {
            conditions.push('c.user_id = ?');
            params.push(filters.user_id);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }
        
        query += ' ORDER BY c.created_at DESC';

        const [rows] = await db.execute(query, params);
        return rows;
    }

    static async updateStatus(id, status) {
        let query = 'UPDATE complaints SET status = ?';
        let params = [status];
        
        if (status === 'Resolved') {
            query += ', completed_at = CURRENT_TIMESTAMP';
        } else {
            query += ', completed_at = NULL';
        }

        query += ' WHERE id = ?';
        params.push(id);
        
        const [result] = await db.execute(query, params);
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.execute('DELETE FROM complaints WHERE id = ?', [id]);
        return result.affectedRows;
    }
    
    static async getStats() {
        const [rows] = await db.execute(`
            SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) as pending,
                SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) as in_progress,
                SUM(CASE WHEN status = 'Resolved' THEN 1 ELSE 0 END) as resolved
            FROM complaints
        `);
        return rows[0];
    }
}

module.exports = Complaint;

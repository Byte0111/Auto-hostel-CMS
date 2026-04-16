const Complaint = require('../models/complaintModel');

exports.createComplaint = async (req, res) => {
    try {
        const { category, description, priority } = req.body;
        // User info comes from the JWT middleware
        const userId = req.user.id;
        const roomNo = req.user.room_no;

        const complaintId = await Complaint.create(userId, category, description, roomNo, priority);

        res.status(201).json({ message: 'Complaint created successfully', complaintId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while creating complaint' });
    }
};

exports.getComplaints = async (req, res) => {
    try {
        const filters = {
            category: req.query.category,
            priority: req.query.priority,
            status: req.query.status
        };

        // If it's a student, filter by their own user ID
        if (req.user.role === 'student') {
            filters.user_id = req.user.id;
        }

        const complaints = await Complaint.findAll(filters);
        res.json(complaints);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching complaints' });
    }
};

exports.updateComplaint = async (req, res) => {
    try {
        const { status } = req.body;
        const complaintId = req.params.id;

        const affectedRows = await Complaint.updateStatus(complaintId, status);
        
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        res.json({ message: 'Complaint updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error updating complaint' });
    }
};

exports.deleteComplaint = async (req, res) => {
    try {
        const complaintId = req.params.id;
        const affectedRows = await Complaint.delete(complaintId);
        
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        res.json({ message: 'Complaint deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error deleting complaint' });
    }
};

exports.getDashboardStats = async (req, res) => {
    try {
        const stats = await Complaint.getStats();
        res.json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching stats' });
    }
};

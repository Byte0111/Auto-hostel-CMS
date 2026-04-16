const express = require('express');
const { 
    createComplaint, 
    getComplaints, 
    updateComplaint, 
    deleteComplaint, 
    getDashboardStats 
} = require('../controllers/complaintsController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createComplaint);
router.get('/', authMiddleware, getComplaints);
router.get('/stats', authMiddleware, adminMiddleware, getDashboardStats);
router.put('/:id', authMiddleware, adminMiddleware, updateComplaint);
router.delete('/:id', authMiddleware, adminMiddleware, deleteComplaint);

module.exports = router;

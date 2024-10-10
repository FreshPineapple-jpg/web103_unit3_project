import { pool } from '../config/database.js';

const getEvents = async (req, res) => {
    const searchTerm = req.query.search; // Optional search term

    try {
        let query = 'SELECT * FROM events';
        const params = [];

        if (searchTerm) {
            // Use ILIKE for case-insensitive search on the name or location_id
            query += ' WHERE name ILIKE $1'; // Search only by name, as location_id is a foreign key
            params.push(`%${searchTerm}%`);
        }

        const results = await pool.query(query, params);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const getEventById = async (req, res) => {
    const { id } = req.params; // Get ID from the request parameters

    try {
        const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(result.rows[0]); // Send the single event back
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

export default {
    getEvents,
    getEventById, // Add this line to export the new function
};


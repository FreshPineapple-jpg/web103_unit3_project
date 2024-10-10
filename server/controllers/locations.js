import { pool } from '../config/database.js';

const getLocations = async (req, res) => {
    const searchTerm = req.query.search; // Optional search term

    try {
        let query = 'SELECT * FROM locations';
        const params = [];

        if (searchTerm) {
            // Use ILIKE for case-insensitive search on the name or address
            query += ' WHERE name ILIKE $1 OR address ILIKE $1';
            params.push(`%${searchTerm}%`);
        }

        const results = await pool.query(query, params);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

export default {
    getLocations,
};

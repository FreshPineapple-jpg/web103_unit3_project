import { pool } from './database.js'
import locationData from '../data/location_data.js'
import eventData from '../data/event_data.js'

// Create Events Table
const createEventsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS events;  -- Drop events first to remove dependency
        DROP TABLE IF EXISTS locations;

        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255),
            image_url VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            start_time TIMESTAMP NOT NULL,
            location_id INT REFERENCES locations(id) ON DELETE CASCADE,
            image_url VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    
    try {
        await pool.query(createTableQuery);
        console.log('🎉 Locations and events tables created successfully');
    } catch (err) {
        console.error('⚠️ Error creating tables', err);
    }
};

// Seed Locations Table
const seedLocationsTable = async () => {
    await createEventsTable(); // Create both tables at once

    try {
        for (const location of locationData) {
            const insertQuery = {
                text: 'INSERT INTO locations (name, address, image_url) VALUES ($1, $2, $3)',
                values: [location.name, location.address, location.image_url]
            };

            await pool.query(insertQuery);
            console.log(`✅ ${location.name} added successfully`);
        }
    } catch (err) {
        console.error('⚠️ Error inserting location', err);
    }
};

// Seed Events Table
const seedEventsTable = async () => {
    try {
        for (const event of eventData) {
            const insertQuery = {
                text: 'INSERT INTO events (name, start_time, location_id, image_url) VALUES ($1, $2, $3, $4)',
                values: [event.name, event.start_time, event.location_id, event.image_url]
            };

            await pool.query(insertQuery);
            console.log(`✅ ${event.name} added successfully`);
        }
    } catch (err) {
        console.error('⚠️ Error inserting event', err);
    }
};

// Seed both tables
const seedDatabase = async () => {
    try {
        await seedLocationsTable();
        await seedEventsTable(); // Now this should work without issues
        console.log('🎉 Database seeded successfully');
    } catch (err) {
        console.error('⚠️ Error seeding the database', err);
    } finally {
        pool.end(); // Close the database connection when done
    }
};

seedDatabase();

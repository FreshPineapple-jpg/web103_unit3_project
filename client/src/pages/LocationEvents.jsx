import React, { useState, useEffect } from 'react';
import Event from '../components/Event';
import EventsAPI from '../../services/EventsAPI'; // Ensure this path is correct
import LocationsAPI from '../../services/LocationsAPI'; // Ensure this path is correct
import '../css/LocationEvents.css';

const LocationEvents = ({ index }) => {
    const [location, setLocation] = useState({});
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchLocationAndEvents = async () => {
            try {
                const locationsData = await LocationsAPI.getAllLocations();
                console.log("Fetched Locations:", locationsData);
                const selectedLocation = locationsData[index - 1];

                setLocation(selectedLocation); // Set the selected location

                const eventsData = await EventsAPI.getAllEvents(); // Get all events
                const filteredEvents = eventsData.filter(event => event.location_id === selectedLocation.id);

                setEvents(filteredEvents); // Set the filtered events
            } catch (error) {
            }
        };

        fetchLocationAndEvents(); // Call the fetch function
    }, [index]);

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.image_url} alt={location.name} /> {/* Updated to use image_url */}
                </div>

                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p>{location.address}</p>
                </div>
            </header>

            <main>
                {
                    events.length > 0 ? events.map((event) =>
                        <Event
                            key={event.id}
                            id={event.id}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    );
};

export default LocationEvents;

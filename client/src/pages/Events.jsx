import React, { useState, useEffect } from 'react';
import Event from '../components/Event';
import EventsAPI from '../../services/EventsAPI';
import LocationsAPI from '../../services/LocationsAPI';
import '../css/Event.css';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    
    useEffect(() => {
        const fetchEventsAndLocations = async () => {
            try {
                const eventsData = await EventsAPI.getAllEvents(); 
                setEvents(eventsData); 

                const locationsData = await LocationsAPI.getAllLocations(); 
                setLocations(locationsData); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchEventsAndLocations(); 
    }, []);

    const filteredEvents = selectedLocation ? events.filter(event => event.location_id === parseInt(selectedLocation)) : events;

    return (
        <div className='events-page'>
            <header>
                <h1>See events at...</h1>
                <div className='location-dropdown'>
                    <select 
                        value={selectedLocation} 
                        onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                        <option value=''>All Locations</option>
                        {locations.map(location => (
                            <option key={location.id} value={location.id}>
                                {location.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={() => setSelectedLocation('')}>Show All Events</button>
                </div>
            </header>

            <main className='event-cards-container'> {/* Added this class for proper styling */}
                {filteredEvents.length > 0 ? (
                    filteredEvents.map(event => (
                        <Event
                            key={event.id}
                            id={event.id}
                        />
                    ))
                ) : (
                    <h2>
                        <i className="fa-regular fa-calendar-xmark fa-shake"></i> 
                        {' No events scheduled at this location yet!'}
                    </h2>
                )}
            </main>
        </div>
    );
};

export default Events;

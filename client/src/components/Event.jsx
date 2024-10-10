import React, { useState, useEffect } from 'react';
import '../css/Event.css';
import EventsAPI from '../../services/EventsAPI.jsx'; // Ensure this path is correct

const Event = (props) => {
    const [event, setEvent] = useState({}); // Initialize as an empty object
    const [formattedDate, setFormattedDate] = useState('');
    const [remaining, setRemaining] = useState('');

    // Fetch event data when the component mounts
    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const eventData = await EventsAPI.getEventsById(props.id);
                console.log("Fetched Event Data:", eventData); // Log the fetched event data
                setEvent(eventData); // Set the event data
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };
        fetchEventData();
    }, [props.id]); // Fetch when the ID changes

    useEffect(() => {
        if (event.start_time) {
            // Format the date and time from start_time
            const date = new Date(event.start_time);
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: 'numeric', 
                minute: 'numeric', 
                hour12: true 
            };
            const formattedDateString = date.toLocaleString('en-US', options);
            setFormattedDate(formattedDateString);

            // Calculate remaining time
            const now = new Date();
            const timeDiff = date - now;

            if (timeDiff < 0) {
                // If event has passed
                setRemaining("Event has passed");
            } else {
                // Calculate remaining months and days
                const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30)); // Approximate months
                const days = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)); // Remaining days

                const remainingTimeString = 
                    `${months > 0 ? `${months} month${months > 1 ? 's' : ''}` : ''}` +
                    (months > 0 && days > 0 ? ' & ' : '') + 
                    `${days > 0 ? `${days} day${days > 1 ? 's' : ''}` : ''}`;

                setRemaining(remainingTimeString || 'Less than 1 day');
            }
        }
    }, [event]);

    return (
        <article className='event-information'>
            <img src={event.image_url} alt={event.name} /> {/* Updated to use image_url */}
            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{event.name}</h3> {/* Updated to use name */}
                    <p>
                        <i className="fa-regular fa-calendar fa-bounce"></i>
                        {formattedDate}
                    </p>
                    <p id={`remaining-${event.id}`}>{remaining}</p>
                </div>
            </div>
        </article>
    );
};

export default Event;

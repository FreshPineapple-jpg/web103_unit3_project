// Example EventsAPI.js
import axios from 'axios';

const EventsAPI = {
    getEventsById: async (id) => {
        const response = await axios.get(`/api/events/${id}`); 
        return response.data;
    },
    getAllEvents: async () => {
        const response = await axios.get('/api/events');
        return response.data;
    }
};

export default EventsAPI;


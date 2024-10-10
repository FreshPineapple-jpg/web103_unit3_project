import axios from 'axios';

const API_BASE_URL = '/api/locations';  

export const getAllLocations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/`); 
    console.log("Locations Data:", response.data);  
    return response.data;
  } catch (error) {
    console.error("Error fetching locations:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getLocationById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching location with id ${id}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

export default { getAllLocations, getLocationById };

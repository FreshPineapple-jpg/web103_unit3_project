import express from 'express'
import LocationsController from '../controllers/locations.js'

const location_router = express.Router()

location_router.get('/', LocationsController.getLocations)
  
export default location_router
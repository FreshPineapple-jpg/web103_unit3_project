import express from 'express'
import EventsController from '../controllers/events.js'

const events_router = express.Router()

events_router.get('/', EventsController.getEvents)
events_router.get('/:id', EventsController.getEventById); 
  
export default events_router
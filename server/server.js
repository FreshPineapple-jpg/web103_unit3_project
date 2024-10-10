import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import dotenv from 'dotenv'
import events_router from './routes/events.js'
import locations_router from './routes/locations.js'
import cors from 'cors';

dotenv.config()

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.json())

app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'party.png')))
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'party.png')))
    app.use(express.static('public'))
}

app.use('/api/events', events_router);  
app.use('/api/locations', locations_router);  

if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})
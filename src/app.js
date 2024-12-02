const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: ['http://localhost:8080', 'https://rambhub.vercel.app']
}));

const accesses_routes = require('./routes/routesAccess.js');
const comments_routes = require('./routes/routesComment.js');
const projects_routes = require('./routes/routesProject.js');
const subtasks_routes = require('./routes/routesSubtask.js');
const tag_routes = require('./routes/routesTag.js');
const tickets_routes = require('./routes/routesTicket.js');
const ticketTags_routes = require('./routes/routesTicketTag.js');

const port = process.env.PORT || 3001;
const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error:', error));

app.use(express.json());
app.use('/api/accesses', accesses_routes);
app.use('/api/comments', comments_routes);
app.use('/api/projects', projects_routes);
app.use('/api/subtasks', subtasks_routes);
app.use('/api/tags', tag_routes);
app.use('/api/tickets', tickets_routes);
app.use('/api/ticketTags', ticketTags_routes);

app.listen(port, () => {
  console.log(`Server is running and listening on port ${port}`);
});
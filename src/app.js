const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

const tickets_routes = require('./routes/routesTicket.js');
const clients_routes = require('./routes/routesClient.js');
const developers_routes = require('./routes/routesDeveloper.js');
const projects_routes = require('./routes/routesProject.js');
const comments_routes = require('./routes/routesComment.js');
const accesses_routes = require('./routes/routesAccess.js');
const tags_routes = require('./routes/routesTag.js');
const ticketTags_routes = require('./routes/routesTicketTag.js');
const subtasks_routes = require('./routes/routesSubtask.js');

const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error:', error));

app.use(express.json());
app.use('/api/tickets', tickets_routes);
app.use('/api/clients', clients_routes);
app.use('/api/developers', developers_routes);
app.use('/api/projects', projects_routes);
app.use('/api/comments', comments_routes);
app.use('/api/accesses', accesses_routes);
app.use('/api/tags', tags_routes);
app.use('/api/ticketTags', ticketTags_routes);
app.use('/api/subtasks', subtasks_routes);

app.listen(port, () => {
  console.log(`Server is running and listening on port ${port}`);
});
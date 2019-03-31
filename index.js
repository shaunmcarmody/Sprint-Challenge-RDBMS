const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const projects = require('./controllers/projects/projects.routes.js');
const actions = require('./controllers/actions/actions.routes.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/projects', projects);
server.use('/api/actions', actions);

server.listen(5000, console.log('Listening on port 5000'));
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const projects = require('./projects/');
const actions = require('./actions/');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/projects', projects);
server.use('/api/actions', actions);

server.listen(5000, console.log('Listening on port 5000'));
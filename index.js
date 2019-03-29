const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.listen(5000, console.log('Listening on port 5000'));
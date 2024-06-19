const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { prismaMiddleware } = require('../middleware/prisma');
const cookieParser = require('cookie-parser');

const router = require('./router');

const { MORGAN_FORMAT } = require('../config/application');
const app = express();

app.use(morgan(MORGAN_FORMAT));
app.use(cookieParser());
app.use(cors());
app.use(prismaMiddleware);
app.use(express.json());

module.exports = router.apply(app);

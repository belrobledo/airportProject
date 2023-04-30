const authRouter = require('./authRoutes');
const locationRouter = require('./locationRoutes');
const airportRouter = require('./airportRoutes');
const employeeRouter = require('./employeeRoutes');
const userRouter = require('./userRoutes');
const airplaneRouter = require('./airplaneRoutes');
const flightRouter = require('./flightRoutes');
const invoiceRouter = require('./invoiceRoutes');
const bookingRouter = require('./bookingRoutes');
const ticketRouter = require('./ticketRoutes');

module.exports = [
  authRouter,
  locationRouter,
  airportRouter,
  employeeRouter,
  userRouter,
  airplaneRouter,
  flightRouter,
  invoiceRouter,
  bookingRouter,
  ticketRouter
];
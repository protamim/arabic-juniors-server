import "dotenv/config";
import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import cors from "cors";
import {connectDB} from './db';

// import passport setup
import './passport.config';


// import routes
import homeRoutes from "./routes/homeRoutes";
import registrationRoute from "./routes/registrationRoutes";
import authRoutes from './routes/auth';
import passport from "passport";
import session from 'express-session'

// Init the app
const app = express();
const PORT = process.env.PORT || 5000;

// Database
connectDB();

// loads built in middleware
app.use(express.json());
app.use(cors());

// middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'default-secret',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/backend-api", homeRoutes);
app.use("/backend-api", registrationRoute);
app.use('/backend-api', authRoutes);

// Disable X-Powered-By - Security
app.disable("x-powered-by");

// custom 404
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("404!! Sorry can't find that!");
});

// error handler
app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(500).send("Something broke!");
  }
);

// listening the app
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
import "dotenv/config";
import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";

// Import passport setup
import "./config/passport.config";

// Import routes
import homeRoutes from "./routes/homeRoutes";
import registrationRoute from "./routes/registrationRoutes";
import authRoutes from "./routes/auth";
import adminRoutes from './routes/adminRoutes';
import userRoutes from './routes/userRoutes';

// Init the app
const app = express();
const PORT = process.env.PORT || 5000;

// Database connection & start server only after success
connectDB().then(() => {
  // Middleware setup
  app.use(express.json());
  app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

  // Session setup
  const sess = {
    secret: process.env.SESSION_SECRET || "default-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  };

  if (app.get("env") === "production") {
    app.set("trust proxy", 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies in production
  }

  // Middleware for session and passport
  app.use(session(sess));
  app.use(passport.initialize());
  app.use(passport.session());

  // Routes
  app.use("/", homeRoutes);
  app.use("/backend-api", registrationRoute);
  app.use("/backend-api", authRoutes);
  app.use("/backend-api/admin", adminRoutes);
  app.use("/backend-api/", userRoutes);

  // Disable X-Powered-By for security
  app.disable("x-powered-by");

  // Custom 404 handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send("404!! Sorry can't find that!");
  });

  // Global error handler
  app.use(
    (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
      res.status(500).send("Something broke!");
    }
  );

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
  process.exit(1); // Exit if DB connection fails
});

export default app;
import "dotenv/config";
import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import cors from "cors";
import { connectDB } from "./config/db";

// Import routes
import homeRoutes from "./routes/homeRoutes";
import registrationRoute from "./routes/registrationRoutes";
import adminRoutes from "./routes/adminRoutes";
import userRoutes from "./routes/userRoutes";

// Init the app
const app = express();
const PORT = process.env.PORT || 5000;

export const isProduction = process.env.NODE_ENV === "production";

// Database connection & start server only after success
connectDB()
  .then(() => {
    // Middleware setup
    app.use(express.json());
    app.use(
      cors({
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        credentials: true,
      })
    );

    if (isProduction) {
      app.set("trust proxy", 1); // trust first proxy
    }

    // Routes
    app.use("/", homeRoutes);
    app.use("/", registrationRoute);
    app.use("/admin", adminRoutes);
    app.use("/", userRoutes);

    // Disable X-Powered-By for security
    app.disable("x-powered-by");

    // Custom 404 handler
    app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).send("404!! Sorry can't find that!");
    });

    // Global error handler
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

    // Start the server
    app.listen(PORT, () => {
      console.log(`Backend Server is running on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit if DB connection fails
  });

export default app;

import "dotenv/config";
import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import cors from "cors";

// import routes
import homeRoutes from "./routes/homeRoutes";
import registrationRoute from "./routes/registrationRoutes";

// Init the app
const app = express();
const PORT = process.env.PORT || 5000;

// loads built in middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/", homeRoutes);
app.use("/api", registrationRoute);

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

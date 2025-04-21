import { AdminDocument } from "../../models/admin";

declare global {
  namespace Express {
    interface Request {
      user: AdminDocument;
    }
  }
}

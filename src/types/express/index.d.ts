import { AdminDocument } from "../../models/admin";

declare global {
  namespace Express {
    interface User extends AdminDocument {} // extend Express.User
    interface Request {
      user?: AdminDocument;
    }
  }
}

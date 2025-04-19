import { UserDocument } from "../../models/users";

declare global {
  namespace Express {
    interface Request {
      user: UserDocument;
    }
  }
}

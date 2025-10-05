import { Request } from "express";

interface Image {
  imageUrl: string;
  imagePublicId: string;
}

interface AuthenticatedRequest extends Request {
  user_id?: string;
}
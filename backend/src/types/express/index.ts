import { JwtPayload } from "jsonwebtoken";
export type CustomJwtPayload = JwtPayload & {
    id: string;
    email: string;
    name: string;
    role: "SELLER" | "CUSTOMER" | "ADMIN";
    profilePicture: string;
    createdAt: string;
    updatedAt: string;
} 

declare global {
    namespace Express {
        interface Request {
            userInfo?: CustomJwtPayload 
        }
    }
}
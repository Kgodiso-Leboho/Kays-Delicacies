import type { Request } from "express";

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        full_name: string;
        is_admin: boolean;
    };
}
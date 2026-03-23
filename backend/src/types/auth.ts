export interface UserPayload {
    id: string
    full_name: string;
    email: string;
    role?: 'user' | 'admin';
}

export interface AuthResponse {
    user?: UserPayload;
    message: string;
}
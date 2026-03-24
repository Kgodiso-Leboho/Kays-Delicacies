export interface UserPayload {
    id: number
    full_name: string;
    email: string;
    role?: 'user' | 'admin';
}

export interface AuthResponse {
    user?: UserPayload;
    token: string;
}
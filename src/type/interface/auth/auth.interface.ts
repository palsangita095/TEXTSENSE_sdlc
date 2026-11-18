export interface RegisterPayload {
    "name": string,
    "email": string,
    "phone": string,
    "password": string,
    "confirm_password": string,
    "role": string
}

export interface User {
    id: string;
    username: string;
    name: string;
    email: string;
    phone: string;
}


export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    setUser: (user: User) => void;

    // Actions
    login: (credentials: LoginPayload) => Promise<AuthResponse>;
    register: (payload: RegisterPayload) => Promise<AuthResponse>;
    clearError: () => void;
}


export interface LoginPayload {
  username: string;
  password?: string;
}

export interface AuthResponse {
    status: boolean;
    message: string;
    user?: {
        id?: string;
        name?: string;
        email?: string;
        role?: string;
    };
    token?: {
        access?: string;
        refresh?: string;
    }
}

export interface Props {
  children: React.ReactNode;
}
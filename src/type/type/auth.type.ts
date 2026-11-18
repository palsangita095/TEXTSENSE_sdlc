export type RegisterFormValues = {
     name: string;
    email: string;
    phone: string;
    password: string;
    confirm_password: string;
    terms: boolean;
};

export type LoginFormValues = {
    email_or_phone: string;
    password: string;
};

export type User = {
    id: string;
    username?: string;
    name: string;
    email: string;
    phone: string;
    role?: string;
}

export type AuthState = {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    success: boolean;
}

export type AuthToken = {
    access?: string;
    refresh?: string;
};

export type AuthResponse = {
    status: boolean;
    message: string;
    user?: {
        id?: string;
        name?: string;
        email?: string;
        role?: string;
    };
    token?: AuthToken | string;
    access?: string;
    refresh?: string;
    access_token?: string;
    refresh_token?: string;
    tokens?: AuthToken;
};

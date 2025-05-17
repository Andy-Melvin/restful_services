export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginFormData) => Promise<void>;
  signUp: (data: SignUpFormData) => Promise<void>;
  logout: () => Promise<void>;
}

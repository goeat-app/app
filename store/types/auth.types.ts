export interface Tokens {
  access: string;
  refresh: string;
}

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface AuthState {
  accessToken: string;
  refreshToken: string;
  user: UserInfo;
  isAuthenticated: boolean;
  _hasHydrated: boolean;

  setTokens: (tokens: Tokens) => Promise<void>;
  setUser: (user: UserInfo) => void;
  clearAuth: () => Promise<void>;
  setHasHydrated: (state: boolean) => void;
}

export interface LoginResult {
  success: boolean;
  data?: {
    accessToken: string;
    refreshToken: string;
    user?: {
      id: string;
      name: string;
      email: string;
    };
  };
  error?: string;
}

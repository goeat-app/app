export interface LoginResult {
  success: boolean;
  data?: {
    accessToken: string;
    refreshToken: string;
  };
  error?: string;
}

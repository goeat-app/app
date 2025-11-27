export type RegisterUserResult = {
  success: boolean;
  data?: {
    accessToken: string;
    refreshToken: string;
  };
  error?: string;
};

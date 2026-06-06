export type RegisterResponseData = {
  accessToken?: string;
  refreshToken?: string;
  customToken?: string;
};

export type RegisterUserResult = {
  success: boolean;
  data?: RegisterResponseData;
  error?: string;
};

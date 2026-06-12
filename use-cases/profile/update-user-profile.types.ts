export type UpdateUserProfilePayload = {
  name?: string;
  phone?: string;
};

export type UpdateUserProfileResult = {
  success: boolean;
  error?: string;
};

export type UserProfile = {
  name: string;
  phone: string;
};

export type UserProfileUpdateData = {
  phone?: string;
  name: string;
  email: string;
};

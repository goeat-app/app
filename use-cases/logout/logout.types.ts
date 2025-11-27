export interface LogoutSuccess {
  success: true;
}

export interface LogoutError {
  success: false;
  error: string;
}

export type LogoutResult = LogoutSuccess | LogoutError;

export interface CustomError extends Error {
  info?: Record<string, never> | string;
  status?: number;
}

export interface ISWRState {
  error: CustomError;
  isLoading?: boolean;
  mutate?: () => void;
}

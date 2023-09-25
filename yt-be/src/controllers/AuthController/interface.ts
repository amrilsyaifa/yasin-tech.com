export type IStageRegister = "register_remaining_data" | "on_completed";

export interface ILoginGoogleResponse {
  is_success: boolean;
  is_user_exist: boolean;
  go_to: IStageRegister;
  user_id?: string;
  cookie_data?: {
    token: string;
    refreshToken: string;
    maxAge: number;
    maxAgeRefresh: number;
  };
}

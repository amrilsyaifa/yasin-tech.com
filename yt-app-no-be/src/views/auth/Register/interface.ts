export interface IGoogleResponse {
  access_token: string;
}

export interface SocialMediaProps {
  onStart?: () => void;
  onEnd?: () => void;
}

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface IRole {
  id: string;
  title: string;
  slug: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface IMyProfile {
  id: string;
  email: string;
  verified_email: boolean;
  username: string;
  role_id: string;
  created_at: string;
  updated_at: string;
  profile_id?: string;
  last_login: string;
  role: IRole;
  profile: {
    id: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    image?: string;
    user_id: string;
    created_at: string;
    updated_at: string;
    address?: string;
  };
}

interface ISampleState {
  profile: IMyProfile | null;
  setMyProfile: (profile: IMyProfile) => void;
  removeProfile: () => void;
}

const useMyProfile = create<ISampleState>()(
  devtools(
    persist(
      (set) => ({
        profile: null,
        setMyProfile: (profile) => set({ profile }),
        removeProfile: () => set({ profile: null }),
      }),
      {
        name: 'my-profile',
      }
    )
  )
);

export default useMyProfile;

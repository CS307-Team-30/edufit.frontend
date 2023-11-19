export interface Profile {
  user_id: number;
  nickname: string;
  bio: string;
  profile_pic: string;
}

export const initialProfileState: Profile = {
  user_id: -1,
  nickname: 'N/A',
  bio: 'N/A',
  profile_pic: '',
};

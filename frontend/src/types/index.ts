export interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  provider: string;
}

export interface Media {
  id: number;
  title: string;
  type: "MOVIE" | "TV_SHOW";
  director: string;
  budget: string;
  location: string;
  duration: string;
  yearTime: string;
  poster?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  loginWithGoogle: () => void;
  loginWithGitHub: () => void;
  logout: () => void;
}

export interface BasicDetailsTypes {
  firstName: string;
  lastName: string;
  title: string;
  description: string;
  fullName: string;
  email: string;
  location: string;
  avatar: string;
  coverImage: string;
}

export interface MediaListItemTypes {
  id: number;
  url: string;
}
export interface MediaTypes {
  total: number;
  list: MediaListItemTypes[];
}

export interface AttachedfileTypes {
  total: number;
  list: AttachedfileItemTypes[];
}

export interface AttachedfileItemTypes {
  id: number;
  fileName: string;
  size: string;
  downloadUrl: string;
  icon: string;
}
export interface ProfileDetailsTypes {
  basicDetails: BasicDetailsTypes;
}

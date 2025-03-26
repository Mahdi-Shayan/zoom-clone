type Lable =
  | "Home"
  | "Upcoming"
  | "Previous"
  | "Recordings"
  | "Personal Room";

export interface SidebarLinks {
  imgURL: string;
  route: string;
  label: Lable;
}

export type AvatarImages = string[];

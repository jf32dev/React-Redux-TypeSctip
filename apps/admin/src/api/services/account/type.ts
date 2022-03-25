// TODO: we might extend Group from the group list later
export interface MyGroup {
  id: string;
  title: string | null;
  name: string;
  groupType: string | null;
  defaultColour: string | null;
  notes: string | null;
  usersCount: number;
  permissions: number;
}

export interface MyProfile {
  id: string;
  email: string;
  title: string;
  firstName: string;
  lastName: string;
  initial: string;
  thumbnail: string;
  group: MyGroup[];
}

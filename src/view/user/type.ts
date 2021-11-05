export interface UserState {
  currentUser: {
    _id: Number;
    name: string | null;
    mail: string | null;
  }
}
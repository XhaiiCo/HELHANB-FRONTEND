export interface DtoInputMyConversations {
  id: number;
  recipient: {
    id: number ;
    firstName: string;
    lastName: string;
    profilePicturePath: string;
  };
}

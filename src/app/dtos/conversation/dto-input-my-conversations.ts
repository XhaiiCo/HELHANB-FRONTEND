export interface DtoInputMyConversations {
  id: number;
  recipient: {
    firstName: string;
    lastName: string;
    profilePicturePath: string;
  };
}

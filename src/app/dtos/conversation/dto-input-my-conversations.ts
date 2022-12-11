export interface DtoInputMyConversations {
  id: number;
  messageNotView: boolean;
  recipient: {
    id: number;
    firstName: string;
    lastName: string;
    profilePicturePath: string;
  };
}

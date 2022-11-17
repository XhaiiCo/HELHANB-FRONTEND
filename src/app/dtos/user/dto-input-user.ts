export interface DtoInputUser {
  id: number ;
  firstName: string;
  lastName: string;
  accountCreation: Date ;
  email: string;
  profilePicturePath: string | null ;
  role: Role ;
}

interface Role{
  id: number ;
  name: string ;
}

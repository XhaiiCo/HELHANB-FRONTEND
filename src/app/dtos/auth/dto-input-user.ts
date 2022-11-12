export interface DtoInputUser {
  id: number ;
  firstName: string;
  lastName: string;
  accountCreation: Date ;
  email: string;
  profilePicturePath: string | null ;
  roleId: number ;
  roleName: string ;
}

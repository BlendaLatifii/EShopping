export interface AddUserRequestDto{
    email: string;
    userName:string;
    lastName:string;
    phoneNumber:string;
    password:string;
    confirmPassword:string;
    roleId:string;
}
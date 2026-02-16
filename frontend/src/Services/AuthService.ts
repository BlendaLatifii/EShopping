import axios from "axios";
import Cookies from "js-cookie";
import { LoginResponseDto } from "../Interfaces/User/login-response-dto";
import { LoginRequestDto } from "../Interfaces/User/login-request-dto";
import { SignInRequestDto } from "../Interfaces/User/Signin-dto";
import { RefreshTokenResponseDto } from "../Interfaces/User/RefreshTokenResponseDto";
import { AddUserRequestDto } from "../Interfaces/User/add-user-request-dto";
import { RequestResetPassword } from "../Interfaces/request-reset-password";
import { UserResponseDto } from "../Interfaces/User/user-response-dto";
import { ListItemModel } from "../Interfaces/listItemModel";
import { UpdateUserRequestDto } from "../Interfaces/User/update-user-request-dto";


export class AuthService { 
private static BaseUrl = "https://localhost:7147/api/Authentication";
public static token: string | null = null;
public static role: string | null = null;
public static refreshToken: string | null = null;

public static async Login(user: LoginRequestDto) : Promise<LoginResponseDto>{
try {
      const response = await axios.post<LoginResponseDto>(
        `${AuthService.BaseUrl}/login`,
        user
      );
      if (!response.data) {
        return null!;
      }
      Cookies.set("jwt", response.data.token);
      Cookies.set("refreshToken", response.data.refreshToken);
      Cookies.set("role", response.data.role);
      AuthService.refreshToken = response.data.refreshToken;
      AuthService.token = response.data.token;
      AuthService.role = response.data.role;

      return response.data;
    } catch (error : any) {
      console.log("Login error:", error.response?.data);
  console.log("Status:", error.response?.status);
      return null!;
    }
}

public static async SignIn(model : SignInRequestDto ) :Promise<void>{
const result = await axios.post(`${this.BaseUrl}/signin`, model);
}

public static LogOut(): void {
    console.log('logged out');
    Cookies.remove("jwt");
    Cookies.remove("refreshToken");
    Cookies.remove("role");

    AuthService.token = null;
    AuthService.refreshToken = null;
    AuthService.role = null;
  }
public static async RefreshToken() : Promise<RefreshTokenResponseDto> {
  return await axios.post(`${this.BaseUrl}/refreshToken`, {}, {
   withCredentials: true 
  });
}

public static async GetToken(): Promise<string | null> {
  return Cookies.get("jwt") || null;
}

public static isAdmin() : boolean{
  return Cookies.get("role") === "Admin";
}

public static async AddUser(model : AddUserRequestDto) : Promise<void>{
  await axios.post(`${this.BaseUrl}/add-user`, model);
}

public static async RequestResetPassword(email : string): Promise<void>{
  const result = await axios.post(`${this.BaseUrl}/request-reset-password`, {email});
}

public static async ResetPassword(model : RequestResetPassword) : Promise<void>{
  await axios.post(`${this.BaseUrl}/reset-password`, model);
}

public static async GetUserById(id : string) :  Promise<UserResponseDto>{
  const result = await axios.get(`${this.BaseUrl}/${id}`);
  return result.data;
}

public static async GetAllUsers() : Promise<UserResponseDto[]>{
  const result = await axios.get(`${this.BaseUrl}`);
  return result.data;
}

public static async GetUserDetail() : Promise<UserResponseDto>{
  const result = await axios.get(`${this.BaseUrl}/user-profile`);
  return result.data;
}

public static async DeleteUser(id : string) : Promise<void>{
  await axios.delete(`${this.BaseUrl}/${id}`);
}

public static async UpdateUser(id: string, model : UpdateUserRequestDto) : Promise<void>{
  await axios.put(`${this.BaseUrl}/${id}`, model);
}

public static async GetSelectList(): Promise<ListItemModel[]>{
  const result = await axios.get<ListItemModel[]>(`${this.BaseUrl}/get-role-select-list`);
   return result.data;
}

public static async CountUsers() : Promise<number>{
  const result = await axios.get(`${this.BaseUrl}/count-users`);
  return result.data;
 }
}
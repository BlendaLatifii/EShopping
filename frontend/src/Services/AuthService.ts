import axios from "axios";
import Cookies from "js-cookie";
import { LoginResponseDto } from "../Interfaces/login-response-dto";
import { LoginRequestDto } from "../Interfaces/login-request-dto";
import { AddUserRequestDto } from "../Interfaces/add-user-request-dto";


export class AuthService {
private static BaseUrl = "https://localhost:7147/api/Authentication/";
public static token: string | null = null;
public static role: string | null = null;
public static refreshToken: string | null = null;

public static async Login(user: LoginRequestDto) : Promise<LoginResponseDto>{
try {
      const response = await axios.post<LoginResponseDto>(
        `${AuthService.BaseUrl}login`,
        user
      );
      console.log(response);
      if (!response.data) {
        return null!;
      }
      Cookies.set("jwt", response.data.token);
      Cookies.set("refreshToken", response.data.refreshToken);
      AuthService.refreshToken = response.data.refreshToken;
      AuthService.token = response.data.token;

      return response.data;
    } catch (e) {
      console.log('problem');
      return null!;
    }
}

public static async SignIn(model : AddUserRequestDto ) :Promise<void>{
const result = await axios.post(`${this.BaseUrl}`, model);
}
}
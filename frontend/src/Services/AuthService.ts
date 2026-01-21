import axios from "axios";
import Cookies from "js-cookie";
import { LoginResponseDto } from "../Interfaces/User/login-response-dto";
import { LoginRequestDto } from "../Interfaces/User/login-request-dto";
import { SignInRequestDto } from "../Interfaces/User/Signin-dto";
import { RefreshTokenResponseDto } from "../Interfaces/User/RefreshTokenResponseDto";


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
      if (!response.data) {
        return null!;
      }
      Cookies.set("jwt", response.data.token);
      Cookies.set("refreshToken", response.data.refreshToken);
      AuthService.refreshToken = response.data.refreshToken;
      AuthService.token = response.data.token;

      return response.data;
    } catch (error : any) {
      console.log("Login error:", error.response?.data);
  console.log("Status:", error.response?.status);
      return null!;
    }
}

public static async SignIn(model : SignInRequestDto ) :Promise<void>{
const result = await axios.post(`${this.BaseUrl}signin`, model);
}

public static async RefreshToken() : Promise<RefreshTokenResponseDto> {
    return await axios.post(`${this.BaseUrl}/refreshToken`, {}, {
      withCredentials: true 
    });
}

public static async GetToken(): Promise<string | null> {
  return Cookies.get("jwt") || null;
}
}
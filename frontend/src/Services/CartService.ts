import axios from "axios";
import { CartDto } from "../Interfaces/CartDto";

export class CartService {

private static BaseUrl = "https://localhost:7147/api/Cart";

   public static async GetCartAsync() : Promise<CartDto>{
    var result = await axios.get(`${this.BaseUrl}`);
    return result.data;
   }
}
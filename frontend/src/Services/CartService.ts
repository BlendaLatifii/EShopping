import axios from "axios";
import { CartDto } from "../Interfaces/CartDto";

export class CartService {

private static BaseUrl = "https://localhost:7147/api/Cart";

  public static async AddToCart(productId: string, quantity : number) : Promise<void> {
  try {
    await axios.post(`${this.BaseUrl}?quantity=${quantity}`, productId);
  } catch (error: any) {
    console.error("Add to cart failed:", error.response?.data || error.message);
  }
}

   public static async GetCartAsync() : Promise<CartDto>{
    var result = await axios.get(`${this.BaseUrl}`);
    return result.data;
   }
}
import axios from "axios";
import { AddCartItemRequestDto } from "../Interfaces/CartItem/add-cartItem-dto";
import { CartItemResponseDto } from "../Interfaces/CartItem/cartItem-response-dto";

export class CartItemService {

private static BaseUrl = "https://localhost:7147/api/CartItem";
 
 
   public static async AddCartItem(model : AddCartItemRequestDto) : Promise<void>{
    await axios.post(`${this.BaseUrl}`, model);
   }

   public static async GetAllCartItems() : Promise<CartItemResponseDto[]>{
    var result = await axios.get(this.BaseUrl);
    return result.data;
   }

   public static async GetCartItemById(id : string) : Promise<CartItemResponseDto>{
    var result = await axios.get(`${this.BaseUrl}/${id}`);
    return result.data;
   }

   public static async CountCartItems() : Promise<number>{
      var result = await axios.get(`${this.BaseUrl}/count-carts`);
      return result.data;
   }

   public static async UpdateCartItem(id: string , quantity: number) : Promise<void>{
    await axios.put(`${this.BaseUrl}/${id}`, {quantity});
   }

   public static async DeleteCartItem(id: string) : Promise<void>{
    await axios.delete(`${this.BaseUrl}/${id}`);
   }
}
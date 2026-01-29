import axios from "axios";
import { AddOrderItemRequestDto } from "../Interfaces/OrderItem/add-orderItem-request-dto";
import { OrderItemResponseDto } from "../Interfaces/OrderItem/orderItem-response-dto";

export class OrderItemService {

private static BaseUrl = "https://localhost:7147/api/OrderItem";
 
 
   public static async AddOrderItem(model : AddOrderItemRequestDto ) : Promise<void>{
    await axios.post(`${this.BaseUrl}`, model);
   }

   public static async GetAllOrderItems() : Promise<OrderItemResponseDto[]>{
    var result = await axios.get(this.BaseUrl);
    return result.data;
   }

   public static async GetOrderItemById(id : string) : Promise<OrderItemResponseDto>{
    var result = await axios.get(`${this.BaseUrl}/${id}`);
    return result.data;
   }

   public static async DeleteOrderItem(id: string) : Promise<void>{
    await axios.delete(`${this.BaseUrl}/${id}`);
   }
}
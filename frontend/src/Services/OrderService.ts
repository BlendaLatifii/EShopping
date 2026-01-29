import axios from "axios";
import { OrderResponseDto } from "../Interfaces/Order/order-response-dto";

export class OrderService {

private static BaseUrl = "https://localhost:7147/api/Order";
 
 
   public static async AddOrder() : Promise<string>{
    var result = await axios.post(`${this.BaseUrl}`);
    return result.data;
   }

   public static async GetAllOrders() : Promise<OrderResponseDto[]>{
    var result = await axios.get(this.BaseUrl);
    return result.data;
   }

   public static async GetOrderOfUser() : Promise<OrderResponseDto>{
    var result = await axios.get(`${this.BaseUrl}/order-of-user`);
    return result.data;
   }

   public static async GetOrderById(id : string) : Promise<OrderResponseDto>{
    var result = await axios.get(`${this.BaseUrl}/${id}`);
    return result.data;
   }

   public static async DeleteOrder(id: string) : Promise<void>{
    await axios.delete(`${this.BaseUrl}/${id}`);
   }
}
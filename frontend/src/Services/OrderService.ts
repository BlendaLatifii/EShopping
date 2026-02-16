import axios from "axios";
import { OrderResponseDto } from "../Interfaces/Order/order-response-dto";
import { DailySalesDto } from "../Interfaces/Order/DailySalesDto";

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

   public static async CountOrders() : Promise<number>{
       const result = await axios.get(`${this.BaseUrl}/count-orders`);
      return result.data;
   }

   public static async GetDailySalesAsync() : Promise<DailySalesDto[]>{
      const result = await axios.get(`${this.BaseUrl}/daily-sales`);
      return result.data;
   }
}
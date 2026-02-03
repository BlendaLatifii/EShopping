import axios from "axios";
import { OrderStatusResponseDto } from "../Interfaces/OrderStatus/orderStatus-response-dto.ts";
import { AddOrderStatusRequestDto } from "../Interfaces/OrderStatus/add-orderStatus-dto.ts";
import { UpdateOrderStatusRequestDto } from "../Interfaces/OrderStatus/update-orderStatus-dto.ts";

export class OrderStatusService {

private static BaseUrl = "https://localhost:7147/api/OrderStatus";
 
 
   public static async AddOrderStatus(model : AddOrderStatusRequestDto) : Promise<void>{
    await axios.post(`${this.BaseUrl}`, model);
   }

   public static async GetAllOrderStatuses() : Promise<OrderStatusResponseDto[]>{
    var result = await axios.get(this.BaseUrl);
    return result.data;
   }

   public static async GetOrderStatusById(id : string) : Promise<OrderStatusResponseDto>{
    var result = await axios.get(`${this.BaseUrl}/${id}`);
    return result.data;
   }

   public static async UpdateOrderStatus(id: string , model : UpdateOrderStatusRequestDto) : Promise<void>{
    await axios.put(`${this.BaseUrl}/${id}`, model);
   }

   public static async DeleteOrderStatus(id: string) : Promise<void>{
    await axios.delete(`${this.BaseUrl}/${id}`);
   }
}
import axios from "axios";
import { AddPaymentMethodRequestDto } from "../Interfaces/PaymentMethod/add-paymentMethod-dto";
import { UpdatePaymentMethodRequestDto } from "../Interfaces/PaymentMethod/update-paymentMethod-dto";
import { PaymentMethodResponseDto } from "../Interfaces/PaymentMethod/paymentMethod-response-dto";

export class PaymentMethodService {

private static BaseUrl = "https://localhost:7147/api/PaymentMethod";
 
 
   public static async AddPaymentMethod(model : AddPaymentMethodRequestDto) : Promise<void>{
    await axios.post(`${this.BaseUrl}`, model);
   }

   public static async GetAllPaymentMethods() : Promise<PaymentMethodResponseDto[]>{
    var result = await axios.get(this.BaseUrl);
    return result.data;
   }

   public static async GetPaymentMethodById(id : string) : Promise<PaymentMethodResponseDto>{
    var result = await axios.get(`${this.BaseUrl}/${id}`);
    return result.data;
   }

   public static async UpdatePaymentMethod(id: string , model : UpdatePaymentMethodRequestDto) : Promise<void>{
    await axios.put(`${this.BaseUrl}/${id}`, model);
   }

   public static async DeletePaymentMethod(id: string) : Promise<void>{
    await axios.delete(`${this.BaseUrl}/${id}`);
   }
}
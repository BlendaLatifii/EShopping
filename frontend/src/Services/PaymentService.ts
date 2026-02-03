import axios from "axios";
import { AddPaymentRequestDto } from "../Interfaces/Payment/AddPaymentRequestDto.ts";
import { PaymentResponseDto } from "../Interfaces/Payment/PaymentResponseDto.ts";
import { UpdatePaymentRequestDto } from "../Interfaces/Payment/UpdatePaymentRequestDto.ts";

export class PaymentService{
private static BaseUrl = "https://localhost:7147/api/Payment";

public static async AddPayment(model : AddPaymentRequestDto) : Promise<void>{
    await axios.post(`${this.BaseUrl}`, model);
   }

   public static async GetAllPayments() : Promise<PaymentResponseDto[]>{
    var result = await axios.get(this.BaseUrl);
    return result.data;
   }

   public static async GetPaymentById(id : string) : Promise<PaymentResponseDto>{
    var result = await axios.get(`${this.BaseUrl}/${id}`);
    return result.data;
   }

   public static async UpdatePayment(id : string, model : UpdatePaymentRequestDto) : Promise<void>{
    await axios.put(`${this.BaseUrl}/${id}`, model);
   }

   public static async DeletePayment(id: string) : Promise<void>{
    await axios.delete(`${this.BaseUrl}/${id}`);
   }
}
import { OrderItemResponseDto } from "../OrderItem/orderItem-response-dto";

export interface OrderResponseDto{
    id:string;
    orderTime:Date;
    totalAmmount:number;
    items:OrderItemResponseDto[];
}
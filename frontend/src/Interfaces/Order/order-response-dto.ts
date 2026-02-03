import { OrderItemResponseDto } from "../OrderItem/orderItem-response-dto";

export interface OrderResponseDto{
    id:string;
    orderTime:Date;
    orderStatusId:string;
    orderStatus:string;
    totalAmmount:number;
    items:OrderItemResponseDto[];
}
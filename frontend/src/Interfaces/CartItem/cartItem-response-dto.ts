export interface CartItemResponseDto{
    id:string;
    productId:string;
    productName:string;
    imageUrl:string;
    quantity:number;
    unitPrice:number;
    totalPrice:number;
}
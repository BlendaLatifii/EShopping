export interface AddCartItemRequestDto{
    quantity:number;
    productId:string;
    cardId?:string;
}
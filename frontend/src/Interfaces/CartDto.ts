import { CartItemResponseDto } from "./CartItem/cartItem-response-dto.ts";

export interface CartDto {
  id: string;
  items: CartItemResponseDto[];
  totalPrice: number;
}
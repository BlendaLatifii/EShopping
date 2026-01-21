export interface AddProductRequestDto{
    images:File[];
    name:string;
    description:string;
    price:number;
    categoryId:string;
}
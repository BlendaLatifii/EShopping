export interface UpdateProductRequestDto{
    images:File[] | null;
    name:string |  null;
    description:string | null;
    price:number | null;
    categoryId:string | null;
}
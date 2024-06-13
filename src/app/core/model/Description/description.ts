import { InforProduct } from "../Product/infor-product";

export class Description{
    id !: number;
    guarantee !: String;
    mass !: String;
    cpu !: String;
    screen !: String;
    storage !: String;
    graphíc !: String;
    battery !: String;
    operating_system !: String;
    ram !: number;
    other !: String;
    created_at !: Date
    updated_at !: Date;
    product !: InforProduct
}
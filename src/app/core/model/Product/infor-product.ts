import { Category } from "../Category/category";
import { Description } from "../Description/description";

export class InforProduct{
    id !: number;
    name !: String;
    quantity !: number;
    price !: number;
    slug !: String;
    status !: String;
    avatar !: String;
    evaluate !: String;
    size !: String;
    color !: String;
    brand !: String;
    created_at !: Date;
    updated_at !: Date;
    images!: string[];
    category !: Category;
    description !: Description
} 
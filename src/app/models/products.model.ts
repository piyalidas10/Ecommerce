import { Deserializable } from '@ecommerce/models/deserializable.model';
export class Products implements Deserializable {
    products?: Array<Product>;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

export class Product implements Deserializable {
    Category?: string;
    CurrencyCode?: string;
    DateOfEntry?: string;
    DateOfSale?: string;
    Description?: string;
    Price?: number;
    ProductPicUrl?: string;
    Quantity?: number;
    Status?: string;
    SubCategory?: string;
    SupplierName?: string;
    WeightMeasure: number;
    WeightUnit?: string;
    deliveryPrice?: number;
    _id: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

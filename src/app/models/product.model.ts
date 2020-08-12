import { Deserializable } from '@ecommerce/models/deserializable.model';

export class Product implements Deserializable {
    public _id: string;
    public Category?: string;
    public CurrencyCode?: string;
    public DateOfEntry?: string;
    public DateOfSale?: string;
    public Description?: string;
    public Price?: number;
    public ProductPicUrl?: string;
    public Quantity?: number;
    public Status?: string;
    public SubCategory?: string;
    public SupplierName?: string;
    public WeightMeasure?: number;
    public WeightUnit?: string;
    public deliveryPrice?: number;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

    getWeight() {
        return this.WeightMeasure + ' ' + this.WeightUnit;
    }
}

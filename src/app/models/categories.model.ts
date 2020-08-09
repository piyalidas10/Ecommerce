import { Deserializable } from '@ecommerce/models/deserializable.model';
export class Categories implements Deserializable {
    public _id: string;
    public catDesc?: number;
    public catId?: string;
    public catName?: string;
    public subCat?: Array<any>;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

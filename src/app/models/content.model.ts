import { Deserializable } from '@ecommerce/models/deserializable.model';
export class Content implements Deserializable {
    catDesc?: number;
    catId?: string;
    catName?: string;
    subCat?: Array<any>;
    _id: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

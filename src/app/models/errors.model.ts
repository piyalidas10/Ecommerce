import { Deserializable } from '@ecommerce/models/deserializable.model';
export class Errors implements Deserializable {
    public _id: object;
    public errorslist?: object;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

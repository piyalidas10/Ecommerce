import { Deserializable } from '@ecommerce/models/deserializable.model';
export class Errors implements Deserializable {
    _id?: object;
    errorslist?: object;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

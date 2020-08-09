import { Deserializable } from '@ecommerce/models/deserializable.model';

export class Customer implements Deserializable {
    public _id: object;
    public customerEmail?: string;
    public customerPass?: string;
    public customerFirstName?: string;
    public customerMiddleName?: string;
    public customerLastName?: string;
    public customerGender?: string;
    public customerDOB?: Date;
    public customerCity?: string;
    public customerState?: string;
    public customerZip?: string;
    public customerAddress?: string;
    public customerMobile?: string;
    public customerCountry?: string;
    public customerRegisterDate?: Date;
    public custtomerStatus?: boolean;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

    getFullName() {
        return this.customerFirstName + ' ' + this.customerMiddleName + ' ' + this.customerLastName;
    }
}

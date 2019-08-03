import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ValidationMessageService {

  validationErrorObj = [];

  public getValidationMsg(validationId: string): string {
    console.log(validationId);
    return this.validationErrorObj[validationId];
  }

}

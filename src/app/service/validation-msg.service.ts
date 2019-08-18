import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ValidationMessageService {

  validationErrorObj = [];

  public getValidationMsg(validationId: string): string {
    return this.validationErrorObj[validationId];
  }

}

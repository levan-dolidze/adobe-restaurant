import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }


  static customValidation(input: FormControl): ValidationErrors | null {

    const value = input.value
    if (value) {
      if ((value as string).includes('@')) {
        return {
          customEmailValidation: true
        }
      }
      return null
    }

    return null





  }
}

import { AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import * as libphonenumber from 'google-libphonenumber';

export class PhoneValidator {

  static validCountryPhone = (phoneControl: FormControl) => {

    //   if (!subscribe) {
    //     subscribe = true;
    //     countryControl.valueChanges.subscribe(() => {
    //       phoneControl.updateValueAndValidity();
    //     });
    //   }

      if (phoneControl.value !== '') {
        try {

          const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
          const phoneNumber = '' + phoneControl.value + '';
          const region = 'US';
          const pNumber = phoneUtil.parseAndKeepRawInput(phoneNumber, region);
          const isValidNumber = phoneUtil.isValidNumber(pNumber);

          if (isValidNumber) {
            return undefined;
          }
        } catch (e) {
          console.log(e);
          return {
            validCountryPhone: true
          };
        }

        return {
          validCountryPhone: true
        };
      } else {
        return undefined;
      }
    };
  }
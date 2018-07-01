import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { PhoneNumberUtil, PhoneNumber, PhoneNumberFormat, AsYouTypeFormatter } from 'google-libphonenumber';
import { parse, format, AsYouType } from 'libphonenumber-js';
import { PhoneValidator } from "./Validators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    private phoneForm;
    public regionValue = 'US';
    public phoneNumber;
    formatter = new AsYouTypeFormatter(this.regionValue);

    public countries = [
        {
            display: "Mozambique (+258)",
            value: "MZ"
        },
        {
            display: "United States (+1)",
            value: "US"
        },
        {
            display: "Zimbabwe (+263)",
            value: "ZW"
        }
        ];
    constructor(@Inject(FormBuilder) fb: FormBuilder) {
        this.phoneForm = new FormGroup({
            country: new FormControl('US', Validators.required),
            phone: new FormControl(this.phoneNumber, Validators.compose([
            Validators.required,
            this.validCountryPhone.bind(this)
            ]))
        });
    }
    
    ngOnInit() {}

    updateRegion(event: any) {
        console.log(event.target.value);
        this.regionValue = event.target.value;
        this.validCountryPhone(this.phoneForm.controls['phone']);
    }

    numberFormatter(number) {
        var asYouType = new AsYouType('US').input(this.phoneNumber)
    }

    getExampleNumber(region) {
        try {
            var phoneUtil = PhoneNumberUtil.getInstance();
            //var numberObj = phoneUtil.getExampleNumber(region);
            // var format = PhoneNumberFormat.NATIONAL;
            // return phoneUtil.format(numberObj, format);
        } catch (e) {
            return "";
        }
    };

    validCountryPhone = (phoneControl: FormControl) => {

    //   if (!subscribe) {
    //     subscribe = true;
    //     countryControl.valueChanges.subscribe(() => {
    //       phoneControl.updateValueAndValidity();
    //     });
    //   }

      if (phoneControl.value !== '') {
        try {
            console.log(this.regionValue);
            // this.phoneNumber = new AsYouType('US').input(phoneControl.value);
            if(phoneControl.value !== null) {
                console.log(this.formatter.inputDigit(phoneControl.value.slice(-1)));        
            }
        
            //this.formatter.clear();
            const phoneUtil = PhoneNumberUtil.getInstance();
            const pNumber = phoneUtil.parseAndKeepRawInput(phoneControl.value, this.regionValue);
            const isValidNumber = phoneUtil.isValidNumber(pNumber);

          if (isValidNumber) {
              console.log('valid!');
            return undefined;
          }
        } catch (e) {
          console.log(e);
          return {
            validCountryPhone: true
          };
        }
        console.log('not valid');
        return {
          validCountryPhone: true
        };
      } else {
        return undefined;
      }
    };
}

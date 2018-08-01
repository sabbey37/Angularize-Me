import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
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
    public phoneNumber = '';

    // @Output()
    // phoneChange = new EventEmitter<string>();

    // @Input()
    // get phone(){
    //     return this.phoneNumber.value;
    // }
    
    // set phone(val) {
    //     this.phoneNumber.value = val;
    //     this.phoneChange.emit(this.phoneNumber.value);
    // }
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
    
    ngOnInit() {
        // this.phoneForm.controls['phone'].patchValue('yellow');
        // const phoneCtrl = this.phoneForm.controls['phone'];
        // const changes$ = phoneCtrl.valueChanges;
        // changes$.subscribe(change => {
        //     var formatter = new AsYouTypeFormatter(this.regionValue);
        //     var formatted;
        //     console.log(this.regionValue);
        //     // this.phoneNumber = new AsYouType('US').input(phoneControl.value);
        //     if(change !== null && change !== undefined) {
        //         change.split('').forEach(digit => {
        //             formatted = formatter.inputDigit(digit);   
        //         });    
        //         console.log(formatted);
        //         // this.phoneForm.controls['phone'].patchValue(change);
        //     }
        // });
    }

    updateRegion(event: any) {
        console.log(event.target.value);
        this.regionValue = event.target.value;
        this.validCountryPhone(this.phoneForm.controls['phone']);
    }

    // numberFormatter(number) {
    //     var asYouType = new AsYouType('US').input(this.phoneNumber)
    // }

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
            //this.formatter.clear();
            const phoneUtil = PhoneNumberUtil.getInstance();
            const pNumber = phoneUtil.parseAndKeepRawInput(phoneControl.value, this.regionValue);
            const isValidNumber = phoneUtil.isValidNumber(pNumber);

            var formatter = new AsYouTypeFormatter(this.regionValue);
            var formatted;

            console.log(this.regionValue);
            // this.phoneNumber = new AsYouType('US').input(phoneControl.value);
            if(phoneControl.value !== null && phoneControl.value !== undefined) {
                phoneControl.value.split('').forEach(digit => {
                    formatted = formatter.inputDigit(digit);   
                });    
                console.log(formatted);
                this.phoneNumber = '(404)519-0489'
                // this.phoneForm.controls['phone'].patchValue(change);
            }

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

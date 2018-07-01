import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { PhoneNumberUtil, PhoneNumber } from 'google-libphonenumber';
import { PhoneValidator } from "./Validators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    private phoneForm;
    private regionValue = '';

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
            phone: new FormControl('', Validators.compose([
            Validators.required,
            PhoneValidator.validCountryPhone
            ]))
        });
    }
    
    ngOnInit() {}

    updateRegion(event: any) {
        console.log(event);
    }
}

import { Component, OnInit } from '@angular/core';
import {BrokerService} from "../broker.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-broker-form',
  templateUrl: './broker-form.component.html',
  styleUrls: ['./broker-form.component.css']
})
export class BrokerFormComponent implements OnInit {

  formData: Object;
  isShown: Boolean;

  constructor(private data: BrokerService) { }

  ngOnInit() {
    this.data.brokerFormOpenState.subscribe(value => {
      this.isShown = value;
    });
    this.data.brokerFormState.subscribe(value => {
      this.formData = value;
    });
  }

  closeForm() {
    this.data.handleCloseBrokerForm();
  }

  onSubmit(form: NgForm) {
    this.data.saveForm({
      name: form.value.brokerName,
      balance: form.value.brokerCash,
      image_url: form.value.brokerImage
    });
  }

}

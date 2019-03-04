import { Component, OnInit } from '@angular/core';
import {StockService} from "../stock.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  formData: Object;
  isShown: Boolean;

  constructor(private data: StockService) { }

  ngOnInit() {
    this.data.stockFormOpenState.subscribe(value => {
      this.isShown = value;
    });
    this.data.stockFormState.subscribe(value => {
      this.formData = value;
    });
  }

  closeForm() {
    this.data.handleCloseStockForm();
  }

  onSubmit(form: NgForm) {
    this.data.saveForm({
      title: form.value.stockTitle,
      distribution: form.value.stockDistribution,
      quantity: form.value.stockQuantity,
      max_value: form.value.stockMaxValue,
      starting_price: form.value.stockStartingPrice
    });
  }

}

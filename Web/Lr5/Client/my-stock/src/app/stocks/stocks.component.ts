import { Component, OnInit } from '@angular/core';
import {StockService} from "../stock.service";

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  stock: Object;
  objectKeys = Object.keys;

  constructor(private data: StockService) { }

  ngOnInit() {
    this.data.stockState.subscribe(value => {
      this.stock = value;
    });
  }

  handleAddStock() {
    this.data.handleAddStockClicked();
  }

}

import { Component, OnInit, Input } from '@angular/core';
import {StockService} from "../stock.service";

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.css']
})
export class StockCardComponent implements OnInit {

  @Input() stock: Object;
  @Input() stock_id: String;

  constructor(private data: StockService) { }

  ngOnInit() {
  }

  handleDeleteClick() {
    this.data.deleteStock(this.stock_id);
  }

  handleEditClick() {
    this.data.handleCloseStockForm();
    this.data.setEditMode(true);
    this.data.handleEditStockClicked(this.stock_id, this.stock);
  }

}

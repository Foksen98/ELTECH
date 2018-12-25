import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

const BASE_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private stockSubject: BehaviorSubject<Object> = new BehaviorSubject<Object>({});
  public stockState: Observable<any> = this.stockSubject.asObservable();

  private stockFormOpenSubject: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  public stockFormOpenState: Observable<any> = this.stockFormOpenSubject.asObservable();

  private stockFormEditModeSubject: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  public stockFormEditModeState: Observable<any> = this.stockFormEditModeSubject.asObservable();

  private stockFormSubject: BehaviorSubject<Object> = new BehaviorSubject<Object>({
    title: "",
    distribution: "",
    quantity: "",
    max_value: "",
    price: ""
  });

  public stockFormState: Observable<any> = this.stockFormSubject.asObservable();

  private editingStockId: String = null;

  constructor(private httpClient: HttpClient) {
    this.getStock();
  }

  private getStock() {
    this.httpClient.get(BASE_URL + 'stocks').subscribe(value => {
      console.log(value);
      this.stockSubject.next(value);
    });
  }

  private addStock(stockData) {
    this.httpClient.post(BASE_URL + 'stocks/create', stockData).subscribe(value => {
      this.getStock();
    });
  }

  private editStock(id, params) {
    this.httpClient.post(BASE_URL + 'stocks/change', {id: id, params: params}).subscribe(value => {
      this.getStock();
    });
  }

  deleteStock(id) {
    this.httpClient.post(BASE_URL + 'stocks/delete', {id: id}).subscribe(value => {
      this.getStock();
    });
  }

  setEditMode(mode: Boolean) {
    this.stockFormEditModeSubject.next(mode);
  }

  handleAddStockClicked() {
    this.handleCloseStockForm();
    this.stockFormOpenSubject.next(true);
  }

  handleEditStockClicked(stockId: String, stock: Object) {
    this.stockFormSubject.next(stock);
    this.stockFormOpenSubject.next(true);
    this.editingStockId = stockId;
  }

  handleCloseStockForm() {
    this.stockFormOpenSubject.next(false);
    this.stockFormSubject.next({
      title: "",
      distribution: "",
      quantity: "",
      max_value: "",
      price: ""
    });
    this.setEditMode(false);
    this.editingStockId = null;
  }

  saveForm(stock: Object) {
    if (this.stockFormEditModeSubject.getValue()) {
      this.editStock(this.editingStockId, stock);
    } else {
      this.addStock(stock);
    }
    this.handleCloseStockForm();
  }
}

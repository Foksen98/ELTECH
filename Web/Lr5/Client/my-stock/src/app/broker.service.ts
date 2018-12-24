import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

const BASE_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class BrokerService {

  private brokersSubject: BehaviorSubject<Object> = new BehaviorSubject<Object>({});
  public brokersState: Observable<any> = this.brokersSubject.asObservable();

  private brokerFormOpenSubject: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  public brokerFormOpenState: Observable<any> = this.brokerFormOpenSubject.asObservable();

  private brokerFormEditModeSubject: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  public brokerFormEditModeState: Observable<any> = this.brokerFormEditModeSubject.asObservable();

  private brokerFormSubject: BehaviorSubject<Object> = new BehaviorSubject<Object>({
    name: "",
    image_url: "",
    balance: ""
  });

  public brokerFormState: Observable<any> = this.brokerFormSubject.asObservable();

  private editingBrokerId: string = null;

  constructor(private httpClient: HttpClient) {
    this.getBrokers();
  }

  // запросы
  getBrokers() {
    this.httpClient.get(BASE_URL + 'brokers').subscribe(value => {
      this.brokersSubject.next(value);
    });
  }

  deleteBroker(brokerId: string) {
    this.httpClient.post(BASE_URL + 'brokers/delete', {id: brokerId}).subscribe(value => {
      this.getBrokers();
    });
  }

  addBroker(broker: Object) {
    this.httpClient.post(BASE_URL + 'brokers/create', broker).subscribe(value => {
      this.getBrokers();
    });
  }

  editBroker(brokerId: string, broker: Object) {
    this.httpClient.post(BASE_URL + 'brokers/change', {id: brokerId, params: broker}).subscribe(value => {
      this.getBrokers();
    });
  }

  setEditMode(mode: Boolean) {
    this.brokerFormEditModeSubject.next(mode);
  }

  handleAddBrokerClicked() {
    this.handleCloseBrokerForm();
    this.brokerFormOpenSubject.next(true);
  }

  handleEditBrokerClicked(brokerId: string, broker: Object) {
    this.brokerFormSubject.next(broker);
    this.brokerFormOpenSubject.next(true);
    this.editingBrokerId = brokerId;
  }

  handleCloseBrokerForm() {
    this.brokerFormOpenSubject.next(false);
    this.brokerFormSubject.next({
      name: "",
      image_url: "",
      balance: ""
    });
    this.setEditMode(false);
    this.editingBrokerId = null;
  }

  saveForm(broker: Object) {
    if (this.brokerFormEditModeSubject.getValue()) {
      this.editBroker(this.editingBrokerId, broker);
    } else {
      this.addBroker(broker);
    }
    this.handleCloseBrokerForm();
  }
}

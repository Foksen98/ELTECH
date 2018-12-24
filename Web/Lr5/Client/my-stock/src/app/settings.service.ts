import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

const BASE_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private paramsSubject: BehaviorSubject<Object> = new BehaviorSubject<Object>({});
  public paramsState: Observable<any> = this.paramsSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.getSettings();
  }

  getSettings() {
    this.httpClient.get(BASE_URL + 'settings').subscribe(value => {
      this.paramsSubject.next(value);
    });
  }

  saveForm(formData: Object) {
    this.httpClient.post(BASE_URL + 'settings/set', formData).subscribe(value => {
      this.getSettings();
    });
  }
}

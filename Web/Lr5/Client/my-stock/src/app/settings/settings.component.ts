import { Component, OnInit } from '@angular/core';
import {SettingsService} from "../settings.service";
import DateTimeFormat = Intl.DateTimeFormat;
import {NgForm} from "@angular/forms";
import * as moment from 'moment';

const DATETIME_FORMAT = 'YYYY-MM-DDThh:mm';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  start_datetime: string = "";
  end_datetime: string = "";
  timeout: string = "";

  constructor(private data: SettingsService) { }

  ngOnInit() {
    this.data.paramsState.subscribe(value => {
      this.start_datetime = moment(new Date(parseInt(value.start_datetime))).format(DATETIME_FORMAT);
      this.end_datetime = moment(new Date(parseInt(value.end_datetime))).format(DATETIME_FORMAT);
      const duration = moment.duration(parseInt(value.timeout));
      this.timeout = SettingsComponent.addZeroToTimePart(duration.minutes().toString()) + ":" +
                     SettingsComponent.addZeroToTimePart(duration.seconds().toString());
    });
  }

  static addZeroToTimePart(timepart: string) {
    if (timepart.length < 2) {
      return "0" + timepart;
    }
    return timepart;
  }

  static parseTimeout(timeout: string) {
    const splitted = timeout.split(":");
    const mins = parseInt(splitted[0]) * 60 * 1000;
    const secs = parseInt(splitted[1]) * 1000;
    return mins + secs;
  }

  getCurrentDatetime() {
    return moment(new Date()).format(DATETIME_FORMAT);
  }

  // сохранение настроек
  onSubmit(form: NgForm) {
    this.data.saveForm({
      start_datetime: moment(form.value.startDatetime, DATETIME_FORMAT).valueOf(),
      end_datetime: moment(form.value.endDatetime, DATETIME_FORMAT).valueOf(),
      timeout: SettingsComponent.parseTimeout(form.value.timeoutField)
    });
  }
}

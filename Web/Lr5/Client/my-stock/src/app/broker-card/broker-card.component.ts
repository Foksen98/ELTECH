import { Component, OnInit, Input } from '@angular/core';
import {BrokerService} from "../broker.service";

@Component({
  selector: 'app-broker-card',
  templateUrl: './broker-card.component.html',
  styleUrls: ['./broker-card.component.css']
})
export class BrokerCardComponent implements OnInit {

  @Input() broker: Object;
  @Input() broker_id: string;

  constructor(private data: BrokerService) { }

  ngOnInit() {
  }

  handleDeleteClick() {
    this.data.deleteBroker(this.broker_id);
  }

  handleEditClick() {
    this.data.handleCloseBrokerForm();
    this.data.setEditMode(true);
    this.data.handleEditBrokerClicked(this.broker_id, this.broker);
  }

}

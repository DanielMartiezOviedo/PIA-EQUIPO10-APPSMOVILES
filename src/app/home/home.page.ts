/* eslint-disable @typescript-eslint/member-ordering */
import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  eventSource = [];
  viewTitle: string;

  calendar= {
    mode: 'month',
    currentDate: new Date(),
  };

  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  constructor(){}

 }

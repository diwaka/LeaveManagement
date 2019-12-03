import { Component, OnInit } from '@angular/core';
import { Calendar } from '../../models/calendar.model';
import { EnumConverter } from '../../helper/enum-converter';
import { ActiveDayStatus } from '../../enums/active-day-status.enum';

@Component({
  selector: 'app-custom-calendar',
  templateUrl: './custom-calendar.component.html',
  styleUrls: ['./custom-calendar.component.css']
})
export class CustomCalendarComponent implements OnInit {


  public today: Date;
  public currentMonth: number;
  public currentYear: number;
  public selectYear: any;
  public selectMonth: any;
  public months: any[];
  public monthAndYear: any;
  public calendarMonths: any[];
  public calendar: Calendar;
  constructor() { }

  ngOnInit() {
    this.today = new Date();
    this.currentMonth = this.today.getMonth();
    this.currentYear = this.today.getFullYear();
    this.selectYear = document.getElementById("year");
    this.selectMonth = document.getElementById("month");
    this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.monthAndYear = document.getElementById("monthAndYear");
    this.showCalendar(this.currentMonth, this.currentYear);
    this.calendarMonths = EnumConverter.ConvertMonthsEnumToArray();
    // this.shortenMonthName();
    this.calendar = new Calendar();
    this.calendar.minDate = new Date();
  }

  private shortenMonthsName() {
    this.calendarMonths.forEach(month => {
      month.label = month.label.substr(0, 3);
    })
  }


  public next() {
    this.currentYear = (this.currentMonth === 11) ? this.currentYear + 1 : this.currentYear;
    this.currentMonth = (this.currentMonth + 1) % 12;
    this.showCalendar(this.currentMonth, this.currentYear);
  }

  public previous() {
    this.currentYear = (this.currentMonth === 0) ? this.currentYear - 1 : this.currentYear;
    this.currentMonth = (this.currentMonth === 0) ? 11 : this.currentMonth - 1;
    this.showCalendar(this.currentMonth, this.currentYear);
  }

  public jump() {
    this.currentYear = parseInt(this.selectYear.value);
    this.currentMonth = parseInt(this.selectMonth.value);
    this.showCalendar(this.currentMonth, this.currentYear);
  }

  public showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();
    let tbl: any;
    let cell: any;
    let cellText: any;
    tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    this.monthAndYear.innerHTML = this.months[month] + " " + year;
    this.selectYear.value = year;
    this.selectMonth.value = month;


    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
      // creates a table row
      let row = document.createElement("tr");

      //creating individual cells, filing them up with data.
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          cell = document.createElement("td");
          cellText = document.createTextNode("");
          cell.appendChild(cellText);
          row.appendChild(cell);
        }
        else if (date > this.daysInMonth(month, year)) {
          break;
        }

        else {


          let isSelected: boolean = false;
          cell = document.createElement("td");

          cellText = document.createTextNode(date.toString());

          if (date === this.today.getDate() && year === this.today.getFullYear() && month === this.today.getMonth()) {
            cell.classList.add("bg-info");
          } // color today's date
          cell.appendChild(cellText);
          row.appendChild(cell);
          date++;
          this.selectDate(cell, isSelected);
        }

      }

      tbl.appendChild(row); // appending each row into calendar body.
    }
    //By default Sunday are disabled
    this.disableWeekDays(0, ActiveDayStatus.All);
    this.disableWeekDays(6, ActiveDayStatus.Even);
  }

  // check how many days in a month code from https://dzone.com/articles/determining-number-days-month
  public daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
  }

private minMaxDateDisable(month: number, year: number){
let currentDate = new Date(month, year).toDateString();
// if(this.calendar.minDate > new Date(currentDate))


}

  private selectDate(cell: any, isSelected: boolean) {
    cell.addEventListener('click', function (e) {
      isSelected = !isSelected;
      if (isSelected)
        e.target.classList.add("btn-primary");
      else
        e.target.classList.remove("btn-primary");
    });
  }

  private disableWeekDays(weekDay: number, dayStatus: number) {
    switch (weekDay) {
      case 0: this.disableDays(0, dayStatus);
        break;
      case 1: this.disableDays(1, dayStatus);
        break;
      case 2: this.disableDays(2, dayStatus);
        break;
      case 3: this.disableDays(3, dayStatus);
        break;
      case 4: this.disableDays(4, dayStatus);
        break;
      case 5: this.disableDays(5, dayStatus);
        break;
      case 6: this.disableDays(6, dayStatus);
        break;
    }
  }

  private disableDays(weekDay: number, dayStatus: number) {
    var elements = document.getElementsByTagName("tr");
    console.log('elements', elements);

    for (var i = 1; i < elements.length; i++) {
      if (i % 2 == 0 && dayStatus == ActiveDayStatus.Even) {
        if (this.isCellExist(elements, i))
          elements[i].cells[weekDay].setAttribute("style", "opacity: 0.2 !important; pointer-events: none;background: #d8d8d8;");
      }
      else if (i % 2 != 0 && dayStatus == ActiveDayStatus.Odd) {
        if (this.isCellExist(elements, i))
          elements[i].cells[weekDay].setAttribute("style", "opacity: 0.2 !important; pointer-events: none;background: #d8d8d8;");
      }
      else if (dayStatus == ActiveDayStatus.All) {
        if (this.isCellExist(elements, i))
          elements[i].cells[weekDay].setAttribute("style", "opacity: 0.2 !important; pointer-events: none;background: #d8d8d8;");
      }
    }

  }
  private isCellExist(elements: any, index: number) {
    return (elements && elements.length && elements[index].cells && elements[index].cells.length) ? true : false;
  }
}

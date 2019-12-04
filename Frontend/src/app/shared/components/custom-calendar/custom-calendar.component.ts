import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Calendar } from '../../models/calendar.model';
import { EnumConverter } from '../../helper/enum-converter';
import { ActiveDayStatus } from '../../enums/active-day-status.enum';

@Component({
  selector: 'app-custom-calendar',
  templateUrl: './custom-calendar.component.html',
  styleUrls: ['./custom-calendar.component.css']
})
export class CustomCalendarComponent implements OnInit {


  @Output() selectedDate: EventEmitter<Calendar> = new EventEmitter<Calendar>();
  public today: Date;
  public currentMonth: number;
  public currentYear: number;
  public selectYear: any;
  public selectMonth: any;
  public months: any[];
  // public monthAndYear: any;
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
    // this.monthAndYear = document.getElementById("monthAndYear");
    this.calendarMonths = EnumConverter.ConvertMonthsEnumToArray();
    // this.shortenMonthName();
    this.calendar = new Calendar();
    this.showCalendar(this.currentMonth, this.currentYear);
    console.log('calendar', this.calendar);
    // this.calendar.minDate = new Date();
  }

  private shortenMonthsName() {
    this.calendarMonths.forEach(month => {
      month.label = month.label.substr(0, 3);
    })
  }


  public next() {
    console.log('cell click calendar', this.calendar);
    this.currentYear = (this.currentMonth === 11) ? this.currentYear + 1 : this.currentYear;
    this.currentMonth = (this.currentMonth + 1) % 12;
    this.showCalendar(this.currentMonth, this.currentYear);
  }

  public previous() {
    console.log('cell click calendar', this.calendar);
    this.currentYear = (this.currentMonth === 0) ? this.currentYear - 1 : this.currentYear;
    this.currentMonth = (this.currentMonth === 0) ? 11 : this.currentMonth - 1;
    this.showCalendar(this.currentMonth, this.currentYear);
  }

  public jump() {
    console.log('cell click calendar', this.calendar);
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
    // this.monthAndYear.innerHTML = this.months[month] + " " + year;
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
            cell.classList.add("todays-date");
          } // color today's date
          cell.appendChild(cellText);
          row.appendChild(cell);
          date++;
          this.selectDate(cell, isSelected);
        }

      }

      tbl.appendChild(row); // appending each row into calendar body.
    }
    //By default Sundays are disabled
    this.disableWeekDays(0, ActiveDayStatus.All);
    this.disableWeekDays(6, ActiveDayStatus.Even);
    // this.minMaxDateDisable(month, year, true);
  }

  // check how many days in a month code from https://dzone.com/articles/determining-number-days-month
  public daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
  }

  /**
   * this.calendar.minDate
   * @param month 
   * @param year 
   */
  private minMaxDateDisable(month: number, year: number, isMinDateDisable: boolean) {
    this.calendar = new Calendar();
    this.calendar.minDate = new Date();
    // let minDateMM = this.calendar.minDate.getMonth();
    // let minDateYY = this.calendar.minDate.getFullYear();
    // let minDateDD = this.calendar.minDate.getDate();
    let monthNumber = 11;
    let yearNumber = 2019;
    let dateNumber = 10;
    document.getElementById("calendar-body").setAttribute("class", "enable");
    if (isMinDateDisable) {
      if (year <= yearNumber) {
        if (month == monthNumber) {
          this.getMonthsPreviousDates(dateNumber);
        } else if (month < monthNumber) {
          document.getElementById("calendar-body").setAttribute("class", "disable");
        } else {
          document.getElementById("calendar-body").setAttribute("class", "enable");
        }
      }
    } else {
      if (year >= yearNumber) {
        if (month == monthNumber) {
          this.getMonthsPreviousDates(dateNumber);
        } else if (month < monthNumber) {
          document.getElementById("calendar-body").setAttribute("class", "disable");
        } else {
          document.getElementById("calendar-body").setAttribute("class", "enable");
        }
      }
    }

  }

  /** TODO- need to make it generic for both min and max date.
   * Gets the previous dates of the specified date and disables them
   * there are 6 rows of tr- A parent loop.
   * each tr has 7 cells(td)
   * looping through parent and a nested loop of cells.
   * matching the minDate until a specified text(converting to number)  is found, and break the inner loop.
   * To break the outer loop, a flag is used,if this is true then only it enters the inner loop
   * else breaks the outer loop. 
   * @param minDateNumber selected date previous to that all dates should be disabled
   */
  private getMonthsPreviousDates(minDateNumber: number) {
    var elements = document.getElementsByTagName("tr");
    var continueLoop: boolean = true;
    for (var i = 1; i < elements.length; i++) {
      if (continueLoop) {
        for (var j = 0; j < elements[i].cells.length; j++) {
          if (minDateNumber != Number(elements[i].cells[j].innerText)) {
            elements[i].cells[j].setAttribute("style", "opacity: 0.4 !important; pointer-events: none;color:#979797;");
          } else {
            continueLoop = false;
            break;
          }
        }
      } else {
        break;
      }
    }
  }

  private selectDate(cell: any, isSelected: boolean) {
    // cell.addEventListener('click', function (e) {
    //   isSelected = !isSelected;
    //   if (isSelected)
    //     e.target.classList.add("bg-info");
    //   else
    //     e.target.classList.remove("bg-info");
    // });

    var _this = this;
    cell.addEventListener('click', function (e) {
      let cellClickedDate = new Date(_this.currentYear, _this.currentMonth, Number(e.target.innerText));
      if (_this.calendar.startDate == null || _this.calendar.endDate == null) {
        if (_this.calendar.startDate == null) {
          _this.calendar.startDate = cellClickedDate;
          e.target.classList.add("bg-info");
        }
        else if (_this.calendar.startDate != null && _this.calendar.endDate == null) {
          _this.calendar.endDate = cellClickedDate;
          e.target.classList.add("bg-info");
        }
        else if (_this.calendar.endDate > _this.calendar.startDate) {
          _this.calendar.startDate = cellClickedDate;
          _this.calendar.endDate = null
          e.target.classList.add("bg-info");
        }
      } else {
        _this.removeSelectedClass();
        _this.calendar.startDate = cellClickedDate;
        _this.calendar.endDate = null;
        e.target.classList.add("bg-info");
      }
      console.log('start-', _this.calendar.startDate, 'end-', _this.calendar.endDate);

    });

  }

  private removeSelectedClass() {
    var elements = document.getElementsByClassName("bg-info");
    while (elements[0]) {
      elements[0].classList.remove("bg-info");
    }
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
    for (var i = 1; i < elements.length; i++) {
      if (i % 2 == 0 && dayStatus == ActiveDayStatus.Even) {
        if (this.isCellExist(elements, i))
          elements[i].cells[weekDay].setAttribute("style", "opacity: 0.4 !important; pointer-events: none;color:#979797;");
      }
      else if (i % 2 != 0 && dayStatus == ActiveDayStatus.Odd) {
        if (this.isCellExist(elements, i))
          elements[i].cells[weekDay].setAttribute("style", "opacity: 0.4 !important; pointer-events: none;color:#979797;");
      }
      else if (dayStatus == ActiveDayStatus.All) {
        if (this.isCellExist(elements, i))
          elements[i].cells[weekDay].setAttribute("style", "opacity: 0.4 !important; pointer-events: none;color:#979797;");
      }
    }

  }
  private isCellExist(elements: any, index: number) {
    return (elements && elements.length && elements[index].cells && elements[index].cells.length) ? true : false;
  }

  public submitDate() {
    let comparedResult = this.swipeDates();
    this.selectedDate.emit(comparedResult);
  }

  public cancel() {

  }

  /**
   * Swipe start and end dates, if user has first selected a date say 25/12/19
   * which is set as start date.
   * Later if user selects end date say 12/12/19 which smaller than starDate,
   * which should not be the case in real world.
   * So swipping the smaller(endDate) with start date and endDate with bigger(startDate)
   */
  private swipeDates(): Calendar {
    if (this.calendar.startDate == null)
      this.calendar.startDate = JSON.parse(JSON.stringify(this.calendar.endDate));
    if (this.calendar.endDate == null)
      this.calendar.endDate = JSON.parse(JSON.stringify(this.calendar.startDate));

    let comparedResult = this.compareDates(this.calendar.startDate, this.calendar.endDate);
    if (comparedResult == 1) {
      let startDateTemp = JSON.parse(JSON.stringify(this.calendar.startDate));
      let endDateTemp = JSON.parse(JSON.stringify(this.calendar.endDate));
      this.calendar.startDate = JSON.parse(JSON.stringify(endDateTemp));
      this.calendar.endDate = JSON.parse(JSON.stringify(startDateTemp));
    }
    return this.calendar
  }

  /** 
 * Compares two Date objects and returns e number value that represents 
 * the result:
 * 0 if the two dates are equal.
 * 1 if the first date is greater than second.
 * -1 if the first date is less than second.
 * @param date1 First date object to compare.
 * @param date2 Second date object to compare.
 */
  public compareDates(date1: Date, date2: Date): number {
    // With Date object we can compare dates them using the >, <, <= or >=.
    // The ==, !=, ===, and !== operators require to use date.getTime(),
    // so we need to create a new instance of Date with 'new Date()'
    let d1 = new Date(date1);
    let d2 = new Date(date2);

    // Check if the dates are equal
    let same = d1.getTime() === d2.getTime();
    if (same) return 0;

    // Check if the first is greater than second
    if (d1 > d2) return 1;

    // Check if the first is less than second
    if (d1 < d2) return -1;
  }
}

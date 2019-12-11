import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Calendar } from '../../models/calendar.model';
import { EnumConverter } from '../../helper/enum-converter';
import { ActiveDayStatus } from '../../enums/active-day-status.enum';
var moment = require('moment');
declare var require: any
require('twix');
@Component({
  selector: 'app-custom-calendar',
  templateUrl: './custom-calendar.component.html',
  styleUrls: ['./custom-calendar.component.css']
})
export class CustomCalendarComponent implements OnInit {


  @Output() selectedDateOutput: EventEmitter<Calendar> = new EventEmitter<Calendar>();
  public today: Date;
  public currentMonth: number;
  public currentYear: number;
  public selectYear: any;
  public selectMonth: any;
  public months: any[];
  // public monthAndYear: any;
  public calendarMonths: any[];
  public calendar: Calendar;
  public medianDates: any[];
  public weekDays: any[];
  constructor(
  ) { }

  ngOnInit() {
    this.weekDays = [];
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

    // this.calendar.minDate = new Date();
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
          cell = document.createElement("td");
          cellText = document.createTextNode(date.toString());
          if (date === this.today.getDate() && year === this.today.getFullYear() && month === this.today.getMonth()) {
            cell.classList.add("todays-date");
          } // color today's date
          cell.appendChild(cellText);
          row.appendChild(cell);
          date++;
          this.selectDate(cell);
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

  /**
   * On calendar the first click sets start date
   * second set the end date
   * if there is a third click which means, start and end date is already set
   * so, applying a check for this 3rd click, either date should null to be set.
   * If both are not null it goes to else, removes the bg-info class and sets for 3rd click date
   * therefore on 3rd click, the 3rd clicked date will be set as start date and end date is set as null
   *  if the 3rd click check satisfies, then it checks and sets start date if found null
   * else if start date isn't null and end date is null, then end date is set.
   * @param cell td for which a click event is created 
   */
  private selectDate(cell: any) {
    var _this = this;
    cell.addEventListener('click', function (e) {
      let cellClickedDate = new Date(_this.currentYear, _this.currentMonth, Number(e.target.innerText));
      //If both dates are filled then we dont further need to set, 3rd click check
      if (_this.calendar.startDate == null || _this.calendar.endDate == null) {
        if (_this.calendar.startDate == null) {
          _this.calendar.startDate = _this.formatSelectedDate(cellClickedDate);
          e.target.classList.add("bg-info");
        }
        else if (_this.calendar.startDate != null && _this.calendar.endDate == null) {
          _this.calendar.endDate = _this.formatSelectedDate(cellClickedDate);
          e.target.classList.add("bg-info");
        }
        else if (_this.calendar.endDate > _this.calendar.startDate) {
          _this.calendar.startDate = _this.formatSelectedDate(cellClickedDate);
          _this.calendar.endDate = null
          e.target.classList.add("bg-info");
        }
      } else {
        // remove the existing selected classes, further applying it other selected date
        _this.removeSelectedClass();
        _this.calendar.startDate = _this.formatSelectedDate(cellClickedDate);
        _this.calendar.endDate = null;
        e.target.classList.add("bg-info");
      }
    });

  }

  /**
   * Remove class from all the element
   */
  private removeSelectedClass() {
    var elements = document.getElementsByClassName("bg-info");
    while (elements[0]) {
      elements[0].classList.remove("bg-info");
    }
  }

  /**
   * To disable weekdays,
   * for eg: if weekDay is 6(Sat) and dayStatus is 1(Even) ActiveDayStatus enum value
   * Then all the Saturday in even days will be disabled.
   * NOTE: Sundays are disabled, as this method is invoked already by default with
   * weekDay 0 and dayStatus 0(All)
   * @param weekDay week number 0-6(Sun-Sat) respectively
   * @param dayStatus Days which needs to be active, Even, Odd or All.
   */
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

  /**
   * setAttribute to apply a style which disables a date
   * All the date are in table's td,
   * and 0 index td in tr is Sunday, therefore last index is Sat and so on.
   * So, fetching the a tr and iterating it.
   * for eg: if weekDay is 0 and dayStatus is 0, then
   * element(tr) with iterable index i has cells(td) and here we pass weekDay, thus cells[0] is sunday
   * and also it should satisfy whether index the dayStatus, 
   * Even(2) index should be even
   * Odd(1) index should be odd
   * All(0) index setting attribute to all cells(td)
   * "style", "opacity: 0.4 !important; pointer-events: none;color:#979797;"
   */
  private disableDays(weekDay: number, dayStatus: number) {
    var elements = document.getElementsByTagName("tr");
    for (var i = 1; i < elements.length; i++) {
      if (i % 2 == 0 && dayStatus == ActiveDayStatus.Even) {
        if (this.isCellExist(elements, i))
          elements[i].cells[weekDay].setAttribute("class", "disable");
      }
      else if (i % 2 != 0 && dayStatus == ActiveDayStatus.Odd) {
        if (this.isCellExist(elements, i))
          elements[i].cells[weekDay].setAttribute("class", "disable");
      }
      else if (dayStatus == ActiveDayStatus.All) {
        if (this.isCellExist(elements, i))
          elements[i].cells[weekDay].setAttribute("class", "disable");
      }
    }

  }
  private isCellExist(elements: any, index: number) {
    return (elements && elements.length && elements[index].cells && elements[index].cells.length) ? true : false;
  }

  public submitDate() {
    let comparedResult: Calendar = this.swipeDates();
    this.getDisabledDates();
    this.getDatesRange();
    comparedResult.selectedDates = JSON.parse(JSON.stringify(this.getSelectedDates()));
    this.selectedDateOutput.emit(comparedResult);
  }

  public cancel() {
    this.calendar.startDate = null;
    this.calendar.endDate = null;
    this.calendar.selectedDates = [];
    this.showCalendar(this.currentMonth, this.currentYear);
    this.selectedDateOutput.emit(this.calendar);
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

    let comparedResult = this.compareDates(new Date(this.calendar.startDate), new Date(this.calendar.endDate));
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

  private formatSelectedDate(selectedDate: any, targetFormat: string = "DD-MM-YYYY"): any {
    // const locale = 'en-IN';
    let formattedDate = null;
    const dateFormat = "DD-MM-YYYY";
    if (typeof selectedDate === 'string' || selectedDate instanceof String)
      formattedDate = moment(selectedDate, dateFormat).format(targetFormat);
    else
      formattedDate = moment(selectedDate).format(targetFormat);
    return formattedDate;
  }

  /**
   * Gets ranges btw start and end date
   */
  private getDatesRange() {
    let startDate = new Date(this.formatSelectedDate(this.calendar.startDate, "MM-DD-YYYY"));
    let endDate = new Date(this.formatSelectedDate(this.calendar.endDate, "MM-DD-YYYY"));
    var itr = moment.twix(startDate, endDate).iterate("days");
    this.medianDates = [];
    while (itr.hasNext()) {
      this.medianDates.push(itr.next().toDate())
    }

    let formattedDate = [];
    this.medianDates.forEach(x => {
      formattedDate.push(this.formatSelectedDate(x));
    });

    //push all the formatted dates
    this.medianDates = [];
    this.medianDates.push(...formattedDate);
  }

  /**
   * ValidDate array only contains those dates which not in  disabled dates
   */
  private getSelectedDates(): any[] {
    let validDates = [];
    this.medianDates.forEach(x => {
      let isIncluded = this.weekDays.includes(x);
      if (!isIncluded)
        validDates.push(x);
    });

    return validDates;
  }

  /**
   * Gets the disabled dates
   * Sundays, and even saturday
   * If month and year is same then get disabled dates based on startdate only, of sunday (0) and saturday(6)
   * if not than need to get disabled dates of start date and end dates as well, of sunday (0) and saturday(6)
   * TODO: 
   * need to have a variable which will decide to have odd, even, all or neither saturdays as off
   * need to pass weekDay in getWeekDays as array, which will save invoking the method multiple times
   */
  private getDisabledDates() {
    this.weekDays = [];
    let isMonthSame = moment(this.calendar.startDate, 'DD-MM-YYYY').isSame(moment(this.calendar.endDate, 'DD-MM-YYYY'), 'month');
    let isYearSame = moment(this.calendar.startDate, 'DD-MM-YYYY').isSame(moment(this.calendar.endDate, 'DD-MM-YYYY'), 'year');
    if (isMonthSame && isYearSame) {
      this.getWeekDays(this.calendar.startDate, ActiveDayStatus.All, 0);
      this.getWeekDays(this.calendar.startDate, ActiveDayStatus.Even, 6);
    }
    else {
      this.getWeekDays(this.calendar.startDate, ActiveDayStatus.All, 0);
      this.getWeekDays(this.calendar.startDate, ActiveDayStatus.Even, 6);
      this.getWeekDays(this.calendar.endDate, ActiveDayStatus.All, 0);
      this.getWeekDays(this.calendar.endDate, ActiveDayStatus.Even, 6);
    }
  }


  /**
   * Refactor disable week days with this method.
   */
  private getWeekDays(selectDate: any, activeDays: number, day: number, format: string = "DD-MM-YYYY") {
    var weekDay = moment(selectDate, format).startOf('month').day(day);
    var counter: number = 1;
    if (weekDay.date() > 7) weekDay.add(7, 'd');
    var month = weekDay.month();

    while (month === weekDay.month()) {
      if ((activeDays == ActiveDayStatus.Even) && counter % 2 == 0)
        this.weekDays.push(this.formatSelectedDate(weekDay));
      else if ((activeDays == ActiveDayStatus.Odd) && counter % 2 != 0)
        this.weekDays.push(this.formatSelectedDate(weekDay));
      else if (activeDays == ActiveDayStatus.All)
        this.weekDays.push(this.formatSelectedDate(weekDay));

      weekDay.add(7, 'd');
      counter = counter + 1;
    }
    console.log('weekdays', this.weekDays);

  }

}

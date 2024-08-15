import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-digital-clock',
  templateUrl: './digital-clock.component.html',
  styleUrls: ['./digital-clock.component.css']
})
export class DigitalClockComponent implements OnInit {

  @ViewChild('wrapper') wrapperRef!: ElementRef;

  position: { x: number, y: number } = { x: 100, y: 100 };

  size: { w: number, h: number } = { w: 200, h: 200 };

  lastPosition: { x: number; y: number; } | undefined;

  hideFormatters: boolean = true;

  selectedHoursFormat: string = 'hh';
  hoursFormats: string[] = ['h', 'hh', 'H', 'HH'];

  selectedMinutesFormat: string = 'mm';
  minutesFormats: string[] = ['m', 'mm'];

  public hoursIndicator: any;
  public minutesIndicator: any;
  public secondsIndicator: any;
  public showTwelveHourConvention = true;
  public twelveHourConventionIndicator: string | undefined;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private el: ElementRef) { }


  ngOnInit(): void {
    setInterval(() => {
      const date = new Date();
      this.updateDate(date, this.selectedHoursFormat, this.selectedMinutesFormat);
    }, 1000);
  }

  changeHoursFormat(event: any) {
    const date = new Date();
    console.log(event.target.value);
    const selectedHoursFormat = event.target.value;
    this.updateDate(date, selectedHoursFormat, this.selectedMinutesFormat);
  }

  changeMinutesFormat(event: any) {
    const date = new Date();
    console.log(event.target.value);
    const selectedMinutesFormat = event.target.value;
    this.updateDate(date, this.selectedHoursFormat, selectedMinutesFormat);
  }

  startDrag(event: any): void {
    event.preventDefault();
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const positionX = this.position.x;
    const positionY = this.position.y;

    const duringDrag = (e: any) => {
      const dx = e.clientX - mouseX;
      const dy = e.clientY - mouseY;
      this.position.x = positionX + dx;
      this.position.y = positionY + dy;
      this.lastPosition = { ...this.position };
    };

    const finishDrag = (e: any) => {
      this.document.removeEventListener('mousemove', duringDrag);
      this.document.removeEventListener('mouseup', finishDrag);
    };

    this.document.addEventListener('mousemove', duringDrag);
    this.document.addEventListener('mouseup', finishDrag);
  }

  manageFormatters(hideFormatters: boolean) {
    this.hideFormatters = !hideFormatters;
    return this.hideFormatters;
  }

  private updateDate(date: Date, selectedHoursFormat: string, selectedMinutesFormat: string) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    this.selectedHoursFormat = selectedHoursFormat;
    this.selectedMinutesFormat = selectedMinutesFormat;

    this.twelveHourConventionIndicator = hours >= 12 ? 'PM' : 'AM';

    if (selectedHoursFormat === 'h') {
      this.showTwelveHourConvention = true;
      this.hoursIndicator = hours % 12;
      this.hoursIndicator = this.hoursIndicator ? this.hoursIndicator : 12;
    }
    else if (selectedHoursFormat === 'hh') {
      this.showTwelveHourConvention = true;
      this.hoursIndicator = hours % 12;
      this.hoursIndicator = this.hoursIndicator < 10 ? '0' + this.hoursIndicator.toString() : this.hoursIndicator;
      this.hoursIndicator = this.hoursIndicator ? this.hoursIndicator : 12;
    }
    else if (selectedHoursFormat === 'H') {
      this.showTwelveHourConvention = false;
      this.hoursIndicator = hours;
    }
    else if (selectedHoursFormat === 'HH') {
      this.showTwelveHourConvention = false;
      this.hoursIndicator = hours;
      this.hoursIndicator = this.hoursIndicator < 10 ? '0' + this.hoursIndicator.toString() : this.hoursIndicator;
    }

    if (selectedMinutesFormat === 'm') {
      this.minutesIndicator = minutes;
    }
    else if (selectedMinutesFormat === 'mm') {
      this.minutesIndicator = minutes < 10 ? '0' + minutes.toString() : minutes;
    }

    this.secondsIndicator = seconds < 10 ? '0' + seconds.toString() : seconds;
  }
}

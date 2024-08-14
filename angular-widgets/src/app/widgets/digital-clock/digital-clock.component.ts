import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-digital-clock',
  templateUrl: './digital-clock.component.html',
  styleUrls: ['./digital-clock.component.css']
})
export class DigitalClockComponent implements OnInit {

  hideFormatters: boolean = true;

  selectedHoursFormat: string = 'h';
  hoursFormats: string[] = ['h', 'hh', 'H', 'HH'];

  selectedMinutesFormat: string = 'm';
  minutesFormats: string[] = ['m', 'mm'];

  public hoursIndicator: any;
  public minutesIndicator: any;
  public secondsIndicator: any;
  public showTwelveHourConvention = true;
  public twelveHourConventionIndicator: string | undefined;

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

  private updateDate(date: Date, selectedHoursFormat: string, selectedMinutesFormat: string) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    this.selectedHoursFormat = selectedHoursFormat;
    this.selectedMinutesFormat = selectedMinutesFormat;

    this.twelveHourConventionIndicator = hours >= 12 ? 'PM' : 'AM';

    if (selectedHoursFormat === 'h') {
      this.showTwelveHourConvention = true;
      this.selectedHoursFormat = selectedHoursFormat;
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
      this.hoursIndicator = this.hoursIndicator < 10 ? '0' + this.hoursIndicator.toString() : this.hoursIndicator;
    }
    else if (selectedHoursFormat === 'HH') {
      this.hoursIndicator = hours;
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

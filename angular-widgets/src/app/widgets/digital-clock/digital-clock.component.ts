import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-digital-clock',
  templateUrl: './digital-clock.component.html',
  styleUrls: ['./digital-clock.component.css']
})
export class DigitalClockComponent implements OnInit {

  private date = new Date();

  public hoursIndicator: any;
  public minutesIndicator: any;
  public secondsIndicator: any;
  public ampmIndicator: string | undefined;

  ngOnInit(): void {
    setInterval(() => {
      const date = new Date();
      this.updateDate(date);
    }, 1000);


  }

  private updateDate(date: Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    this.ampmIndicator = hours >= 12 ? 'PM' : 'AM';
    this.hoursIndicator = hours % 12;
    this.hoursIndicator = this.hoursIndicator ? this.hoursIndicator : 12;
    this.minutesIndicator = minutes;
    this.secondsIndicator = seconds;
  }
}

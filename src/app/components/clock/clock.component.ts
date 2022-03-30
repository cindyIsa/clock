import { Component, Input, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {
  @Input() clockSize = 200 
  hourDeg = {}
  minuteDeg = {}
  secondDeg = {}
  time = Array(12).fill(1).map((a,b) => a +b)
  clockSizeStyle ={}
  constructor() { }

  ngOnInit(): void {
    this.clockSizeStyle = { 'width':this.clockSize + 'px', 'height':this.clockSize + 'px' }
    this.getDatePerSecond().subscribe(
      (res) => {         
        const sdeg = res.second*6 + 'deg'
        const mdeg = res.minute*6 + 'deg'

        const hdeg = res.hour*360/12 + res.minute*30/60 + 'deg'
        console.log(res.hour,hdeg)
        this.secondDeg = {'transform': 'translateY(-100%)  rotate('+sdeg+')' } 
        this.minuteDeg = {'transform': 'translateY(-100%)  rotate('+mdeg+') ' } 
        this.hourDeg = {'transform': 'translateY(-100%)  rotate('+hdeg+') ' } 

      }
    )
  }
  private getDatePerSecond(){
    return new Observable((subscriber:Observer<{hour:number,minute:number,second:number}>) => { 
      setInterval(()=>{
        const dt = new Date()
        subscriber.next({hour:dt.getHours(), minute:dt.getMinutes(), second:dt.getSeconds()})
      },1000)
     })
  }
  
}

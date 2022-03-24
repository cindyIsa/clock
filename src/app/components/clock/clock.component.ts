import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {
  hourDeg = {}
  minuteDeg = {}
  secondDeg = {}
  time = Array(12).fill(1).map((a,b) => a +b)
  constructor() { }

  ngOnInit(): void {
    console.log( new  Date() )
    this.getDatePerSecond().subscribe(
      (res) => {         
        const sdeg = res.second*6 + 'deg'
        const mdeg = res.minute*6 + 'deg'
        const hdeg = res.hour*24/360 + res.minute*30/60  + 'deg'
        this.secondDeg = {'transform': 'rotate('+sdeg+') translateY(-50%)' } 
        this.minuteDeg = {'transform': 'rotate('+mdeg+') translateY(-50%) translateX(5%)' } 
        this.hourDeg = {'transform': 'rotate('+hdeg+') translateY(-50%) translateX(5%)' } 
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
  position= (num:number) => { 
    if(num == 12){
      return {'top':'0px'}
    }else if(num === 6){
      return {'bottom':'0'}
    }else if(num === 9){
      return {'left':'0px'}
    
    }else if(num === 3){
      return {'right':'0px'}
    
    }else if(num > 6){
      const top =150 - 150*Math.cos(Math.abs(12-num)*30*Math.PI/180) + 'px'
      const left = 150 - 150*Math.cos(Math.abs(num-9)*30*Math.PI/180) + 'px'
      if(num < 9){
        const bottom =150 - 150*Math.cos(Math.abs(6-num)*30*Math.PI/180) + 'px'
        return {'bottom':bottom, 'left':left} 
      }
      return {'top':top, 'left':left}      
    }else{
      const bottom =150 - 150*Math.cos(Math.abs(6-num)*30*Math.PI/180) + 'px'
      const right = 150 - 150*Math.cos(Math.abs(num-3)*30*Math.PI/180) + 'px'
      if(num < 3){
        const top =150 - 150*Math.cos(Math.abs(12-num)*30*Math.PI/180) + 'px'
        return {'top':top, 'right':right} 
      }
      return {'bottom':bottom, 'right':right} 
    }
    return null
   }

}

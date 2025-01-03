import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-taxi',
  standalone: true,
  templateUrl: './taxi.component.html',
  styleUrls: ['./taxi.component.css']
})
export class TaxiComponent implements OnInit {
  userLocation = {
    latitude: 45.803775,
    longitude: 126.534967
  };

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.loadMapScript();
  }

  loadMapScript(): void {
    const script = this.renderer.createElement('script');
    script.src = 'https://webapi.amap.com/maps?v=1.4.15&key=f50b04b9b4b2352632275eb2e3bdc7a1';
    script.onload = () => {
      this.initMap();
    };
    this.renderer.appendChild(document.body, script);
  }

  initMap(): void {
    this.userLocation.latitude = parseFloat((this.el.nativeElement.querySelector('#latitude') as HTMLInputElement).value);
    this.userLocation.longitude = parseFloat((this.el.nativeElement.querySelector('#longitude') as HTMLInputElement).value);

    const map = new AMap.Map('map', {
      resizeEnable: true,
      center: [this.userLocation.longitude, this.userLocation.latitude],
      zoom: 13
    });

    const userMarker = new AMap.Marker({
      position: [this.userLocation.longitude, this.userLocation.latitude],
      title: '用户位置',
      icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png'
    });
    map.add(userMarker);
  }

  dispatchTaxi(): void {
    fetch('http://law.conetop.cn:8005/api/v1/taxi_app/', {    // 加入调用main的host和port
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        latitude: this.userLocation.latitude,
        longitude: this.userLocation.longitude
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.route) {
        const map = new AMap.Map('map', {
          resizeEnable: true,
          center: [this.userLocation.longitude, this.userLocation.latitude],
          zoom: 13
        });

        const route = data.route.route.paths[0];
        const steps = route.steps;
        const polyline = new AMap.Polyline({
          path: steps.flatMap((step: any) => step.polyline.split(';').map((point: any) => point.split(',').map(Number))),
          borderWeight: 2,
          strokeColor: 'blue',
          lineJoin: 'round'
        });
        map.add(polyline);

        const taxiMarker = new AMap.Marker({
          position: [data.driver_lon, data.driver_lat],
          title: 'Taxi',
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png'
        });
        map.add(taxiMarker);

        const userMarker = new AMap.Marker({
          position: [this.userLocation.longitude, this.userLocation.latitude],
          title: '用户位置',
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png'
        });
        map.add(userMarker);

        (this.el.nativeElement.querySelector('#info') as HTMLElement).innerText = data.message;

      } else {
        alert(data.message);
      }
    });
  }
}
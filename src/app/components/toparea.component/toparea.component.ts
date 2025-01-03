import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

interface CustomPolylineOptions extends L.PolylineOptions {
    id?: string;
}

@Component({
  selector: 'toparea',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: 'toparea.component.html',
  styleUrls: ['toparea.component.css']
})
export class TopareaComponent {
    
    private baseurl = 'http://law.conetop.cn:8005';
    private currentNumber = 8;
    private map!: L.Map;

    constructor(private http: HttpClient, private renderer: Renderer2, private el: ElementRef) {}

    ngOnInit(): void {
        this.initializeMap();
        this.updateNumber();
        this.setupEventListeners();
    }
    private initializeMap(): void {
        this.map = L.map('map').setView([45.75, 126.65], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }
    private updateNumber(): void {
        const numberElement = this.el.nativeElement.querySelector('#number');
        this.renderer.setProperty(numberElement, 'textContent', this.currentNumber.toString());
    }

    private updateNumber2(): void {
        const numberClearElement = this.el.nativeElement.querySelector('#numberclear');
        this.renderer.setProperty(numberClearElement, 'textContent', this.currentNumber.toString());
    }
    
    private callBackendApi(number: number): void {
        this.http.get<any[]>(`${this.baseurl}/api/v1/topkarea/?time=${number}`).subscribe(data => {
            const groupedData = this.groupByTimeAndCluster(data);
            for (const [time, clusters] of Object.entries(groupedData)) {
                for (const [clusterid, points] of Object.entries(clusters)) {
                    this.drawClusterOnMap(points, clusterid);
                }
            }
        });
    }
    
    private callBackendApiclear(number: number): void {
        this.map.eachLayer((layer: any) => {
            if (layer instanceof L.Polygon) {
                this.map.removeLayer(layer);
            }
        });

        this.http.get<any[]>(`${this.baseurl}/api/v1/topkarea/?time=${number}`).subscribe(data => {
            const groupedData = this.groupByTimeAndCluster(data);
            for (const [time, clusters] of Object.entries(groupedData)) {
                for (const [clusterid, points] of Object.entries(clusters)) {
                    this.drawClusterOnMap(points, clusterid);
                }
            }
        });
    }

    
    private groupByTimeAndCluster(data: any[]): GroupedData {
        const groupedData: GroupedData = {};
        data.forEach(item => {
            const time = item.time;
            const clusterid = item.clusterid;
            if (!groupedData[time]) {
            groupedData[time] = {};
            }
            if (!groupedData[time][clusterid]) {
            groupedData[time][clusterid] = [];
            }
            groupedData[time][clusterid].push([item.latitude, item.longitude]);
        });
        return groupedData;
    }
    
    private drawClusterOnMap(points: [number, number][], clusterid: string): void {
        L.polygon(points, {
            color: 'blue',
            weight: 3,
            opacity: 0.5,
            fillColor: 'blue',
            fillOpacity: 0.2,
        }).addTo(this.map);
    }
    private getMidPoint(coords: [number, number][]): [number, number] {
        const latSum = coords.reduce((sum, coord) => sum + coord[0], 0);
        const lngSum = coords.reduce((sum, coord) => sum + coord[1], 0);
        return [latSum / coords.length, lngSum / coords.length];
    }
    
    car(): void {
        if (this.map) {
          this.map.eachLayer((layer: any) => {
            if (layer instanceof L.Polyline && (layer.options as CustomPolylineOptions).id === 'myPolyline') {
              this.map.removeLayer(layer);
            }
          });
        }
    
        this.http.get<any[]>(`${this.baseurl}/api/v1/sendtopkarea/?lat=45.76637&lng=126.67251`).subscribe(data => {
          const groupedData = data.reduce((acc: any, item: any) => {
            if (!acc[item.roadid]) {
              acc[item.roadid] = {
                roadid: item.roadid.toString(),
                coordinates: [],
                color: item.status
              };
            }
            acc[item.roadid].coordinates.push([item.latitude, item.longitude]);
            return acc;
          }, {});
    
          const routes = Object.values(groupedData);
          routes.forEach((route: any) => {
            const polylineOptions: CustomPolylineOptions = {
              color: route.color,
              weight: 7,
              opacity: 0.7,
              id: 'myPolyline'
            };
    
            const polyline = L.polyline(route.coordinates, polylineOptions).addTo(this.map);
            const midpoint = this.getMidPoint(route.coordinates);
          });
        });
      }
    
    private setupEventListeners(): void {
        const plusBtn = this.el.nativeElement.querySelector('#plus-btn');
        const plusBtnClear = this.el.nativeElement.querySelector('#plus-btnclear');
        const timeCk = this.el.nativeElement.querySelector('#timeck');
        const carBtn = this.el.nativeElement.querySelector('#car-btn');

        this.renderer.listen(carBtn, 'click', () => {
            this.car();
        });
        this.renderer.listen(plusBtn, 'click', () => {
            this.currentNumber = (this.currentNumber + 1) % 24;
            this.updateNumber();
            this.callBackendApi(this.currentNumber);
        });

        this.renderer.listen(plusBtnClear, 'click', () => {
            this.currentNumber = (this.currentNumber + 1) % 24;
            this.updateNumber2();
            this.callBackendApiclear(this.currentNumber);
        });

        this.renderer.listen(timeCk, 'click', () => {
            const userLocation: [number, number] = [45.76637, 126.67251];
            this.map.setView(userLocation, 15);
            this.map.eachLayer((layer) => {
                if (layer instanceof L.Polygon) {
                    this.map.removeLayer(layer);
                }
            });

            this.http.get<any[]>(`${this.baseurl}/api/v1/topkarea/?time=14`).subscribe(data => {
                const groupedData = this.groupByTimeAndCluster(data);
                for (const [time, clusters] of Object.entries(groupedData)) {
                    for (const [clusterid, points] of Object.entries(clusters)) {
                        this.drawClusterOnMap(points, clusterid);
                    }
                }
            });

            this.http.get<any[]>(`${this.baseurl}/api/v1/getRoads`).subscribe(data => {
            const groupedData = data.reduce((acc, item) => {
                if (!acc[item.roadid]) {
                acc[item.roadid] = {
                    roadid: item.roadid.toString(),
                    coordinates: [],
                    color: item.status
                };
                }
                acc[item.roadid].coordinates.push([item.latitude, item.longitude]);
                return acc;
            }, {});

            const routes = Object.values(groupedData);
            routes.forEach((route: any) => {
                    const polylineOptions: CustomPolylineOptions = {
                        color: route.color,
                        weight: 7,
                        opacity: 0.7,
                        id: 'myPolyline'
                    };
                    L.polyline(route.coordinates, polylineOptions).addTo(this.map);
                });
            });

            const carIcon = L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/744/744465.png',
            iconSize: [70, 70],
            iconAnchor: [30, 10],
            popupAnchor: [30, -10]
            });

            L.marker([45.76637, 126.67251], { icon: carIcon }).addTo(this.map).openPopup().on('click', (e) => {
            const radarDiv = this.renderer.createElement('div');
            this.renderer.addClass(radarDiv, 'radar-circle');
            this.renderer.appendChild(this.map.getPanes().overlayPane, radarDiv);
            const latlng = this.map.latLngToContainerPoint(userLocation);
            this.renderer.setStyle(radarDiv, 'left', `${latlng.x - 95}px`);
            this.renderer.setStyle(radarDiv, 'top', `${latlng.y - 95}px`);
            this.renderer.setStyle(radarDiv, 'width', '200px');
            this.renderer.setStyle(radarDiv, 'height', '200px');

            setTimeout(() => {
                this.renderer.removeChild(this.map.getPanes().overlayPane, radarDiv);
            }, 5000);

            this.http.get<any[]>(`${this.baseurl}/api/v1/searchtopkarea/?lat=45.76637&lng=126.67251`).subscribe(data => {
                data.forEach(item => {
                L.marker([item.latitude, item.longitude]).addTo(this.map);
                });
            });
            });
        });
    }
    
}

interface GroupedData {
    [time: string]: {
      [clusterid: string]: [number, number][];
    };
}
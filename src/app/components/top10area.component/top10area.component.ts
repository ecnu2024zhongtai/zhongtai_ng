import { Component, OnInit, Renderer2, ElementRef, AfterViewInit} from '@angular/core';

import { NgxEchartsDirective , NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import AMapLoader from '@amap/amap-jsapi-loader';

@Component({
  selector: 'top10area',
  templateUrl: './top10area.component.html',
  styleUrl: './top10area.component.css',
})
export class Top10AreaComponent implements OnInit {
    chartOptions: any; 
    private map: any;
    constructor(private renderer: Renderer2, private el: ElementRef) {}
  
    ngOnInit(): void {
        this.loadStyles();
        this.loadScripts();
        this.loadMapScript();
        // AMapLoader.load({
        //     // 替换成你自己的apikey, 或者找我要
        //     // 后面需要配置化这个key
        //     key: '544242c05583889db8cd41aa8f7cc801', // 高德地图 API Key
        //     version: '2.0', // SDK 版本
        //   }).then(() => {
        //     this.initializeMap();
        //   });
    }

    ngAfterViewInit(): void {
        // fetch('http://law.conetop.cn:8005/api/v1/top-ten-locations')
        // .then(response => {
        //     if (!response.ok) {
        //         throw new Error(`HTTP error! status: ${response.status}`);
        //     }
        //     return response.json();
        // })
        // .then(data => {
        //     const transformedData = this.transformData(data);
        //     transformedData.forEach(polygonData => {
        //         this.addPolygon(this.map, polygonData);
        //     });
        // })
        // .catch(error => console.error('Error fetching data:', error));
    }

    initializeMap() {
        // 初始化高德地图
         this.map = new AMap.Map('container', {
            center: [126.5349, 45.8038], // 设置地图中心点
            zoom: 12
        });
        const aamap = this.map;
        this.map.on('complete', () => {
            this.chartOptions = {
                amap: {
                   aamap
                }
            };
        });
    }
    
    loadStyles(): void {
        const link = this.renderer.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css';
        this.renderer.appendChild(document.head, link);
      }

    loadScripts(): void {
        const scripts = [
            'https://a.amap.com/jsapi_demos/static/geojson/shanghai.js',
            'https://a.amap.com/jsapi_demos/static/demo-center/js/demoutils.js'
        ];
  
        let loadedScripts = 0;
    
        scripts.forEach(src => {
            const script = this.renderer.createElement('script');
            script.src = src;
            script.onload = () => {
                console.log(`${src} loaded`);
                loadedScripts++;
            };
            this.renderer.appendChild(document.body, script);
        });
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
        const map = new AMap.Map('container', {
            center: [126.663, 45.754],
            zoom: 12
        });
        fetch('http://law.conetop.cn:8005/api/v1/top-ten-locations')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const transformedData = this.transformData(data);
                transformedData.forEach(polygonData => {
                    this.addPolygon(map, polygonData);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }
  
    transformData(data: any[]): any[] {
        return data.map(item => {
            const [lat, lon] = item.split(',').map((num: any) => parseFloat(num.replace(/[()]/g, '')));
            return [
                [lon, lat],
                [lon + 0.009, lat],
                [lon + 0.009, lat + 0.009],
                [lon, lat + 0.009]
            ];
        });
    }
  
    addPolygon(map: any, data: any[]): void {
        const polygon = new AMap.Polygon({
            path: data,
            fillColor: '#ccebc5',
            strokeOpacity: 1,
            fillOpacity: 0.5,
            strokeColor: '#2b8cbe',
            strokeWeight: 3,
            strokeStyle: 'dashed',
            strokeDasharray: [5, 5],
        });
    
        polygon.on('mouseover', () => {
            polygon.setOptions({
            fillOpacity: 0.7,
            fillColor: '#FF0000'
            });
        });
    
        polygon.on('mouseout', () => {
            polygon.setOptions({
            fillOpacity: 0.5,
            fillColor: '#ccebc5'
            });
        });
    
        map.add(polygon);
        map.on('complete', () => {
            this.chartOptions = {
            amap: {
                map
            }
            };
        });
    }
  }
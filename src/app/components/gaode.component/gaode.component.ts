import { Component, OnInit, AfterViewInit} from '@angular/core';
import { NgxEchartsDirective , NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import AMapLoader from '@amap/amap-jsapi-loader';


@Component({
    selector:'gaode',
    templateUrl:'./gaode.component.html',
    styleUrl:'./gaode.component.css',
    imports: [NgxEchartsDirective],
    standalone:true
})
export class GaodeComponent implements OnInit, AfterViewInit {
    chartOptions: any; // 数据存储
    constructor() {}

    // ngOnInit 生命周期钩子
    ngOnInit(): void {
      // 模拟数据加载
      
    }
    
    ngAfterViewInit(): void {
        AMapLoader.load({
            // 替换成你自己的apikey, 或者找我要
            // 后面需要配置化这个key
            key: '544242c05583889db8cd41aa8f7cc801', // 高德地图 API Key
            version: '2.0', // SDK 版本
          }).then(() => {
            this.initializeMap();
          });
    }
  
    initializeMap() {
        // 初始化高德地图
        const map = new AMap.Map('container', {
            center: [126.5349, 45.8038], // 设置地图中心点
            zoom: 10
        });

        map.on('complete', () => {
            this.chartOptions = {
            amap: {
                map
            },
            series: [
                {
                type: 'scatter',
                coordinateSystem: 'amap',
                data: [
                    [116.397428, 39.90923],
                    [116.407428, 39.89923]
                ],
                symbolSize: 10
                }
            ]
            };
        });
    }
    
}
import { Component, OnInit, AfterViewInit} from '@angular/core';
import { EChartsOption } from 'echarts';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import * as echarts from 'echarts';  // 显式导入 echarts
import 'echarts/extension/bmap/bmap'; // 确保引入 BMap 扩展

@Component({
  selector: 'demand',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: 'demand.component.html',
  styleUrls: ['demand.component.scss']
})
export class DemandComponent implements OnInit, AfterViewInit {
    chartOption: EChartsOption = {};  // ECharts 配置项
    public echarsOption:any;
    public COLORS : any = ['#070093', '#1c3fbf', '#1482e5', '#70b4eb', '#b4e0f3', '#ffffff'];
    public lngExtent : any = [45.4, 46.1];
    public latExtent : any = [126.083333333, 127.058333333];
    public cellCount : any = [83, 52];
    public cellSizeCoord : any = [0.008333333,0.008333333];
    // public lngExtent : any = [45.4, 46.3];
    // public latExtent : any = [126.183333333, 126.858333333];
    // public cellCount : any = [50, 50];
    // public cellSizeCoord : any = [
    //     (this.lngExtent[1] - this.lngExtent[0]) / this.cellCount[0],
    //     (this.latExtent[1] - this.latExtent[0]) / this.cellCount[1]
    // ];
    public ppPieces = [
        { value: 0, color: this.COLORS[5] },
        { min: 1,  max: 499, color: this.COLORS[4] },
        { min: 500, max: 4999, color: this.COLORS[3] },
        { min: 5000, max: 9999, color: this.COLORS[2] },
        { min: 10000, max: 19999, color: this.COLORS[1] },
        { min: 20000, color: this.COLORS[0] }];
    public demandPieces = [
        { value: 0, color: this.COLORS[5] },
        { min: 1,  max: 3, color: this.COLORS[4] },
        { min: 4, max: 9, color: this.COLORS[3] },
        { min: 10, max: 20, color: this.COLORS[2] },
        { min: 21, max: 60, color: this.COLORS[1] },
        { min: 61, color: this.COLORS[0] }];
    public gapSize = 0;
    public harbinppData: any = [];
    private baseurl = 'http://law.conetop.cn:8005';
    grid: number[][] = [];
    demandData: number[][] = [];
    myChart: any;

    constructor(private httpClient: HttpClient) {
    }

    ngOnInit(): void {
        this.initChart();
    }
    
    ngAfterViewInit(): void {
        this.loadCurrentDemand();
    }

    initChart() {
        //echarts.registerMap('china', chinaMap); // 注册地图
        const chartDom = document.getElementById('demandContainer') as HTMLElement;
        this.myChart = echarts.init(chartDom);
    }

    public loadData(){
        // load current demand data
        return this.loadCurrentDemand();
    }

    getCoord(params:any, api:any, lngIndex:any, latIndex:any) {
        var coords = params.context.coords || (params.context.coords = []);
        var key = lngIndex + '-' + latIndex;
        // bmap returns point in integer, which makes cell width unstable.
        // So we have to use right bottom point.
        return (
          coords[key] ||
          (coords[key] = api.coord([
            +(this.latExtent[0] + lngIndex * this.cellSizeCoord[0]).toFixed(6),
            +(this.lngExtent[0] + latIndex * this.cellSizeCoord[1]).toFixed(6)
          ]))
        );
    }

    public loadOption(pdata: any, cuPieces: any){
        var option = {
            backgroundColor: 'transparent',
            tooltip: {},
            visualMap: {
              type: 'piecewise',
              inverse: true,
              top: 10,
              left: 10,
              pieces: cuPieces,
              borderColor: '#ccc',
              borderWidth: 2,
              backgroundColor: '#eee',
              dimension: 2,
              inRange: {
                color: this.COLORS,
                opacity: 0.7
              }
            },
            series: [
              {
                type: 'custom',
                coordinateSystem: 'bmap',
                renderItem: this.renderItem,
                animation: false,
                emphasis: {
                  itemStyle: {
                    color: 'yellow'
                  }
                },
                encode: {
                  tooltip: 2
                },
                data: pdata
              }
            ],
            bmap: {
                //126.669745,45.748435
              center: [126.669745, 45.748435],
              zoom: 12,
              roam: true,
              mapStyle: {
                styleJson: [
                  {
                    featureType: 'water',
                    elementType: 'all',
                    stylers: {
                      color: '#d1d1d1'
                    }
                  },
                  {
                    featureType: 'land',
                    elementType: 'all',
                    stylers: {
                      color: '#f3f3f3'
                    }
                  },
                  {
                    featureType: 'railway',
                    elementType: 'all',
                    stylers: {
                      visibility: 'off'
                    }
                  },
                  {
                    featureType: 'highway',
                    elementType: 'all',
                    stylers: {
                      color: '#999999'
                    }
                  },
                  {
                    featureType: 'highway',
                    elementType: 'labels',
                    stylers: {
                      visibility: 'off'
                    }
                  },
                  {
                    featureType: 'arterial',
                    elementType: 'geometry',
                    stylers: {
                      color: '#fefefe'
                    }
                  },
                  {
                    featureType: 'arterial',
                    elementType: 'geometry.fill',
                    stylers: {
                      color: '#fefefe'
                    }
                  },
                  {
                    featureType: 'poi',
                    elementType: 'all',
                    stylers: {
                      visibility: 'off'
                    }
                  },
                  {
                    featureType: 'green',
                    elementType: 'all',
                    stylers: {
                      visibility: 'off'
                    }
                  },
                  {
                    featureType: 'subway',
                    elementType: 'all',
                    stylers: {
                      visibility: 'off'
                    }
                  },
                  {
                    featureType: 'manmade',
                    elementType: 'all',
                    stylers: {
                      color: '#d1d1d1'
                    }
                  },
                  {
                    featureType: 'local',
                    elementType: 'all',
                    stylers: {
                      color: '#d1d1d1'
                    }
                  },
                  {
                    featureType: 'arterial',
                    elementType: 'labels',
                    stylers: {
                      visibility: 'off'
                    }
                  },
                  {
                    featureType: 'boundary',
                    elementType: 'all',
                    stylers: {
                      color: '#fefefe'
                    }
                  },
                  {
                    featureType: 'building',
                    elementType: 'all',
                    stylers: {
                      color: '#d1d1d1'
                    }
                  },
                  {
                    featureType: 'label',
                    elementType: 'labels.text.fill',
                    stylers: {
                      color: 'rgba(0,0,0,0)'
                    }
                  }
                ]
              }
            }
          };
        return option;
    }

    renderItem = (params:any, api:any) => {
        var context = params.context;
        var lngIndex = api.value(0);
        var latIndex = api.value(1);
        var coordLeftTop = [
          +(this.latExtent[0] + lngIndex * this.cellSizeCoord[0]).toFixed(6),
          +(this.lngExtent[0] + latIndex * this.cellSizeCoord[1]).toFixed(6)
        ];
        var pointLeftTop = this.getCoord(params, api, lngIndex, latIndex);
        var pointRightBottom = this.getCoord(params, api, lngIndex + 1, latIndex + 1);
        
        return {
          type: 'rect',
          shape: {
            x: pointLeftTop[0],
            y: pointLeftTop[1],
            width: pointRightBottom[0] - pointLeftTop[0],
            height: pointRightBottom[1] - pointLeftTop[1]
          },
          style: api.style({
            stroke: 'rgba(0,0,0,0.1)'
          }),
          styleEmphasis: api.styleEmphasis()
        };
    }

    loadCurrentDemand(){
        let demandGrid = this.newGrid();
        let ppGrid = this.newGrid();
        // if(!this.harbinppData || this.harbinppData.length == 0){
        //     console.log("没有数据")
        //     return;
        // }

        this.httpClient.get<any[]>(`${this.baseurl}/api/v1/demands/last10mins`).subscribe(data => {
            console.log(data[0])
            data.forEach(row => {
                if(row && row.lon_index && row.lat_index && row.trip_count){
                    demandGrid[row.lon_index-1][row.lat_index-1] = row.trip_count
                    ppGrid[row.lon_index-1][row.lat_index-1] = row.ppdensity
                }
                else{
                    console.log("有问题：",row)
                }
            });
            let echarsData = this.transferEcharsData(demandGrid);
            this.harbinppData = this.transferEcharsData(ppGrid);
            this.echarsOption = this.loadOption(echarsData, this.demandPieces);
            this.myChart.setOption(this.echarsOption);
        });
    }

    newGrid(): number[][] {
        return Array.from({ length: 83 }, () => Array(52).fill(0));
    }

    transferEcharsData(data2V: number[][]): any[] {
        let echarsData: any[] = [];
        for (let i = 0; i < data2V.length; i++) {
            for (let j = 0; j < data2V[i].length; j++) {
                echarsData.push([i, j, data2V[i][j]]);
            }
        }
        return echarsData;
    }

    switchCorlor(value: number): number {
        if (value < 1) {
            return 5;
        } else if (value < 3) {
            return 4;
        } else if (value < 8) {
            return 3;
        } else if (value < 20) {
            return 2;
        } else if (value < 60) {
            return 1;
        } else {
            return 0;
        }
    }

    loadHarbinPP(){
        this.updateMapChart(this.harbinppData, this.ppPieces);
    }

    updateMapChart(chartData: any, cuPieces: any) {
        this.echarsOption = this.loadOption(chartData, cuPieces);
        this.myChart.setOption(this.echarsOption);
    }

    loadForecastDemand(){
        let forecastDemandGrid = this.newGrid();

        this.httpClient.get<any[]>(`${this.baseurl}/api/v1/demands/forecast`).subscribe(data => {
            data.forEach(row => {
                if(row && row.lon_index && row.lat_index && row.trip_count != null){
                    forecastDemandGrid[row.lon_index-1][row.lat_index-1] = row.trip_count
                }
                else{
                    console.log("有问题：",row)
                }
            });
            let echarsData = this.transferEcharsData(forecastDemandGrid);
            this.updateMapChart(echarsData, this.demandPieces);
        });
    }
}
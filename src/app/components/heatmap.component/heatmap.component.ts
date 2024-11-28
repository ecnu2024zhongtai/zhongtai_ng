import { Component } from '@angular/core';
@Component({
    selector:'heatmap',
    templateUrl:'./heatmap.component.html',
    styleUrl:'./heatmap.component.css',
    standalone:true
})
export class HeatmapComponent{
    items: string[] = []; // 数据存储
    constructor() {}

    // ngOnInit 生命周期钩子
    ngOnInit(): void {
      // 模拟数据加载
      this.loadData();
    }
    
    // 加载数据的方法
    loadData(): void {
      this.items = ['Item 1', 'Item 2', 'Item 3']; // 示例数据
    }
}



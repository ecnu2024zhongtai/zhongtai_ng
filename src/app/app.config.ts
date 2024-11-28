import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { NgxEchartsDirective, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import { routes } from './app.routes';

const ECHARTS_CONFIG = {
  // 在这里配置 ECharts 的全局配置
  // 例如可以配置主题、图表宽高等
  echarts: () => import('echarts'), // 按需加载 ECharts
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    {
      provide: NGX_ECHARTS_CONFIG,
      useValue: ECHARTS_CONFIG,
    },
  ]
};

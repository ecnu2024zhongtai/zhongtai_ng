import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

const ECHARTS_CONFIG = {
  // 在这里配置 ECharts 的全局配置
  // 例如可以配置主题、图表宽高等
  echarts: () => import('echarts'), // 按需加载 ECharts
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

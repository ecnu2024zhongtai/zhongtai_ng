import { Routes } from '@angular/router';

import { GaodeComponent } from './components/gaode.component/gaode.component';
import { HomeComponent } from './components/home.component/home.component';
import { DriverlineComponent } from './components/driverline.component/driverline.component';
import { HeatmapComponent } from './components/heatmap.component/heatmap.component';
import { GridmapComponent } from './components/gridmap.component/gridmap.component';
import { TopareaComponent } from './components/toparea.component/toparea.component';
import { TaxiComponent } from './components/taxi.component/taxi.component';
import { Top10AreaComponent } from './components/top10area.component/top10area.component';
import { DemandComponent } from './components/demand.component/demand.component';
import { TracemapComponent } from './components/tracemap.component/tracemap.component';

export const routes: Routes = [
    { path:'', component: HomeComponent},
    { path:'gaode', component: GaodeComponent},
    { path:'driverline', component: DriverlineComponent},
    { path:'heatmap', component: HeatmapComponent},
    { path:'gridmap', component: GridmapComponent},
    { path:'toparea', component: TopareaComponent},
    { path:'taxi', component: TaxiComponent},
    { path:'top10area', component: Top10AreaComponent},
    { path:'demand', component: DemandComponent},
    { path:'tracemap', component: TracemapComponent},
];

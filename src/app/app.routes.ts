import { Routes } from '@angular/router';

import { GaodeComponent } from './components/gaode.component/gaode.component';
import { HomeComponent } from './components/home.component/home.component';
import { DriverlineComponent } from './components/driverline.component/driverline.component';
import { HeatmapComponent } from './components/heatmap.component/heatmap.component';
import { GridmapComponent } from './components/gridmap.component/gridmap.component';
import { TopareaComponent } from './components/toparea.component/toparea.component';
import { TaxiComponent } from './components/taxi.component/taxi.component';

export const routes: Routes = [
    { path:'', component: HomeComponent},
    { path:'gaode', component: GaodeComponent},
    { path:'driverline', component: DriverlineComponent},
    { path:'heatmap', component: HeatmapComponent},
    { path:'gridmap', component: GridmapComponent},
    { path:'toparea', component: TopareaComponent},
    { path:'taxi', component: TaxiComponent},
];

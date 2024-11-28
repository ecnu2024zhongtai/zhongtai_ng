import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home.component/home.component';
import { MenubarComponent } from './components/menubar.component/menubar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, RouterOutlet, MenubarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'zhongtai_ng';
}

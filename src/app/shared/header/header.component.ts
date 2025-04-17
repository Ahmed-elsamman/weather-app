import { Component } from '@angular/core';
import { ThemesService } from '../../services/themes.service';
import { log } from 'console';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

constructor(private _themesService: ThemesService) { }
  toggleTheme() {
    this._themesService.toggleTheme();
    console.log('Theme toggled  ' + this._themesService.currentTheme);
    
  }

  get currentTheme() {
    return this._themesService.currentTheme;
  }
  
}



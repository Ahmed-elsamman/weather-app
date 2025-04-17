import { Injectable } from '@angular/core';
import { log } from 'console';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {


  private theme = new BehaviorSubject<'dark' | 'light'>('dark');
  currentTheme = this.theme.asObservable();

  toggleTheme() {
    const newTheme = this.theme.value === 'dark' ? 'light' : 'dark';
    console.log('Theme toggled from server ' + newTheme);
    this.theme.next(newTheme);      // Remove the old theme class


    
    document.body.classList.toggle('dark-theme', newTheme === 'dark');
    document.body.classList.toggle('light-theme', newTheme === 'light');
  }
}

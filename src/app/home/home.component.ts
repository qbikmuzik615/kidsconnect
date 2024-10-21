import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { SharePlayService } from '../services/shareplay.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private routerExtensions: RouterExtensions,
    private sharePlayService: SharePlayService
  ) {}

  startSharePlay() {
    this.sharePlayService.startSharePlaySession()
      .then(() => console.log('SharePlay session started'))
      .catch(error => console.error('SharePlay session failed to start', error));
  }

  goToGameLibrary() {
    this.routerExtensions.navigate(['/game-library']);
  }
}
import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { SharePlayService } from '../services/shareplay.service';

@Component({
  selector: 'app-game-library',
  templateUrl: './game-library.component.html',
  styleUrls: ['./game-library.component.css']
})
export class GameLibraryComponent {
  games = [
    { id: 'memory', name: 'Memory Game', description: 'Match the cards!' },
    { id: 'drawing', name: 'Drawing Game', description: 'Draw together!' },
  ];

  constructor(
    private routerExtensions: RouterExtensions,
    private sharePlayService: SharePlayService
  ) {}

  startGame(gameId: string) {
    this.sharePlayService.configureGroupActivity(gameId)
      .then(() => {
        switch (gameId) {
          case 'memory':
            this.routerExtensions.navigate(['/memory-game']);
            break;
          case 'drawing':
            this.routerExtensions.navigate(['/drawing-game']);
            break;
          default:
            console.log('Game not implemented yet');
        }
      })
      .catch(error => console.error('Failed to configure group activity', error));
  }
}
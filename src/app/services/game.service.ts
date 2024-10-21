import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private games = [
    { id: 'memory', name: 'Memory Game', description: 'Match the cards!' },
    { id: 'drawing', name: 'Drawing Game', description: 'Draw together!' },
  ]

  getGames() {
    return this.games
  }
}
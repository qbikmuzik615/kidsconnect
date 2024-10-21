import { Component, OnInit } from '@angular/core';
import { SharePlayService } from '../../services/shareplay.service';

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.css']
})
export class MemoryGameComponent implements OnInit {
  cards: any[] = [];
  isMyTurn: boolean = false;

  constructor(private sharePlayService: SharePlayService) {}

  ngOnInit() {
    this.initializeGame();
    this.sharePlayService.joinGroupActivity('memory')
      .then(() => this.setupSharePlayListeners())
      .catch(error => console.error('Failed to join group activity', error));
  }

  initializeGame() {
    this.cards = [
      { id: 1, value: 'A', isFlipped: false },
      { id: 2, value: 'A', isFlipped: false },
      { id: 3, value: 'B', isFlipped: false },
      { id: 4, value: 'B', isFlipped: false },
      // Add more cards as needed
    ];
    this.shuffleCards();
  }

  shuffleCards() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  flipCard(card: any) {
    if (!this.isMyTurn || card.isFlipped) return;

    card.isFlipped = true;
    this.sharePlayService.sendGameUpdate('flipCard', { cardId: card.id });

    // Check for match logic here
  }

  setupSharePlayListeners() {
    this.sharePlayService.onGameUpdate('flipCard', (data) => {
      const card = this.cards.find(c => c.id === data.cardId);
      if (card) card.isFlipped = true;
    });

    this.sharePlayService.onTurnChange((isMyTurn) => {
      this.isMyTurn = isMyTurn;
    });
  }
}
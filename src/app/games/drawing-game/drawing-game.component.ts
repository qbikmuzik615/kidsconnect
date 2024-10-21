import { Component, ViewChild, ElementRef } from '@angular/core';
import { SharePlayService } from '../../services/shareplay.service';

@Component({
  selector: 'app-drawing-game',
  templateUrl: './drawing-game.component.html',
  styleUrls: ['./drawing-game.component.css']
})
export class DrawingGameComponent {
  @ViewChild('canvas', { static: true }) canvasRef: ElementRef;
  private context: any;
  isDrawing = false;
  currentColor = 'black';

  constructor(private sharePlayService: SharePlayService) {}

  ngOnInit() {
    this.context = this.canvasRef.nativeElement.getContext('2d');
    this.setupSharePlayListeners();
  }

  onPanStart(args: any) {
    this.isDrawing = true;
    this.draw(args.position.x, args.position.y);
  }

  onPan(args: any) {
    if (this.isDrawing) {
      this.draw(args.position.x, args.position.y);
    }
  }

  onPanEnd() {
    this.isDrawing = false;
    this.context.beginPath();
  }

  draw(x: number, y: number) {
    this.context.strokeStyle = this.currentColor;
    this.context.lineWidth = 2;
    this.context.lineTo(x, y);
    this.context.stroke();
    this.context.beginPath();
    this.context.moveTo(x, y);

    this.sharePlayService.sendGameUpdate('draw', { x, y, color: this.currentColor });
  }

  changeColor(color: string) {
    this.currentColor = color;
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    this.sharePlayService.sendGameUpdate('clear', {});
  }

  setupSharePlayListeners() {
    this.sharePlayService.onGameUpdate('draw', (data) => {
      this.context.strokeStyle = data.color;
      this.context.lineWidth = 2;
      this.context.lineTo(data.x, data.y);
      this.context.stroke();
      this.context.beginPath();
      this.context.moveTo(data.x, data.y);
    });

    this.sharePlayService.onGameUpdate('clear', () => {
      this.context.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    });
  }
}
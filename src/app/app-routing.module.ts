import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { HomeComponent } from './home/home.component';
import { GameLibraryComponent } from './game-library/game-library.component';
import { MemoryGameComponent } from './games/memory-game/memory-game.component';
import { DrawingGameComponent } from './games/drawing-game/drawing-game.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'game-library', component: GameLibraryComponent },
  { path: 'memory-game', component: MemoryGameComponent },
  { path: 'drawing-game', component: DrawingGameComponent },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
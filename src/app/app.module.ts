import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GameLibraryComponent } from './game-library/game-library.component';
import { MemoryGameComponent } from './games/memory-game/memory-game.component';
import { DrawingGameComponent } from './games/drawing-game/drawing-game.component';
import { SharePlayService } from './services/shareplay.service';

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule],
  declarations: [
    AppComponent,
    HomeComponent,
    GameLibraryComponent,
    MemoryGameComponent,
    DrawingGameComponent
  ],
  providers: [SharePlayService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
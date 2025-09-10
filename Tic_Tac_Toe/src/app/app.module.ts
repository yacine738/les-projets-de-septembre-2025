import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbButtonModule } from '@nebular/theme';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { SquareComponent } from './square/square.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    SquareComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

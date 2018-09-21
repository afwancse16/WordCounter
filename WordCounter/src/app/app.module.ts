import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TextComponent } from './text/text.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CountComponent } from './count/count.component';

const routes: Routes = [
  { path: '', redirectTo: '/text', pathMatch: 'full' },
  { path: 'text', component: TextComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TextComponent,
    NotFoundComponent,
    CountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

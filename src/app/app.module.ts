import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MessagesInterceptor } from './interceptor/messages.interceptor';
import { environment } from 'src/environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EventMessageComponent } from './event-message/event-message.component';
import { TimemodalComponent } from './timemodal/timemodal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    EventMessageComponent,
    TimemodalComponent,

  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatMenuModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    FontAwesomeModule,
    FontAwesomeModule


  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MessagesInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

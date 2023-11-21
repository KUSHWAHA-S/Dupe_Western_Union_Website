import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyReceiverComponent } from './my-receiver/my-receiver.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddReceiverComponent } from './add-receiver/add-receiver.component';
import { HttpClientModule } from '@angular/common/http';
import { EditReceiverComponent } from './edit-receiver/edit-receiver.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    MyReceiverComponent,
    LoginComponent,
    HeaderComponent,
    AddReceiverComponent,
    EditReceiverComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AddReceiverComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

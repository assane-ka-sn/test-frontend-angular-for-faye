import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import {ModalModule, AlertModule } from "ngx-bootstrap";

import { AppComponent } from './app.component';
import {LoginComponent} from "./component/loginComponent/login.component";
import {ApiService} from "./services/api-server";
import {AuhtService} from "./services/auth-server";
import {ChatroomComponent} from "./component/chatroomComponent/chatroom.component";
import {DashboardComponent} from "./component/dashboardComponent/dashboard.component";
import {AuthGuard} from "./guard/auth-guard";
import {ChatgroupComponent} from "./component/chatgroupComponent/chatgroup.component";
import {ChatuserComponent} from "./component/chatuserComponent/chatuser.component";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ChatroomComponent,
    ChatgroupComponent,
    ChatuserComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,

    ModalModule.forRoot(),
    AlertModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    ApiService,
    AuhtService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

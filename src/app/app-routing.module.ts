import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./component/loginComponent/login.component";
import {DashboardComponent} from "./component/dashboardComponent/dashboard.component";
import {AuthGuard} from "./guard/auth-guard";
import {ChatroomComponent} from "./component/chatroomComponent/chatroom.component";
import {ChatgroupComponent} from "./component/chatgroupComponent/chatgroup.component";
import {ChatuserComponent} from "./component/chatuserComponent/chatuser.component";

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}

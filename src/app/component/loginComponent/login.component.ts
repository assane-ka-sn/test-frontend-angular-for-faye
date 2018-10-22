import {Component, OnInit} from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';
import {AuhtService} from "../../services/auth-server";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers: [AuhtService]
})
export class LoginComponent implements OnInit {
  title = 'front-issafrique';

  public login:string = "";
  public pwd:string = "";
  public  errorLogin = false;

  constructor(private router: Router, private auth: AuhtService)  {  }

  ngOnInit() {
    this.login = "";
    this.pwd = "";

  }

  authentificate(){
    this.auth.login({login:this.login, pwd:Md5.hashStr(this.pwd)}).subscribe(
      data => {

        if (data.errorCode) {
          console.log(data)
          localStorage.setItem('currentUser', JSON.stringify(data.message));
          //if(data.message.role=='admin'){
            this.router.navigate(['/dashboard']);
          //}else{
            //this.router.navigate(['/dashboard']);
          //}
        }
        else {
          this.errorLogin = true;
          this.login = "";
          this.pwd = ""
        }
      },
      error => {
        alert("Erreur connection coté server. Veuillez reessayer");
      },
      () => console.log('finished')
    );
  }
}

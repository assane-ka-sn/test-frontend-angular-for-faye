import {Component, OnInit, TemplateRef, OnDestroy} from '@angular/core';
import {ApiService} from "../../services/api-server";
import {Router} from "@angular/router";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {Md5} from "ts-md5";


@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  providers: [ApiService]
})
export class DashboardComponent implements OnInit, OnDestroy {

  public listeUsers:any = [];
  public listeRoles:any = [];
  public listeGroupes:any = [];
  public token:string = ""
  public userConnect:any;
  public newuser:any = {pseudo:'', login:'', pwd:'', confpwd:'', role_id:'0'};
  public modalRef: BsModalRef; // {1}
  private keepSetInterval:any;
  public inputconfpwd:boolean=false;
  public errorAddNewUser:string = "";

  public isclickRoom: boolean = true;
  public isclickGroup: boolean = false;
  public isclickUser: boolean = false;
  public groupe_id: Number;
  public user_id: Number;
  public isCollapsed = false;
  public typechat:string = 'room';
  public objDate: Date = new Date();

  constructor(private router: Router, private api: ApiService,private modalService: BsModalService)  {  }

  ngOnInit() {
    console.log(this.objDate)
    this.token = JSON.parse(localStorage.getItem('currentUser')).basetoken;
    this.userConnect = JSON.parse(localStorage.getItem('currentUser'));
    this.listedatainitadmin();
    this.keepSetInterval = setInterval(() => {
      this.listeusers();
    }, 1500);
  }

  ngOnDestroy() {
    clearInterval(this.keepSetInterval)
  }

  public openModalNewMemebre(template: TemplateRef<any>) {
    clearInterval(this.keepSetInterval);
    this.newuser = {pseudo:'', login:'', pwd:'', confpwd:'', role_id:'0'}
    this.modalRef = this.modalService.show(template); // {3}
  }

  public closeModal() {
    this.modalRef.hide()
    this.errorAddNewUser = '';
    this.listedatainitadmin();
    this.keepSetInterval = setInterval(() => {
      this.listeusers();
    }, 2000);
  }

  public listedatainitadmin(){
    this.api.listedatainitadmin().subscribe(
      data => {
        if (data.errorCode) {
          console.log(data.message)
          this.listeUsers = data.message.users;
          this.listeRoles = data.message.roles;
          this.listeGroupes = data.message.groupes;
        }
      },
      error => {
        console.log(error);
      },
      () => console.log("slf")
    );
  }

  public listeusers(){
    this.api.listeUser().subscribe(
      data => {
        if (data.errorCode) {
          this.listeUsers = data.message;
        }
      },
      error => {
        console.log(error);
      },
      () => console.log('users')
    );
  }

  public deconnexion(){

    this.api.logout().subscribe(
      data => {
        console.log(data)
      },
      error => {
        alert("Erreur connection coté server. Veuillez reessayer");
      },
      () => {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/']);
      }
    );
  }

  public addmembre(){
    if(this.newuser.pwd==this.newuser.confpwd){
      this.newuser.pwd = Md5.hashStr(this.newuser.pwd)
      this.newuser.role_id = Number(this.newuser.role_id)
      this.newuser.confpwd = ""
      this.api.addmembre(this.newuser).subscribe(
        data => {
          if (data.errorCode) {
            this.closeModal();
          }else {
            this.newuser.pwd = ""
            this.errorAddNewUser = data.message;
          }
        },
        error => {
          console.log(error);
        },
        () => this.keepSetInterval = setInterval(() => {
          this.listeusers();
        }, 1500)
      );
    }else {
      this.inputconfpwd=true;
      this.newuser.pwd = ""
    }

  }

  public demarrerchatroom(){
    this.isclickGroup = false
    this.isclickUser = false
    this.typechat = 'room'
    this.isclickRoom = true
  }

  public demarrerchatgroup(id){
    this.demarrerchatroom()
    setTimeout(() => {
      this.groupe_id = Number(id);
      this.isclickUser = false
      this.isclickRoom = false
      this.typechat = 'groupe'
      this.isclickGroup = true
    }, 5);
  }

  public demarrerchatuser(id){
    this.demarrerchatroom()
    setTimeout(() => {
      this.user_id = Number(id);
      this.isclickRoom = false
      this.isclickGroup = false
      this.typechat = 'user'
      this.isclickUser = true
    }, 5);
  }

}

import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {ApiService} from "../../services/api-server";


@Component({
  selector: 'app-chatuser',
  templateUrl: 'chatuser.component.html',
  styleUrls: ['chatuser.component.css'],
  providers: [ApiService]
})
export class ChatuserComponent implements OnInit, OnDestroy {

  public listeMessages:any = [];
  public messageAenvoye:string = ""
  public token:string = ""
  public tchat_user:any;
  private keepSetInterval:any
  @Input() tchat_user_id:Number;
  private selectedFile: File;

  constructor(private api: ApiService)  {  }

  ngOnInit() {
    this.api.getChatUser(this.tchat_user_id).subscribe(
      data => {
        console.log(data)
        if (data.errorCode) {
          this.tchat_user = data.message.user;
          this.listeMessages = data.message.messages;
        }
      },
      error => {
        console.log(error);
      },
      () => {
        this.listemessagesuser(this.tchat_user_id);
        this.keepSetInterval = setInterval(() => {
          this.listemessagesuser(this.tchat_user_id);
        }, 1500);
      }
    );
    this.token = JSON.parse(localStorage.getItem('currentUser')).basetoken;
  }

  ngOnDestroy() {
    clearInterval(this.keepSetInterval)
  }

  listemessagesuser(tchat_user_id){
    this.api.listeMessagesuser(tchat_user_id).subscribe(
      data => {
        if (data.errorCode) {
          this.listeMessages = data.message;
        }
      },
      error => {
        console.log(error);
      },
      () => console.log('finished')
    );
  }

  envoiMessageUser(){
    clearInterval(this.keepSetInterval);
    this.api.envoiMessageUser(this.messageAenvoye, this.tchat_user_id).subscribe(
      data => {
        console.log(data)
        if (data.errorCode) {
          this.listeMessages = data.message;
          this.messageAenvoye = "";
        }
      },
      error => {
        console.log(error);
      },
      () => {
        this.listemessagesuser(this.tchat_user_id);
        this.keepSetInterval = setInterval(() => {
          this.listemessagesuser(this.tchat_user_id);
        }, 1500);
      }
    );
  }

  handleFileInput(event) {
    clearInterval(this.keepSetInterval);
    if(event.target.files.length!=0){
      this.selectedFile = event.target.files[0];
      this.api.onUploadfile(this.selectedFile).subscribe(
        data => {
          if (data.errorCode) {
            this.api.envoiFileUser(data.message,this.tchat_user_id).subscribe(
              datas => {
                console.log(datas)
                if (datas.errorCode) {
                  this.listeMessages = datas.message;
                } else {
                  console.log("error server")
                }
              },
              errors => {
                console.log(errors);
              },
              () => {
                this.listemessagesuser(this.tchat_user_id);
                this.keepSetInterval = setInterval(() => {
                  this.listemessagesuser(this.tchat_user_id);
                }, 1500);
              }
            );
          }else {
            console.log("erreur upload")
          }
        },
        error => {
          console.log(error);
        },
        () => console.log('test upload file')
      )
    }else {
      this.listemessagesuser(this.tchat_user_id);
      this.keepSetInterval = setInterval(() => {
        this.listemessagesuser(this.tchat_user_id);
      }, 1500);
    }
  }



}

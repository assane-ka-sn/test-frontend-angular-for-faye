import {Component, OnInit, OnDestroy} from '@angular/core';
import {ApiService} from "../../services/api-server";


@Component({
  selector: 'app-chatroom',
  templateUrl: 'chatroom.component.html',
  styleUrls: ['chatroom.component.css'],
  providers: [ApiService]
})
export class ChatroomComponent implements OnInit, OnDestroy {

  public listeMessagesRoom:any = [];
  public messageAenvoye:string = ""
  public token:string = ""
  private keepSetInterval:any;
  private selectedFile: File;

  constructor(private api: ApiService)  {  }

  ngOnInit() {
    this.token = JSON.parse(localStorage.getItem('currentUser')).basetoken;
    this.listemessagesroom();
    this.keepSetInterval = setInterval(() => {
      this.listemessagesroom();
    }, 1500);
  }

  ngOnDestroy() {
    clearInterval(this.keepSetInterval);
  }

  listemessagesroom(){
    this.api.listeMessagesRoom().subscribe(
      data => {
        if (data.errorCode) {
          console.log(data.message)
          this.listeMessagesRoom = data.message;
        }
      },
      error => {
        console.log(error);
      },
      () => console.log('finished')
    );
  }

  envoiMessageroom(){
    clearInterval(this.keepSetInterval);
    this.api.envoiMessageRoom(this.messageAenvoye).subscribe(
      data => {
        if (data.errorCode) {
          this.listeMessagesRoom = data.message;
          this.messageAenvoye = "";
        }
      },
      error => {
        console.log(error);
      },
      () => {
        this.listemessagesroom();
        this.keepSetInterval = setInterval(() => {
          this.listemessagesroom();
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
            this.api.envoiFileRoom(data.message).subscribe(
              datas => {
                console.log(datas)
                if (datas.errorCode) {
                  this.listeMessagesRoom = datas.message;
                } else {
                  console.log("error server")
                }
              },
              errors => {
                console.log(errors);
              },
              () => {
                this.listemessagesroom();
                this.keepSetInterval = setInterval(() => {
                  this.listemessagesroom();
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
      this.listemessagesroom();
      this.keepSetInterval = setInterval(() => {
        this.listemessagesroom();
      }, 1500);
    }
  }

}

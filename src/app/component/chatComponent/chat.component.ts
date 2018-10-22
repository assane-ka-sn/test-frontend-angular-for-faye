import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {ApiService} from "../../services/api-server";


@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.css'],
  providers: [ApiService]
})
export class ChatComponent implements OnInit, OnDestroy {

  public listeMessages:any = [];
  public messageAenvoye:string = ""
  public token:string = ""
  @Input() typechat: string
  private keepSetInterval:any;
  private selectedFile: File;



  constructor(private api: ApiService)  {  }

  ngOnInit() {
    clearInterval(this.keepSetInterval);
    if(this.typechat=="room"){
      this.ngOnInitroom();
    }
    else if(this.typechat=="groupe"){
      this.ngOnInitgroupe()
    }
    else if(this.typechat=="user"){
      this.ngOnInituser()
    }
  }

//CHAT ROOM
  ngOnInitroom() {
    this.token = JSON.parse(localStorage.getItem('currentUser')).basetoken;
    this.listemessagesroom();
    this.keepSetInterval = setInterval(() => {
      this.listemessagesroom();
    }, 1500);
  }

  ngOnDestroy() {
    clearInterval(this.keepSetInterval);
    clearInterval(this.keepSetInterval);
    clearInterval(this.keepSetInterval);
  }

  listemessagesroom(){
    this.api.listeMessagesRoom().subscribe(
      data => {
        if (data.errorCode) {
          console.log("ROOM")
          this.listeMessages = data.message;
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
          this.listeMessages = data.message;
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

  handleFileInputroom(event) {
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
                  this.listeMessages = datas.message;
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


//CHAT GROUPE
  @Input() groupe_id:Number;
  public groupe:any;

  ngOnInitgroupe() {
    console.log("TCHAT GROUPE")
    this.token = JSON.parse(localStorage.getItem('currentUser')).basetoken;
    this.api.getGroupe(this.groupe_id).subscribe(
      data => {
        if (data.errorCode) {
          this.groupe = data.message.groupe;
          this.listeMessages = data.message.messages;
        }
      },
      error => {
        console.log(error);
      },
      () => {
        this.listemessagesgroupe(this.groupe_id);
        this.keepSetInterval = setInterval(() => {
          console.log("GROUP "+this.groupe_id);
          this.listemessagesgroupe(this.groupe_id);
        }, 1500);
      }
    );

  }

  listemessagesgroupe(groupe_id){
    this.api.listeMessagesgroupe(groupe_id).subscribe(
      data => {
        console.log("GROUP")
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

  envoiMessagegroupe(){
    clearInterval(this.keepSetInterval);
    this.api.envoiMessageGroupe(this.messageAenvoye, this.groupe.id).subscribe(
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
        this.listemessagesgroupe(this.groupe_id);
        this.keepSetInterval = setInterval(() => {
          this.listemessagesgroupe(this.groupe_id);
        }, 1500);
      }
    );
  }

  handleFileInputgroupe(event) {
    clearInterval(this.keepSetInterval);
    if(event.target.files.length!=0){
      this.selectedFile = event.target.files[0];
      this.api.onUploadfile(this.selectedFile).subscribe(
        data => {
          if (data.errorCode) {
            this.api.envoiFileGroupe(data.message,this.groupe_id).subscribe(
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
                this.listemessagesgroupe(this.groupe_id);
                this.keepSetInterval = setInterval(() => {
                  this.listemessagesgroupe(this.groupe_id);
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
      this.listemessagesgroupe(this.groupe_id);
      this.keepSetInterval = setInterval(() => {
        this.listemessagesgroupe(this.groupe_id);
      }, 1500);
    }
  }



//CHAT USER
  public tchat_user:any;
  @Input() tchat_user_id:Number;

  ngOnInituser() {
    this.api.getChatUser(this.tchat_user_id).subscribe(
      data => {
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

  listemessagesuser(tchat_user_id){
    this.api.listeMessagesuser(tchat_user_id).subscribe(
      data => {
        console.log("USER")
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

  envoiMessageuser(){
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

  handleFileInputuser(event) {
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

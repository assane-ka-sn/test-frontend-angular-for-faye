import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {ApiService} from "../../services/api-server";


@Component({
  selector: 'app-chatgroup',
  templateUrl: 'chatgroup.component.html',
  styleUrls: ['chatgroup.component.css'],
  providers: [ApiService]
})
export class ChatgroupComponent implements OnInit, OnDestroy {

  public listeMessagesGroup:any = [];
  public messageAenvoye:string = ""
  public token:string = ""
  public groupe:any;
  private keepSetInterval:any;
  @Input() groupe_id:Number;
  private selectedFile: File;

  constructor(private api: ApiService){ }

  ngOnInit() {
    console.log("TCHAT GROUPE")
    this.token = JSON.parse(localStorage.getItem('currentUser')).basetoken;
    this.api.getGroupe(this.groupe_id).subscribe(
      data => {
        console.log(data)
        if (data.errorCode) {
          this.groupe = data.message.groupe;
          this.listeMessagesGroup = data.message.messages;
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

  ngOnDestroy() {
    clearInterval(this.keepSetInterval);
  }

  listemessagesgroupe(groupe_id){
    this.api.listeMessagesgroupe(groupe_id).subscribe(
      data => {
        if (data.errorCode) {
          this.listeMessagesGroup = data.message;
        }
      },
      error => {
        console.log(error);
      },
      () => console.log('finished')
    );
  }

  envoiMessageGroupe(){
    clearInterval(this.keepSetInterval);
    this.api.envoiMessageGroupe(this.messageAenvoye, this.groupe.id).subscribe(
      data => {
        console.log(data)
        if (data.errorCode) {
          this.listeMessagesGroup = data.message;
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

  handleFileInput(event) {
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
                  this.listeMessagesGroup = datas.message;
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




}

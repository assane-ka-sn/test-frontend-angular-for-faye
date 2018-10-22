import { Injectable }    from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class ApiService {

  public link = "http://localhost/issafrique/test-backend-slim-for-faye/index.php";
  //private link = "http://test.kasaguesen.com/backend-issafrique/index.php";
  private headers: HttpHeaders;
  private basetoken:any;

  constructor(private _http: HttpClient){
    this.headers =  new HttpHeaders({'Content-Type':  'application/x-www-form-urlencoded'});
    this.basetoken = JSON.parse(localStorage.getItem('currentUser')).basetoken;
  }

  listeUser(): Observable<any>{
    let url = this.link+"/chat/listeusers";
    let datas = JSON.stringify({token:this.basetoken});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
  }

  addmembre(newuser): Observable<any>{
    let url = this.link+"/user/addmembre";
    let datas = JSON.stringify({token:this.basetoken, newuser:newuser});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
  }

  logout(): Observable<any>{
    let url = this.link+"/auth/logout";
    let datas = JSON.stringify({token:this.basetoken});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
  }

  listedatainitadmin(): Observable<any>{
    let url = this.link+"/chat/listedatainitadmin";
    let datas = JSON.stringify({token:this.basetoken});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
  }

  listeMessagesRoom(): Observable<any>{
    let url = this.link+"/chat/listemessagesroom";
    let datas = JSON.stringify({token:this.basetoken});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
  }

  envoiMessageRoom(message): Observable<any>{
    let url = this.link+"/chat/envoimessageroom";
    let datas = JSON.stringify({message:message, token:this.basetoken});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
  }

  envoiFileRoom(message:any): Observable<any>{
    let url = this.link+"/chat/envoifileroom";
    let datas = JSON.stringify({message:message, token:this.basetoken});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
  }

  listeMessagesgroupe(groupe_id): Observable<any>{
    let url = this.link+"/chat/listemessagesgroupe";
    let datas = JSON.stringify({token:this.basetoken, groupe_id: groupe_id});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
  }

  envoiMessageGroupe(message, groupe_id): Observable<any>{
    let url = this.link+"/chat/envoimessagegroupe";
    let datas = JSON.stringify({message:message, token:this.basetoken, groupe_id:groupe_id});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
  }

  envoiFileGroupe(message, groupe_id): Observable<any>{
    let url = this.link+"/chat/envoifilegroupe";
    let datas = JSON.stringify({message:message, token:this.basetoken, groupe_id:groupe_id});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
  }

  getGroupe(groupe_id): Observable<any>{
    let url = this.link+"/chat/getgroupe";
    let datas = JSON.stringify({token:this.basetoken, groupe_id:Number(groupe_id)});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
  }


  getChatUser(tchat_user_id): Observable<any>{
    let url = this.link+"/chat/getuser";
    let datas = JSON.stringify({token:this.basetoken, tchat_user_id:Number(tchat_user_id)});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
  }

  listeMessagesuser(tchat_user_id): Observable<any>{
    let url = this.link+"/chat/listemessagesuser";
    let datas = JSON.stringify({token:this.basetoken, tchat_user_id: tchat_user_id});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
  }

  envoiMessageUser(message, tchat_user_id): Observable<any>{
    let url = this.link+"/chat/envoimessageuser";
    let datas = JSON.stringify({message:message, token:this.basetoken, tchat_user_id:tchat_user_id});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
  }

  envoiFileUser(message, tchat_user_id): Observable<any>{
    let url = this.link+"/chat/envoifileuser";
    let datas = JSON.stringify({message:message, token:this.basetoken, tchat_user_id:tchat_user_id});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
  }

  onUploadfile(selectedFile): Observable<any>{
    let url = this.link+"/file/onUploadfile";
    const uploadData = new FormData();
    uploadData.append('uploads', selectedFile, selectedFile.name);
    return this._http.post(url, uploadData)
  }

  getfile(file): Observable<any>{
    let url = this.link+"/file/showfile";
    let datas = JSON.stringify({token:this.basetoken, file:file});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
  }




}

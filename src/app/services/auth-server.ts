import { Injectable }    from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuhtService {

  private link = "http://localhost/issafrique/test-backend-slim-for-faye/index.php";
  //private link = "http://test.kasaguesen.com/backend-issafrique/index.php";
  private headers: HttpHeaders;

  constructor(private _http: HttpClient){
    this.headers =  new HttpHeaders({'Content-Type':  'application/x-www-form-urlencoded'});
  }

  login(auth): Observable<any>{
    let url = this.link+"/auth/login";
    let datas = JSON.stringify(auth);
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
  }


}

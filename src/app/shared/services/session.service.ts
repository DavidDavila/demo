import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './../../store/'; 
import { VideoActions } from './../../actions/video.action';
import { HeadersService } from './headers.service';
@Injectable()
export class SessionService {
  private id: string;
  constructor(
      private _headersService: HeadersService,
      private http: Http,
      private ngRedux: NgRedux<IAppState>,
      private _videoActions:VideoActions,
  ) { }
  getVideoIdList(){
    return this.http.get( 'https://etrust-sandbox.electronicid.eu/v2/videoid.idtypes')
      .toPromise()
      .then( (resp: any) => {        
        let res = JSON.parse(resp['_body']);            
        return res;
      }, 
      (error: any) => {
      }
    );
  }
  setId(id: string) {
    this.id = id;
  }

  getVideo(){
    return this.http.get( 'https://server/v2/videoid/' + this._headersService.getId(), this._headersService.getHeaders())
      .toPromise()
      .then( (resp: any) => {        
        let res = JSON.parse(resp['_body']);  
        this.ngRedux.dispatch(this._videoActions.setVideo(res)) 
        return res;
      }, 
      (error: any) => {
      }
    );
  }
}

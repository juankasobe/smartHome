import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'

})
export class ThingSpeakService {
  private apiKEy = '';
  canal:String ="";
  fieldFoco1 ="";
  fieldFoco2 = "";
  constructor(private http: HttpClient) {
   }

   setApiKey(apiKey: string): void {
    this.apiKEy = apiKey;
    console.log(this.apiKEy);
  }
  setChannel(channel: string): void {
    this.canal = channel;
    console.log(this.canal);
  }
  setFieldFoco1(fieldFoco1: string){
    this.fieldFoco1 = fieldFoco1 ;
  }

  getData(): Observable<any> {
    console.log(`https://api.thingspeak.com/channels/${this.canal}/fields/${this.fieldFoco1}/last.json?api_key=${this.apiKEy}&results=1`);
    return this.http.get<any>(`https://api.thingspeak.com/channels/${this.canal}/fields/${this.fieldFoco1}/last.json?api_key=${this.apiKEy}&results=1`).pipe(
      tap(data => console.log(data))
    );
  }
}
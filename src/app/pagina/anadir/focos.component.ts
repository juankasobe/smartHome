import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-focos',
  templateUrl: './focos.component.html',
  styleUrls: ['../../app.component.scss'],
})
export class FocosComponent  implements OnInit {
  focos:any;
  ipFoco1:any;
  ipFoco2:any;
  fieldAudio:any;
  apareceFoco1=false;
  apareceFoco2=false;
  apareceBoton=false;
  apareceBotonAudio=false;
  activarAudio: boolean = false;
  activarMusica: boolean = false; 

  constructor(private storage: Storage,
    private toastController: ToastController) { 
      this.storage.create();
      //this.getValue();
    }

  ngOnInit() {

  }
  async showToast(message: string) {
    const toast = await this.toastController.create({
        message: message,
        duration: 2000
    });
    toast.present();
  }
  async setValue() {
    if(this.focos===""){
      this.showToast('El campo Focos no debe estar vacío');
    }else{
      await this.storage.set('focos', this.focos);
      this.showToast('Focos Agreagados Correctamente');
      this.getValue();
    }
  }
  async setIpValue(){
    if(this.ipFoco1==="" || this.ipFoco2===""){

    }else{
      await this.storage.set('ipFoco1', this.ipFoco1);
      await this.storage.set('ipFoco2', this.ipFoco2);
      this.showToast('Ip Focos Agreagados Correctamente');
    }
  }
  async getValue() {
    this.focos = await  this.storage.get('focos');
    if (this.focos=="1"){
      this.apareceFoco1=true;
      this.apareceFoco2=false;
      this.apareceBoton=true;
    } else if (this.focos=="2"){
      this.apareceFoco2=true;
      this.apareceFoco1=true;
      this.apareceBoton=true;
    } else{
      this.apareceFoco2=false;
      this.apareceFoco1=false;
      this.apareceBoton=false;
    }
  }

  async onToggleAudio($event:any){
    if ($event.target.checked) {
      // Realizar una acción cuando el toggle está activado
      await this.storage.set('audio', '1');
      this.apareceBotonAudio =true;
      console.log("encendido");
    } else {
      await this.storage.set('audio', '0');
      this.apareceBotonAudio =false;
      // Realizar una acción cuando el toggle está desactivado
      console.log("apagado");
    }
  }

  async onToggleMusica($event:any){
    if ($event.target.checked) {
      // Realizar una acción cuando el toggle está activado
      await this.storage.set('musica', '1');
      console.log("encendido");
    } else {
      await this.storage.set('musica', '0');
      // Realizar una acción cuando el toggle está desactivado
      console.log("apagado");
    }
  }
  async enviarFieldAudio(){
    await this.storage.set('fieldAudio', this.fieldAudio);
  }
}

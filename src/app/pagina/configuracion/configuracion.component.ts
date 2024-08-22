import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['../../app.component.scss'],
})
export class ConfiguracionComponent implements OnInit {
  usuario = '';
  contrasena = '';
  canal = '';
  apiKey = '';
  focos = '';
  value: any = "";
  fieldFoco1 = "";
  fieldFoco2 = "";
  fieldNoti = "";
  apareceFieldFoco1 = false;
  apareceFieldFoco2 = false;

  constructor(private storage: Storage,
    private toastController: ToastController) {
    this.storage.create();
  }


  ngOnInit() {
    //this.anadirFocos();
  }
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  async setValue() {
    if (this.usuario === "" || this.canal === "" || this.contrasena === "" ) {
      this.showToast('No se debe dejar los campos vacios');
    } else {
      await this.storage.set('usuario', this.usuario);
      await this.storage.set('contrasena', this.contrasena);
      await this.storage.set('canal', this.canal);
      //await this.storage.set('apiKey', this.apiKey);
      this.showToast('Datos Agreagados Correctamente');
    }
  }
  async setValueFields() {
    if (this.fieldNoti === "") {
      this.showToast('El campo Notificación no debe estar vacio');
    } else {
      //await this.storage.set('fieldFoco1', this.fieldFoco1);
      //await this.storage.set('fieldFoco2', this.fieldFoco2);
      await this.storage.set('fieldNoti', this.fieldNoti);
      this.showToast('Datos Agreagados Correctamente');
    }
  }

  async anadirFocos() {
    this.focos = await this.storage.get('focos');
    if (this.focos === '1') {
      this.apareceFieldFoco1 = true;
    } else if (this.focos === '2') {
      this.apareceFieldFoco2 = true;
      this.apareceFieldFoco1 = true;
    } else {
      this.apareceFieldFoco1 = false;
      this.apareceFieldFoco2 = false;
    }
  }

}

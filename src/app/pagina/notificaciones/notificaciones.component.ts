import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';
import { ThingSpeakService } from '../thingspeak.service';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
import BackgroundFetch from "cordova-plugin-background-fetch";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

declare var mqtt: any;

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['../../app.component.scss'],
})
export class NotificacionesComponent {

  client: any;

  topic: any;
  mensaje: any;
  options: any;
  cliendID: any = '';
  userThing: any;
  contrasenaThing: any;
  canal: any;
  apiKey = '';
  fieldNoti: any; 
  ipFoco1 = "";
  ipFoco2 = "";
  mensajeEstadoFoco1 = "";
  mensajeEstadoFoco2 = "";
  fieldAudio: any;
  audio: any;
  brokerUrl = 'wss://mqtt3.thingspeak.com:443/mqtt'

  textoLabel = "Desconectado del Servidor Mqtt";
  textoTitulo = "Notificaciones";

  mostrarNotificaciones = true;
  mostrarDomotica = false;

  sinNotificaciones: boolean = true;
  newMessageBano = false;
  newMessageComer = false;
  newMessageSed = false;
  newMessageTriste = false;
  newMessageEmergencia = false;
  newMessageMoverse = false;
  newMessageAseo = false;
  newMessageMusica = false;
  newMessageGradas = false;
  newMessagePanal = false;
  newMessageRopa = false;
  newMessageDecibeles = false;

  foco1 = false;
  foco2 = false;
  focos: String = "";
  foco1ImagenEncendido = false;
  foco1ImagenApagado = true;
  foco2ImagenEncendido = true;
  foco2ImagenApagado = false;
  fieldFoco1: any = "";
  fieldFoco2: any = "";
  activarMusica: any;
  mensajeImagenFoco1: String = "";
  mensajeImagenFoco2: String = "";

  taskId: any;


  constructor(private toastController: ToastController,
    private thingSpeakService: ThingSpeakService,
    private storage: Storage,
    private backgroundMode: BackgroundMode,
    private http: HttpClient,
    public navCtrl: NavController, public platform: Platform) {
    this.storage.create();
    this.anadirFocos();
    //this.platform.ready().then(this.onDeviceReady.bind(this));
  }
  async ngOnInit() {

    this.backgroundMode.enable();
    this.obtenerValores();
    this.enviarDatos();
  }

  async onDeviceReady() {
    // Your BackgroundFetch event handler.
    let onEvent = async (taskId: string) => {
      console.log('[BackgroundFetch] event received: ', taskId);
      // Required: Signal completion of your task to native code
      // If you fail to do this, the OS can terminate your app
      // or assign battery-blame for consuming too much background-time
      BackgroundFetch.finish(taskId);
    };

    // Timeout callback is executed when your Task has exceeded its allowed running-time.
    // You must stop what you're doing immediately BackgroundFetch.finish(taskId)
    let onTimeout = async (taskId: string) => {
      console.log('[BackgroundFetch] TIMEOUT: ', taskId);
      BackgroundFetch.finish(taskId);
    };

    // Configure the plugin.
    let status = await BackgroundFetch.configure({ minimumFetchInterval: 15 }, onEvent, onTimeout);
    console.log('[BackgroundFetch] configure, status: ', status);
  }
  enviarDatos() {
    setInterval(() => {
      this.publishMessage('18', this.fieldNoti);
    }, 60000);
  }

  activarSinNotis() {
    if (this.newMessageBano || this.newMessageComer || this.newMessageSed || this.newMessageTriste || this.newMessageEmergencia
      || this.newMessageMoverse || this.newMessageAseo || this.newMessageMusica || this.newMessageGradas || this.newMessagePanal
      || this.newMessageRopa || this.newMessageDecibeles) {
      console.log("una variable es true");
    } else {
      this.publishMessage('17', this.fieldNoti);
      this.sinNotificaciones = true;
    }
  }
  async mostrarNotificacion() {
    switch (this.mensaje.toString()) {
      case "15": {
        this.newMessageBano = true;
        this.sinNotificaciones = false;
        this.noti();
        setTimeout(() => {
          this.newMessageBano = false;
          this.activarSinNotis();
        }, 300000);
        break;
      }
      case "4": {
        this.noti();
        this.newMessageComer = true;
        this.sinNotificaciones = false;
        setTimeout(() => {
          this.newMessageComer = false;
          this.activarSinNotis();
        }, 300000);
        break;
      }
      case "5": {
        this.noti();
        this.newMessageSed = true;
        this.sinNotificaciones = false;
        setTimeout(() => {
          this.newMessageSed = false;
          this.activarSinNotis();
        }, 300000);
        break;
      }
      case "6": {
        this.noti();
        this.newMessageTriste = true;
        this.sinNotificaciones = false;
        setTimeout(() => {
          this.newMessageTriste = false;
          this.activarSinNotis();
        }, 300000);
        break;
      }
      case "7": {
        this.notiEmergencia();
        this.newMessageEmergencia = true;
        this.sinNotificaciones = false;
        setTimeout(() => {
          this.newMessageEmergencia = false;
          this.activarSinNotis();
        }, 300000);
        break;
      }
      case "8": {
        this.noti();
        this.newMessageMoverse = true;
        this.sinNotificaciones = false;
        setTimeout(() => {
          this.newMessageMoverse = false;
          this.activarSinNotis();
        }, 300000);
        break;
      }
      case "9": {
        this.noti();
        this.newMessageAseo = true;
        this.sinNotificaciones = false;
        setTimeout(() => {
          this.newMessageAseo = false;
          this.activarSinNotis();
        }, 300000);
        break;
      }
      case "10": {
        this.noti();
        this.newMessageMusica = true;
        this.sinNotificaciones = false;
        setTimeout(() => {
          this.newMessageMusica = false;
          this.activarSinNotis();
        }, 300000);
        break;
      }
      case "11": {
        this.noti();
        this.newMessageGradas = true;
        this.sinNotificaciones = false;
        setTimeout(() => {
          this.newMessageGradas = false;
          this.activarSinNotis();
        }, 300000);
        break;
      }
      case "12": {
        this.noti();
        this.newMessagePanal = true;
        this.sinNotificaciones = false;
        setTimeout(() => {
          this.newMessagePanal = false;
          this.activarSinNotis();
        }, 300000);
        break;
      }
      case "13": {
        this.noti();
        this.newMessageRopa = true;
        this.sinNotificaciones = false;
        setTimeout(() => {
          this.newMessageRopa = false;
          this.activarSinNotis();
        }, 300000);
        break;
      }
      case "14": {
        this.noti();
        this.newMessageDecibeles = true;
        this.sinNotificaciones = false;
        setTimeout(() => {
          this.newMessageDecibeles = false;
          this.activarSinNotis();
        }, 300000);
        break;
      }
    }
  }

  async obtenerValores() {
    this.cliendID = await this.storage.get('usuario');
    console.log(this.cliendID);
    this.userThing = await this.storage.get('usuario');
    console.log(this.userThing);
    this.contrasenaThing = await this.storage.get('contrasena');
    console.log(this.contrasenaThing);
    this.canal = await this.storage.get('canal');
    console.log(this.canal);
    this.fieldNoti = await this.storage.get('fieldNoti');
    console.log(this.fieldNoti);
    /*this.apiKey = await this.storage.get('apiKey');
    console.log(this.apiKey);
    this.fieldAudio = await this.storage.get('fieldAudio');
    console.log(this.fieldAudio);
    this.audio = await this.storage.get('audio');
    console.log(this.audio);
    this.fieldFoco1 = await this.storage.get('fieldFoco1');
    console.log(this.fieldFoco1);
    this.fieldFoco2 = await this.storage.get('fieldFoco2');
    console.log(this.fieldFoco2);
    this.activarMusica = await this.storage.get('musica');
    console.log(this.activarMusica);
    this.ipFoco1 = await this.storage.get('ipFoco1');
    console.log(this.ipFoco1);
    this.ipFoco2 = await this.storage.get('ipFoco2');
    console.log(this.ipFoco2);
    this.obtenerEstadoFoco1();*/
    this.options = {
      clientId: this.cliendID,
      username: this.cliendID,
      password: this.contrasenaThing,
      protocolVersion: 4, // Utiliza la versión 4 para MQTT 3.1.1
      clean: true // Establece Clean Session a true
    };

    this.conexion();
  }

  async conexion() {
    this.client = await mqtt.connect(this.brokerUrl, this.options);
    const topicNotis = `channels/${this.canal}/subscribe/fields/field${this.fieldNoti}`;
    //const topicFoco1 = `channels/${this.canal}/subscribe/fields/field${this.fieldFoco1}`;
    //const topicFoco2 = `channels/${this.canal}/subscribe/fields/field${this.fieldFoco2}`;
    this.client.on('connect', () => {
      //this.showToast('Cononectado al servidor MQTT');
      console.log('Conectado al servidor MQTT');
      this.textoLabel = "Conectado al Servidor Mqtt";
      this.client.subscribe(topicNotis);
      //this.client.subscribe(topicFoco1);
      //this.client.subscribe(topicFoco2);
    });
    this.client.on('message', (topic: string, message: any) => {
      //if (topic === topicNotis) {
      this.mensaje = message;
      console.log(`Mensaje recibido en el tema ${topic}: ${this.mensaje.toString()}`);
      this.mostrarNotificacion();
      //} else if (topic === topicFoco1) {
      this.mensajeImagenFoco1 = message;
      this.imagenFoco1();
      //console.log(`Mensaje recibido en el tema ${topic}: ${this.mensajeImagenFoco1.toString()}`);
      //} else {
      this.mensajeImagenFoco2 = message;
      this.imagenFoco2();
      //console.log(`Mensaje recibido en el tema ${topic}: ${this.mensajeImagenFoco2.toString()}`);
      //}
      // Establecer un temporizador para eliminar la tarjeta después de minutos
    });

    this.client.on('error', (error: Error) => {
      console.error('Error en el cliente MQTT:', error);
      this.textoLabel = "Desconectado del Servidor Mqtt";
      this.showToast('Error al conectar al servidor MQTT');
    });
  }



  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  disconnect(): void {
    if (this.client) {
      this.client.end();
      console.log('Desconectado del servidor MQTT');
      this.textoLabel = "Desconectado del Servidor Mqtt";
      //this.showToast('Desconectado del servidor MQTT');
    }
  }

  publishMessage(message: string, field: String): void {
    this.client.publish(`channels/${this.canal}/publish/fields/field${field}`, message, (error: Error) => {
      if (error) {
        console.error('Error al publicar el mensaje:', error);
        this.showToast('Mensaje no enviado');

      } else {
        console.log('Mensaje publicado correctamente');
        this.showToast('Mensaje enviado correctamente');
      }
    });
  }


  async noti() {
    let options: ScheduleOptions = {
      notifications: [
        {
          id: 1111,
          title: "Notificación",
          body: "¡Se necesita su ayuda!",
          largeBody: "Ha llegado una Notificación",
        }
      ]
    }
    try {
      await LocalNotifications.schedule(options)
    } catch (ex) {
      alert(JSON.stringify(ex));
    }
  }

  async notiEmergencia() {
    let options: ScheduleOptions = {
      notifications: [
        {
          id: 2222,
          title: "¡¡¡Emergencia!!!",
          body: "¡Se necesita su ayuda!",
          largeBody: "Ha llegado una Notificación",
        }
      ]
    }
    try {
      await LocalNotifications.schedule(options)
    } catch (ex) {
      alert(JSON.stringify(ex));
    }
  }

  async anadirFocos() {
    this.focos = await this.storage.get('focos');
    if (this.focos === "1") {
      this.foco1 = true;
    } else if (this.focos === "2") {
      this.foco2 = true;
      this.foco1 = true;
    } else {
      this.foco2 = false;
      this.foco1 = false;
    }
  }

  imagenFoco1() {
    if (this.mensajeImagenFoco1 == "0") {
      this.foco1ImagenEncendido = false;
      this.foco1ImagenApagado = true;
    } else if (this.mensajeImagenFoco1 == "1") {
      this.foco1ImagenEncendido = true;
      this.foco1ImagenApagado = false;
    }
  }
  imagenFoco2() {
    if (this.mensajeImagenFoco2 == "20") {
      this.foco2ImagenEncendido = false;
      this.foco2ImagenApagado = true;
    } else if (this.mensajeImagenFoco2 == "21") {
      this.foco2ImagenEncendido = true;
      this.foco2ImagenApagado = false;
    }
  }

  obtenerEstadoFoco1() {
    this.thingSpeakService.setChannel(this.canal);
    this.thingSpeakService.setApiKey(this.apiKey);
    this.thingSpeakService.setFieldFoco1(this.fieldFoco1);
    this.thingSpeakService.getData().subscribe(
      mensaje2 => {
        let campoDinamico = `field${this.fieldFoco1}`;
        if (mensaje2.hasOwnProperty(campoDinamico)) {
          // Convertir el campo dinámico a una cadena
          let campoDinamicoComoString = mensaje2[campoDinamico].toString();
          console.log(campoDinamicoComoString);
        } else {
          console.log('El campo dinámico especificado no existe en el objeto.');
        }
        if (this.mensajeEstadoFoco1 == '1') {
          this.foco1ImagenEncendido = true;
          this.foco1ImagenApagado = false;
        } else if (this.mensajeEstadoFoco1 == "0") {
          this.foco2ImagenEncendido = false;
          this.foco2ImagenApagado = true;
        } else if (this.mensajeEstadoFoco2 == '20') {
          this.foco1ImagenEncendido = true;
          this.foco1ImagenApagado = false;
        } else if (this.mensajeEstadoFoco2 == "21") {
          this.foco2ImagenEncendido = false;
          this.foco2ImagenApagado = true;
        }
      },
      error => {
        console.error('Error al obtener los datos:', error);
        // Manejar el error de conexión aquí
      },
      () => {
        console.log('Datos obtenidos correctamente');
        // Realizar acciones adicionales después de recibir los datos correctamente
      }
    );
  }

  aparecerNotificaciones() {
    this.textoTitulo = "Notificaciones";
    this.mostrarDomotica = false;
    this.mostrarNotificaciones = true;
  }
  aparecerDomotica() {
    this.textoTitulo = "Dispositivos";
    this.mostrarDomotica = true;
    this.mostrarNotificaciones = false;
  }
  encenderFoco(ip: String) {
    const headers = new HttpHeaders("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    this.mensajeImagenFoco1 = '1';
    this.imagenFoco1();
    this.http.post(`http://${ip}/cm?cmnd=Power%20On`, headers).subscribe(data => {
      console.log(JSON.stringify(data));
    }, error => {
      console.log(JSON.stringify(error));
    });
  }
  apagarFoco(ip: String) {
    const headers = new HttpHeaders("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    this.mensajeImagenFoco1 = '0';
    this.imagenFoco1();
    this.http.post(`http://${ip}/cm?cmnd=Power%20Off`, headers).subscribe(data => {
      console.log(JSON.stringify(data));
    }, error => {
      console.log(JSON.stringify(error));
    });
  }
}
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { transition } from '@angular/core/src/animation/dsl';
import { PessoaProvider, Pessoa } from '../../providers/pessoa/pessoa'

@IonicPage()
@Component({
  selector: 'page-foto',
  templateUrl: 'foto.html',
})
export class FotoPage {
  photo: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,private camera: Camera) {
  }

  takePicture() {
    this.photo = '';
 
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetWidth: 100,
      targetHeight: 100
    }
 
    this.camera.getPicture(options)
      .then((imageData) => {
        let base64image = 'data:image/jpeg;base64,' + imageData;
        this.photo = base64image;
 
      }, (error) => {
        console.error(error);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FotoPage');
  }

}

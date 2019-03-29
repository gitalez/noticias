import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor( 
    private storage: Storage,
    public toastCtrl: ToastController) { 

    this.cargarFavoritos();

  };

  ////////toast //////

  async presentarToast(msg: string){

    const toast = await this.toastCtrl.create({

        message: msg,
        duration: 2000
    });
    toast.present();
  };



  // la usa noticia.components
  guardarNoticia( noticia: Article ){

    const existe = this.noticias.find( noti => noti.title === noticia.title);

    if(!existe){
      console.log('grabando nueva noticia');
      this.noticias.unshift(noticia) // unshift lo pone al principio del array
      this.storage.set('favoritos', this.noticias)
    }
    this.presentarToast('agregado a favoritos');
  
  }

  async cargarFavoritos(){

      const favoritos = await this.storage.get('favoritos');

      console.log('cargando favoritos ', favoritos);

      if(favoritos === null) {
        this.noticias = [];
      }else{
        this.noticias = favoritos;
      }
  }


  borrarNoticia( noticia: Article){

    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title);
    this.storage.set('favoritos', this.noticias)
    console.log('noticia borrada');
    this.presentarToast('borrado de favoritos');
  }
}

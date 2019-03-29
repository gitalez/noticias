import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

// noticia es el parametro que me manda el padre html noticias
  @Input() noticia : Article;

  // i es el parametro que me manda el padre html noticias
  @Input() i : number;


  // enFavoritos es el parametro que manda el padre html noticias
  @Input() enFavoritos; // el false lo puso el padre  

  constructor(
    private iab: InAppBrowser, 
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocalService: DataLocalService,
    private platForm: Platform
    ) { }

  ngOnInit() {

    console.log('favo', this.enFavoritos);
  }

  abrirNoticia(){

    console.log('noticias',this.noticia.url );
    const browser = this.iab.create(this.noticia.url,'_system'); // _system espara que lo abra  en el nav web nativo
  }

  async lanzarMenu(){

  let guardarBoton; 

    if(this.enFavoritos){

      //console.log('estoy en favoritos');
      guardarBoton = {

        text: 'Borrar de favoritos',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('borrar favorito');
          this.dataLocalService.borrarNoticia(this.noticia)
        }
    };
    } else {
      //console.log('no estoy en favoritos');
      guardarBoton = {

        text: 'Agregar a favoritos',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorito clicked');
          this.dataLocalService.guardarNoticia(this.noticia)
        }
      }
    }
    const actionSheet = await this.actionSheetCtrl.create({

      buttons: [ 
        {
          text: 'Compartir',
          icon: 'share',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Share clicked');
            this.compartirNoticia();
          }
        },
        guardarBoton,
        {
          text: 'Cancelar',
          icon: 'close',
          cssClass: 'action-dark',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    await actionSheet.present();
    }


    compartirNoticia(){

      if(this.platForm.is('cordova')){

        this.socialSharing.share( // el share me da todas las posibilidades que tengo en el cel 
        this.noticia.title,
        this.noticia.source.name,
        '',
        this.noticia.url
      );

    }else{

      if (navigator['share']) { // ['share'] para que no marque error el tslint
        navigator['share']({
            title: this.noticia.title,
            text: this.noticia.description,
            url: this.noticia.url
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      } else{
        console.log('no se sopoerta');
      }
    }

    }
  }

// para navegar a una url desde un  movil . lo tenemos que hacer mediante un plugins
// no es como un desck
// usamos para este caso el in app browser

// son dos instalaciones 
//instalar el paquete paar usuarlo dentro de ionic 
//ionic cordova plugin add cordova-plugin-inappbrowser

// y un paquete para usarlo del lado de TS
//npm install @ionic-native/in-app-browser

// todo plugin lo debemos colocar en el app.module
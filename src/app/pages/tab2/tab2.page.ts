import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  // viene de la  web news api Top Headlines
categorias = ['business','entertainment','general','health','science','sports','technology'];

@ViewChild(IonSegment) segment: IonSegment;

noticiasApiCat: Article[] = [];

constructor(private noticiasService: NoticiasService){}

cargarNoticias(categoria: string, event?){

  this.noticiasService.getTopHeadlinesCategoria(categoria)
      .subscribe(cat => {
        console.log(cat);
        this.noticiasApiCat.push(...cat.articles);

          if(event){
            event.target.complete();

          }

      });
};


ngOnInit() {
      // con el viewchild  hacemos que el seleccionado sea todos al arrancar 
      this.segment.value = this.categorias[0];

      // cargamos la gategoria inicial
      this.cargarNoticias(this.categorias[0]);
    
}


loadData(event){

  this.cargarNoticias(this.segment.value, event)
}


cambioCategoria( event ) {

  this.noticiasApiCat = [];
  this.cargarNoticias( event.detail.value );

}






/*
segmentChanged(event){

  const valorSegmento = event.detail.value
  console.log(valorSegmento);

  this.noticiasApiCat= [];

switch (valorSegmento) {

  case 'business':
    this.cargarNoticias('business')
    break;

    case 'entertainment':
    this.cargarNoticias('entertainment')
    break;

    case 'general':
    this.cargarNoticias('general')
    break;

    case 'health':
    this.cargarNoticias('health')
    break;

    case 'science':
    this.cargarNoticias('science')
    break;

    case 'sports':
    this.cargarNoticias('sports')
    break;

    case 'technology':
    this.cargarNoticias('technology')
    break;

    default:
    break;
}

}
*/


}

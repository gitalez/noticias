import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  implements OnInit {

  // el viewchild se usa cuando quiero obtener de TS algun elemento del html
  // tenemos que poner la clase del elemento IonInfiniteScroll y no el componnete Ion-Infinite-Scroll 
  // infiniteScroll nombre de la propiedad que quiero usar dentor de la clase 


  @ViewChild(IonInfiniteScroll) infinteScroll: IonInfiniteScroll

  noticiasApi: Article[] = [];
  
  constructor ( private noticiasService: NoticiasService){}

  cargarNoticiasGrles(event?){

    this.noticiasService.getTopHeadlines()
    .subscribe( resp => {
      console.log('noticias',resp);
      
      
      if(resp.articles.length === 0){

        event.target.disabled= true; // paro el loading
        event.target.complete();//cancela el infinite scroll
      }
      
      //this.noticias = resp.articles;
      //adicionamos las nuevas noticias 
      // para que lo trabaje en forma independiemnte los elementos del array
      //usamos el operador spread ...
      this.noticiasApi.push(...resp.articles)

      if(event) {
        event.target.complete();//cancela el infinite scroll cuando no tiene mas elementos 
      }
    });
  }

  ngOnInit(){

   this.cargarNoticiasGrles();
  }



  loadData(event){

    console.log('cargando datos');
    this.cargarNoticiasGrles(event);
   
}

}


//this.infinteScroll.disabled = true;

// .subscribe( (resp : RespuestaTopHeadLines) => {
  // podemos declarar el tipo en el subscribe 
  // o tambien en el http.get  como :
// return this.http.get<RespuestaTopHeadLines>(`https

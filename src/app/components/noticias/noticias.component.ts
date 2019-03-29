import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {


  // noticias es el parametro que me manda el padre html tab2 o tab3 
  @Input() noticias : Article[] = [];

  // enFavoritos es el parametro que manda el padre html tab3
  @Input() enFavoritos = false; // suponemos que no estamos en favoritos 

  constructor() { }

  ngOnInit() {}

}

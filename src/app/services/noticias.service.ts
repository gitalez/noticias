import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
  'X-Api-key' : apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;
  categoriaActual = '';
  categoriaPage = 0; // pagina de la categoria 

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string){

      query = apiUrl + query;

      return this.http.get<T>(query, { headers })
  }


  getTopHeadlines(){

    // cada vez que entra incrementa en 1 la pagina que quiero mostrar
    // luefgo en el html correspondiente aplico el infinite scroll
    this.headlinesPage++;

    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&page=${this.headlinesPage}`);
  
  }

  getTopHeadlinesCategoria(categoria: string){

    if(this.categoriaActual === categoria){
      this.categoriaPage++;

      // quiere decir que quiere incrementar la pagina 
    } else {
      // quiere decir que es una nueva categoria
      this.categoriaPage=1;
      this.categoriaActual = categoria;

    }

    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&category=${ categoria }&page=${this.categoriaPage}`);
    
  }

}

                                                                                    
//return this.http.get<RespuestaTopHeadLines>(`https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=b9fa56697bd549e88626b3b7b97f118a`);
 //return this.http.get<RespuestaTopHeadLines>(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=b9fa56697bd549e88626b3b7b97f118a`);
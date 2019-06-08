import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://heroesapp-blindcl.firebaseio.com';

  constructor( private httpClient: HttpClient) { }

  crearHeroe( heroe: HeroeModel ) {
    return this.httpClient.post( `${ this.url }/heroes.json`, heroe ).pipe(map( (resp: any) => {
      heroe.id = resp.name;
      return heroe;
    }));
  }

  actualizarHeroe( heroe: HeroeModel ) {
    const HEROETEMP = {
      ...heroe
    };
    delete HEROETEMP.id;

    return this.httpClient.put(`${ this.url }/heroes/${ heroe.id }.json`, HEROETEMP);
  }

}

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

  eliminarHeroe( id: string ){
    return this.httpClient.delete( `${ this.url}/heroes/${ id }.json` );
  }

  actualizarHeroe( heroe: HeroeModel ) {
    const HEROETEMP = {
      ...heroe
    };
    delete HEROETEMP.id;

    return this.httpClient.put( `${ this.url }/heroes/${ heroe.id }.json`, HEROETEMP );
  }

  obtenerHeroe( id: string ) {
    return this.httpClient.get( `${ this.url}/heroes/${ id }.json` );
  }

  obtenerHeroes() {
    return this.httpClient.get( `${ this.url}/heroes.json` ).pipe( map( resp => this.crearArregloHeroes(resp) ));
    // return this.httpClient.get( `${ this.url}/heroes.json` ).pipe( map( this.crearArregloHeroes ));
    // El primer argumento de respuesta es el que retorna el map
  }

  private crearArregloHeroes( heroesObj: Object ) {
    const heroes: HeroeModel[] = [];
    
    if ( heroesObj === null ) {
      return [];
    }

    Object.keys( heroesObj ).forEach( key => {
        const heroe : HeroeModel = heroesObj[key];
        heroe.id = key;

        heroes.push( heroe );
    });
    
    return heroes;
  }

}

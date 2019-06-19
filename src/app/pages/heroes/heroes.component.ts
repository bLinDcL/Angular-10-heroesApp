import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];

  constructor( private heroesService: HeroesService ) {}

  ngOnInit() {
    this.heroesService.obtenerHeroes().subscribe( resp => this.heroes = resp );
  }

  eliminarHeroe( heroe: HeroeModel, index: number ) {
    Swal.fire({
      title: 'Eliminar héroe',
      text: `¿Está seguro que desea eliminar a ${ heroe.nombre }`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if ( resp.value ) {
        this.heroes.splice( index, 1 );
        this.heroesService.eliminarHeroe( heroe.id ).subscribe();
      }
    });
  }

}

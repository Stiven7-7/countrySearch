import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/countries';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  country?: Country;

  constructor(
    private activateRoute: ActivatedRoute,
    private countriesServices: CountriesService,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        switchMap( ({ id }) => this.countriesServices.searchContryAlphaCode( id ) )
      )
      .subscribe( country => {
       if (!country) return this.router.navigateByUrl('');
       return this.country = country;
      });
  }

}

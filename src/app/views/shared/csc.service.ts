import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICountry } from './models/country';
import { IState } from './models/state';
import { ICity } from './models/city';

@Injectable({
  providedIn: 'root'
})
export class CscService {

  countriesList: ICountry[];
  statesList: IState[];
  citiesList: ICity[];

  constructor() { }

  getCountries(): Observable<ICountry[]> {
		this.countriesList = [
			{ 
        id:1,
        name: "America" 
      },
      { 
        id:2,
        name: "Pakistan" 
      },
      { 
        id:3,
        name: "U.K" 
      },
      { 
        id:4,
        name: "Australia" 
      },
		];

		return of(this.countriesList);
  }
  
  getStates(countryId:number): Observable<IState[]> {
		this.statesList = [
			{ 
        id:1,
        name: "Taxes",
        countryId:1
      },
      { 
        id:2,
        name: "Washington",
        countryId:1
      },
      { 
        id:3,
        name: "Sindh",
        countryId:2
      },
      { 
        id:4,
        name: "Punjab",
        countryId:2
      },
      { 
        id:5,
        name: "Scotland",
        countryId:3
      },
      { 
        id:6,
        name: "England",
        countryId:3
      },
      { 
        id:7,
        name: "Victoria",
        countryId:4
      },
      { 
        id:8,
        name: "New South Wales",
        countryId:4
      },
		];

		return of(this.statesList.filter(x => x.countryId === countryId));
  }
  
  getCities(stateId:number): Observable<ICity[]> {
		this.citiesList = [
			{ 
        id:1,
        name: "Taxes City",
        stateId:1
      },
      { 
        id:2,
        name: "New York",
        stateId:2
      },
      { 
        id:3,
        name: "Karachi",
        stateId:3
      },
      { 
        id:4,
        name: "Lahore",
        stateId:4
      },
      { 
        id:5,
        name: "Glasgow",
        stateId:5
      },
      { 
        id:6,
        name: "London",
        stateId:6
      },
      { 
        id:7,
        name: "Melbourne",
        stateId:7
      },
      { 
        id:8,
        name: "asd",
        stateId:7
      },
      { 
        id:9,
        name: "Sydney",
        stateId:8
      },
      { 
        id:10,
        name: "das",
        stateId:8
      },
		];

		return of(this.citiesList.filter(x => x.stateId === stateId));
  }
  
}

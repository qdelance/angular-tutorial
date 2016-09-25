import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';
import { Logger } from './logger.service';

@Injectable()
export class HeroService {

    private heroesUrl = 'app/heroes';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private logger: Logger,
                private http: Http) {
        this.logger.log('HeroService: constructor');
    }

    create(name: string): Promise<Hero> {
        this.logger.log('Creating new hero with name "' + name + '"');
        // TODO, with a more complex object, I would probably create a new instance here then stringify it below
        return this.http
            .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(hero: Hero): Promise<Hero> {
        this.logger.log('Updating hero for id ' + hero.id);
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        this.logger.log('Delete hero for id ' + id);
        const url = `${this.heroesUrl}/${id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    getHero(id: number): Promise<Hero> {
        this.logger.log('Getting hero for id ' + id);
        return this.getHeroes()
            .then(heroes => heroes.find(hero => hero.id === id));
    }

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);
    }

    // to simulate slow connection: https://angular.io/docs/ts/latest/tutorial/toh-pt4.html#!#slow
    getSlowHeroes(): Promise<Hero[]> {
        return new Promise<Hero[]>(resolve =>
            setTimeout(resolve, 2000)) // delay 2 seconds
            .then(() => this.getHeroes());
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
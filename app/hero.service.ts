import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Logger } from './logger.service';

@Injectable()
export class HeroService {

    constructor(private logger: Logger) {
    }

    getHero(id: number): Promise<Hero> {
        this.logger.log('Getting hero for id ' + id + ' ...');
        return this.getHeroes()
            .then(heroes => heroes.find(hero => hero.id === id));
    }

    getHeroes(): Promise<Hero[]> {
        this.logger.log('Getting heroes ...');
        return Promise.resolve(HEROES);
    }

    // to simulate slow connection: https://angular.io/docs/ts/latest/tutorial/toh-pt4.html#!#slow
    getSlowHeroes(): Promise<Hero[]> {
        return new Promise<Hero[]>(resolve =>
            setTimeout(resolve, 2000)) // delay 2 seconds
            .then(() => this.getHeroes());
    }
}
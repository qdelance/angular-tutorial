import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
    selector: 'my-heroes',
    styleUrls: ['app/heroes.component.css'],
    templateUrl: 'app/heroes.component.html'
})

export class HeroesComponent implements OnInit {
    heroes: Hero[];
    selectedHero: Hero = null;

    constructor(private heroService: HeroService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.getHeroes();
    }

    onSelect(hero) {
        console.log(hero);
        this.selectedHero = hero;
    }

    getHeroes(): void {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    goToDetail(): void {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.heroService.create(name)
            .then(hero => {
                this.heroes.push(hero);
                this.selectedHero = null;
            });
    }

    delete(hero: Hero): void {
        this.heroService.delete(hero.id)
            .then(() => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (hero === this.selectedHero) {
                    this.selectedHero = null;
                }
            });
    }
}
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';


@Component({
    selector: 'my-dashboard',
    styleUrls: ['app/dashboard.component.css'],
    templateUrl: 'app/dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];

    constructor(private heroService: HeroService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes.slice(1, 5));
    }

    goToDetail(hero) {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }
}
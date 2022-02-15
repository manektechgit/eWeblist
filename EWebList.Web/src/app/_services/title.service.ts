import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { merge } from 'rxjs';
import { map, filter, mergeMap } from 'rxjs/operators';
import { AppSetting } from '../_app-constants/app-constants.config';
const APP_TITLE = AppSetting.appTitle;
const SEPARATOR = ' | ';
@Injectable()
export class TitleService {

  static ucFirst(pString) {
    if (!pString) {
      return pString;
    }
    return pString.charAt(0).toUpperCase() + pString.slice(1);
  }
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private titleService: Title) { }
  init() {
    const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));
    // Change page title on navigation or language change, based on route data
    merge(onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      )
      .subscribe(event => {
        const title = event.title;
        if (title) {
          this.titleService.setTitle(`${title} ${SEPARATOR} ${APP_TITLE} `);
        } else {
          // If not, we do a little magic on the url to create an approximation
          return this.router.url.split('/').reduce((acc, frag) => {
            if (acc && frag) { acc += SEPARATOR; }
            return this.router.url.split('/').reduce((acc, frag) => {
              if (acc && frag) { acc += SEPARATOR; }
              return acc + TitleService.ucFirst(frag);
            });
          });
        }
      });
  }
  SetTitleFromComponent(title: string) {
    this.titleService.setTitle(`${title} Websites ${SEPARATOR} ${APP_TITLE} `);
  }
}

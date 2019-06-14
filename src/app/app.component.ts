import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
  title = 'mapbox-app';

  // @HostListener('window:beforeunload') goHomePage() {
  //   this.router.navigate(['/']);

  // }
  constructor(private router: Router) {
  }

  ngOnInit() {
  }
}

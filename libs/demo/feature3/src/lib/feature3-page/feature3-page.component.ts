import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-feature3-page',
  templateUrl: './feature3-page.component.html',
  styleUrls: ['./feature3-page.component.scss'],
})
export class Feature3PageComponent {
  static counter = 0;
  id = Feature3PageComponent.counter++;
}

import {Component} from '@angular/core';
import {interval} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'lib-feature2-page',
  templateUrl: './feature2-page.component.html',
  styleUrls: ['./feature2-page.component.scss'],
})
export class Feature2PageComponent {
  data$ = interval(100).pipe(map(i => `Sup ${i}`));
}

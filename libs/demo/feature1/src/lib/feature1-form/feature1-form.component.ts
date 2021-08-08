import {Component} from '@angular/core';
import {MyServiceService} from '../my-service.service';

@Component({
  selector: 'lib-feature1-form',
  templateUrl: './feature1-form.component.html',
  styleUrls: ['./feature1-form.component.scss'],
})
export class Feature1FormComponent {
  constructor(public service: MyServiceService) {}
}

import {Component} from '@angular/core';
import {FormEntry} from '@ngx-plugin-modules/demo/forms-registry';
import {FloatingFormsService} from '@ngx-plugin-modules/demo/floating-forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private floatingForms: FloatingFormsService) {}

  onFormClick(formEntry: FormEntry): void {
    this.floatingForms.open(formEntry);
  }
}

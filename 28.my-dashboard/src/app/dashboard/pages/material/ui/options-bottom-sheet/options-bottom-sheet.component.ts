import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-options-bottom-sheet',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './options-bottom-sheet.component.html',
  styles: ``
})
export class OptionsBottomSheetComponent {
  // imprimimos el evento click que se realiza por cada opcion
  openLink(event: MouseEvent) {
    console.log('openLink', event);
  }
}

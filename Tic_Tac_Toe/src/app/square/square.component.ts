import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
})
export class SquareComponent {
  @Input() value: 'X' | 'O' | null = null;
  @Output() clicked = new EventEmitter<void>();
  onClick() {
    if (!this.value) this.clicked.emit();
  }
}

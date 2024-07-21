import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AlertComponent {
  @Input() type: 'success' | 'error' = 'success';
  @Input() message: string = '';

  get alertClass(): string {
    return this.type === 'success' ? 'alert alert-success' : 'alert alert-error';
  }

  get iconPath(): string {
    return this.type === 'success' ?
      'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' :
      'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z';
  }
}

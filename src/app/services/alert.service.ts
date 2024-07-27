import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new Subject<{ message: string, type: 'success' | 'error' }>();

  getAlert() {
    return this.alertSubject.asObservable();
  }

  showAlert(message: string, type: 'success' | 'error') {
    this.alertSubject.next({ message, type });
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-element',
  templateUrl: './user-element.component.html',
  styleUrls: ['./user-element.component.scss']
})
export class UserElementComponent {

  @Input() name : string;
  @Input() id : string;
  @Output() selectId: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteId: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  selectUser() {
    this.selectId.emit(this.id);
  }
  deleteUser($event) {
    this.deleteId.emit(this.id);
    $event.stopPropagation();
  }

}

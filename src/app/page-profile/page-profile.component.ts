import { Component, OnInit } from '@angular/core';
import IUser from '../interfaces/user';
import { tap } from 'rxjs/operators';
import { CommunicationService } from '../servies/communication/communication.service';

@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.scss']
})
export class PageProfileComponent implements OnInit {
  user: IUser;
  error: string;

  constructor(private communicationService: CommunicationService) { }

  ngOnInit() {
    this.communicationService.user$.pipe(
      tap(data => {
        if (data.error) {
          this.error = data.error;
        } else {
          this.user = data;
        }
      })
    ).subscribe();
  }
}

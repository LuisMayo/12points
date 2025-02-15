import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faShare, faUsers } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs/operators';
import { UtilsService } from 'src/app/services/utils.service';
import { RoomService } from '../../services/room.service';
@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  id: string;
  loading = true;
  room;
  faShare = faShare;
  faUsers = faUsers;
  navigator = window.navigator;
  interval: number;

  constructor(private route: ActivatedRoute, private roomService: RoomService, private router: Router, private utils: UtilsService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.url[1].path;
    this.getRoomDetails();
    this.interval = window.setInterval(() => this.getRoomDetails(), 90000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  private getRoomDetails() {
    this.roomService.getRoom(this.id).pipe(take(1)).subscribe(room => {
      this.room = room;
      this.loading = false;
    },
      (err) => {
        // If we failed while loading then we go back, if it was during an update it doesn't mind
        if (this.loading) {
          this.router.navigate(['/rooms']);
        }
      });
  }

  share() {
    try {
      navigator.share({
        title: '12points',
        url: this.utils.getExternalURL(`room/${this.room.id}`),
        text: `Join the room ${this.room.name} and vote for your favourite #Eurovision${new Date().getFullYear()} contestants`
      })
    } catch(err) {
      navigator.clipboard.writeText(this.utils.getExternalURL(`room/${this.room.id}`));
      alert('Link copied to clipboard!');
    }
  }

}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { fade } from 'src/app/shared/animations';
import { Observable } from 'rxjs'
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  animations: [fade],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent implements OnInit {

  constructor(private shared: SharedService) { }
  images$: Observable<string[]>


  ngOnInit(): void {
    this.returnImages()
  };
  returnImages() {
    this.images$ = this.shared.returnCarouselImages();
  };

};

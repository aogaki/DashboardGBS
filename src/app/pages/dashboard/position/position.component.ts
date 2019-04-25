import { Component, OnDestroy } from '@angular/core';
import { HttpClientService } from '../../../services/http-client.service';
import { NbThemeService } from '@nebular/theme';
import { combineAll } from 'rxjs/operators';

class PosImage {
  source: string;
  content: string;
}

export interface Post {
  id: string;
  img2D: string;
  comment2D: string;
  imgH: string;
  commentH: string;
  imgV: string;
  commentV: string;
  commentAll: string;
}

@Component({
  selector: 'ngx-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnDestroy {
  // Hmm Looks stupid
  private post: Post;
  private image2D: PosImage;
  private imageH: PosImage;
  private imageV: PosImage;
  public figSumList: PosImage[] = [];

  currentTheme: string;
  themeSubscription: any;
  isSingleView = false;
  selectedCamera: PosImage;
  commentAll: string;

  constructor(
    private httpClientService: HttpClientService,
    private themeService: NbThemeService
  ) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });

    this.httpClientService
      .getPosition()
      .then(response => {
        this.post = response[response.length - 1];

        this.image2D = new PosImage();
        this.imageH = new PosImage();
        this.imageV = new PosImage();

        this.image2D.source = this.post.img2D;
        this.image2D.content = '2D: ' + this.post.comment2D;
        this.imageH.source = this.post.imgH;
        this.imageH.content = 'H: ' + this.post.commentH;
        this.imageV.source = this.post.imgV;
        this.imageV.content = 'V: ' + this.post.commentV;

        this.figSumList.push(this.image2D);
        this.figSumList.push(this.imageH);
        this.figSumList.push(this.imageV);

        this.commentAll = this.post.commentAll;
      })
      .catch(error => console.log(error));
  }

  selectCamera(camera: any) {
    this.selectedCamera = camera;
    this.isSingleView = true;
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}

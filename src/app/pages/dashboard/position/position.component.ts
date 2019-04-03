import { Component, OnDestroy } from '@angular/core';
import { HttpClientService } from '../../../services/http-client.service';
import { NbThemeService } from '@nebular/theme';

class Image {
  source: string;
  content: string;
}

class Post {
  id: string;
  title: string;
  content: string;
  imagePath: string;
}

@Component({
  selector: 'ngx-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnDestroy {
  public posts: Post[] = [];

  // Hmm Looks stupid
  private image2D: Image;
  private imageH: Image;
  private imageV: Image;
  public figSumList: Image[] = [];

  currentTheme: string;
  themeSubscription: any;
  isSingleView = false;
  selectedCamera: Image;

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
        this.posts = response;

        this.image2D = new Image();
        this.imageH = new Image();
        this.imageV = new Image();

        for (const post of this.posts) {
          if (post.title === '2D image') {
            this.image2D.source = post.imagePath;
            this.image2D.content = '2D: ' + post.content;
          } else if (post.title === 'Horizontal image') {
            this.imageH.source = post.imagePath;
            this.imageH.content = 'H: ' + post.content;
          } else if (post.title === 'Vertical image') {
            this.imageV.source = post.imagePath;
            this.imageV.content = 'V: ' + post.content;
          }
        }
        this.figSumList.push(this.image2D);
        this.figSumList.push(this.imageH);
        this.figSumList.push(this.imageV);
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

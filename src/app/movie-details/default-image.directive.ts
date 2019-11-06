import {Directive, Input} from '@angular/core';

@Directive({
  selector: 'img[src]',
  host: {
    '[src]': 'checkPath(src)',
    '(error)': 'onError()'
  }
})
export class DefaultImageDirective {
  @Input() src: string;
  public defaultImg: string = 'http://google.com/favicon.ico';

  public onError() {
    this.src = this.defaultImg;
  }

  public checkPath(src) {
    return src ? src : this.defaultImg;
  }
}

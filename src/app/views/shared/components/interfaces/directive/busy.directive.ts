import {Directive, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    // tslint:disable-next-line:no-bitwise one-variable-per-declaration
    const r = (Math.random() * 16) | 0,
      // tslint:disable-next-line:triple-equals no-bitwise
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export class TypeEnums {
  static SINGLE_CONTENT = 'SINGLE_CONTENT';
  static WHOLE_CONTENT = 'WHOLE_CONTENT'
}


@Directive({
  selector: '[ktBusy]'
})
export class BusyDirective implements OnInit, OnChanges {
  @HostBinding('style.position')
  hostPosition = 'relative';

  @Input('ktBusy') appLoading = false;
  @Input() type: 'SINGLE_CONTENT' | 'WHOLE_CONTENT'

  uid: string;

  constructor(private targetEl: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.uid = 'loading-container-' + uuidv4();

    const loadingContainer = this.renderer.createElement('div');
    this.renderer.setStyle(
      loadingContainer,
      'display',
      this.appLoading ? 'flex' : 'none'
    );
    this.renderer.setStyle(loadingContainer, 'justify-content', 'center');
    this.renderer.setStyle(loadingContainer, 'align-items', 'center');
    this.renderer.addClass(loadingContainer, this.uid);
    this.renderer.setStyle(loadingContainer, 'position', 'absolute');
    this.renderer.setStyle(loadingContainer, 'top', '0');
    // this.renderer.setStyle(loadingContainer, 'background', '#e4e4e4');
    this.renderer.setStyle(loadingContainer, 'width', '100%');
    this.renderer.setStyle(loadingContainer, 'height', '100%');
    this.renderer.setStyle(loadingContainer, 'z-index', '9999');
    this.renderer.addClass(loadingContainer, 'custom-loading-container')

    // custom spinner -- start
    // const spinnerContainer = this.renderer.createElement('div');
    // this.renderer.addClass(spinnerContainer, 'lds-facebook');
    const spinnerParentDiv = this.renderer.createElement('div')
    // this.renderer.addClass(spinnerParentDiv, 'custom-loading-parent-div');
    const gif = this.renderer.createElement('img')
    this.renderer.setAttribute(gif, 'src', 'assets/img/logos/loader.gif')

    const spinnerChildDiv = this.renderer.createElement('div')
    this.renderer.addClass(spinnerChildDiv, 'custom-loading')
    if (this.type === TypeEnums.SINGLE_CONTENT) {
      this.renderer.addClass(gif, 'single-content')
    } else {
      this.renderer.addClass(gif, 'whole-content')
    }
    // this.renderer.addClass(spinnerChildDiv, 'custom-loading--full-height')
    // const spinnerInnerDiv1 = this.renderer.createElement('div');
    // const spinnerInnerDiv2 = this.renderer.createElement('div');
    // const spinnerInnerDiv3 = this.renderer.createElement('div');

    // this.renderer.appendChild(spinnerContainer, spinnerInnerDiv1);
    // this.renderer.appendChild(spinnerContainer, spinnerInnerDiv2);
    // this.renderer.appendChild(spinnerContainer, spinnerInnerDiv3);
    this.renderer.appendChild(spinnerParentDiv, gif);
    // this.renderer.appendChild(spinnerContainer, spinnerParentDiv)

    this.renderer.appendChild(loadingContainer, spinnerParentDiv);
    // custom spinner -- end

    this.renderer.appendChild(this.targetEl.nativeElement, loadingContainer);
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.appLoading) {
      const container = this.targetEl.nativeElement;
      const div = container.querySelector('.' + this.uid);
      if (div) {
        this.renderer.setStyle(
          div,
          'display',
          this.appLoading ? 'flex' : 'none'
        );
      }
    }
  }
}

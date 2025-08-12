import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Output,
  PLATFORM_ID,
  QueryList,
  signal,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {OmFromToOptions, OmSplitType} from './ngx-split-text.types';
import {gsap} from 'gsap';

@Component({
  selector: 'om-split-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./ngx-split-text.component.html",
  styleUrl: "./ngx-split-text.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxSplitTextComponent implements AfterViewInit, OnDestroy {
  @ViewChild("OmSplitText") splitTextRef!: ElementRef<HTMLElement>;
  @ViewChildren("OmSplitItem") itemsList!: QueryList<ElementRef<HTMLElement>>;

  @Input("styleClass") styleClass?: string;

  @Input()
  set text(text: string) {
    this.textValue.set(text);
  }

  private textValue = signal('');

  @Input()
  set splitType(splitType: OmSplitType) {
    this.splitTypeValue.set(splitType);
  }

  splitTypeValue = signal<OmSplitType>('chars');

  readonly splitItems = computed(() => (this.splitText(this.textValue(), this.splitTypeValue())));

  @Input() animateOnlyOnce = false;
  @Input() delay = 50;
  @Input() duration = 2;
  @Input() ease: string = 'elastic.out(1, 0.3)';
  @Input() from: OmFromToOptions = {opacity: 0, y: 20};
  @Input() to: OmFromToOptions = {opacity: 1, y: 0};

  @Output() onLetterAnimationComplete = new EventEmitter<void>();

  isInView = signal(false);
  private intersectionObserver?: IntersectionObserver;
  private animatedOnce = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object
  ) {
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.intersectionObserver = new IntersectionObserver(([entry]) => {
        const wasInView = this.isInView();
        this.isInView.set(entry.isIntersecting);

        if (!wasInView && this.isInView() && (!this.animateOnlyOnce || this.animateOnlyOnce && !this.animatedOnce)) {
          this.animateIn();
        }

        if (wasInView && !this.isInView() && !this.animateOnlyOnce) {
          this.resetAnimation();
        }
      }, {threshold: 0, rootMargin: '0px 0px -5% 0px'});

      this.intersectionObserver.observe(this.splitTextRef.nativeElement);

      this.itemsList.changes.subscribe(() => {
        if (this.isInView()) {
          this.animateIn();
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  animateIn(): void {
    if (!this.itemsList || this.itemsList.length === 0) return;

    this.animatedOnce = true;

    this.itemsList.forEach((el, idx) => {
      gsap.set(el.nativeElement, {
        opacity: this.from.opacity,
        y: this.from.y,
      });

      gsap.to(el.nativeElement, {
        opacity: this.to.opacity,
        y: this.to.y,
        duration: this.duration,
        delay: (idx * this.delay) / 1000,
        ease: this.ease,
        onComplete: () => {
          if (idx === this.itemsList.length - 1) {
            this.onLetterAnimationComplete.emit();
          }
        },
      });
    });
  }

  resetAnimation(): void {
    this.itemsList.forEach((el) => {
      gsap.set(el.nativeElement, {
        opacity: this.from.opacity,
        y: this.from.y,
      });
    });
  }

  getWhitespace(item: string): string {
    return item.match(/^(\s+|\n)$/) ? 'pre' : 'normal';
  }

  private splitText(text: string, type: OmSplitType): string[] {
    if (type === 'words') return text.split(/(\s+)/);
    if (type === 'lines') return text.split(/\r?\n/);

    // default: chars
    return Array.from(text);
  }
}

import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  ElementRef,
  Inject,
  OnDestroy,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { RxActionFactory } from '@rx-angular/state/actions';
import { filter, fromEvent, map, takeUntil } from 'rxjs';

type Actions = { visible: boolean; onDestroy: void };

@Directive({
  selector: '[elementVisible]',
  providers: [RxActionFactory],
  standalone: true,
})
export class ElementVisibilityDirective implements OnDestroy {
  signals = this.actionsF.create();

  @Output() elementVisible = this.signals.visible$;

  constructor(
    private actionsF: RxActionFactory<Actions>,
    private elementRef: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    if (isPlatformBrowser(platformId)) {
      fromEvent(document, 'scroll')
        .pipe(
          filter(() => !!document.scrollingElement),
          map(() => {
            const { scrollTop, clientHeight } = document.scrollingElement!;
            return (
              scrollTop + clientHeight + 100 >=
              elementRef.nativeElement.offsetTop
            );
          }),
          takeUntil(this.signals.onDestroy$)
        )
        .subscribe(this.signals.visible);
    }
  }

  ngOnDestroy(): void {
    this.signals.onDestroy();
  }
}

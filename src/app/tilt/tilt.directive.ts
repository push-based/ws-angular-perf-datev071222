import { Directive, ElementRef, Input, NgZone } from '@angular/core';
import { fromEvent, map, merge } from 'rxjs';

@Directive({
  selector: '[tilt]',
})
export class TiltDirective {
  @Input('tilt') rotationDegree = 30;

  private middle = 0;

  private observer = new ResizeObserver((entries) => {
    const width = entries[0].contentRect.width;
    this.middle =
      this.elementRef.nativeElement.getBoundingClientRect().left + width / 2;
  });

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private ngZone: NgZone
  ) {
    this.observer.observe(elementRef.nativeElement);

    this.ngZone.runOutsideAngular(() => {
      const rotate$ = fromEvent<MouseEvent>(
        this.elementRef.nativeElement,
        'mouseenter'
      ).pipe(
        map(({ pageX, target }) => {
          // const pos = determineDirection(pageX, target as HTMLElement);
          const pos = pageX > this.middle ? 1 : 0;
          return pos === 0
            ? `rotate(${this.rotationDegree}deg)`
            : `rotate(-${this.rotationDegree}deg)`;
        })
      );

      const reset$ = fromEvent(
        this.elementRef.nativeElement,
        'mouseleave'
      ).pipe(map(() => `rotate(0deg)`));

      merge(rotate$, reset$).subscribe((rotationStyle) => {
        this.elementRef.nativeElement.style.transform = rotationStyle;
      });
    });
  }
}

/**
 * returns 0 if entered from left, 1 if entered from right
 */
function determineDirection(pos: number, element: HTMLElement): 0 | 1 {
  /*const width = element.clientWidth;
  const middle = element.getBoundingClientRect().left + width / 2;
  return pos > middle ? 1 : 0;*/
  return 1;
}

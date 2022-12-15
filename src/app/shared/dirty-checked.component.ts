import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dirty-checked',
  template: ` <code class="dirty-checks">({{ rendered }})</code> `,
  styles: [
    `
      :host {
        display: inline-block;
        border-radius: 100%;
        border: 2px solid var(--palette-secondary-main);
        padding: 1rem;
        font-size: var(--text-lg);
      }
    `,
  ],
  standalone: true,
})
export class DirtyCheckedComponent {
  private _rendered = 0;
  get rendered() {
    return this._rendered++;
  }
}

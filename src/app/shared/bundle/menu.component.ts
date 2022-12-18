import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'menu',
  template: `
    <div class="item">Profile</div>
    <div class="item">Favorites</div>
    <div class="item">Login</div>
    <div class="item">Logout</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  styles: [
    `
      :host {
        height: 200px;
        width: 200px;
        border: 1px solid gray;
        background-color: var(--palette-background-default);
      }
      .item {
        height: 50px;
        width: 100%;
        padding: 1rem;
        color: var(--palette-text-primary);
        background-color: var(--palette-background-default);
      }
      .item:hover {
        background-color: var(--palette-action-hover);
      }
    `,
  ],
})
export class MenuComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

import { Directive } from '@angular/core';

@Directive({ selector: '[bundle]' })
export class BundleDirective {
  private large = require('./big2.json');

  constructor() {}
}

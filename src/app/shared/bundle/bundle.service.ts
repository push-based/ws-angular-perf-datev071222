import { Injectable } from '@angular/core';

@Injectable()
export class BundleService {
  private large = require('./big.json');

  constructor() {}
}

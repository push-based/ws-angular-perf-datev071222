import { NgModule } from '@angular/core';

import { BundleDirective } from './bundle.directive';
import { BundleService } from './bundle.service';

@NgModule({
  imports: [],
  exports: [BundleDirective],
  declarations: [BundleDirective],
  providers: [BundleService],
})
export class BundleModule {}

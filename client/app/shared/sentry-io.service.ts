import { ErrorHandler } from '@angular/core';

import * as Raven from 'raven-js';
import { environment } from '../../environments/environment';

Raven
  .config('https://' + 
    environment.sentry.app_key + 
    '@sentry.io/' + 
    environment.sentry.app_id)
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err:any) : void {
    Raven.captureException(err.originalError);
  }
}
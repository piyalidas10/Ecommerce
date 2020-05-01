import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({
    providedIn: 'root'
  })

export class PlatformConfig {
    isBrowser: boolean;
    constructor(
        @Inject(PLATFORM_ID) private _platformId: Object
    ) {
        // Returns whether a platform id represents a browser platform.
        this.isBrowser = isPlatformBrowser(_platformId);
    }
}

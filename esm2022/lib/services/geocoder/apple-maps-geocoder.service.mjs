import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class AppleMapsGeocoderService {
    constructor() {
    }
    initGeocoder(options = {}) {
        this.geocoder = new window.mapkit.Geocoder(options);
    }
    reverseLookup(lat, lon, callback, options = {}) {
        if (!this.geocoder) {
            this.initGeocoder();
        }
        this.geocoder.reverseLookup(new window.mapkit.Coordinate(lat, lon), (err, result) => {
            if (err) {
                callback(err);
                return;
            }
            callback(null, result);
        }, options);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsGeocoderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsGeocoderService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsGeocoderService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGUtbWFwcy1nZW9jb2Rlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFwcGxlLW1hcHMvc3JjL2xpYi9zZXJ2aWNlcy9nZW9jb2Rlci9hcHBsZS1tYXBzLWdlb2NvZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFLekMsTUFBTSxPQUFPLHdCQUF3QjtJQUdqQztJQUNBLENBQUM7SUFFTSxZQUFZLENBQUMsVUFBK0MsRUFBRTtRQUNqRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELGFBQWEsQ0FBQyxHQUFXLEVBQUUsR0FBVyxFQUFFLFFBQXVDLEVBQUUsVUFBaUQsRUFBRTtRQUNoSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNoRixJQUFJLEdBQUcsRUFBRTtnQkFDTCxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2QsT0FBTzthQUNWO1lBQ0QsUUFBUSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMzQixDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEIsQ0FBQzs4R0FyQlEsd0JBQXdCO2tIQUF4Qix3QkFBd0IsY0FEWixNQUFNOzsyRkFDbEIsd0JBQXdCO2tCQURwQyxVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0dlb2NvZGVyQ29uc3RydWN0b3JPcHRpb25zSW50ZXJmYWNlLCBHZW9jb2RlclJldmVyc2VMb29rdXBPcHRpb25zSW50ZXJmYWNlfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuaW1wb3J0ICogYXMgbWFwa2l0IGZyb20gXCJtYXBraXRqcy10eXBlc2NyaXB0XCI7XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIEFwcGxlTWFwc0dlb2NvZGVyU2VydmljZSB7XG4gICAgcHJpdmF0ZSBnZW9jb2RlcjogbWFwa2l0Lkdlb2NvZGVyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXRHZW9jb2RlcihvcHRpb25zOiBHZW9jb2RlckNvbnN0cnVjdG9yT3B0aW9uc0ludGVyZmFjZSA9IHt9KSB7XG4gICAgICAgIHRoaXMuZ2VvY29kZXIgPSBuZXcgd2luZG93Lm1hcGtpdC5HZW9jb2RlcihvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXZlcnNlTG9va3VwKGxhdDogbnVtYmVyLCBsb246IG51bWJlciwgY2FsbGJhY2s6IChlcnI6IGFueSwgZGF0YT86IGFueSkgPT4gYW55LCBvcHRpb25zOiBHZW9jb2RlclJldmVyc2VMb29rdXBPcHRpb25zSW50ZXJmYWNlID0ge30pIHtcbiAgICAgICAgaWYgKCF0aGlzLmdlb2NvZGVyKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRHZW9jb2RlcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2VvY29kZXIucmV2ZXJzZUxvb2t1cChuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlKGxhdCwgbG9uKSwgKGVyciwgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXN1bHQpO1xuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG59XG4iXX0=
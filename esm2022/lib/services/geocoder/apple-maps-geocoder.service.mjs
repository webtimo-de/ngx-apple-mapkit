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
                callback(err, null);
            }
            else {
                callback(null, result);
            }
        }, options);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsGeocoderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsGeocoderService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsGeocoderService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGUtbWFwcy1nZW9jb2Rlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFwcGxlLW1hcHMvc3JjL2xpYi9zZXJ2aWNlcy9nZW9jb2Rlci9hcHBsZS1tYXBzLWdlb2NvZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFJekMsTUFBTSxPQUFPLHdCQUF3QjtJQUdqQztJQUNBLENBQUM7SUFFTSxZQUFZLENBQUMsVUFBK0MsRUFBRTtRQUNqRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVNLGFBQWEsQ0FBQyxHQUFXLEVBQUUsR0FBVyxFQUFFLFFBQXVDLEVBQUUsVUFBaUQsRUFBRTtRQUN2SSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNoRixJQUFJLEdBQUcsRUFBRTtnQkFDTCxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3ZCO2lCQUFNO2dCQUNILFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDMUI7UUFDTCxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEIsQ0FBQzs4R0FyQlEsd0JBQXdCO2tIQUF4Qix3QkFBd0IsY0FEWixNQUFNOzsyRkFDbEIsd0JBQXdCO2tCQURwQyxVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0dlb2NvZGVyQ29uc3RydWN0b3JPcHRpb25zSW50ZXJmYWNlLCBHZW9jb2RlclJldmVyc2VMb29rdXBPcHRpb25zSW50ZXJmYWNlfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBBcHBsZU1hcHNHZW9jb2RlclNlcnZpY2Uge1xuICAgIHByaXZhdGUgZ2VvY29kZXI6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0R2VvY29kZXIob3B0aW9uczogR2VvY29kZXJDb25zdHJ1Y3Rvck9wdGlvbnNJbnRlcmZhY2UgPSB7fSkge1xuICAgICAgICB0aGlzLmdlb2NvZGVyID0gbmV3IHdpbmRvdy5tYXBraXQuR2VvY29kZXIob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJldmVyc2VMb29rdXAobGF0OiBudW1iZXIsIGxvbjogbnVtYmVyLCBjYWxsYmFjazogKGVycjogYW55LCBkYXRhPzogYW55KSA9PiBhbnksIG9wdGlvbnM6IEdlb2NvZGVyUmV2ZXJzZUxvb2t1cE9wdGlvbnNJbnRlcmZhY2UgPSB7fSkge1xuICAgICAgICBpZiAoIXRoaXMuZ2VvY29kZXIpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdEdlb2NvZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZW9jb2Rlci5yZXZlcnNlTG9va3VwKG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUobGF0LCBsb24pLCAoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIsIG51bGwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG59XG4iXX0=
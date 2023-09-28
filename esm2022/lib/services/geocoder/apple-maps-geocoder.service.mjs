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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGUtbWFwcy1nZW9jb2Rlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFwcGxlLW1hcGtpdC9zcmMvbGliL3NlcnZpY2VzL2dlb2NvZGVyL2FwcGxlLW1hcHMtZ2VvY29kZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUl6QyxNQUFNLE9BQU8sd0JBQXdCO0lBR2pDO0lBQ0EsQ0FBQztJQUVNLFlBQVksQ0FBQyxVQUErQyxFQUFFO1FBQ2pFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRU0sYUFBYSxDQUFDLEdBQVcsRUFBRSxHQUFXLEVBQUUsUUFBdUMsRUFBRSxVQUFpRCxFQUFFO1FBQ3ZJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2QjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ2hGLElBQUksR0FBRyxFQUFFO2dCQUNMLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDdkI7aUJBQU07Z0JBQ0gsUUFBUSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQzthQUMxQjtRQUNMLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNoQixDQUFDOzhHQXJCUSx3QkFBd0I7a0hBQXhCLHdCQUF3QixjQURaLE1BQU07OzJGQUNsQix3QkFBd0I7a0JBRHBDLFVBQVU7bUJBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7R2VvY29kZXJDb25zdHJ1Y3Rvck9wdGlvbnNJbnRlcmZhY2UsIEdlb2NvZGVyUmV2ZXJzZUxvb2t1cE9wdGlvbnNJbnRlcmZhY2V9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIEFwcGxlTWFwc0dlb2NvZGVyU2VydmljZSB7XG4gICAgcHJpdmF0ZSBnZW9jb2RlcjogYW55O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXRHZW9jb2RlcihvcHRpb25zOiBHZW9jb2RlckNvbnN0cnVjdG9yT3B0aW9uc0ludGVyZmFjZSA9IHt9KSB7XG4gICAgICAgIHRoaXMuZ2VvY29kZXIgPSBuZXcgd2luZG93Lm1hcGtpdC5HZW9jb2RlcihvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmV2ZXJzZUxvb2t1cChsYXQ6IG51bWJlciwgbG9uOiBudW1iZXIsIGNhbGxiYWNrOiAoZXJyOiBhbnksIGRhdGE/OiBhbnkpID0+IGFueSwgb3B0aW9uczogR2VvY29kZXJSZXZlcnNlTG9va3VwT3B0aW9uc0ludGVyZmFjZSA9IHt9KSB7XG4gICAgICAgIGlmICghdGhpcy5nZW9jb2Rlcikge1xuICAgICAgICAgICAgdGhpcy5pbml0R2VvY29kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdlb2NvZGVyLnJldmVyc2VMb29rdXAobmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZShsYXQsIGxvbiksIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgbnVsbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cbn1cbiJdfQ==
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class AppleMapsGeocoderService {
    constructor() {
    }
    /**
     * @deprecated use initialize
     */
    initGeocoder(options = {}) {
        this.geocoderInstance = new window.mapkit.Geocoder(options);
    }
    initialize(options = {}) {
        this.geocoderInstance = new window.mapkit.Geocoder(options);
        return this.geocoderInstance;
    }
    reverseLookup(latitude, longitude, callback, options = {}) {
        if (!this.geocoderInstance) {
            throw new Error(`Geocoder or API don't initialized`);
        }
        return this.geocoderInstance.reverseLookup(new window.mapkit.Coordinate(latitude, longitude), callback, options);
    }
    reverseLookupPromised(latitude, longitude, options = {}) {
        if (!this.geocoderInstance) {
            return Promise.reject(`Geocoder or API don't initialized`);
        }
        return new Promise((resolve, reject) => {
            this.geocoderInstance.reverseLookup(new window.mapkit.Coordinate(latitude, longitude), (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            }, options);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.3", ngImport: i0, type: AppleMapsGeocoderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.3", ngImport: i0, type: AppleMapsGeocoderService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.3", ngImport: i0, type: AppleMapsGeocoderService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGUtbWFwcy1nZW9jb2Rlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFwcGxlLW1hcGtpdC9zcmMvbGliL3NlcnZpY2VzL2dlb2NvZGVyL2FwcGxlLW1hcHMtZ2VvY29kZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUl6QyxNQUFNLE9BQU8sd0JBQXdCO0lBRWpDO0lBQ0EsQ0FBQztJQUVEOztPQUVHO0lBQ0ksWUFBWSxDQUFDLFVBQWUsRUFBRTtRQUNqQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRU0sVUFBVSxDQUFDLFVBQTZDLEVBQUU7UUFDN0QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUQsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDakMsQ0FBQztJQUVNLGFBQWEsQ0FBQyxRQUFnQixFQUFFLFNBQWlCLEVBQUUsUUFBOEQsRUFBRSxVQUF3QyxFQUFFO1FBQ2hLLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1NBQ3hEO1FBQ0QsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNySCxDQUFDO0lBRU0scUJBQXFCLENBQUMsUUFBZ0IsRUFBRSxTQUFpQixFQUFFLFVBQXdDLEVBQUU7UUFDeEcsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN4QixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsbUNBQW1DLENBQUMsQ0FBQztTQUM5RDtRQUNELE9BQU8sSUFBSSxPQUFPLENBQTBCLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzVELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQ25HLElBQUksR0FBRyxFQUFFO29CQUNMLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDZjtxQkFBTTtvQkFDSCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ25CO1lBQ0wsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs4R0FyQ1Esd0JBQXdCO2tIQUF4Qix3QkFBd0IsY0FEWixNQUFNOzsyRkFDbEIsd0JBQXdCO2tCQURwQyxVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hcEtpdH0gZnJvbSBcIi4uLy4uL21hcGtpdFwiO1xuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBBcHBsZU1hcHNHZW9jb2RlclNlcnZpY2Uge1xuICAgIHByaXZhdGUgZ2VvY29kZXJJbnN0YW5jZTogTWFwS2l0Lkdlb2NvZGVyO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIHVzZSBpbml0aWFsaXplXG4gICAgICovXG4gICAgcHVibGljIGluaXRHZW9jb2RlcihvcHRpb25zOiBhbnkgPSB7fSkge1xuICAgICAgICB0aGlzLmdlb2NvZGVySW5zdGFuY2UgPSBuZXcgd2luZG93Lm1hcGtpdC5HZW9jb2RlcihvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdGlhbGl6ZShvcHRpb25zOiBNYXBLaXQuR2VvY29kZXJDb25zdHJ1Y3Rvck9wdGlvbnMgPSB7fSk6IE1hcEtpdC5HZW9jb2RlciB7XG4gICAgICAgIHRoaXMuZ2VvY29kZXJJbnN0YW5jZSA9IG5ldyB3aW5kb3cubWFwa2l0Lkdlb2NvZGVyKG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZW9jb2Rlckluc3RhbmNlO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXZlcnNlTG9va3VwKGxhdGl0dWRlOiBudW1iZXIsIGxvbmdpdHVkZTogbnVtYmVyLCBjYWxsYmFjazogKGVycjogRXJyb3IsIGRhdGE/OiBNYXBLaXQuR2VvY29kZXJSZXNwb25zZSkgPT4gdm9pZCwgb3B0aW9uczogTWFwS2l0Lkdlb2NvZGVyTG9va3VwT3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGlmICghdGhpcy5nZW9jb2Rlckluc3RhbmNlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEdlb2NvZGVyIG9yIEFQSSBkb24ndCBpbml0aWFsaXplZGApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmdlb2NvZGVySW5zdGFuY2UucmV2ZXJzZUxvb2t1cChuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlKGxhdGl0dWRlLCBsb25naXR1ZGUpLCBjYWxsYmFjaywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIHJldmVyc2VMb29rdXBQcm9taXNlZChsYXRpdHVkZTogbnVtYmVyLCBsb25naXR1ZGU6IG51bWJlciwgb3B0aW9uczogTWFwS2l0Lkdlb2NvZGVyTG9va3VwT3B0aW9ucyA9IHt9KTogUHJvbWlzZTxNYXBLaXQuR2VvY29kZXJSZXNwb25zZT4ge1xuICAgICAgICBpZiAoIXRoaXMuZ2VvY29kZXJJbnN0YW5jZSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBHZW9jb2RlciBvciBBUEkgZG9uJ3QgaW5pdGlhbGl6ZWRgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8TWFwS2l0Lkdlb2NvZGVyUmVzcG9uc2U+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2VvY29kZXJJbnN0YW5jZS5yZXZlcnNlTG9va3VwKG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUobGF0aXR1ZGUsIGxvbmdpdHVkZSksIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiJdfQ==
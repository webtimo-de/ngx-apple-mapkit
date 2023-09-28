import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class AppleMapsSearchService {
    constructor() {
    }
    initSearch(options = {}) {
        this.searchObject = new window.mapkit.Search(options);
    }
    search(query, callback, options) {
        if (!this.searchObject) {
            throw new Error('Search or API don\'t initialized');
        }
        this.searchObject.search(query, (err, data) => {
            if (err) {
                callback(err);
                return;
            }
            callback(err, data);
        }, options);
    }
    autocomplete(query, callback, options) {
        if (!this.searchObject) {
            throw new Error('Search don\'t initialized');
        }
        this.searchObject.autocomplete(query, (err, data) => {
            if (err) {
                callback(err);
                return;
            }
            callback(err, data);
        }, options);
    }
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsSearchService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    /** @nocollapse */ static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsSearchService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsSearchService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGUtbWFwcy1zZWFyY2guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1hcHBsZS1tYXBraXQvc3JjL2xpYi9zZXJ2aWNlcy9zZWFyY2gvYXBwbGUtbWFwcy1zZWFyY2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUl6QyxNQUFNLE9BQU8sc0JBQXNCO0lBRy9CO0lBQ0EsQ0FBQztJQUVNLFVBQVUsQ0FBQyxPQUFPLEdBQUcsRUFBRTtRQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVNLE1BQU0sQ0FBQyxLQUFVLEVBQUUsUUFBdUMsRUFBRSxPQUF3QjtRQUN2RixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNwQixNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7U0FDdkQ7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFRLEVBQUUsSUFBUyxFQUFFLEVBQUU7WUFDcEQsSUFBSSxHQUFHLEVBQUU7Z0JBQ0wsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNkLE9BQU87YUFDVjtZQUNELFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFFTSxZQUFZLENBQUMsS0FBVSxFQUFFLFFBQXVDLEVBQUUsT0FBd0I7UUFDN0YsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDcEIsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1NBQ2hEO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBUSxFQUFFLElBQVMsRUFBRSxFQUFFO1lBQzFELElBQUksR0FBRyxFQUFFO2dCQUNMLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDZCxPQUFPO2FBQ1Y7WUFDRCxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hCLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNoQixDQUFDO2lJQWxDUSxzQkFBc0I7cUlBQXRCLHNCQUFzQixjQURWLE1BQU07OzJGQUNsQixzQkFBc0I7a0JBRGxDLFVBQVU7bUJBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U2VhcmNoSW50ZXJmYWNlfSBmcm9tIFwiLi4vLi4vZGVjbGFyYXRpb25zXCI7XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIEFwcGxlTWFwc1NlYXJjaFNlcnZpY2Uge1xuICAgIHB1YmxpYyBzZWFyY2hPYmplY3Q6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0U2VhcmNoKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLnNlYXJjaE9iamVjdCA9IG5ldyB3aW5kb3cubWFwa2l0LlNlYXJjaChvcHRpb25zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2VhcmNoKHF1ZXJ5OiBhbnksIGNhbGxiYWNrOiAoZXJyOiBhbnksIGRhdGE/OiBhbnkpID0+IGFueSwgb3B0aW9uczogU2VhcmNoSW50ZXJmYWNlKSB7XG4gICAgICAgIGlmICghdGhpcy5zZWFyY2hPYmplY3QpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2VhcmNoIG9yIEFQSSBkb25cXCd0IGluaXRpYWxpemVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWFyY2hPYmplY3Quc2VhcmNoKHF1ZXJ5LCAoZXJyOiBhbnksIGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbGJhY2soZXJyLCBkYXRhKTtcbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGF1dG9jb21wbGV0ZShxdWVyeTogYW55LCBjYWxsYmFjazogKGVycjogYW55LCBkYXRhPzogYW55KSA9PiBhbnksIG9wdGlvbnM6IFNlYXJjaEludGVyZmFjZSkge1xuICAgICAgICBpZiAoIXRoaXMuc2VhcmNoT2JqZWN0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NlYXJjaCBkb25cXCd0IGluaXRpYWxpemVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWFyY2hPYmplY3QuYXV0b2NvbXBsZXRlKHF1ZXJ5LCAoZXJyOiBhbnksIGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbGJhY2soZXJyLCBkYXRhKTtcbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxufVxuIl19
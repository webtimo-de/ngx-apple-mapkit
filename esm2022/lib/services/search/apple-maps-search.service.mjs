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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsSearchService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsSearchService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsSearchService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGUtbWFwcy1zZWFyY2guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1hcHBsZS1tYXBzL3NyYy9saWIvc2VydmljZXMvc2VhcmNoL2FwcGxlLW1hcHMtc2VhcmNoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFJekMsTUFBTSxPQUFPLHNCQUFzQjtJQUcvQjtJQUNBLENBQUM7SUFFTSxVQUFVLENBQUMsT0FBTyxHQUFHLEVBQUU7UUFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFTSxNQUFNLENBQUMsS0FBVSxFQUFFLFFBQXVDLEVBQUUsT0FBd0I7UUFDdkYsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDcEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1NBQ3ZEO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBUSxFQUFFLElBQVMsRUFBRSxFQUFFO1lBQ3BELElBQUksR0FBRyxFQUFFO2dCQUNMLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDZCxPQUFPO2FBQ1Y7WUFDRCxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hCLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRU0sWUFBWSxDQUFDLEtBQVUsRUFBRSxRQUF1QyxFQUFFLE9BQXdCO1FBQzdGLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztTQUNoRDtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQVEsRUFBRSxJQUFTLEVBQUUsRUFBRTtZQUMxRCxJQUFJLEdBQUcsRUFBRTtnQkFDTCxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2QsT0FBTzthQUNWO1lBQ0QsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4QixDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEIsQ0FBQzs4R0FsQ1Esc0JBQXNCO2tIQUF0QixzQkFBc0IsY0FEVixNQUFNOzsyRkFDbEIsc0JBQXNCO2tCQURsQyxVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NlYXJjaEludGVyZmFjZX0gZnJvbSBcIi4uLy4uL2RlY2xhcmF0aW9uc1wiO1xuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBBcHBsZU1hcHNTZWFyY2hTZXJ2aWNlIHtcbiAgICBwdWJsaWMgc2VhcmNoT2JqZWN0OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdFNlYXJjaChvcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5zZWFyY2hPYmplY3QgPSBuZXcgd2luZG93Lm1hcGtpdC5TZWFyY2gob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIHNlYXJjaChxdWVyeTogYW55LCBjYWxsYmFjazogKGVycjogYW55LCBkYXRhPzogYW55KSA9PiBhbnksIG9wdGlvbnM6IFNlYXJjaEludGVyZmFjZSkge1xuICAgICAgICBpZiAoIXRoaXMuc2VhcmNoT2JqZWN0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NlYXJjaCBvciBBUEkgZG9uXFwndCBpbml0aWFsaXplZCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VhcmNoT2JqZWN0LnNlYXJjaChxdWVyeSwgKGVycjogYW55LCBkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgZGF0YSk7XG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhdXRvY29tcGxldGUocXVlcnk6IGFueSwgY2FsbGJhY2s6IChlcnI6IGFueSwgZGF0YT86IGFueSkgPT4gYW55LCBvcHRpb25zOiBTZWFyY2hJbnRlcmZhY2UpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlYXJjaE9iamVjdCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTZWFyY2ggZG9uXFwndCBpbml0aWFsaXplZCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VhcmNoT2JqZWN0LmF1dG9jb21wbGV0ZShxdWVyeSwgKGVycjogYW55LCBkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgZGF0YSk7XG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cbn1cbiJdfQ==
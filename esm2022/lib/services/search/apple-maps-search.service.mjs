import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class AppleMapsSearchService {
    constructor() {
    }
    /**
     * @deprecated use initialize
     */
    initSearch(options = {}) {
        this.searchInstance = new window.mapkit.Search(options);
    }
    initialize(options = {}) {
        this.searchInstance = new window.mapkit.Search(options);
        return this.searchInstance;
    }
    search(query, callback, options) {
        if (!this.searchInstance) {
            throw new Error(`Search or API don't initialized`);
        }
        return this.searchInstance.search(query, callback, options);
    }
    autocomplete(query, callback, options) {
        if (!this.searchInstance) {
            throw new Error(`Search or API don't initialized`);
        }
        return this.searchInstance.autocomplete(query, callback, options);
    }
    searchPromised(query, options) {
        if (!this.searchInstance) {
            return Promise.reject(`Search or API don't initialized`);
        }
        return new Promise((resolve, reject) => {
            this.searchInstance.search(query, (error, data) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(data);
                }
            }, options);
        });
    }
    autocompletePromised(query, options) {
        if (!this.searchInstance) {
            return Promise.reject(`Search or API don't initialized`);
        }
        return new Promise((resolve, reject) => {
            this.searchInstance.autocomplete(query, (error, data) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(data);
                }
            }, options);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.3", ngImport: i0, type: AppleMapsSearchService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.3", ngImport: i0, type: AppleMapsSearchService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.3", ngImport: i0, type: AppleMapsSearchService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGUtbWFwcy1zZWFyY2guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1hcHBsZS1tYXBraXQvc3JjL2xpYi9zZXJ2aWNlcy9zZWFyY2gvYXBwbGUtbWFwcy1zZWFyY2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUt6QyxNQUFNLE9BQU8sc0JBQXNCO0lBRy9CO0lBQ0EsQ0FBQztJQUVEOztPQUVHO0lBQ0ksVUFBVSxDQUFDLFVBQWUsRUFBRTtRQUMvQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVNLFVBQVUsQ0FBQyxVQUEyQyxFQUFFO1FBQzNELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4RCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDL0IsQ0FBQztJQUVNLE1BQU0sQ0FBQyxLQUFhLEVBQUUsUUFBK0IsRUFBRSxPQUE2QjtRQUN2RixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7U0FDdEQ7UUFDRCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVNLFlBQVksQ0FBQyxLQUFhLEVBQUUsUUFBMkMsRUFBRSxPQUF5QztRQUNySCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7U0FDdEQ7UUFDRCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVNLGNBQWMsQ0FBQyxLQUFhLEVBQUUsT0FBNkI7UUFDOUQsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdEIsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLGlDQUFpQyxDQUFDLENBQUM7U0FDNUQ7UUFDRCxPQUFPLElBQUksT0FBTyxDQUF3QixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMxRCxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUU7Z0JBQzlDLElBQUksS0FBSyxFQUFFO29CQUNQLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDakI7cUJBQU07b0JBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNqQjtZQUNMLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxvQkFBb0IsQ0FBQyxLQUFhLEVBQUUsT0FBeUM7UUFDaEYsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdEIsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLGlDQUFpQyxDQUFDLENBQUM7U0FDNUQ7UUFDRCxPQUFPLElBQUksT0FBTyxDQUFvQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN0RSxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUU7Z0JBQ3BELElBQUksS0FBSyxFQUFFO29CQUNQLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDakI7cUJBQU07b0JBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNqQjtZQUNMLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7OEdBNURRLHNCQUFzQjtrSEFBdEIsc0JBQXNCLGNBRFYsTUFBTTs7MkZBQ2xCLHNCQUFzQjtrQkFEbEMsVUFBVTttQkFBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXBLaXR9IGZyb20gXCIuLi8uLi9tYXBraXRcIjtcblxuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBBcHBsZU1hcHNTZWFyY2hTZXJ2aWNlIHtcbiAgICBwcml2YXRlIHNlYXJjaEluc3RhbmNlOiBNYXBLaXQuU2VhcmNoO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlcHJlY2F0ZWQgdXNlIGluaXRpYWxpemVcbiAgICAgKi9cbiAgICBwdWJsaWMgaW5pdFNlYXJjaChvcHRpb25zOiBhbnkgPSB7fSkge1xuICAgICAgICB0aGlzLnNlYXJjaEluc3RhbmNlID0gbmV3IHdpbmRvdy5tYXBraXQuU2VhcmNoKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0aWFsaXplKG9wdGlvbnM6IE1hcEtpdC5TZWFyY2hDb25zdHJ1Y3Rvck9wdGlvbnMgPSB7fSk6IE1hcEtpdC5TZWFyY2gge1xuICAgICAgICB0aGlzLnNlYXJjaEluc3RhbmNlID0gbmV3IHdpbmRvdy5tYXBraXQuU2VhcmNoKG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2hJbnN0YW5jZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2VhcmNoKHF1ZXJ5OiBzdHJpbmcsIGNhbGxiYWNrOiBNYXBLaXQuU2VhcmNoQ2FsbGJhY2ssIG9wdGlvbnM6IE1hcEtpdC5TZWFyY2hPcHRpb25zKSB7XG4gICAgICAgIGlmICghdGhpcy5zZWFyY2hJbnN0YW5jZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBTZWFyY2ggb3IgQVBJIGRvbid0IGluaXRpYWxpemVkYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoSW5zdGFuY2Uuc2VhcmNoKHF1ZXJ5LCBjYWxsYmFjaywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHVibGljIGF1dG9jb21wbGV0ZShxdWVyeTogc3RyaW5nLCBjYWxsYmFjazogTWFwS2l0LkF1dG9jb21wbGV0ZVNlYXJjaENhbGxiYWNrLCBvcHRpb25zOiBNYXBLaXQuU2VhcmNoQXV0b2NvbXBsZXRlT3B0aW9ucykge1xuICAgICAgICBpZiAoIXRoaXMuc2VhcmNoSW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgU2VhcmNoIG9yIEFQSSBkb24ndCBpbml0aWFsaXplZGApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNlYXJjaEluc3RhbmNlLmF1dG9jb21wbGV0ZShxdWVyeSwgY2FsbGJhY2ssIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZWFyY2hQcm9taXNlZChxdWVyeTogc3RyaW5nLCBvcHRpb25zOiBNYXBLaXQuU2VhcmNoT3B0aW9ucyk6IFByb21pc2U8TWFwS2l0LlNlYXJjaFJlc3BvbnNlPiB7XG4gICAgICAgIGlmICghdGhpcy5zZWFyY2hJbnN0YW5jZSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBTZWFyY2ggb3IgQVBJIGRvbid0IGluaXRpYWxpemVkYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPE1hcEtpdC5TZWFyY2hSZXNwb25zZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnN0YW5jZS5zZWFyY2gocXVlcnksIChlcnJvciwgZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBhdXRvY29tcGxldGVQcm9taXNlZChxdWVyeTogc3RyaW5nLCBvcHRpb25zOiBNYXBLaXQuU2VhcmNoQXV0b2NvbXBsZXRlT3B0aW9ucyk6IFByb21pc2U8TWFwS2l0LlNlYXJjaEF1dG9jb21wbGV0ZVJlc3BvbnNlPiB7XG4gICAgICAgIGlmICghdGhpcy5zZWFyY2hJbnN0YW5jZSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBTZWFyY2ggb3IgQVBJIGRvbid0IGluaXRpYWxpemVkYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPE1hcEtpdC5TZWFyY2hBdXRvY29tcGxldGVSZXNwb25zZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnN0YW5jZS5hdXRvY29tcGxldGUocXVlcnksIChlcnJvciwgZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgICAgIH0pXG4gICAgfVxufVxuIl19
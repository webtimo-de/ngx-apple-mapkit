import { SearchInterface } from "../../declarations";
import * as i0 from "@angular/core";
export declare class AppleMapsSearchService {
    searchObject: any;
    constructor();
    initSearch(options?: {}): void;
    search(query: any, callback: (err: any, data?: any) => any, options: SearchInterface): void;
    autocomplete(query: any, callback: (err: any, data?: any) => any, options: SearchInterface): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AppleMapsSearchService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AppleMapsSearchService>;
}

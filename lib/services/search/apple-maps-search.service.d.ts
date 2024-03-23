import { MapKit } from "../../mapkit";
import * as i0 from "@angular/core";
export declare class AppleMapsSearchService {
    private searchInstance;
    constructor();
    /**
     * @deprecated use initialize
     */
    initSearch(options?: any): void;
    initialize(options?: MapKit.SearchConstructorOptions): MapKit.Search;
    search(query: string, callback: MapKit.SearchCallback, options: MapKit.SearchOptions): number;
    autocomplete(query: string, callback: MapKit.AutocompleteSearchCallback, options: MapKit.SearchAutocompleteOptions): void;
    searchPromised(query: string, options: MapKit.SearchOptions): Promise<MapKit.SearchResponse>;
    autocompletePromised(query: string, options: MapKit.SearchAutocompleteOptions): Promise<MapKit.SearchAutocompleteResponse>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AppleMapsSearchService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AppleMapsSearchService>;
}

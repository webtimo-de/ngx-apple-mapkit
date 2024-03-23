import { MapKit } from "../../mapkit";
import * as i0 from "@angular/core";
export declare class AppleMapsGeocoderService {
    private geocoderInstance;
    constructor();
    /**
     * @deprecated use initialize
     */
    initGeocoder(options?: any): void;
    initialize(options?: MapKit.GeocoderConstructorOptions): MapKit.Geocoder;
    reverseLookup(latitude: number, longitude: number, callback: (err: Error, data?: MapKit.GeocoderResponse) => void, options?: MapKit.GeocoderLookupOptions): number;
    reverseLookupPromised(latitude: number, longitude: number, options?: MapKit.GeocoderLookupOptions): Promise<MapKit.GeocoderResponse>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AppleMapsGeocoderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AppleMapsGeocoderService>;
}

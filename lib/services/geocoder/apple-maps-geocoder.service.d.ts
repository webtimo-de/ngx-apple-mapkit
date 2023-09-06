import { GeocoderConstructorOptionsInterface, GeocoderReverseLookupOptionsInterface } from '../../declarations';
import * as i0 from "@angular/core";
export declare class AppleMapsGeocoderService {
    private geocoder;
    constructor();
    initGeocoder(options?: GeocoderConstructorOptionsInterface): void;
    reverseLookup(lat: number, lon: number, callback: (err: any, data?: any) => any, options?: GeocoderReverseLookupOptionsInterface): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AppleMapsGeocoderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AppleMapsGeocoderService>;
}

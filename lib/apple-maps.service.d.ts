import { MapConstructorOptions, MapKitInitOptions, MapKitLoaded } from "./declarations";
import { mapkit } from "./mapkit";
import * as i0 from "@angular/core";
declare global {
    interface Window {
        mapkit: any;
    }
}
export declare class AppleMapsService {
    private platformId;
    isBrowser: boolean;
    maps: mapkit.Map[];
    mapsQueue: any[];
    initialized: string;
    annotations: {
        [s: number]: mapkit.Annotation[];
    };
    private options;
    location: any;
    region: any;
    center: any;
    constructor(platformId: Object);
    private static settingsLoadedTransform;
    init(options: MapKitInitOptions, settings?: MapConstructorOptions, cb?: (data: MapKitLoaded) => void): void;
    private createMaps;
    createMap(element: HTMLElement): void;
    private addMapInitOptionsListeners;
    getUserLocation(timeout?: number): Promise<unknown>;
    optionsChanged(changes: any): void;
    settingsChanged(changes: any, key: any): void;
    setAnnotation(annotation: any, key: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AppleMapsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AppleMapsService>;
}

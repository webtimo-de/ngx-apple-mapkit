import { AfterViewInit, ChangeDetectorRef, DoCheck, EventEmitter, KeyValueDiffers, OnInit, QueryList, ViewContainerRef } from '@angular/core';
import { MapConstructorOptions, MapKitInitOptions } from "../../declarations";
import { BehaviorSubject } from "rxjs";
import { AppleMapsService } from "../../apple-maps.service";
import { NgxAppleMapkitAnnotationComponent } from "../ngx-apple-mapkit-annotation/ngx-apple-mapkit-annotation.component";
import * as i0 from "@angular/core";
export declare class NgxAppleMapkitComponent implements DoCheck, OnInit, AfterViewInit {
    private differs;
    private appleMapsService;
    private viewTemplateRef;
    private cdr;
    options: MapKitInitOptions;
    settings: MapConstructorOptions;
    height: string;
    onLoaded: EventEmitter<any>;
    annotations: QueryList<NgxAppleMapkitAnnotationComponent>;
    defaultOptions: {
        language: string;
    };
    defaultSettings: {
        colorScheme: string;
        isZoomEnabled: boolean;
        mapType: string;
        showsZoomControl: boolean;
        showsMapTypeControl: boolean;
    };
    private _options;
    private _settings;
    private keyValue;
    keySource: BehaviorSubject<number>;
    key: import("rxjs").Observable<number>;
    constructor(differs: KeyValueDiffers, appleMapsService: AppleMapsService, viewTemplateRef: ViewContainerRef, cdr: ChangeDetectorRef);
    private init;
    private optionsChanged;
    private settingsChanged;
    ngOnInit(): void;
    ngDoCheck(): void;
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxAppleMapkitComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxAppleMapkitComponent, "ngx-apple-mapkit", never, { "options": { "alias": "options"; "required": false; }; "settings": { "alias": "settings"; "required": false; }; "height": { "alias": "height"; "required": false; }; }, { "onLoaded": "onLoaded"; }, ["annotations"], ["*"], false, never>;
}

import * as i0 from '@angular/core';
import { PLATFORM_ID, Injectable, Inject, EventEmitter, Component, Input, Output, ContentChildren, NgModule } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

class AppleMapsService {
    constructor(platformId) {
        this.platformId = platformId;
        this.maps = [];
        this.mapsQueue = [];
        this.initialized = 'STOPPED';
        this.annotations = {};
        this.isBrowser = isPlatformBrowser(this.platformId);
    }
    static settingsLoadedTransform(settings = {}) {
        const newSettings = {};
        for (const item in settings) {
            if (settings[item]) {
                switch (item) {
                    case 'center':
                        newSettings[item] = new window.mapkit.Coordinate(settings[item].latitude, settings[item].longitude);
                        break;
                    case 'region':
                        const regionCenter = new window.mapkit.Coordinate(settings[item].center.latitude, settings[item].center.longitude);
                        if (settings[item].span) {
                            const regionSpan = new window.mapkit.CoordinateSpan(settings[item].span.from, settings[item].span.to);
                            newSettings[item] = new window.mapkit.CoordinateRegion(regionCenter, regionSpan);
                            break;
                        }
                        newSettings[item] = new window.mapkit.CoordinateRegion(regionCenter);
                        break;
                    case 'padding':
                        newSettings[item] = new window.mapkit.Padding(settings[item]);
                        break;
                    default:
                        newSettings[item] = settings[item];
                        break;
                }
            }
        }
        return newSettings;
    }
    init(options, settings = {}, cb = (data) => { }) {
        if (!options.JWT || !this.isBrowser) {
            return;
        }
        this.mapsQueue.push({ settings, cb });
        if (this.initialized === 'STOPPED') {
            this.initialized = 'PENDING';
            this.options = options;
            window.mapkit.init({
                authorizationCallback: (done) => {
                    done(options.JWT);
                },
                language: this.options.language
            });
            this.addMapInitOptionsListeners(options);
        }
        if (this.initialized === 'FINISHED') {
            this.createMaps();
        }
    }
    createMaps() {
        const maps = document.querySelectorAll('ngx-apple-mapkit');
        maps.forEach(element => {
            const mapContainer = element.childNodes[0].childNodes[0];
            if (!mapContainer.innerHTML) {
                this.createMap(mapContainer);
            }
        });
    }
    createMap(element) {
        const options = this.mapsQueue.shift();
        // noinspection TypeScriptValidateJSTypes
        const index = this.maps.push(new window.mapkit.Map(element, AppleMapsService.settingsLoadedTransform(options.settings)));
        const object = {
            key: index - 1,
            map: this.maps[index - 1],
            isRotationAvailable: () => {
                return this.maps[index - 1].isRotationAvailable;
            },
            isRotationEnabled: () => {
                return this.maps[index - 1].isRotationEnabled;
            },
            isScrollEnabled: () => {
                return this.maps[index - 1].isScrollEnabled;
            },
            isZoomEnabled: () => {
                return this.maps[index - 1].isZoomEnabled;
            },
            getCenter: () => {
                const { latitude, longitude } = this.maps[index - 1].center;
                return { latitude, longitude };
            },
            // setCenter: (latitude: number, longitude: number) => {
            //   this.maps[index - 1].center = new window.mapkit.Coordinate(latitude, longitude);
            // },
            setCenterAnimated: (latitude, longitude, animate = true) => {
                this.maps[index - 1].setCenterAnimated(new window.mapkit.Coordinate(latitude, longitude), animate);
            },
            getRegion: () => {
                return this.maps[index - 1].region;
            },
            setRegionAnimated: (center, span = null, animate = true) => {
                const regionCenter = new window.mapkit.Coordinate(center.latitude, center.longitude);
                if (span) {
                    const regionSpan = new window.mapkit.CoordinateSpan(span.from, span.to);
                    this.maps[index - 1].setRegionAnimated(new window.mapkit.CoordinateRegion(regionCenter, regionSpan), animate);
                    return;
                }
                this.maps[index - 1].setRegionAnimated(new window.mapkit.CoordinateRegion(regionCenter), animate);
            },
            getRotation: () => {
                return this.maps[index - 1].rotation;
            },
            setRotationAnimated: (degrees, animate = true) => {
                this.maps[index - 1].setRotationAnimated(degrees, animate);
            },
            // getVisibleMapRect: () => {
            //   return this.maps[index - 1].visibleMapsRect;
            // },      // setVisibleMapRectAnimated: () => {
            // }
            getCameraDistance: () => {
                return this.maps[index - 1].cameraDistance;
            }, setCameraDistanceAnimated: (distance, animate = true) => {
                this.maps[index - 1].setCameraDistanceAnimated(distance, animate);
            }, getCameraZoomRange: () => {
                const { minCameraDistance, maxCameraDistance } = this.maps[index - 1].cameraZoomRange;
                return { minCameraDistance, maxCameraDistance };
            }, setCameraZoomRangeAnimated: (minCameraDistance, maxCameraDistance, animate = true) => {
                this.maps[index - 1].setCameraZoomRangeAnimated(new window.mapkit.CameraZoomRange(minCameraDistance, maxCameraDistance), animate);
            }, getColorScheme: () => {
                return this.maps[index - 1].colorScheme;
            }, setColorScheme: (scheme = 'light') => {
                this.maps[index - 1].colorScheme = scheme;
            }, getDistances: () => {
                return this.maps[index - 1].distances;
            }, setDistances: (distance) => {
                this.maps[index - 1].distances = distance;
            }, getMapType: () => {
                return this.maps[index - 1].mapType;
            }, setMapType: (type) => {
                this.maps[index - 1].mapType = type;
            }, getPadding: () => {
                return this.maps[index - 1].padding;
            }, setPadding: (padding) => {
                this.maps[index - 1].padding = new window.mapkit.Padding(padding);
            }, getShowsMapTypeControl: () => {
                return this.maps[index - 1].showsMapTypeControl;
            }, setShowsMapTypeControl: (value) => {
                this.maps[index - 1].showsMapTypeControl = value;
            }, getShowsZoomControl: () => {
                return this.maps[index - 1].showsZoomControl;
            }, setShowsZoomControl: (value) => {
                this.maps[index - 1].showsZoomControl = value;
            }, getShowsUserLocationControl: () => {
                return this.maps[index - 1].showsUserLocationControl;
            }, setShowsUserLocationControl: (value) => {
                this.maps[index - 1].showsUserLocationControl = value;
            }, getShowsPointsOfInterest: () => {
                return this.maps[index - 1].showsPointsOfInterest;
            }, setShowsPointsOfInterest: (value) => {
                this.maps[index - 1].showsPointsOfInterest = value;
            }, getShowsScale: () => {
                return this.maps[index - 1].showsScale;
            }, setShowsScale: (value) => {
                this.maps[index - 1].showsScale = value;
            }, getTintColor: () => {
                return this.maps[index - 1].tintColor;
            }, setTintColor: (color) => {
                this.maps[index - 1].tintColor = color;
            }, showItems: (items, mapShowItemOptions = {}) => {
                const passingOptions = { animate: options.animate || true };
                if (mapShowItemOptions.span) {
                    // @ts-ignore
                    passingOptions.minimumSpan = new window.mapkit.CoordinateSpan(mapShowItemOptions.span.from, mapShowItemOptions.span.to);
                }
                if (mapShowItemOptions.padding) {
                    // @ts-ignore
                    passingOptions.padding = new window.mapkit.Padding(mapShowItemOptions.padding);
                }
                const passingItems = Array.isArray(items) ? items : [items];
                this.maps[index - 1].showItems(passingItems, passingOptions);
            }, getAnnotations: () => {
                return new Promise(resolve => {
                    if (this.annotations[index - 1]) {
                        resolve(this.annotations[index - 1]);
                    }
                    else {
                        setTimeout(() => {
                            if (this.annotations[index - 1]) {
                                resolve(this.annotations[index - 1]);
                            }
                            else {
                                resolve([]);
                            }
                        }, 500);
                    }
                });
                // return this.annotations[index - 1];
            }, getSelectedAnnotations: () => {
                return this.maps[index - 1].selectedAnnotation;
            }, set zoom(value) {
                this.map._impl.zoomLevel = value;
            }, get zoom() {
                return this.map._impl.zoomLevel;
            }, set showCompass(value) {
                this.map.showsCompass = value;
            }, get showCompass() {
                return this.showCompass;
            }
        };
        options.cb(object);
    }
    addMapInitOptionsListeners(options) {
        window.mapkit.addEventListener('configuration-change', (event) => {
            if (options.callback) {
                options.callback(event);
            }
            switch (event.status) {
                case 'Initialized':
                    // MapKit JS initialized and configured.
                    this.initialized = 'FINISHED';
                    this.createMaps();
                    // this.createMap(settings);
                    break;
                case 'Refreshed':
                    // MapKit JS configuration updated.
                    break;
            }
        });
        window.mapkit.addEventListener('error', (event) => {
            this.initialized = 'STOPPED';
            if (options.callback) {
                options.callback(event);
            }
        });
    }
    getUserLocation(timeout = 5000) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((result) => {
                this.location = result;
                resolve(result);
            }, (err) => {
                reject(err);
            }, { timeout });
        });
    }
    optionsChanged(changes) {
        changes.forEachItem((item) => {
            if (item.previousValue !== item.currentValue) {
                switch (item.key) {
                    case 'language':
                        window.mapkit.language = item.currentValue;
                        break;
                    case 'JWT':
                        break;
                    default:
                        break;
                }
            }
        });
    }
    settingsChanged(changes, key) {
        if (key >= 0) {
            changes.forEachItem((item) => {
                if (item.previousValue !== item.currentValue) {
                    switch (item.key) {
                        case 'colorScheme':
                            this.maps[key][item.key] = item.currentValue;
                            break;
                        case 'center':
                            this.maps[key].setCenterAnimated(new window.mapkit.Coordinate(item.currentValue.latitude, item.currentValue.longitude), true);
                            break;
                        case 'region':
                            // tslint:disable-next-line:max-line-length
                            const regionCenter = new window.mapkit.Coordinate(item.currentValue.center.latitude, item.currentValue.center.longitude);
                            if (item.currentValue.span) {
                                const regionSpan = new window.mapkit.CoordinateSpan(item.currentValue.span.from, item.currentValue.span.to);
                                this.maps[key].setRegionAnimated(new window.mapkit.CoordinateRegion(regionCenter, regionSpan));
                                break;
                            }
                            this.maps[key].setRegionAnimated(new window.mapkit.CoordinateRegion(regionCenter));
                            break;
                        case 'padding':
                            this.maps[key] = new window.mapkit.Padding(item.currentValue);
                            break;
                        default:
                            this.maps[key][item.key] = item.currentValue;
                            break;
                    }
                }
            });
        }
    }
    setAnnotation(annotation, key) {
        if (!this.annotations[key]) {
            this.annotations[key] = [];
        }
        if (!this.annotations[key].includes(annotation)) {
            this.annotations[key].push(annotation);
            this.maps[key].addAnnotation(annotation);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsService, deps: [{ token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; } });

class AppleMapsGeocoderService {
    constructor() {
    }
    initGeocoder(options = {}) {
        this.geocoder = new window.mapkit.Geocoder(options);
    }
    reverseLookup(lat, lon, callback, options = {}) {
        if (!this.geocoder) {
            this.initGeocoder();
        }
        this.geocoder.reverseLookup(new window.mapkit.Coordinate(lat, lon), (err, result) => {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, result);
            }
        }, options);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsGeocoderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsGeocoderService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsGeocoderService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });

class AppleMapsSearchService {
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

class AppleMapkitComponent {
    constructor(differs, appleMapsService, viewTemplateRef, cdr) {
        this.differs = differs;
        this.appleMapsService = appleMapsService;
        this.viewTemplateRef = viewTemplateRef;
        this.cdr = cdr;
        this.onLoaded = new EventEmitter();
        // @ContentChildren(TemplateRef, {descendants: true}) template: QueryList<TemplateRef<any>>;
        // private templates: QueryList<TemplateRef<any>>;
        this.defaultOptions = { language: 'en' };
        // annotations = [];
        this.defaultSettings = {
            colorScheme: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
            isZoomEnabled: true,
            mapType: 'standard',
            showsZoomControl: true,
            showsMapTypeControl: true
        };
        this.keySource = new BehaviorSubject(-1);
        this.key = this.keySource.asObservable();
        this.settings = {};
    }
    init() {
        const settings = Object.assign({ ...this.defaultSettings, ...this.settings });
        const options = Object.assign({ ...this.defaultOptions, ...this.options });
        this.appleMapsService.init(options, settings, (data) => {
            if (this.onLoaded.length) {
                this.onLoaded.emit(data);
            }
            this.keyValue = data.key;
            this.keySource.next(data.key);
        });
    }
    optionsChanged(changes) {
        this.appleMapsService.optionsChanged(changes);
    }
    settingsChanged(changes) {
        this.appleMapsService.settingsChanged(changes, this.keyValue);
    }
    // ngAfterContentInit(): void {
    //     this.template.forEach(item => {
    //         const template = this.viewTemplateRef.createEmbeddedView(item);
    //         this.viewTemplateRef.remove(this.viewTemplateRef.indexOf(template));
    //         template.detectChanges();
    //         this.annotations.push(item);
    //         this.viewTemplateRef.clear();
    //     });
    // }
    ngOnInit() {
        if (!this.options) {
            throw new Error('You must provide JWT token');
        }
        else {
            this._options = this.differs.find(this.options).create();
            this.init();
        }
        if (this.settings) {
            this._settings = this.differs.find(this.settings).create();
        }
    }
    ngDoCheck() {
        if (this.options) {
            const options = this._options.diff(this.options);
            if (options) {
                this.optionsChanged(options);
            }
        }
        if (this.settings) {
            const settings = this._settings.diff(this.settings);
            if (settings) {
                this.settingsChanged(settings);
            }
        }
    }
    ngAfterViewInit() {
        this.cdr.detectChanges();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapkitComponent, deps: [{ token: i0.KeyValueDiffers }, { token: AppleMapsService }, { token: i0.ViewContainerRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.3", type: AppleMapkitComponent, selector: "ngx-apple-mapkit", inputs: { options: "options", settings: "settings", height: "height" }, outputs: { onLoaded: "onLoaded" }, queries: [{ propertyName: "annotations", predicate: ["apple-mapkit-annotation"], descendants: true }], ngImport: i0, template: "<div class=\"ngx-apple-mapkit\">\r\n    <div class=\"ngx-apple-mapkit__map\"></div>\r\n</div>\r\n<ng-content></ng-content>\r\n<ng-container></ng-container>\r\n", styles: [".ngx-apple-mapkit{height:100%;position:relative}.ngx-apple-mapkit .ngx-apple-mapkit__map{inset:0;position:absolute}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapkitComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-apple-mapkit', template: "<div class=\"ngx-apple-mapkit\">\r\n    <div class=\"ngx-apple-mapkit__map\"></div>\r\n</div>\r\n<ng-content></ng-content>\r\n<ng-container></ng-container>\r\n", styles: [".ngx-apple-mapkit{height:100%;position:relative}.ngx-apple-mapkit .ngx-apple-mapkit__map{inset:0;position:absolute}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.KeyValueDiffers }, { type: AppleMapsService }, { type: i0.ViewContainerRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { options: [{
                type: Input
            }], settings: [{
                type: Input
            }], height: [{
                type: Input
            }], onLoaded: [{
                type: Output
            }], annotations: [{
                type: ContentChildren,
                args: ['apple-mapkit-annotation', { descendants: true }]
            }] } });

class AppleMapkitAnnotationComponent {
    set latitude(value) {
        if (this.annotation) {
            this.annotation.coordinate = new window.mapkit.Coordinate(value, this._longitude);
        }
        this._latitude = value;
    }
    get latitude() {
        return this._latitude;
    }
    set longitude(value) {
        if (this.annotation) {
            this.annotation.coordinate = new window.mapkit.Coordinate(this._latitude, value);
        }
        this._longitude = value;
    }
    get longitude() {
        return this._longitude;
    }
    constructor(appleMapsService, differs, ref, renderer, parent) {
        this.appleMapsService = appleMapsService;
        this.differs = differs;
        this.ref = ref;
        this.renderer = renderer;
        this.parent = parent;
        this.calloutEnabled = true;
    }
    ngOnInit() {
        this.annotationElement = this.renderer.createElement('div');
        this.annotationElement.className = 'ngx-apple-mapkit__map-annotation';
        this.renderer.appendChild(this.annotationElement, this.ref.nativeElement);
        this.initAnnotation(this.options);
        this.parent.key.subscribe(value => {
            if (value >= 0) {
                this.parentKey = value;
                this.appleMapsService.setAnnotation(this.annotation, value);
            }
        });
    }
    initAnnotation(options = {}) {
        const transformedOptions = this.transformOptions(options);
        // @ts-ignore
        if (!this.ref.nativeElement.children.length || (transformedOptions && transformedOptions.calloutEnabled === false)) {
            this.options.calloutEnabled = false;
        }
        this._options = this.differs.find(this.options).create();
        if (this.latitude && this.longitude) {
            this.createAnnotation(this.latitude, this.longitude, transformedOptions || {});
        }
        else {
            throw new Error('Latitude and longitude params are required');
        }
    }
    transformOption(key, value) {
        let transformed = null;
        switch (key) {
            case 'padding':
                transformed = new window.mapkit.Padding(value);
                break;
            default:
                transformed = value;
        }
        return transformed;
    }
    transformOptions(options) {
        const transformedOptions = {};
        for (const item in options) {
            if (options[item]) {
                transformedOptions[item] = transformedOptions[item] = this.transformOption(item, options[item]);
            }
        }
        return transformedOptions;
    }
    createAnnotation(latitude, longitude, options = {}) {
        this.annotation = new window.mapkit.MarkerAnnotation(new window.mapkit.Coordinate(latitude, longitude), options);
        // console.log('this ', this.annotation);
        if (this.ref.nativeElement.children.length) {
            this.landmarkAnnotationCallout = {
                calloutElementForAnnotation: (annotation) => {
                    return this.calloutForLandmarkAnnotation(annotation);
                }
            };
            this.annotation.callout = this.landmarkAnnotationCallout;
        }
    }
    calloutForLandmarkAnnotation(annotation) {
        return this.annotationElement;
    }
    ngDoCheck() {
        if (this.options) {
            const changes = this._options.diff(this.options);
            if (changes) {
                this.optionsChanged(changes);
            }
        }
    }
    optionsChanged(changes) {
        changes.forEachItem((item) => {
            if (item.previousValue !== item.currentValue) {
                this.annotation[item.key] = this.transformOption(item.key, item.currentValue);
            }
        });
    }
    ngOnDestroy() {
        this.appleMapsService.maps[this.parentKey].removeAnnotation(this.annotation);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapkitAnnotationComponent, deps: [{ token: AppleMapsService }, { token: i0.KeyValueDiffers }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: AppleMapkitComponent }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.3", type: AppleMapkitAnnotationComponent, selector: "ngx-apple-mapkit-annotation", inputs: { options: "options", latitude: "latitude", longitude: "longitude" }, ngImport: i0, template: "<ng-content></ng-content>\n", styles: [".ngx-apple-mapkit__map-landmark{background:#fff}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapkitAnnotationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-apple-mapkit-annotation', template: "<ng-content></ng-content>\n", styles: [".ngx-apple-mapkit__map-landmark{background:#fff}\n"] }]
        }], ctorParameters: function () { return [{ type: AppleMapsService }, { type: i0.KeyValueDiffers }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: AppleMapkitComponent, decorators: [{
                    type: Inject,
                    args: [AppleMapkitComponent]
                }] }]; }, propDecorators: { options: [{
                type: Input
            }], latitude: [{
                type: Input
            }], longitude: [{
                type: Input
            }] } });

class AppleMapsModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsModule, bootstrap: [AppleMapkitAnnotationComponent], declarations: [AppleMapkitComponent,
            AppleMapkitAnnotationComponent], imports: [CommonModule], exports: [AppleMapkitComponent,
            AppleMapkitAnnotationComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        AppleMapkitComponent,
                        AppleMapkitAnnotationComponent
                    ],
                    imports: [CommonModule],
                    exports: [
                        AppleMapkitComponent,
                        AppleMapkitAnnotationComponent
                    ],
                    bootstrap: [
                        AppleMapkitAnnotationComponent
                    ]
                }]
        }] });

/*
 * Public API Surface of ngx-apple-mapkit
 */
// <reference path="./lib/declarations.ts" />

/**
 * Generated bundle index. Do not edit.
 */

export { AppleMapkitAnnotationComponent, AppleMapkitComponent, AppleMapsGeocoderService, AppleMapsModule, AppleMapsSearchService, AppleMapsService };
//# sourceMappingURL=ngx-apple-mapkit.mjs.map

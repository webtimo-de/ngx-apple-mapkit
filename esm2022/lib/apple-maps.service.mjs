import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as i0 from "@angular/core";
export class AppleMapsService {
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
    /**
     * @deprecated use initialize
     */
    init(options, settings = {}, cb = (data) => {
    }) {
        return this.initialize(options, settings, cb);
    }
    initialize(options, settings = {}, cb = (data) => {
    }) {
        if (!options.JWT || !this.isBrowser) {
            return;
        }
        if (Object.keys(settings).length !== 0) {
            this.mapsQueue.push({ settings, cb });
        }
        if (this.initialized === 'STOPPED') {
            this.initialized = 'PENDING';
            this.options = options;
            window.mapkit.init({
                authorizationCallback: (done) => {
                    done(options.JWT);
                },
                language: options.language
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
        const index = this.maps.push(new window.mapkit.Map(element, AppleMapsService.settingsLoadedTransform(options.settings)));
        const object = {
            key: index - 1,
            map: this.maps[index - 1],
            addEventListener: (type, listener, context) => {
                if (!type || !listener) {
                    throw new Error('Type and listener are required');
                }
                return this.maps[index - 1].addEventListener(type, listener, context);
            },
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
            },
            setCameraDistanceAnimated: (distance, animate = true) => {
                this.maps[index - 1].setCameraDistanceAnimated(distance, animate);
            },
            getCameraZoomRange: () => {
                const { minCameraDistance, maxCameraDistance } = this.maps[index - 1].cameraZoomRange;
                return { minCameraDistance, maxCameraDistance };
            },
            setCameraZoomRangeAnimated: (minCameraDistance, maxCameraDistance, animate = true) => {
                this.maps[index - 1].setCameraZoomRangeAnimated(new window.mapkit.CameraZoomRange(minCameraDistance, maxCameraDistance), animate);
            },
            getColorScheme: () => {
                return this.maps[index - 1].colorScheme;
            },
            setColorScheme: (scheme = 'light') => {
                this.maps[index - 1].colorScheme = scheme;
            },
            getDistances: () => {
                return this.maps[index - 1].distances;
            },
            setDistances: (distance) => {
                this.maps[index - 1].distances = distance;
            },
            getMapType: () => {
                return this.maps[index - 1].mapType;
            },
            setMapType: (type) => {
                this.maps[index - 1].mapType = type;
            },
            getPadding: () => {
                return this.maps[index - 1].padding;
            },
            setPadding: (padding) => {
                this.maps[index - 1].padding = new window.mapkit.Padding(padding);
            },
            getShowsMapTypeControl: () => {
                return this.maps[index - 1].showsMapTypeControl;
            },
            setShowsMapTypeControl: (value) => {
                this.maps[index - 1].showsMapTypeControl = value;
            },
            getShowsZoomControl: () => {
                return this.maps[index - 1].showsZoomControl;
            },
            setShowsZoomControl: (value) => {
                this.maps[index - 1].showsZoomControl = value;
            },
            getShowsUserLocationControl: () => {
                return this.maps[index - 1].showsUserLocationControl;
            },
            setShowsUserLocationControl: (value) => {
                this.maps[index - 1].showsUserLocationControl = value;
            },
            getShowsPointsOfInterest: () => {
                return this.maps[index - 1].showsPointsOfInterest;
            },
            setShowsPointsOfInterest: (value) => {
                this.maps[index - 1].showsPointsOfInterest = value;
            },
            getShowsScale: () => {
                return this.maps[index - 1].showsScale;
            },
            setShowsScale: (value) => {
                this.maps[index - 1].showsScale = value;
            },
            getTintColor: () => {
                return this.maps[index - 1].tintColor;
            },
            setTintColor: (color) => {
                this.maps[index - 1].tintColor = color;
            },
            showItems: (items, mapShowItemOptions = {}) => {
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
            },
            getAnnotations: () => {
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
            },
            getSelectedAnnotations: () => {
                return this.maps[index - 1].selectedAnnotation;
            },
            set showsCompass(value) {
                this.maps[index - 1].showsCompass = value;
            },
            get showsCompass() {
                return this.maps[index - 1].showsCompass;
            },
            get showsMapTypeControl() {
                return this.maps[index - 1].showsMapTypeControl;
            },
            set showsMapTypeControl(value) {
                this.maps[index - 1].showsMapTypeControl = value;
            },
            get showsZoomControl() {
                return this.maps[index - 1].showsZoomControl;
            },
            set showsZoomControl(value) {
                this.maps[index - 1].showsZoomControl = value;
            },
            get showsUserLocationControl() {
                return this.maps[index - 1].showsUserLocationControl;
            },
            set showsUserLocationControl(value) {
                this.maps[index - 1].showsUserLocationControl = value;
            },
            get showsPointsOfInterest() {
                return this.maps[index - 1].showsPointsOfInterest;
            },
            set showsPointsOfInterest(value) {
                this.maps[index - 1].showsPointsOfInterest = value;
            },
            get tintColor() {
                return this.maps[index - 1].tintColor;
            },
            set tintColor(color) {
                this.maps[index - 1].tintColor = color;
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.3", ngImport: i0, type: AppleMapsService, deps: [{ token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.3", ngImport: i0, type: AppleMapsService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.3", ngImport: i0, type: AppleMapsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGUtbWFwcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFwcGxlLW1hcGtpdC9zcmMvbGliL2FwcGxlLW1hcHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0saUJBQWlCLENBQUM7O0FBeUJsRCxNQUFNLE9BQU8sZ0JBQWdCO0lBV3pCLFlBQXlDLFVBQWtCO1FBQWxCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFUcEQsU0FBSSxHQUFpQixFQUFFLENBQUM7UUFDeEIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLGdCQUFXLEdBQUcsU0FBUyxDQUFDO1FBQ3hCLGdCQUFXLEdBQXVDLEVBQUUsQ0FBQztRQU94RCxJQUFJLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRU8sTUFBTSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsR0FBRyxFQUFFO1FBQ2hELE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN2QixLQUFLLE1BQU0sSUFBSSxJQUFJLFFBQVEsRUFBRTtZQUN6QixJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDaEIsUUFBUSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxRQUFRO3dCQUNULFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUNwRyxNQUFNO29CQUNWLEtBQUssUUFBUTt3QkFDVCxNQUFNLFlBQVksR0FBRyxJQUFJLE1B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Q0FBQyxVQUFlLEVBQUUsR0FBUTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUM5QjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUM3QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM1QztJQUNMLENBQUM7OEdBNVhRLGdCQUFnQixrQkFXTCxXQUFXO2tIQVh0QixnQkFBZ0IsY0FESixNQUFNOzsyRkFDbEIsZ0JBQWdCO2tCQUQ1QixVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7MEJBWWYsTUFBTTsyQkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIFBMQVRGT1JNX0lEfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aXNQbGF0Zm9ybUJyb3dzZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIENvb3JkaW5hdGVzSW50ZXJmYWNlLFxuICAgIERpc3RhbmNlc1N0cmluZyxcbiAgICBNYXBDb25zdHJ1Y3Rvck9wdGlvbnMsXG4gICAgTWFwS2l0Q29tcGFzcyxcbiAgICBNYXBLaXRHZXRDYW1lcmFab29tUmFuZ2UsXG4gICAgTWFwS2l0SW5pdE9wdGlvbnMsXG4gICAgTWFwS2l0TG9hZGVkLFxuICAgIE1hcFNob3dJdGVtT3B0aW9uc0ludGVyZmFjZSxcbiAgICBNYXBUeXBlU3RyaW5nLFxuICAgIFBhZGRpbmdJbnRlcmZhY2UsXG4gICAgU2NoZW1lU3RyaW5nLFxuICAgIFNob3dzU2NhbGVTdHJpbmcsXG4gICAgU3BhbkludGVyZmFjZVxufSBmcm9tIFwiLi9kZWNsYXJhdGlvbnNcIjtcbmltcG9ydCB7TWFwS2l0fSBmcm9tIFwiLi9tYXBraXRcIjtcblxuZGVjbGFyZSBnbG9iYWwge1xuICAgIGludGVyZmFjZSBXaW5kb3cge1xuICAgICAgICBtYXBraXQ6IGFueTtcbiAgICB9XG59XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIEFwcGxlTWFwc1NlcnZpY2Uge1xuICAgIHB1YmxpYyBpc0Jyb3dzZXI6IGJvb2xlYW47XG4gICAgcHVibGljIG1hcHM6IE1hcEtpdC5NYXBbXSA9IFtdO1xuICAgIHB1YmxpYyBtYXBzUXVldWUgPSBbXTtcbiAgICBwdWJsaWMgaW5pdGlhbGl6ZWQgPSAnU1RPUFBFRCc7XG4gICAgcHVibGljIGFubm90YXRpb25zOiB7W3M6IG51bWJlcl06IE1hcEtpdC5Bbm5vdGF0aW9uW119ID0ge307XG4gICAgcHJpdmF0ZSBvcHRpb25zOiBhbnk7XG4gICAgcHVibGljIGxvY2F0aW9uOiBhbnk7XG4gICAgcHVibGljIHJlZ2lvbjogYW55O1xuICAgIHB1YmxpYyBjZW50ZXI6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0KSB7XG4gICAgICAgIHRoaXMuaXNCcm93c2VyID0gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBzZXR0aW5nc0xvYWRlZFRyYW5zZm9ybShzZXR0aW5ncyA9IHt9KSB7XG4gICAgICAgIGNvbnN0IG5ld1NldHRpbmdzID0ge307XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBpbiBzZXR0aW5ncykge1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzW2l0ZW1dKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTZXR0aW5nc1tpdGVtXSA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUoc2V0dGluZ3NbaXRlbV0ubGF0aXR1ZGUsIHNldHRpbmdzW2l0ZW1dLmxvbmdpdHVkZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVnaW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvbkNlbnRlciA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUoc2V0dGluZ3NbaXRlbV0uY2VudGVyLmxhdGl0dWRlLCBzZXR0aW5nc1tpdGVtXS5jZW50ZXIubG9uZ2l0dWRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5nc1tpdGVtXS5zcGFuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uU3BhbiA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVTcGFuKHNldHRpbmdzW2l0ZW1dLnNwYW4uZnJvbSwgc2V0dGluZ3NbaXRlbV0uc3Bhbi50byk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2V0dGluZ3NbaXRlbV0gPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlUmVnaW9uKHJlZ2lvbkNlbnRlciwgcmVnaW9uU3Bhbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTZXR0aW5nc1tpdGVtXSA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVSZWdpb24ocmVnaW9uQ2VudGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdwYWRkaW5nJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NldHRpbmdzW2l0ZW1dID0gbmV3IHdpbmRvdy5tYXBraXQuUGFkZGluZyhzZXR0aW5nc1tpdGVtXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NldHRpbmdzW2l0ZW1dID0gc2V0dGluZ3NbaXRlbV07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld1NldHRpbmdzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIHVzZSBpbml0aWFsaXplXG4gICAgICovXG4gICAgcHVibGljIGluaXQob3B0aW9uczogTWFwS2l0SW5pdE9wdGlvbnMsIHNldHRpbmdzOiBNYXBDb25zdHJ1Y3Rvck9wdGlvbnMgPSB7fSwgY2IgPSAoZGF0YTogTWFwS2l0TG9hZGVkKSA9PiB7XG4gICAgfSkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbml0aWFsaXplKG9wdGlvbnMsIHNldHRpbmdzLCBjYik7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXRpYWxpemUob3B0aW9uczogTWFwS2l0SW5pdE9wdGlvbnMsIHNldHRpbmdzOiBNYXBDb25zdHJ1Y3Rvck9wdGlvbnMgPSB7fSwgY2IgPSAoZGF0YTogTWFwS2l0TG9hZGVkKSA9PiB7XG4gICAgfSkge1xuICAgICAgICBpZiAoIW9wdGlvbnMuSldUIHx8ICF0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhzZXR0aW5ncykubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm1hcHNRdWV1ZS5wdXNoKHtzZXR0aW5ncywgY2J9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCA9PT0gJ1NUT1BQRUQnKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gJ1BFTkRJTkcnO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICAgIHdpbmRvdy5tYXBraXQuaW5pdCh7XG4gICAgICAgICAgICAgICAgYXV0aG9yaXphdGlvbkNhbGxiYWNrOiAoZG9uZTogKHRva2VuOiBzdHJpbmcpID0+IHZvaWQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZG9uZShvcHRpb25zLkpXVCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsYW5ndWFnZTogb3B0aW9ucy5sYW5ndWFnZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmFkZE1hcEluaXRPcHRpb25zTGlzdGVuZXJzKG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkID09PSAnRklOSVNIRUQnKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1hcHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlTWFwcygpIHtcbiAgICAgICAgY29uc3QgbWFwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ25neC1hcHBsZS1tYXBraXQnKTtcbiAgICAgICAgbWFwcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWFwQ29udGFpbmVyID0gZWxlbWVudC5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAoIW1hcENvbnRhaW5lci5pbm5lckhUTUwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU1hcChtYXBDb250YWluZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlTWFwKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm1hcHNRdWV1ZS5zaGlmdCgpO1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMubWFwcy5wdXNoKG5ldyB3aW5kb3cubWFwa2l0Lk1hcChlbGVtZW50LCBBcHBsZU1hcHNTZXJ2aWNlLnNldHRpbmdzTG9hZGVkVHJhbnNmb3JtKG9wdGlvbnMuc2V0dGluZ3MpKSk7XG4gICAgICAgIGNvbnN0IG9iamVjdDogTWFwS2l0TG9hZGVkID0ge1xuICAgICAgICAgICAga2V5OiBpbmRleCAtIDEsXG4gICAgICAgICAgICBtYXA6IHRoaXMubWFwc1tpbmRleCAtIDFdLFxuICAgICAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcjogKHR5cGUsIGxpc3RlbmVyLCBjb250ZXh0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0eXBlIHx8ICFsaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1R5cGUgYW5kIGxpc3RlbmVyIGFyZSByZXF1aXJlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCA8YW55Pmxpc3RlbmVyLCBjb250ZXh0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc1JvdGF0aW9uQXZhaWxhYmxlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLmlzUm90YXRpb25BdmFpbGFibGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNSb3RhdGlvbkVuYWJsZWQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uaXNSb3RhdGlvbkVuYWJsZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNTY3JvbGxFbmFibGVkOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLmlzU2Nyb2xsRW5hYmxlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc1pvb21FbmFibGVkOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLmlzWm9vbUVuYWJsZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0Q2VudGVyOiAoKTogQ29vcmRpbmF0ZXNJbnRlcmZhY2UgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtsYXRpdHVkZSwgbG9uZ2l0dWRlfSA9IHRoaXMubWFwc1tpbmRleCAtIDFdLmNlbnRlcjtcbiAgICAgICAgICAgICAgICByZXR1cm4ge2xhdGl0dWRlLCBsb25naXR1ZGV9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHNldENlbnRlcjogKGxhdGl0dWRlOiBudW1iZXIsIGxvbmdpdHVkZTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAvLyAgIHRoaXMubWFwc1tpbmRleCAtIDFdLmNlbnRlciA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUobGF0aXR1ZGUsIGxvbmdpdHVkZSk7XG4gICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAgc2V0Q2VudGVyQW5pbWF0ZWQ6IChsYXRpdHVkZTogbnVtYmVyLCBsb25naXR1ZGU6IG51bWJlciwgYW5pbWF0ZTogYm9vbGVhbiA9IHRydWUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zZXRDZW50ZXJBbmltYXRlZChuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlKGxhdGl0dWRlLCBsb25naXR1ZGUpLCBhbmltYXRlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRSZWdpb246ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0ucmVnaW9uO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFJlZ2lvbkFuaW1hdGVkOiAoY2VudGVyOiBDb29yZGluYXRlc0ludGVyZmFjZSwgc3BhbjogU3BhbkludGVyZmFjZSA9IG51bGwsIGFuaW1hdGU6IGJvb2xlYW4gPSB0cnVlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uQ2VudGVyID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZShjZW50ZXIubGF0aXR1ZGUsIGNlbnRlci5sb25naXR1ZGUpO1xuICAgICAgICAgICAgICAgIGlmIChzcGFuKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvblNwYW4gPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlU3BhbihzcGFuLmZyb20sIHNwYW4udG8pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zZXRSZWdpb25BbmltYXRlZChuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlUmVnaW9uKHJlZ2lvbkNlbnRlciwgcmVnaW9uU3BhbiksIGFuaW1hdGUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNldFJlZ2lvbkFuaW1hdGVkKG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVSZWdpb24ocmVnaW9uQ2VudGVyKSwgYW5pbWF0ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0Um90YXRpb246ICgpOiBudW1iZXIgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5yb3RhdGlvbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRSb3RhdGlvbkFuaW1hdGVkOiAoZGVncmVlczogbnVtYmVyLCBhbmltYXRlOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNldFJvdGF0aW9uQW5pbWF0ZWQoZGVncmVlcywgYW5pbWF0ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gZ2V0VmlzaWJsZU1hcFJlY3Q6ICgpID0+IHtcbiAgICAgICAgICAgIC8vICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnZpc2libGVNYXBzUmVjdDtcbiAgICAgICAgICAgIC8vIH0sICAgICAgLy8gc2V0VmlzaWJsZU1hcFJlY3RBbmltYXRlZDogKCkgPT4ge1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgZ2V0Q2FtZXJhRGlzdGFuY2U6ICgpOiBudW1iZXIgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5jYW1lcmFEaXN0YW5jZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRDYW1lcmFEaXN0YW5jZUFuaW1hdGVkOiAoZGlzdGFuY2U6IG51bWJlciwgYW5pbWF0ZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zZXRDYW1lcmFEaXN0YW5jZUFuaW1hdGVkKGRpc3RhbmNlLCBhbmltYXRlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRDYW1lcmFab29tUmFuZ2U6ICgpOiBNYXBLaXRHZXRDYW1lcmFab29tUmFuZ2UgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHttaW5DYW1lcmFEaXN0YW5jZSwgbWF4Q2FtZXJhRGlzdGFuY2V9ID0gdGhpcy5tYXBzW2luZGV4IC0gMV0uY2FtZXJhWm9vbVJhbmdlO1xuICAgICAgICAgICAgICAgIHJldHVybiB7bWluQ2FtZXJhRGlzdGFuY2UsIG1heENhbWVyYURpc3RhbmNlfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRDYW1lcmFab29tUmFuZ2VBbmltYXRlZDogKG1pbkNhbWVyYURpc3RhbmNlLCBtYXhDYW1lcmFEaXN0YW5jZSwgYW5pbWF0ZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zZXRDYW1lcmFab29tUmFuZ2VBbmltYXRlZChuZXcgd2luZG93Lm1hcGtpdC5DYW1lcmFab29tUmFuZ2UobWluQ2FtZXJhRGlzdGFuY2UsIG1heENhbWVyYURpc3RhbmNlKSwgYW5pbWF0ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0Q29sb3JTY2hlbWU6ICgpOiBzdHJpbmcgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5jb2xvclNjaGVtZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRDb2xvclNjaGVtZTogKHNjaGVtZTogU2NoZW1lU3RyaW5nID0gJ2xpZ2h0JykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLmNvbG9yU2NoZW1lID0gc2NoZW1lO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldERpc3RhbmNlczogKCk6IERpc3RhbmNlc1N0cmluZyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxhbnk+dGhpcy5tYXBzW2luZGV4IC0gMV0uZGlzdGFuY2VzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldERpc3RhbmNlczogKGRpc3RhbmNlOiBEaXN0YW5jZXNTdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5kaXN0YW5jZXMgPSBkaXN0YW5jZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRNYXBUeXBlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxhbnk+dGhpcy5tYXBzW2luZGV4IC0gMV0ubWFwVHlwZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRNYXBUeXBlOiAodHlwZTogTWFwVHlwZVN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLm1hcFR5cGUgPSB0eXBlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFBhZGRpbmc6ICgpOiBvYmplY3QgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5wYWRkaW5nO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFBhZGRpbmc6IChwYWRkaW5nOiBQYWRkaW5nSW50ZXJmYWNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0ucGFkZGluZyA9IG5ldyB3aW5kb3cubWFwa2l0LlBhZGRpbmcocGFkZGluZyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0U2hvd3NNYXBUeXBlQ29udHJvbDogKCk6IGJvb2xlYW4gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c01hcFR5cGVDb250cm9sO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFNob3dzTWFwVHlwZUNvbnRyb2w6ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzTWFwVHlwZUNvbnRyb2wgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRTaG93c1pvb21Db250cm9sOiAoKTogYm9vbGVhbiA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzWm9vbUNvbnRyb2w7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0U2hvd3Nab29tQ29udHJvbDogKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3Nab29tQ29udHJvbCA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFNob3dzVXNlckxvY2F0aW9uQ29udHJvbDogKCk6IGJvb2xlYW4gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1VzZXJMb2NhdGlvbkNvbnRyb2w7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0U2hvd3NVc2VyTG9jYXRpb25Db250cm9sOiAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1VzZXJMb2NhdGlvbkNvbnRyb2wgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRTaG93c1BvaW50c09mSW50ZXJlc3Q6ICgpOiBib29sZWFuID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NQb2ludHNPZkludGVyZXN0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFNob3dzUG9pbnRzT2ZJbnRlcmVzdDogKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NQb2ludHNPZkludGVyZXN0ID0gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0U2hvd3NTY2FsZTogKCk6IFNob3dzU2NhbGVTdHJpbmcgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiA8YW55PnRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzU2NhbGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0U2hvd3NTY2FsZTogKHZhbHVlOiBTaG93c1NjYWxlU3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NTY2FsZSA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFRpbnRDb2xvcjogKCk6IHN0cmluZyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnRpbnRDb2xvcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRUaW50Q29sb3I6IChjb2xvcjogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0udGludENvbG9yID0gY29sb3I7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2hvd0l0ZW1zOiAoaXRlbXMsIG1hcFNob3dJdGVtT3B0aW9uczogTWFwU2hvd0l0ZW1PcHRpb25zSW50ZXJmYWNlID0ge30pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXNzaW5nT3B0aW9ucyA9IHthbmltYXRlOiBvcHRpb25zLmFuaW1hdGUgfHwgdHJ1ZX07XG4gICAgICAgICAgICAgICAgaWYgKG1hcFNob3dJdGVtT3B0aW9ucy5zcGFuKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgcGFzc2luZ09wdGlvbnMubWluaW11bVNwYW4gPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlU3BhbihtYXBTaG93SXRlbU9wdGlvbnMuc3Bhbi5mcm9tLCBtYXBTaG93SXRlbU9wdGlvbnMuc3Bhbi50byk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChtYXBTaG93SXRlbU9wdGlvbnMucGFkZGluZykge1xuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIHBhc3NpbmdPcHRpb25zLnBhZGRpbmcgPSBuZXcgd2luZG93Lm1hcGtpdC5QYWRkaW5nKG1hcFNob3dJdGVtT3B0aW9ucy5wYWRkaW5nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcGFzc2luZ0l0ZW1zID0gQXJyYXkuaXNBcnJheShpdGVtcykgPyBpdGVtcyA6IFtpdGVtc107XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd0l0ZW1zKHBhc3NpbmdJdGVtcywgcGFzc2luZ09wdGlvbnMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldEFubm90YXRpb25zOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbm5vdGF0aW9uc1tpbmRleCAtIDFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuYW5ub3RhdGlvbnNbaW5kZXggLSAxXSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbm5vdGF0aW9uc1tpbmRleCAtIDFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5hbm5vdGF0aW9uc1tpbmRleCAtIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHRoaXMuYW5ub3RhdGlvbnNbaW5kZXggLSAxXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRTZWxlY3RlZEFubm90YXRpb25zOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnNlbGVjdGVkQW5ub3RhdGlvbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgc2hvd3NDb21wYXNzKHZhbHVlOiBNYXBLaXRDb21wYXNzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NDb21wYXNzID0gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0IHNob3dzQ29tcGFzcygpOiBNYXBLaXRDb21wYXNzIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NDb21wYXNzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldCBzaG93c01hcFR5cGVDb250cm9sKCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c01hcFR5cGVDb250cm9sO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCBzaG93c01hcFR5cGVDb250cm9sKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NNYXBUeXBlQ29udHJvbCA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldCBzaG93c1pvb21Db250cm9sKCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1pvb21Db250cm9sO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCBzaG93c1pvb21Db250cm9sKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3Nab29tQ29udHJvbCA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldCBzaG93c1VzZXJMb2NhdGlvbkNvbnRyb2woKTogYm9vbGVhbiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzVXNlckxvY2F0aW9uQ29udHJvbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgc2hvd3NVc2VyTG9jYXRpb25Db250cm9sKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NVc2VyTG9jYXRpb25Db250cm9sID0gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0IHNob3dzUG9pbnRzT2ZJbnRlcmVzdCgpOiBib29sZWFuIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NQb2ludHNPZkludGVyZXN0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCBzaG93c1BvaW50c09mSW50ZXJlc3QodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1BvaW50c09mSW50ZXJlc3QgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQgdGludENvbG9yKCk6IHN0cmluZyB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnRpbnRDb2xvcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgdGludENvbG9yKGNvbG9yOiBzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS50aW50Q29sb3IgPSBjb2xvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgb3B0aW9ucy5jYihvYmplY3QpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkTWFwSW5pdE9wdGlvbnNMaXN0ZW5lcnMob3B0aW9ucykge1xuICAgICAgICB3aW5kb3cubWFwa2l0LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbmZpZ3VyYXRpb24tY2hhbmdlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5jYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuY2FsbGJhY2soZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoIChldmVudC5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdJbml0aWFsaXplZCc6XG4gICAgICAgICAgICAgICAgICAgIC8vIE1hcEtpdCBKUyBpbml0aWFsaXplZCBhbmQgY29uZmlndXJlZC5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9ICdGSU5JU0hFRCc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTWFwcygpO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmNyZWF0ZU1hcChzZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1JlZnJlc2hlZCc6XG4gICAgICAgICAgICAgICAgICAgIC8vIE1hcEtpdCBKUyBjb25maWd1cmF0aW9uIHVwZGF0ZWQuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgd2luZG93Lm1hcGtpdC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9ICdTVE9QUEVEJztcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5jYWxsYmFjayhldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRVc2VyTG9jYXRpb24odGltZW91dCA9IDUwMDApIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb24gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSwge3RpbWVvdXR9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9wdGlvbnNDaGFuZ2VkKGNoYW5nZXMpIHtcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoSXRlbSgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0ucHJldmlvdXNWYWx1ZSAhPT0gaXRlbS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGl0ZW0ua2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2xhbmd1YWdlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5tYXBraXQubGFuZ3VhZ2UgPSBpdGVtLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdKV1QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXR0aW5nc0NoYW5nZWQoY2hhbmdlczogYW55LCBrZXk6IGFueSkge1xuICAgICAgICBpZiAoa2V5ID49IDApIHtcbiAgICAgICAgICAgIGNoYW5nZXMuZm9yRWFjaEl0ZW0oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5wcmV2aW91c1ZhbHVlICE9PSBpdGVtLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGl0ZW0ua2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjb2xvclNjaGVtZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBzW2tleV1baXRlbS5rZXldID0gaXRlbS5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwc1trZXldLnNldENlbnRlckFuaW1hdGVkKG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUoaXRlbS5jdXJyZW50VmFsdWUubGF0aXR1ZGUsIGl0ZW0uY3VycmVudFZhbHVlLmxvbmdpdHVkZSksIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVnaW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uQ2VudGVyID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZShpdGVtLmN1cnJlbnRWYWx1ZS5jZW50ZXIubGF0aXR1ZGUsIGl0ZW0uY3VycmVudFZhbHVlLmNlbnRlci5sb25naXR1ZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmN1cnJlbnRWYWx1ZS5zcGFuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvblNwYW4gPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlU3BhbihpdGVtLmN1cnJlbnRWYWx1ZS5zcGFuLmZyb20sIGl0ZW0uY3VycmVudFZhbHVlLnNwYW4udG8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHNba2V5XS5zZXRSZWdpb25BbmltYXRlZChuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlUmVnaW9uKHJlZ2lvbkNlbnRlciwgcmVnaW9uU3BhbikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBzW2tleV0uc2V0UmVnaW9uQW5pbWF0ZWQobmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZVJlZ2lvbihyZWdpb25DZW50ZXIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3BhZGRpbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwc1trZXldID0gbmV3IHdpbmRvdy5tYXBraXQuUGFkZGluZyhpdGVtLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwc1trZXldW2l0ZW0ua2V5XSA9IGl0ZW0uY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0QW5ub3RhdGlvbihhbm5vdGF0aW9uOiBhbnksIGtleTogYW55KSB7XG4gICAgICAgIGlmICghdGhpcy5hbm5vdGF0aW9uc1trZXldKSB7XG4gICAgICAgICAgICB0aGlzLmFubm90YXRpb25zW2tleV0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuYW5ub3RhdGlvbnNba2V5XS5pbmNsdWRlcyhhbm5vdGF0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5hbm5vdGF0aW9uc1trZXldLnB1c2goYW5ub3RhdGlvbik7XG4gICAgICAgICAgICB0aGlzLm1hcHNba2V5XS5hZGRBbm5vdGF0aW9uKGFubm90YXRpb24pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4iXX0=
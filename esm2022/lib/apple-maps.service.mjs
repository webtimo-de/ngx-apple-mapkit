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
    init(options, settings = {}, cb = (data) => {
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
            },
            get zoom() {
                return this.maps[index - 1]?._impl?.zoomLevel;
            },
            set zoom(zoomLevel) {
                if (this.maps[index - 1]?._impl?.zoomLevel) {
                    this.maps[index - 1]._impl.zoomLevel = zoomLevel;
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGUtbWFwcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFwcGxlLW1hcGtpdC9zcmMvbGliL2FwcGxlLW1hcHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0saUJBQWlCLENBQUM7O0FBeUJsRCxNQUFNLE9BQU8sZ0JBQWdCO0lBV3pCLFlBQXlDLFVBQWtCO1FBQWxCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFUcEQsU0FBSSxHQUFpQixFQUFFLENBQUM7UUFDeEIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLGdCQUFXLEdBQUcsU0FBUyxDQUFDO1FBQ3hCLGdCQUFXLEdBQXVDLEVBQUUsQ0FBQztRQU94RCxJQUFJLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRU8sTUFBTSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsR0FBRyxFQUFFO1FBQ2hELE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN2QixLQUFLLE1BQU0sSUFBSSxJQUFJLFFBQVEsRUFBRTtZQUN6QixJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDaEIsUUFBUSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxRQUFRO3dCQUNULFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUNwRyxNQUFNO29CQUNWLEtBQUssUUFBUTt3QkFDVCxNQUFNLFlBQVksR0FBRyxJQUFJLE1B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QUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7NEJBQzdDLE1BQU07cUJBQ2I7aUJBQ0o7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVNLGFBQWEsQ0FBQyxVQUFlLEVBQUUsR0FBUTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUM5QjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUM3QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM1QztJQUNMLENBQUM7OEdBNVhRLGdCQUFnQixrQkFXTCxXQUFXO2tIQVh0QixnQkFBZ0IsY0FESixNQUFNOzsyRkFDbEIsZ0JBQWdCO2tCQUQ1QixVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7MEJBWWYsTUFBTTsyQkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIFBMQVRGT1JNX0lEfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aXNQbGF0Zm9ybUJyb3dzZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIENvb3JkaW5hdGVzSW50ZXJmYWNlLFxuICAgIERpc3RhbmNlc1N0cmluZyxcbiAgICBNYXBDb25zdHJ1Y3Rvck9wdGlvbnMsXG4gICAgTWFwS2l0Q29tcGFzcyxcbiAgICBNYXBLaXRHZXRDYW1lcmFab29tUmFuZ2UsXG4gICAgTWFwS2l0SW5pdE9wdGlvbnMsXG4gICAgTWFwS2l0TG9hZGVkLFxuICAgIE1hcFNob3dJdGVtT3B0aW9uc0ludGVyZmFjZSxcbiAgICBNYXBUeXBlU3RyaW5nLFxuICAgIFBhZGRpbmdJbnRlcmZhY2UsXG4gICAgU2NoZW1lU3RyaW5nLFxuICAgIFNob3dzU2NhbGVTdHJpbmcsXG4gICAgU3BhbkludGVyZmFjZVxufSBmcm9tIFwiLi9kZWNsYXJhdGlvbnNcIjtcbmltcG9ydCB7bWFwa2l0fSBmcm9tIFwiLi9tYXBraXRcIjtcblxuZGVjbGFyZSBnbG9iYWwge1xuICAgIGludGVyZmFjZSBXaW5kb3cge1xuICAgICAgICBtYXBraXQ6IGFueTtcbiAgICB9XG59XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIEFwcGxlTWFwc1NlcnZpY2Uge1xuICAgIHB1YmxpYyBpc0Jyb3dzZXI6IGJvb2xlYW47XG4gICAgcHVibGljIG1hcHM6IG1hcGtpdC5NYXBbXSA9IFtdO1xuICAgIHB1YmxpYyBtYXBzUXVldWUgPSBbXTtcbiAgICBwdWJsaWMgaW5pdGlhbGl6ZWQgPSAnU1RPUFBFRCc7XG4gICAgcHVibGljIGFubm90YXRpb25zOiB7W3M6IG51bWJlcl06IG1hcGtpdC5Bbm5vdGF0aW9uW119ID0ge307XG4gICAgcHJpdmF0ZSBvcHRpb25zOiBhbnk7XG4gICAgcHVibGljIGxvY2F0aW9uOiBhbnk7XG4gICAgcHVibGljIHJlZ2lvbjogYW55O1xuICAgIHB1YmxpYyBjZW50ZXI6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0KSB7XG4gICAgICAgIHRoaXMuaXNCcm93c2VyID0gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBzZXR0aW5nc0xvYWRlZFRyYW5zZm9ybShzZXR0aW5ncyA9IHt9KSB7XG4gICAgICAgIGNvbnN0IG5ld1NldHRpbmdzID0ge307XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBpbiBzZXR0aW5ncykge1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzW2l0ZW1dKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTZXR0aW5nc1tpdGVtXSA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUoc2V0dGluZ3NbaXRlbV0ubGF0aXR1ZGUsIHNldHRpbmdzW2l0ZW1dLmxvbmdpdHVkZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVnaW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvbkNlbnRlciA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUoc2V0dGluZ3NbaXRlbV0uY2VudGVyLmxhdGl0dWRlLCBzZXR0aW5nc1tpdGVtXS5jZW50ZXIubG9uZ2l0dWRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5nc1tpdGVtXS5zcGFuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uU3BhbiA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVTcGFuKHNldHRpbmdzW2l0ZW1dLnNwYW4uZnJvbSwgc2V0dGluZ3NbaXRlbV0uc3Bhbi50byk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2V0dGluZ3NbaXRlbV0gPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlUmVnaW9uKHJlZ2lvbkNlbnRlciwgcmVnaW9uU3Bhbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTZXR0aW5nc1tpdGVtXSA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVSZWdpb24ocmVnaW9uQ2VudGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdwYWRkaW5nJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NldHRpbmdzW2l0ZW1dID0gbmV3IHdpbmRvdy5tYXBraXQuUGFkZGluZyhzZXR0aW5nc1tpdGVtXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NldHRpbmdzW2l0ZW1dID0gc2V0dGluZ3NbaXRlbV07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld1NldHRpbmdzO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0KG9wdGlvbnM6IE1hcEtpdEluaXRPcHRpb25zLCBzZXR0aW5nczogTWFwQ29uc3RydWN0b3JPcHRpb25zID0ge30sIGNiID0gKGRhdGE6IE1hcEtpdExvYWRlZCkgPT4ge1xuICAgIH0pIHtcbiAgICAgICAgaWYgKCFvcHRpb25zLkpXVCB8fCAhdGhpcy5pc0Jyb3dzZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoc2V0dGluZ3MpLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5tYXBzUXVldWUucHVzaCh7c2V0dGluZ3MsIGNifSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQgPT09ICdTVE9QUEVEJykge1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9ICdQRU5ESU5HJztcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgICAgICB3aW5kb3cubWFwa2l0LmluaXQoe1xuICAgICAgICAgICAgICAgIGF1dGhvcml6YXRpb25DYWxsYmFjazogKGRvbmU6ICh0b2tlbjogc3RyaW5nKSA9PiB2b2lkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUob3B0aW9ucy5KV1QpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2U6IG9wdGlvbnMubGFuZ3VhZ2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5hZGRNYXBJbml0T3B0aW9uc0xpc3RlbmVycyhvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCA9PT0gJ0ZJTklTSEVEJykge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVNYXBzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZU1hcHMoKSB7XG4gICAgICAgIGNvbnN0IG1hcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCduZ3gtYXBwbGUtbWFwa2l0Jyk7XG4gICAgICAgIG1hcHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1hcENvbnRhaW5lciA9IGVsZW1lbnQuY2hpbGROb2Rlc1swXS5jaGlsZE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgaWYgKCFtYXBDb250YWluZXIuaW5uZXJIVE1MKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVNYXAobWFwQ29udGFpbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZU1hcChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5tYXBzUXVldWUuc2hpZnQoKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLm1hcHMucHVzaChuZXcgd2luZG93Lm1hcGtpdC5NYXAoZWxlbWVudCwgQXBwbGVNYXBzU2VydmljZS5zZXR0aW5nc0xvYWRlZFRyYW5zZm9ybShvcHRpb25zLnNldHRpbmdzKSkpO1xuICAgICAgICBjb25zdCBvYmplY3Q6IE1hcEtpdExvYWRlZCA9IHtcbiAgICAgICAgICAgIGtleTogaW5kZXggLSAxLFxuICAgICAgICAgICAgbWFwOiB0aGlzLm1hcHNbaW5kZXggLSAxXSxcbiAgICAgICAgICAgIGFkZEV2ZW50TGlzdGVuZXI6ICh0eXBlLCBsaXN0ZW5lciwgY29udGV4dCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdHlwZSB8fCAhbGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUeXBlIGFuZCBsaXN0ZW5lciBhcmUgcmVxdWlyZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgPGFueT5saXN0ZW5lciwgY29udGV4dCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNSb3RhdGlvbkF2YWlsYWJsZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5pc1JvdGF0aW9uQXZhaWxhYmxlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzUm90YXRpb25FbmFibGVkOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLmlzUm90YXRpb25FbmFibGVkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzU2Nyb2xsRW5hYmxlZDogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5pc1Njcm9sbEVuYWJsZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNab29tRW5hYmxlZDogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5pc1pvb21FbmFibGVkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldENlbnRlcjogKCk6IENvb3JkaW5hdGVzSW50ZXJmYWNlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7bGF0aXR1ZGUsIGxvbmdpdHVkZX0gPSB0aGlzLm1hcHNbaW5kZXggLSAxXS5jZW50ZXI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtsYXRpdHVkZSwgbG9uZ2l0dWRlfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBzZXRDZW50ZXI6IChsYXRpdHVkZTogbnVtYmVyLCBsb25naXR1ZGU6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgLy8gICB0aGlzLm1hcHNbaW5kZXggLSAxXS5jZW50ZXIgPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlKGxhdGl0dWRlLCBsb25naXR1ZGUpO1xuICAgICAgICAgICAgLy8gfSxcbiAgICAgICAgICAgIHNldENlbnRlckFuaW1hdGVkOiAobGF0aXR1ZGU6IG51bWJlciwgbG9uZ2l0dWRlOiBudW1iZXIsIGFuaW1hdGU6IGJvb2xlYW4gPSB0cnVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2V0Q2VudGVyQW5pbWF0ZWQobmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZShsYXRpdHVkZSwgbG9uZ2l0dWRlKSwgYW5pbWF0ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0UmVnaW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnJlZ2lvbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRSZWdpb25BbmltYXRlZDogKGNlbnRlcjogQ29vcmRpbmF0ZXNJbnRlcmZhY2UsIHNwYW46IFNwYW5JbnRlcmZhY2UgPSBudWxsLCBhbmltYXRlOiBib29sZWFuID0gdHJ1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvbkNlbnRlciA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUoY2VudGVyLmxhdGl0dWRlLCBjZW50ZXIubG9uZ2l0dWRlKTtcbiAgICAgICAgICAgICAgICBpZiAoc3Bhbikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWdpb25TcGFuID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZVNwYW4oc3Bhbi5mcm9tLCBzcGFuLnRvKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2V0UmVnaW9uQW5pbWF0ZWQobmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZVJlZ2lvbihyZWdpb25DZW50ZXIsIHJlZ2lvblNwYW4pLCBhbmltYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zZXRSZWdpb25BbmltYXRlZChuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlUmVnaW9uKHJlZ2lvbkNlbnRlciksIGFuaW1hdGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFJvdGF0aW9uOiAoKTogbnVtYmVyID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0ucm90YXRpb247XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0Um90YXRpb25BbmltYXRlZDogKGRlZ3JlZXM6IG51bWJlciwgYW5pbWF0ZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zZXRSb3RhdGlvbkFuaW1hdGVkKGRlZ3JlZXMsIGFuaW1hdGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIGdldFZpc2libGVNYXBSZWN0OiAoKSA9PiB7XG4gICAgICAgICAgICAvLyAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS52aXNpYmxlTWFwc1JlY3Q7XG4gICAgICAgICAgICAvLyB9LCAgICAgIC8vIHNldFZpc2libGVNYXBSZWN0QW5pbWF0ZWQ6ICgpID0+IHtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIGdldENhbWVyYURpc3RhbmNlOiAoKTogbnVtYmVyID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uY2FtZXJhRGlzdGFuY2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0Q2FtZXJhRGlzdGFuY2VBbmltYXRlZDogKGRpc3RhbmNlOiBudW1iZXIsIGFuaW1hdGU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2V0Q2FtZXJhRGlzdGFuY2VBbmltYXRlZChkaXN0YW5jZSwgYW5pbWF0ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0Q2FtZXJhWm9vbVJhbmdlOiAoKTogTWFwS2l0R2V0Q2FtZXJhWm9vbVJhbmdlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7bWluQ2FtZXJhRGlzdGFuY2UsIG1heENhbWVyYURpc3RhbmNlfSA9IHRoaXMubWFwc1tpbmRleCAtIDFdLmNhbWVyYVpvb21SYW5nZTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge21pbkNhbWVyYURpc3RhbmNlLCBtYXhDYW1lcmFEaXN0YW5jZX07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0Q2FtZXJhWm9vbVJhbmdlQW5pbWF0ZWQ6IChtaW5DYW1lcmFEaXN0YW5jZSwgbWF4Q2FtZXJhRGlzdGFuY2UsIGFuaW1hdGU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2V0Q2FtZXJhWm9vbVJhbmdlQW5pbWF0ZWQobmV3IHdpbmRvdy5tYXBraXQuQ2FtZXJhWm9vbVJhbmdlKG1pbkNhbWVyYURpc3RhbmNlLCBtYXhDYW1lcmFEaXN0YW5jZSksIGFuaW1hdGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldENvbG9yU2NoZW1lOiAoKTogc3RyaW5nID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uY29sb3JTY2hlbWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0Q29sb3JTY2hlbWU6IChzY2hlbWU6IFNjaGVtZVN0cmluZyA9ICdsaWdodCcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5jb2xvclNjaGVtZSA9IHNjaGVtZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXREaXN0YW5jZXM6ICgpOiBEaXN0YW5jZXNTdHJpbmcgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiA8YW55PnRoaXMubWFwc1tpbmRleCAtIDFdLmRpc3RhbmNlcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXREaXN0YW5jZXM6IChkaXN0YW5jZTogRGlzdGFuY2VzU3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uZGlzdGFuY2VzID0gZGlzdGFuY2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0TWFwVHlwZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiA8YW55PnRoaXMubWFwc1tpbmRleCAtIDFdLm1hcFR5cGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0TWFwVHlwZTogKHR5cGU6IE1hcFR5cGVTdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5tYXBUeXBlID0gdHlwZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRQYWRkaW5nOiAoKTogb2JqZWN0ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0ucGFkZGluZztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRQYWRkaW5nOiAocGFkZGluZzogUGFkZGluZ0ludGVyZmFjZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnBhZGRpbmcgPSBuZXcgd2luZG93Lm1hcGtpdC5QYWRkaW5nKHBhZGRpbmcpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFNob3dzTWFwVHlwZUNvbnRyb2w6ICgpOiBib29sZWFuID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NNYXBUeXBlQ29udHJvbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRTaG93c01hcFR5cGVDb250cm9sOiAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c01hcFR5cGVDb250cm9sID0gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0U2hvd3Nab29tQ29udHJvbDogKCk6IGJvb2xlYW4gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1pvb21Db250cm9sO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFNob3dzWm9vbUNvbnRyb2w6ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzWm9vbUNvbnRyb2wgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRTaG93c1VzZXJMb2NhdGlvbkNvbnRyb2w6ICgpOiBib29sZWFuID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NVc2VyTG9jYXRpb25Db250cm9sO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFNob3dzVXNlckxvY2F0aW9uQ29udHJvbDogKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NVc2VyTG9jYXRpb25Db250cm9sID0gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0U2hvd3NQb2ludHNPZkludGVyZXN0OiAoKTogYm9vbGVhbiA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzUG9pbnRzT2ZJbnRlcmVzdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRTaG93c1BvaW50c09mSW50ZXJlc3Q6ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzUG9pbnRzT2ZJbnRlcmVzdCA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFNob3dzU2NhbGU6ICgpOiBTaG93c1NjYWxlU3RyaW5nID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gPGFueT50aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1NjYWxlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFNob3dzU2NhbGU6ICh2YWx1ZTogU2hvd3NTY2FsZVN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzU2NhbGUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRUaW50Q29sb3I6ICgpOiBzdHJpbmcgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS50aW50Q29sb3I7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0VGludENvbG9yOiAoY29sb3I6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnRpbnRDb2xvciA9IGNvbG9yO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dJdGVtczogKGl0ZW1zLCBtYXBTaG93SXRlbU9wdGlvbnM6IE1hcFNob3dJdGVtT3B0aW9uc0ludGVyZmFjZSA9IHt9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFzc2luZ09wdGlvbnMgPSB7YW5pbWF0ZTogb3B0aW9ucy5hbmltYXRlIHx8IHRydWV9O1xuICAgICAgICAgICAgICAgIGlmIChtYXBTaG93SXRlbU9wdGlvbnMuc3Bhbikge1xuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIHBhc3NpbmdPcHRpb25zLm1pbmltdW1TcGFuID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZVNwYW4obWFwU2hvd0l0ZW1PcHRpb25zLnNwYW4uZnJvbSwgbWFwU2hvd0l0ZW1PcHRpb25zLnNwYW4udG8pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobWFwU2hvd0l0ZW1PcHRpb25zLnBhZGRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBwYXNzaW5nT3B0aW9ucy5wYWRkaW5nID0gbmV3IHdpbmRvdy5tYXBraXQuUGFkZGluZyhtYXBTaG93SXRlbU9wdGlvbnMucGFkZGluZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHBhc3NpbmdJdGVtcyA9IEFycmF5LmlzQXJyYXkoaXRlbXMpID8gaXRlbXMgOiBbaXRlbXNdO1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dJdGVtcyhwYXNzaW5nSXRlbXMsIHBhc3NpbmdPcHRpb25zKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRBbm5vdGF0aW9uczogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5ub3RhdGlvbnNbaW5kZXggLSAxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmFubm90YXRpb25zW2luZGV4IC0gMV0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5ub3RhdGlvbnNbaW5kZXggLSAxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuYW5ub3RhdGlvbnNbaW5kZXggLSAxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIHJldHVybiB0aGlzLmFubm90YXRpb25zW2luZGV4IC0gMV07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0U2VsZWN0ZWRBbm5vdGF0aW9uczogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5zZWxlY3RlZEFubm90YXRpb247XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IHNob3dzQ29tcGFzcyh2YWx1ZTogTWFwS2l0Q29tcGFzcykge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzQ29tcGFzcyA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldCBzaG93c0NvbXBhc3MoKTogTWFwS2l0Q29tcGFzcyB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzQ29tcGFzcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQgc2hvd3NNYXBUeXBlQ29udHJvbCgpOiBib29sZWFuIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NNYXBUeXBlQ29udHJvbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgc2hvd3NNYXBUeXBlQ29udHJvbCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzTWFwVHlwZUNvbnRyb2wgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQgc2hvd3Nab29tQ29udHJvbCgpOiBib29sZWFuIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3Nab29tQ29udHJvbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgc2hvd3Nab29tQ29udHJvbCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzWm9vbUNvbnRyb2wgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQgc2hvd3NVc2VyTG9jYXRpb25Db250cm9sKCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1VzZXJMb2NhdGlvbkNvbnRyb2w7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IHNob3dzVXNlckxvY2F0aW9uQ29udHJvbCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzVXNlckxvY2F0aW9uQ29udHJvbCA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldCBzaG93c1BvaW50c09mSW50ZXJlc3QoKTogYm9vbGVhbiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzUG9pbnRzT2ZJbnRlcmVzdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgc2hvd3NQb2ludHNPZkludGVyZXN0KHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NQb2ludHNPZkludGVyZXN0ID0gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0IHRpbnRDb2xvcigpOiBzdHJpbmcge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS50aW50Q29sb3I7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IHRpbnRDb2xvcihjb2xvcjogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0udGludENvbG9yID0gY29sb3I7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0IHpvb20oKTogbnVtYmVyIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0/Ll9pbXBsPy56b29tTGV2ZWw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IHpvb20oem9vbUxldmVsOiBudW1iZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXBzW2luZGV4IC0gMV0/Ll9pbXBsPy56b29tTGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uX2ltcGwuem9vbUxldmVsID0gem9vbUxldmVsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgb3B0aW9ucy5jYihvYmplY3QpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkTWFwSW5pdE9wdGlvbnNMaXN0ZW5lcnMob3B0aW9ucykge1xuICAgICAgICB3aW5kb3cubWFwa2l0LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbmZpZ3VyYXRpb24tY2hhbmdlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5jYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuY2FsbGJhY2soZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoIChldmVudC5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdJbml0aWFsaXplZCc6XG4gICAgICAgICAgICAgICAgICAgIC8vIE1hcEtpdCBKUyBpbml0aWFsaXplZCBhbmQgY29uZmlndXJlZC5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9ICdGSU5JU0hFRCc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTWFwcygpO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmNyZWF0ZU1hcChzZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1JlZnJlc2hlZCc6XG4gICAgICAgICAgICAgICAgICAgIC8vIE1hcEtpdCBKUyBjb25maWd1cmF0aW9uIHVwZGF0ZWQuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgd2luZG93Lm1hcGtpdC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9ICdTVE9QUEVEJztcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5jYWxsYmFjayhldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRVc2VyTG9jYXRpb24odGltZW91dCA9IDUwMDApIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb24gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSwge3RpbWVvdXR9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9wdGlvbnNDaGFuZ2VkKGNoYW5nZXMpIHtcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoSXRlbSgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0ucHJldmlvdXNWYWx1ZSAhPT0gaXRlbS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGl0ZW0ua2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2xhbmd1YWdlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5tYXBraXQubGFuZ3VhZ2UgPSBpdGVtLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdKV1QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXR0aW5nc0NoYW5nZWQoY2hhbmdlczogYW55LCBrZXk6IGFueSkge1xuICAgICAgICBpZiAoa2V5ID49IDApIHtcbiAgICAgICAgICAgIGNoYW5nZXMuZm9yRWFjaEl0ZW0oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5wcmV2aW91c1ZhbHVlICE9PSBpdGVtLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGl0ZW0ua2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjb2xvclNjaGVtZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBzW2tleV1baXRlbS5rZXldID0gaXRlbS5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwc1trZXldLnNldENlbnRlckFuaW1hdGVkKG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUoaXRlbS5jdXJyZW50VmFsdWUubGF0aXR1ZGUsIGl0ZW0uY3VycmVudFZhbHVlLmxvbmdpdHVkZSksIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVnaW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uQ2VudGVyID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZShpdGVtLmN1cnJlbnRWYWx1ZS5jZW50ZXIubGF0aXR1ZGUsIGl0ZW0uY3VycmVudFZhbHVlLmNlbnRlci5sb25naXR1ZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmN1cnJlbnRWYWx1ZS5zcGFuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvblNwYW4gPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlU3BhbihpdGVtLmN1cnJlbnRWYWx1ZS5zcGFuLmZyb20sIGl0ZW0uY3VycmVudFZhbHVlLnNwYW4udG8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHNba2V5XS5zZXRSZWdpb25BbmltYXRlZChuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlUmVnaW9uKHJlZ2lvbkNlbnRlciwgcmVnaW9uU3BhbikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBzW2tleV0uc2V0UmVnaW9uQW5pbWF0ZWQobmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZVJlZ2lvbihyZWdpb25DZW50ZXIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3BhZGRpbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwc1trZXldID0gbmV3IHdpbmRvdy5tYXBraXQuUGFkZGluZyhpdGVtLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwc1trZXldW2l0ZW0ua2V5XSA9IGl0ZW0uY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0QW5ub3RhdGlvbihhbm5vdGF0aW9uOiBhbnksIGtleTogYW55KSB7XG4gICAgICAgIGlmICghdGhpcy5hbm5vdGF0aW9uc1trZXldKSB7XG4gICAgICAgICAgICB0aGlzLmFubm90YXRpb25zW2tleV0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuYW5ub3RhdGlvbnNba2V5XS5pbmNsdWRlcyhhbm5vdGF0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5hbm5vdGF0aW9uc1trZXldLnB1c2goYW5ub3RhdGlvbik7XG4gICAgICAgICAgICB0aGlzLm1hcHNba2V5XS5hZGRBbm5vdGF0aW9uKGFubm90YXRpb24pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4iXX0=
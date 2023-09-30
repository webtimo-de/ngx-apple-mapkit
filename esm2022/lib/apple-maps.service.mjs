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
            addEventListener: (type, cb, context) => {
                if (!type || !cb) {
                    throw new Error('Type and listener are required');
                    return;
                }
                return this.maps[index - 1].addEventListener(type, cb, context);
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
            set zoom(value) {
                this.maps[index - 1]._impl.zoomLevel = value;
            },
            get zoom() {
                return this.maps[index - 1]._impl.zoomLevel;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGUtbWFwcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFwcGxlLW1hcGtpdC9zcmMvbGliL2FwcGxlLW1hcHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0saUJBQWlCLENBQUM7O0FBcUJsRCxNQUFNLE9BQU8sZ0JBQWdCO0lBV3pCLFlBQXlDLFVBQWtCO1FBQWxCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFUcEQsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixnQkFBVyxHQUFHLFNBQVMsQ0FBQztRQUN4QixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQU9wQixJQUFJLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRU8sTUFBTSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsR0FBRyxFQUFFO1FBQ2hELE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN2QixLQUFLLE1BQU0sSUFBSSxJQUFJLFFBQVEsRUFBRTtZQUN6QixJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDaEIsUUFBUSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxRQUFRO3dCQUNULFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUNwRyxNQUFNO29CQUNWLEtBQUssUUFBUTt3QkFDVCxNQUFNLFlBQVksR0FBRyxJQUFJLE1BQU0s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LFlBQVksQ0FBQzs0QkFDN0MsTUFBTTtxQkFDYjtpQkFDSjtZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRU0sYUFBYSxDQUFDLFVBQWUsRUFBRSxHQUFRO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzdDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzVDO0lBQ0wsQ0FBQzs4R0E3WFEsZ0JBQWdCLGtCQVdMLFdBQVc7a0hBWHRCLGdCQUFnQixjQURKLE1BQU07OzJGQUNsQixnQkFBZ0I7a0JBRDVCLFVBQVU7bUJBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzswQkFZZixNQUFNOzJCQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgUExBVEZPUk1fSUR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtpc1BsYXRmb3JtQnJvd3Nlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gICAgQ29vcmRpbmF0ZXNJbnRlcmZhY2UsXG4gICAgRGlzdGFuY2VzU3RyaW5nLFxuICAgIE1hcEtpdEluaXRPcHRpb25zLFxuICAgIE1hcFNob3dJdGVtT3B0aW9uc0ludGVyZmFjZSxcbiAgICBNYXBUeXBlU3RyaW5nLFxuICAgIFBhZGRpbmdJbnRlcmZhY2UsXG4gICAgU2NoZW1lU3RyaW5nLFxuICAgIFNob3dzU2NhbGVTdHJpbmcsXG4gICAgU3BhbkludGVyZmFjZVxufSBmcm9tIFwiLi9kZWNsYXJhdGlvbnNcIjtcblxuXG5kZWNsYXJlIGdsb2JhbCB7XG4gICAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgICAgIG1hcGtpdDogYW55O1xuICAgIH1cbn1cblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgQXBwbGVNYXBzU2VydmljZSB7XG4gICAgcHVibGljIGlzQnJvd3NlcjogYm9vbGVhbjtcbiAgICBwdWJsaWMgbWFwcyA9IFtdO1xuICAgIHB1YmxpYyBtYXBzUXVldWUgPSBbXTtcbiAgICBwdWJsaWMgaW5pdGlhbGl6ZWQgPSAnU1RPUFBFRCc7XG4gICAgcHVibGljIGFubm90YXRpb25zID0ge307XG4gICAgcHJpdmF0ZSBvcHRpb25zOiBhbnk7XG4gICAgcHVibGljIGxvY2F0aW9uOiBhbnk7XG4gICAgcHVibGljIHJlZ2lvbjogYW55O1xuICAgIHB1YmxpYyBjZW50ZXI6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0KSB7XG4gICAgICAgIHRoaXMuaXNCcm93c2VyID0gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBzZXR0aW5nc0xvYWRlZFRyYW5zZm9ybShzZXR0aW5ncyA9IHt9KSB7XG4gICAgICAgIGNvbnN0IG5ld1NldHRpbmdzID0ge307XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBpbiBzZXR0aW5ncykge1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzW2l0ZW1dKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTZXR0aW5nc1tpdGVtXSA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUoc2V0dGluZ3NbaXRlbV0ubGF0aXR1ZGUsIHNldHRpbmdzW2l0ZW1dLmxvbmdpdHVkZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVnaW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvbkNlbnRlciA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUoc2V0dGluZ3NbaXRlbV0uY2VudGVyLmxhdGl0dWRlLCBzZXR0aW5nc1tpdGVtXS5jZW50ZXIubG9uZ2l0dWRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5nc1tpdGVtXS5zcGFuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uU3BhbiA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVTcGFuKHNldHRpbmdzW2l0ZW1dLnNwYW4uZnJvbSwgc2V0dGluZ3NbaXRlbV0uc3Bhbi50byk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2V0dGluZ3NbaXRlbV0gPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlUmVnaW9uKHJlZ2lvbkNlbnRlciwgcmVnaW9uU3Bhbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTZXR0aW5nc1tpdGVtXSA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVSZWdpb24ocmVnaW9uQ2VudGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdwYWRkaW5nJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NldHRpbmdzW2l0ZW1dID0gbmV3IHdpbmRvdy5tYXBraXQuUGFkZGluZyhzZXR0aW5nc1tpdGVtXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NldHRpbmdzW2l0ZW1dID0gc2V0dGluZ3NbaXRlbV07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld1NldHRpbmdzO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0KG9wdGlvbnM6IE1hcEtpdEluaXRPcHRpb25zLCBzZXR0aW5nczogYW55ID0ge30sIGNiID0gKGRhdGEpID0+IHtcbiAgICB9KSB7XG4gICAgICAgIGlmICghb3B0aW9ucy5KV1QgfHwgIXRoaXMuaXNCcm93c2VyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHNldHRpbmdzKS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIHRoaXMubWFwc1F1ZXVlLnB1c2goe3NldHRpbmdzLCBjYn0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkID09PSAnU1RPUFBFRCcpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSAnUEVORElORyc7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICAgICAgd2luZG93Lm1hcGtpdC5pbml0KHtcbiAgICAgICAgICAgICAgICBhdXRob3JpemF0aW9uQ2FsbGJhY2s6IChkb25lOiAodG9rZW46IHN0cmluZykgPT4gdm9pZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkb25lKG9wdGlvbnMuSldUKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGxhbmd1YWdlOiB0aGlzLm9wdGlvbnMubGFuZ3VhZ2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5hZGRNYXBJbml0T3B0aW9uc0xpc3RlbmVycyhvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCA9PT0gJ0ZJTklTSEVEJykge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVNYXBzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZU1hcHMoKSB7XG4gICAgICAgIGNvbnN0IG1hcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCduZ3gtYXBwbGUtbWFwa2l0Jyk7XG4gICAgICAgIG1hcHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1hcENvbnRhaW5lciA9IGVsZW1lbnQuY2hpbGROb2Rlc1swXS5jaGlsZE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgaWYgKCFtYXBDb250YWluZXIuaW5uZXJIVE1MKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVNYXAobWFwQ29udGFpbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZU1hcChlbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm1hcHNRdWV1ZS5zaGlmdCgpO1xuICAgICAgICAvLyBub2luc3BlY3Rpb24gVHlwZVNjcmlwdFZhbGlkYXRlSlNUeXBlc1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMubWFwcy5wdXNoKG5ldyB3aW5kb3cubWFwa2l0Lk1hcChlbGVtZW50LCBBcHBsZU1hcHNTZXJ2aWNlLnNldHRpbmdzTG9hZGVkVHJhbnNmb3JtKG9wdGlvbnMuc2V0dGluZ3MpKSk7XG4gICAgICAgIGNvbnN0IG9iamVjdCA9IHtcbiAgICAgICAgICAgIGtleTogaW5kZXggLSAxLFxuICAgICAgICAgICAgbWFwOiB0aGlzLm1hcHNbaW5kZXggLSAxXSxcbiAgICAgICAgICAgIGFkZEV2ZW50TGlzdGVuZXI6ICh0eXBlLCBjYiwgY29udGV4dCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdHlwZSB8fCAhY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUeXBlIGFuZCBsaXN0ZW5lciBhcmUgcmVxdWlyZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBjYiwgY29udGV4dCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNSb3RhdGlvbkF2YWlsYWJsZTogKCk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5pc1JvdGF0aW9uQXZhaWxhYmxlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzUm90YXRpb25FbmFibGVkOiAoKTogdm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLmlzUm90YXRpb25FbmFibGVkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzU2Nyb2xsRW5hYmxlZDogKCk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5pc1Njcm9sbEVuYWJsZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNab29tRW5hYmxlZDogKCk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5pc1pvb21FbmFibGVkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldENlbnRlcjogKCk6IG9iamVjdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge2xhdGl0dWRlLCBsb25naXR1ZGV9ID0gdGhpcy5tYXBzW2luZGV4IC0gMV0uY2VudGVyO1xuICAgICAgICAgICAgICAgIHJldHVybiB7bGF0aXR1ZGUsIGxvbmdpdHVkZX07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gc2V0Q2VudGVyOiAobGF0aXR1ZGU6IG51bWJlciwgbG9uZ2l0dWRlOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIC8vICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uY2VudGVyID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZShsYXRpdHVkZSwgbG9uZ2l0dWRlKTtcbiAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICBzZXRDZW50ZXJBbmltYXRlZDogKGxhdGl0dWRlOiBudW1iZXIsIGxvbmdpdHVkZTogbnVtYmVyLCBhbmltYXRlOiBib29sZWFuID0gdHJ1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNldENlbnRlckFuaW1hdGVkKG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUobGF0aXR1ZGUsIGxvbmdpdHVkZSksIGFuaW1hdGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFJlZ2lvbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5yZWdpb247XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0UmVnaW9uQW5pbWF0ZWQ6IChjZW50ZXI6IENvb3JkaW5hdGVzSW50ZXJmYWNlLCBzcGFuOiBTcGFuSW50ZXJmYWNlID0gbnVsbCwgYW5pbWF0ZTogYm9vbGVhbiA9IHRydWUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWdpb25DZW50ZXIgPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlKGNlbnRlci5sYXRpdHVkZSwgY2VudGVyLmxvbmdpdHVkZSk7XG4gICAgICAgICAgICAgICAgaWYgKHNwYW4pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uU3BhbiA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVTcGFuKHNwYW4uZnJvbSwgc3Bhbi50byk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNldFJlZ2lvbkFuaW1hdGVkKG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVSZWdpb24ocmVnaW9uQ2VudGVyLCByZWdpb25TcGFuKSwgYW5pbWF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2V0UmVnaW9uQW5pbWF0ZWQobmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZVJlZ2lvbihyZWdpb25DZW50ZXIpLCBhbmltYXRlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRSb3RhdGlvbjogKCk6IG51bWJlciA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnJvdGF0aW9uO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFJvdGF0aW9uQW5pbWF0ZWQ6IChkZWdyZWVzOiBudW1iZXIsIGFuaW1hdGU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2V0Um90YXRpb25BbmltYXRlZChkZWdyZWVzLCBhbmltYXRlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBnZXRWaXNpYmxlTWFwUmVjdDogKCkgPT4ge1xuICAgICAgICAgICAgLy8gICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0udmlzaWJsZU1hcHNSZWN0O1xuICAgICAgICAgICAgLy8gfSwgICAgICAvLyBzZXRWaXNpYmxlTWFwUmVjdEFuaW1hdGVkOiAoKSA9PiB7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICBnZXRDYW1lcmFEaXN0YW5jZTogKCk6IG51bWJlciA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLmNhbWVyYURpc3RhbmNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldENhbWVyYURpc3RhbmNlQW5pbWF0ZWQ6IChkaXN0YW5jZTogbnVtYmVyLCBhbmltYXRlOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNldENhbWVyYURpc3RhbmNlQW5pbWF0ZWQoZGlzdGFuY2UsIGFuaW1hdGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldENhbWVyYVpvb21SYW5nZTogKCk6IG9iamVjdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge21pbkNhbWVyYURpc3RhbmNlLCBtYXhDYW1lcmFEaXN0YW5jZX0gPSB0aGlzLm1hcHNbaW5kZXggLSAxXS5jYW1lcmFab29tUmFuZ2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHttaW5DYW1lcmFEaXN0YW5jZSwgbWF4Q2FtZXJhRGlzdGFuY2V9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldENhbWVyYVpvb21SYW5nZUFuaW1hdGVkOiAobWluQ2FtZXJhRGlzdGFuY2UsIG1heENhbWVyYURpc3RhbmNlLCBhbmltYXRlOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNldENhbWVyYVpvb21SYW5nZUFuaW1hdGVkKG5ldyB3aW5kb3cubWFwa2l0LkNhbWVyYVpvb21SYW5nZShtaW5DYW1lcmFEaXN0YW5jZSwgbWF4Q2FtZXJhRGlzdGFuY2UpLCBhbmltYXRlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRDb2xvclNjaGVtZTogKCk6IHN0cmluZyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLmNvbG9yU2NoZW1lO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldENvbG9yU2NoZW1lOiAoc2NoZW1lOiBTY2hlbWVTdHJpbmcgPSAnbGlnaHQnKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uY29sb3JTY2hlbWUgPSBzY2hlbWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0RGlzdGFuY2VzOiAoKTogc3RyaW5nID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uZGlzdGFuY2VzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldERpc3RhbmNlczogKGRpc3RhbmNlOiBEaXN0YW5jZXNTdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5kaXN0YW5jZXMgPSBkaXN0YW5jZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRNYXBUeXBlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLm1hcFR5cGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0TWFwVHlwZTogKHR5cGU6IE1hcFR5cGVTdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5tYXBUeXBlID0gdHlwZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRQYWRkaW5nOiAoKTogb2JqZWN0ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0ucGFkZGluZztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRQYWRkaW5nOiAocGFkZGluZzogUGFkZGluZ0ludGVyZmFjZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnBhZGRpbmcgPSBuZXcgd2luZG93Lm1hcGtpdC5QYWRkaW5nKHBhZGRpbmcpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFNob3dzTWFwVHlwZUNvbnRyb2w6ICgpOiBib29sZWFuID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NNYXBUeXBlQ29udHJvbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRTaG93c01hcFR5cGVDb250cm9sOiAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c01hcFR5cGVDb250cm9sID0gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0U2hvd3Nab29tQ29udHJvbDogKCk6IGJvb2xlYW4gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1pvb21Db250cm9sO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFNob3dzWm9vbUNvbnRyb2w6ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzWm9vbUNvbnRyb2wgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRTaG93c1VzZXJMb2NhdGlvbkNvbnRyb2w6ICgpOiBib29sZWFuID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NVc2VyTG9jYXRpb25Db250cm9sO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFNob3dzVXNlckxvY2F0aW9uQ29udHJvbDogKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NVc2VyTG9jYXRpb25Db250cm9sID0gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0U2hvd3NQb2ludHNPZkludGVyZXN0OiAoKTogYm9vbGVhbiA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzUG9pbnRzT2ZJbnRlcmVzdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRTaG93c1BvaW50c09mSW50ZXJlc3Q6ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzUG9pbnRzT2ZJbnRlcmVzdCA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFNob3dzU2NhbGU6ICgpOiBzdHJpbmcgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1NjYWxlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFNob3dzU2NhbGU6ICh2YWx1ZTogU2hvd3NTY2FsZVN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzU2NhbGUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRUaW50Q29sb3I6ICgpOiBzdHJpbmcgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS50aW50Q29sb3I7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0VGludENvbG9yOiAoY29sb3I6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnRpbnRDb2xvciA9IGNvbG9yO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dJdGVtczogKGl0ZW1zLCBtYXBTaG93SXRlbU9wdGlvbnM6IE1hcFNob3dJdGVtT3B0aW9uc0ludGVyZmFjZSA9IHt9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFzc2luZ09wdGlvbnMgPSB7YW5pbWF0ZTogb3B0aW9ucy5hbmltYXRlIHx8IHRydWV9O1xuICAgICAgICAgICAgICAgIGlmIChtYXBTaG93SXRlbU9wdGlvbnMuc3Bhbikge1xuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIHBhc3NpbmdPcHRpb25zLm1pbmltdW1TcGFuID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZVNwYW4obWFwU2hvd0l0ZW1PcHRpb25zLnNwYW4uZnJvbSwgbWFwU2hvd0l0ZW1PcHRpb25zLnNwYW4udG8pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobWFwU2hvd0l0ZW1PcHRpb25zLnBhZGRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBwYXNzaW5nT3B0aW9ucy5wYWRkaW5nID0gbmV3IHdpbmRvdy5tYXBraXQuUGFkZGluZyhtYXBTaG93SXRlbU9wdGlvbnMucGFkZGluZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHBhc3NpbmdJdGVtcyA9IEFycmF5LmlzQXJyYXkoaXRlbXMpID8gaXRlbXMgOiBbaXRlbXNdO1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dJdGVtcyhwYXNzaW5nSXRlbXMsIHBhc3NpbmdPcHRpb25zKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRBbm5vdGF0aW9uczogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5ub3RhdGlvbnNbaW5kZXggLSAxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmFubm90YXRpb25zW2luZGV4IC0gMV0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5ub3RhdGlvbnNbaW5kZXggLSAxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuYW5ub3RhdGlvbnNbaW5kZXggLSAxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIHJldHVybiB0aGlzLmFubm90YXRpb25zW2luZGV4IC0gMV07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0U2VsZWN0ZWRBbm5vdGF0aW9uczogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5zZWxlY3RlZEFubm90YXRpb247XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IHpvb20odmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5faW1wbC56b29tTGV2ZWwgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQgem9vbSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uX2ltcGwuem9vbUxldmVsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCBzaG93c0NvbXBhc3ModmFsdWU6ICdoaWRkZW4nIHwgJ2FkYXB0aXZlJyB8ICd2aXNpYmxlJykge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzQ29tcGFzcyA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldCBzaG93c0NvbXBhc3MoKTogJ2hpZGRlbicgfCAnYWRhcHRpdmUnIHwgJ3Zpc2libGUnIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NDb21wYXNzO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZ2V0IHNob3dzTWFwVHlwZUNvbnRyb2woKTogYm9vbGVhbiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzTWFwVHlwZUNvbnRyb2w7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IHNob3dzTWFwVHlwZUNvbnRyb2wodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c01hcFR5cGVDb250cm9sID0gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0IHNob3dzWm9vbUNvbnRyb2woKTogYm9vbGVhbiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzWm9vbUNvbnRyb2w7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IHNob3dzWm9vbUNvbnRyb2wodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1pvb21Db250cm9sID0gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0IHNob3dzVXNlckxvY2F0aW9uQ29udHJvbCgpOiBib29sZWFuIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NVc2VyTG9jYXRpb25Db250cm9sO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCBzaG93c1VzZXJMb2NhdGlvbkNvbnRyb2wodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1VzZXJMb2NhdGlvbkNvbnRyb2wgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQgc2hvd3NQb2ludHNPZkludGVyZXN0KCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1BvaW50c09mSW50ZXJlc3Q7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IHNob3dzUG9pbnRzT2ZJbnRlcmVzdCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzUG9pbnRzT2ZJbnRlcmVzdCA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldCB0aW50Q29sb3IoKTogc3RyaW5nIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0udGludENvbG9yO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCB0aW50Q29sb3IoY29sb3I6IHN0cmluZykge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnRpbnRDb2xvciA9IGNvbG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBvcHRpb25zLmNiKG9iamVjdCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRNYXBJbml0T3B0aW9uc0xpc3RlbmVycyhvcHRpb25zKSB7XG4gICAgICAgIHdpbmRvdy5tYXBraXQuYWRkRXZlbnRMaXN0ZW5lcignY29uZmlndXJhdGlvbi1jaGFuZ2UnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5jYWxsYmFjayhldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LnN0YXR1cykge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0luaXRpYWxpemVkJzpcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFwS2l0IEpTIGluaXRpYWxpemVkIGFuZCBjb25maWd1cmVkLlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gJ0ZJTklTSEVEJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVNYXBzKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuY3JlYXRlTWFwKHNldHRpbmdzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUmVmcmVzaGVkJzpcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFwS2l0IEpTIGNvbmZpZ3VyYXRpb24gdXBkYXRlZC5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB3aW5kb3cubWFwa2l0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gJ1NUT1BQRUQnO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmNhbGxiYWNrKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFVzZXJMb2NhdGlvbih0aW1lb3V0ID0gNTAwMCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhdGlvbiA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9LCB7dGltZW91dH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb3B0aW9uc0NoYW5nZWQoY2hhbmdlcykge1xuICAgICAgICBjaGFuZ2VzLmZvckVhY2hJdGVtKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5wcmV2aW91c1ZhbHVlICE9PSBpdGVtLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5rZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbGFuZ3VhZ2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Lm1hcGtpdC5sYW5ndWFnZSA9IGl0ZW0uY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0pXVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldHRpbmdzQ2hhbmdlZChjaGFuZ2VzOiBhbnksIGtleTogYW55KSB7XG4gICAgICAgIGlmIChrZXkgPj0gMCkge1xuICAgICAgICAgICAgY2hhbmdlcy5mb3JFYWNoSXRlbSgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLnByZXZpb3VzVmFsdWUgIT09IGl0ZW0uY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5rZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NvbG9yU2NoZW1lJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHNba2V5XVtpdGVtLmtleV0gPSBpdGVtLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBzW2tleV0uc2V0Q2VudGVyQW5pbWF0ZWQobmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZShpdGVtLmN1cnJlbnRWYWx1ZS5sYXRpdHVkZSwgaXRlbS5jdXJyZW50VmFsdWUubG9uZ2l0dWRlKSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZWdpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWdpb25DZW50ZXIgPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlKGl0ZW0uY3VycmVudFZhbHVlLmNlbnRlci5sYXRpdHVkZSwgaXRlbS5jdXJyZW50VmFsdWUuY2VudGVyLmxvbmdpdHVkZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uY3VycmVudFZhbHVlLnNwYW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uU3BhbiA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVTcGFuKGl0ZW0uY3VycmVudFZhbHVlLnNwYW4uZnJvbSwgaXRlbS5jdXJyZW50VmFsdWUuc3Bhbi50byk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwc1trZXldLnNldFJlZ2lvbkFuaW1hdGVkKG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVSZWdpb24ocmVnaW9uQ2VudGVyLCByZWdpb25TcGFuKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHNba2V5XS5zZXRSZWdpb25BbmltYXRlZChuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlUmVnaW9uKHJlZ2lvbkNlbnRlcikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncGFkZGluZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBzW2tleV0gPSBuZXcgd2luZG93Lm1hcGtpdC5QYWRkaW5nKGl0ZW0uY3VycmVudFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBzW2tleV1baXRlbS5rZXldID0gaXRlbS5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRBbm5vdGF0aW9uKGFubm90YXRpb246IGFueSwga2V5OiBhbnkpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFubm90YXRpb25zW2tleV0pIHtcbiAgICAgICAgICAgIHRoaXMuYW5ub3RhdGlvbnNba2V5XSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5hbm5vdGF0aW9uc1trZXldLmluY2x1ZGVzKGFubm90YXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLmFubm90YXRpb25zW2tleV0ucHVzaChhbm5vdGF0aW9uKTtcbiAgICAgICAgICAgIHRoaXMubWFwc1trZXldLmFkZEFubm90YXRpb24oYW5ub3RhdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbiJdfQ==
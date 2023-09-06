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
        const maps = document.querySelectorAll('ngx-apple-maps');
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
            }, set showComass(value) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGUtbWFwcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFwcGxlLW1hcHMvc3JjL2xpYi9hcHBsZS1tYXBzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDOztBQW9CbEQsTUFBTSxPQUFPLGdCQUFnQjtJQVd6QixZQUF5QyxVQUFrQjtRQUFsQixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBVHBELFNBQUksR0FBRyxFQUFFLENBQUM7UUFDVixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2YsZ0JBQVcsR0FBRyxTQUFTLENBQUM7UUFDeEIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFPcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVPLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLEdBQUcsRUFBRTtRQUNoRCxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdkIsS0FBSyxNQUFNLElBQUksSUFBSSxRQUFRLEVBQUU7WUFDekIsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2hCLFFBQVEsSUFBSSxFQUFFO29CQUNWLEtBQUssUUFBUTt3QkFDVCxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDcEcsTUFBTTtvQkFDVixLQUFLLFFBQVE7d0JBQ1QsTUFBTSxZQUFZLEdBQUcsSUFBSSxNQUFNLENB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ZWN0LCBJbmplY3RhYmxlLCBQTEFURk9STV9JRH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2lzUGxhdGZvcm1Ccm93c2VyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgICBDb29yZGluYXRlc0ludGVyZmFjZSxcbiAgICBEaXN0YW5jZXNTdHJpbmcsIE1hcEtpdEluaXRPcHRpb25zLFxuICAgIE1hcFNob3dJdGVtT3B0aW9uc0ludGVyZmFjZSxcbiAgICBNYXBUeXBlU3RyaW5nLFxuICAgIFBhZGRpbmdJbnRlcmZhY2UsXG4gICAgU2NoZW1lU3RyaW5nLFxuICAgIFNob3dzU2NhbGVTdHJpbmcsXG4gICAgU3BhbkludGVyZmFjZVxufSBmcm9tIFwiLi9kZWNsYXJhdGlvbnNcIjtcblxuXG5kZWNsYXJlIGdsb2JhbCB7XG4gICAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgICAgIG1hcGtpdDogYW55O1xuICAgIH1cbn1cblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgQXBwbGVNYXBzU2VydmljZSB7XG4gICAgcHVibGljIGlzQnJvd3NlcjogYm9vbGVhbjtcbiAgICBwdWJsaWMgbWFwcyA9IFtdO1xuICAgIHB1YmxpYyBtYXBzUXVldWUgPSBbXTtcbiAgICBwdWJsaWMgaW5pdGlhbGl6ZWQgPSAnU1RPUFBFRCc7XG4gICAgcHVibGljIGFubm90YXRpb25zID0ge307XG4gICAgcHJpdmF0ZSBvcHRpb25zOiBhbnk7XG4gICAgcHVibGljIGxvY2F0aW9uOiBhbnk7XG4gICAgcHVibGljIHJlZ2lvbjogYW55O1xuICAgIHB1YmxpYyBjZW50ZXI6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0KSB7XG4gICAgICAgIHRoaXMuaXNCcm93c2VyID0gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBzZXR0aW5nc0xvYWRlZFRyYW5zZm9ybShzZXR0aW5ncyA9IHt9KSB7XG4gICAgICAgIGNvbnN0IG5ld1NldHRpbmdzID0ge307XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBpbiBzZXR0aW5ncykge1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzW2l0ZW1dKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTZXR0aW5nc1tpdGVtXSA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUoc2V0dGluZ3NbaXRlbV0ubGF0aXR1ZGUsIHNldHRpbmdzW2l0ZW1dLmxvbmdpdHVkZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVnaW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvbkNlbnRlciA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUoc2V0dGluZ3NbaXRlbV0uY2VudGVyLmxhdGl0dWRlLCBzZXR0aW5nc1tpdGVtXS5jZW50ZXIubG9uZ2l0dWRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5nc1tpdGVtXS5zcGFuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uU3BhbiA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVTcGFuKHNldHRpbmdzW2l0ZW1dLnNwYW4uZnJvbSwgc2V0dGluZ3NbaXRlbV0uc3Bhbi50byk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2V0dGluZ3NbaXRlbV0gPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlUmVnaW9uKHJlZ2lvbkNlbnRlciwgcmVnaW9uU3Bhbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTZXR0aW5nc1tpdGVtXSA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVSZWdpb24ocmVnaW9uQ2VudGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdwYWRkaW5nJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NldHRpbmdzW2l0ZW1dID0gbmV3IHdpbmRvdy5tYXBraXQuUGFkZGluZyhzZXR0aW5nc1tpdGVtXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NldHRpbmdzW2l0ZW1dID0gc2V0dGluZ3NbaXRlbV07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld1NldHRpbmdzO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0KG9wdGlvbnM6IE1hcEtpdEluaXRPcHRpb25zLCBzZXR0aW5nczogYW55ID0ge30sIGNiID0gKGRhdGEpID0+IHt9KSB7XG4gICAgICAgIGlmICghb3B0aW9ucy5KV1QgfHwgIXRoaXMuaXNCcm93c2VyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXBzUXVldWUucHVzaCh7c2V0dGluZ3MsIGNifSk7XG4gICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkID09PSAnU1RPUFBFRCcpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSAnUEVORElORyc7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICAgICAgd2luZG93Lm1hcGtpdC5pbml0KHtcbiAgICAgICAgICAgICAgICBhdXRob3JpemF0aW9uQ2FsbGJhY2s6IChkb25lOiAodG9rZW46IHN0cmluZykgPT4gdm9pZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkb25lKG9wdGlvbnMuSldUKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGxhbmd1YWdlOiB0aGlzLm9wdGlvbnMubGFuZ3VhZ2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5hZGRNYXBJbml0T3B0aW9uc0xpc3RlbmVycyhvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCA9PT0gJ0ZJTklTSEVEJykge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVNYXBzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZU1hcHMoKSB7XG4gICAgICAgIGNvbnN0IG1hcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCduZ3gtYXBwbGUtbWFwcycpO1xuICAgICAgICBtYXBzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBtYXBDb250YWluZXIgPSBlbGVtZW50LmNoaWxkTm9kZXNbMF0uY2hpbGROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgIGlmICghbWFwQ29udGFpbmVyLmlubmVySFRNTCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTWFwKG1hcENvbnRhaW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVNYXAoZWxlbWVudCkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5tYXBzUXVldWUuc2hpZnQoKTtcbiAgICAgICAgLy8gbm9pbnNwZWN0aW9uIFR5cGVTY3JpcHRWYWxpZGF0ZUpTVHlwZXNcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLm1hcHMucHVzaChuZXcgd2luZG93Lm1hcGtpdC5NYXAoZWxlbWVudCwgQXBwbGVNYXBzU2VydmljZS5zZXR0aW5nc0xvYWRlZFRyYW5zZm9ybShvcHRpb25zLnNldHRpbmdzKSkpO1xuICAgICAgICBjb25zdCBvYmplY3QgPSB7XG4gICAgICAgICAgICBrZXk6IGluZGV4IC0gMSxcbiAgICAgICAgICAgIG1hcDogdGhpcy5tYXBzW2luZGV4IC0gMV0sXG4gICAgICAgICAgICBpc1JvdGF0aW9uQXZhaWxhYmxlOiAoKTogdm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLmlzUm90YXRpb25BdmFpbGFibGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNSb3RhdGlvbkVuYWJsZWQ6ICgpOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uaXNSb3RhdGlvbkVuYWJsZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNTY3JvbGxFbmFibGVkOiAoKTogdm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLmlzU2Nyb2xsRW5hYmxlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc1pvb21FbmFibGVkOiAoKTogdm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLmlzWm9vbUVuYWJsZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0Q2VudGVyOiAoKTogb2JqZWN0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7bGF0aXR1ZGUsIGxvbmdpdHVkZX0gPSB0aGlzLm1hcHNbaW5kZXggLSAxXS5jZW50ZXI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtsYXRpdHVkZSwgbG9uZ2l0dWRlfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBzZXRDZW50ZXI6IChsYXRpdHVkZTogbnVtYmVyLCBsb25naXR1ZGU6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgLy8gICB0aGlzLm1hcHNbaW5kZXggLSAxXS5jZW50ZXIgPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlKGxhdGl0dWRlLCBsb25naXR1ZGUpO1xuICAgICAgICAgICAgLy8gfSxcbiAgICAgICAgICAgIHNldENlbnRlckFuaW1hdGVkOiAobGF0aXR1ZGU6IG51bWJlciwgbG9uZ2l0dWRlOiBudW1iZXIsIGFuaW1hdGU6IGJvb2xlYW4gPSB0cnVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2V0Q2VudGVyQW5pbWF0ZWQobmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZShsYXRpdHVkZSwgbG9uZ2l0dWRlKSwgYW5pbWF0ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0UmVnaW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnJlZ2lvbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRSZWdpb25BbmltYXRlZDogKGNlbnRlcjogQ29vcmRpbmF0ZXNJbnRlcmZhY2UsIHNwYW46IFNwYW5JbnRlcmZhY2UgPSBudWxsLCBhbmltYXRlOiBib29sZWFuID0gdHJ1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvbkNlbnRlciA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUoY2VudGVyLmxhdGl0dWRlLCBjZW50ZXIubG9uZ2l0dWRlKTtcbiAgICAgICAgICAgICAgICBpZiAoc3Bhbikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWdpb25TcGFuID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZVNwYW4oc3Bhbi5mcm9tLCBzcGFuLnRvKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2V0UmVnaW9uQW5pbWF0ZWQobmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZVJlZ2lvbihyZWdpb25DZW50ZXIsIHJlZ2lvblNwYW4pLCBhbmltYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zZXRSZWdpb25BbmltYXRlZChuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlUmVnaW9uKHJlZ2lvbkNlbnRlciksIGFuaW1hdGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFJvdGF0aW9uOiAoKTogbnVtYmVyID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0ucm90YXRpb247XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0Um90YXRpb25BbmltYXRlZDogKGRlZ3JlZXM6IG51bWJlciwgYW5pbWF0ZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zZXRSb3RhdGlvbkFuaW1hdGVkKGRlZ3JlZXMsIGFuaW1hdGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIGdldFZpc2libGVNYXBSZWN0OiAoKSA9PiB7XG4gICAgICAgICAgICAvLyAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS52aXNpYmxlTWFwc1JlY3Q7XG4gICAgICAgICAgICAvLyB9LCAgICAgIC8vIHNldFZpc2libGVNYXBSZWN0QW5pbWF0ZWQ6ICgpID0+IHtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIGdldENhbWVyYURpc3RhbmNlOiAoKTogbnVtYmVyID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uY2FtZXJhRGlzdGFuY2U7XG4gICAgICAgICAgICB9LCBzZXRDYW1lcmFEaXN0YW5jZUFuaW1hdGVkOiAoZGlzdGFuY2U6IG51bWJlciwgYW5pbWF0ZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zZXRDYW1lcmFEaXN0YW5jZUFuaW1hdGVkKGRpc3RhbmNlLCBhbmltYXRlKTtcbiAgICAgICAgICAgIH0sIGdldENhbWVyYVpvb21SYW5nZTogKCk6IG9iamVjdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge21pbkNhbWVyYURpc3RhbmNlLCBtYXhDYW1lcmFEaXN0YW5jZX0gPSB0aGlzLm1hcHNbaW5kZXggLSAxXS5jYW1lcmFab29tUmFuZ2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHttaW5DYW1lcmFEaXN0YW5jZSwgbWF4Q2FtZXJhRGlzdGFuY2V9O1xuICAgICAgICAgICAgfSwgc2V0Q2FtZXJhWm9vbVJhbmdlQW5pbWF0ZWQ6IChtaW5DYW1lcmFEaXN0YW5jZSwgbWF4Q2FtZXJhRGlzdGFuY2UsIGFuaW1hdGU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2V0Q2FtZXJhWm9vbVJhbmdlQW5pbWF0ZWQobmV3IHdpbmRvdy5tYXBraXQuQ2FtZXJhWm9vbVJhbmdlKG1pbkNhbWVyYURpc3RhbmNlLCBtYXhDYW1lcmFEaXN0YW5jZSksIGFuaW1hdGUpO1xuICAgICAgICAgICAgfSwgZ2V0Q29sb3JTY2hlbWU6ICgpOiBzdHJpbmcgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5jb2xvclNjaGVtZTtcbiAgICAgICAgICAgIH0sIHNldENvbG9yU2NoZW1lOiAoc2NoZW1lOiBTY2hlbWVTdHJpbmcgPSAnbGlnaHQnKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uY29sb3JTY2hlbWUgPSBzY2hlbWU7XG4gICAgICAgICAgICB9LCBnZXREaXN0YW5jZXM6ICgpOiBzdHJpbmcgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5kaXN0YW5jZXM7XG4gICAgICAgICAgICB9LCBzZXREaXN0YW5jZXM6IChkaXN0YW5jZTogRGlzdGFuY2VzU3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uZGlzdGFuY2VzID0gZGlzdGFuY2U7XG4gICAgICAgICAgICB9LCBnZXRNYXBUeXBlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLm1hcFR5cGU7XG4gICAgICAgICAgICB9LCBzZXRNYXBUeXBlOiAodHlwZTogTWFwVHlwZVN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLm1hcFR5cGUgPSB0eXBlO1xuICAgICAgICAgICAgfSwgZ2V0UGFkZGluZzogKCk6IG9iamVjdCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnBhZGRpbmc7XG4gICAgICAgICAgICB9LCBzZXRQYWRkaW5nOiAocGFkZGluZzogUGFkZGluZ0ludGVyZmFjZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnBhZGRpbmcgPSBuZXcgd2luZG93Lm1hcGtpdC5QYWRkaW5nKHBhZGRpbmcpO1xuICAgICAgICAgICAgfSwgZ2V0U2hvd3NNYXBUeXBlQ29udHJvbDogKCk6IGJvb2xlYW4gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c01hcFR5cGVDb250cm9sO1xuICAgICAgICAgICAgfSwgc2V0U2hvd3NNYXBUeXBlQ29udHJvbDogKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NNYXBUeXBlQ29udHJvbCA9IHZhbHVlO1xuICAgICAgICAgICAgfSwgZ2V0U2hvd3Nab29tQ29udHJvbDogKCk6IGJvb2xlYW4gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1pvb21Db250cm9sO1xuICAgICAgICAgICAgfSwgc2V0U2hvd3Nab29tQ29udHJvbDogKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3Nab29tQ29udHJvbCA9IHZhbHVlO1xuICAgICAgICAgICAgfSwgZ2V0U2hvd3NVc2VyTG9jYXRpb25Db250cm9sOiAoKTogYm9vbGVhbiA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzVXNlckxvY2F0aW9uQ29udHJvbDtcbiAgICAgICAgICAgIH0sIHNldFNob3dzVXNlckxvY2F0aW9uQ29udHJvbDogKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NVc2VyTG9jYXRpb25Db250cm9sID0gdmFsdWU7XG4gICAgICAgICAgICB9LCBnZXRTaG93c1BvaW50c09mSW50ZXJlc3Q6ICgpOiBib29sZWFuID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NQb2ludHNPZkludGVyZXN0O1xuICAgICAgICAgICAgfSwgc2V0U2hvd3NQb2ludHNPZkludGVyZXN0OiAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1BvaW50c09mSW50ZXJlc3QgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sIGdldFNob3dzU2NhbGU6ICgpOiBzdHJpbmcgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1NjYWxlO1xuICAgICAgICAgICAgfSwgc2V0U2hvd3NTY2FsZTogKHZhbHVlOiBTaG93c1NjYWxlU3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NTY2FsZSA9IHZhbHVlO1xuICAgICAgICAgICAgfSwgZ2V0VGludENvbG9yOiAoKTogc3RyaW5nID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0udGludENvbG9yO1xuICAgICAgICAgICAgfSwgc2V0VGludENvbG9yOiAoY29sb3I6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnRpbnRDb2xvciA9IGNvbG9yO1xuICAgICAgICAgICAgfSwgc2hvd0l0ZW1zOiAoaXRlbXMsIG1hcFNob3dJdGVtT3B0aW9uczogTWFwU2hvd0l0ZW1PcHRpb25zSW50ZXJmYWNlID0ge30pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXNzaW5nT3B0aW9ucyA9IHthbmltYXRlOiBvcHRpb25zLmFuaW1hdGUgfHwgdHJ1ZX07XG4gICAgICAgICAgICAgICAgaWYgKG1hcFNob3dJdGVtT3B0aW9ucy5zcGFuKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgcGFzc2luZ09wdGlvbnMubWluaW11bVNwYW4gPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlU3BhbihtYXBTaG93SXRlbU9wdGlvbnMuc3Bhbi5mcm9tLCBtYXBTaG93SXRlbU9wdGlvbnMuc3Bhbi50byk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChtYXBTaG93SXRlbU9wdGlvbnMucGFkZGluZykge1xuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIHBhc3NpbmdPcHRpb25zLnBhZGRpbmcgPSBuZXcgd2luZG93Lm1hcGtpdC5QYWRkaW5nKG1hcFNob3dJdGVtT3B0aW9ucy5wYWRkaW5nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcGFzc2luZ0l0ZW1zID0gQXJyYXkuaXNBcnJheShpdGVtcykgPyBpdGVtcyA6IFtpdGVtc107XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd0l0ZW1zKHBhc3NpbmdJdGVtcywgcGFzc2luZ09wdGlvbnMpO1xuICAgICAgICAgICAgfSwgZ2V0QW5ub3RhdGlvbnM6ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFubm90YXRpb25zW2luZGV4IC0gMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5hbm5vdGF0aW9uc1tpbmRleCAtIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFubm90YXRpb25zW2luZGV4IC0gMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmFubm90YXRpb25zW2luZGV4IC0gMV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gdGhpcy5hbm5vdGF0aW9uc1tpbmRleCAtIDFdO1xuICAgICAgICAgICAgfSwgZ2V0U2VsZWN0ZWRBbm5vdGF0aW9uczogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5zZWxlY3RlZEFubm90YXRpb247XG4gICAgICAgICAgICB9LCBzZXQgem9vbSh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwLl9pbXBsLnpvb21MZXZlbCA9IHZhbHVlO1xuICAgICAgICAgICAgfSwgZ2V0IHpvb20oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwLl9pbXBsLnpvb21MZXZlbDtcbiAgICAgICAgICAgIH0sIHNldCBzaG93Q29tYXNzKHZhbHVlOiAnaGlkZGVuJyB8ICdhZGFwdGl2ZScgfCAndmlzaWJsZScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcC5zaG93c0NvbXBhc3MgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sIGdldCBzaG93Q29tcGFzcygpOiBzdHJpbmcge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNob3dDb21wYXNzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBvcHRpb25zLmNiKG9iamVjdCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRNYXBJbml0T3B0aW9uc0xpc3RlbmVycyhvcHRpb25zKSB7XG4gICAgICAgIHdpbmRvdy5tYXBraXQuYWRkRXZlbnRMaXN0ZW5lcignY29uZmlndXJhdGlvbi1jaGFuZ2UnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5jYWxsYmFjayhldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LnN0YXR1cykge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0luaXRpYWxpemVkJzpcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFwS2l0IEpTIGluaXRpYWxpemVkIGFuZCBjb25maWd1cmVkLlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gJ0ZJTklTSEVEJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVNYXBzKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuY3JlYXRlTWFwKHNldHRpbmdzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUmVmcmVzaGVkJzpcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFwS2l0IEpTIGNvbmZpZ3VyYXRpb24gdXBkYXRlZC5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB3aW5kb3cubWFwa2l0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gJ1NUT1BQRUQnO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmNhbGxiYWNrKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFVzZXJMb2NhdGlvbih0aW1lb3V0ID0gNTAwMCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhdGlvbiA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9LCB7dGltZW91dH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb3B0aW9uc0NoYW5nZWQoY2hhbmdlcykge1xuICAgICAgICBjaGFuZ2VzLmZvckVhY2hJdGVtKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5wcmV2aW91c1ZhbHVlICE9PSBpdGVtLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5rZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbGFuZ3VhZ2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Lm1hcGtpdC5sYW5ndWFnZSA9IGl0ZW0uY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0pXVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldHRpbmdzQ2hhbmdlZChjaGFuZ2VzOiBhbnksIGtleTogYW55KSB7XG4gICAgICAgIGlmIChrZXkgPj0gMCkge1xuICAgICAgICAgICAgY2hhbmdlcy5mb3JFYWNoSXRlbSgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLnByZXZpb3VzVmFsdWUgIT09IGl0ZW0uY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5rZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NvbG9yU2NoZW1lJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHNba2V5XVtpdGVtLmtleV0gPSBpdGVtLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBzW2tleV0uc2V0Q2VudGVyQW5pbWF0ZWQobmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZShpdGVtLmN1cnJlbnRWYWx1ZS5sYXRpdHVkZSwgaXRlbS5jdXJyZW50VmFsdWUubG9uZ2l0dWRlKSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZWdpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWdpb25DZW50ZXIgPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlKGl0ZW0uY3VycmVudFZhbHVlLmNlbnRlci5sYXRpdHVkZSwgaXRlbS5jdXJyZW50VmFsdWUuY2VudGVyLmxvbmdpdHVkZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uY3VycmVudFZhbHVlLnNwYW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uU3BhbiA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVTcGFuKGl0ZW0uY3VycmVudFZhbHVlLnNwYW4uZnJvbSwgaXRlbS5jdXJyZW50VmFsdWUuc3Bhbi50byk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwc1trZXldLnNldFJlZ2lvbkFuaW1hdGVkKG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVSZWdpb24ocmVnaW9uQ2VudGVyLCByZWdpb25TcGFuKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHNba2V5XS5zZXRSZWdpb25BbmltYXRlZChuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlUmVnaW9uKHJlZ2lvbkNlbnRlcikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncGFkZGluZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBzW2tleV0gPSBuZXcgd2luZG93Lm1hcGtpdC5QYWRkaW5nKGl0ZW0uY3VycmVudFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBzW2tleV1baXRlbS5rZXldID0gaXRlbS5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRBbm5vdGF0aW9uKGFubm90YXRpb246IGFueSwga2V5OiBhbnkpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFubm90YXRpb25zW2tleV0pIHtcbiAgICAgICAgICAgIHRoaXMuYW5ub3RhdGlvbnNba2V5XSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5hbm5vdGF0aW9uc1trZXldLmluY2x1ZGVzKGFubm90YXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLmFubm90YXRpb25zW2tleV0ucHVzaChhbm5vdGF0aW9uKTtcbiAgICAgICAgICAgIHRoaXMubWFwc1trZXldLmFkZEFubm90YXRpb24oYW5ub3RhdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbiJdfQ==
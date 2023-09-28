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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGUtbWFwcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFwcGxlLW1hcGtpdC9zcmMvbGliL2FwcGxlLW1hcHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0saUJBQWlCLENBQUM7O0FBcUJsRCxNQUFNLE9BQU8sZ0JBQWdCO0lBV3pCLFlBQXlDLFVBQWtCO1FBQWxCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFUcEQsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixnQkFBVyxHQUFHLFNBQVMsQ0FBQztRQUN4QixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQU9wQixJQUFJLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRU8sTUFBTSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsR0FBRyxFQUFFO1FBQ2hELE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN2QixLQUFLLE1BQU0sSUFBSSxJQUFJLFFBQVEsRUFBRTtZQUN6QixJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDaEIsUUFBUSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxRQUFRO3dCQUNULFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUNwRyxNQUFNO29CQUNWLEtBQUssUUFBUTt3QkFDVCxNQUFNLFlBQVksR0FBRyxJQUFJLE1BQU0s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QUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUM3QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM1QztJQUNMLENBQUM7OEdBaFVRLGdCQUFnQixrQkFXTCxXQUFXO2tIQVh0QixnQkFBZ0IsY0FESixNQUFNOzsyRkFDbEIsZ0JBQWdCO2tCQUQ1QixVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7MEJBWWYsTUFBTTsyQkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIFBMQVRGT1JNX0lEfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aXNQbGF0Zm9ybUJyb3dzZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIENvb3JkaW5hdGVzSW50ZXJmYWNlLFxuICAgIERpc3RhbmNlc1N0cmluZyxcbiAgICBNYXBLaXRJbml0T3B0aW9ucyxcbiAgICBNYXBTaG93SXRlbU9wdGlvbnNJbnRlcmZhY2UsXG4gICAgTWFwVHlwZVN0cmluZyxcbiAgICBQYWRkaW5nSW50ZXJmYWNlLFxuICAgIFNjaGVtZVN0cmluZyxcbiAgICBTaG93c1NjYWxlU3RyaW5nLFxuICAgIFNwYW5JbnRlcmZhY2Vcbn0gZnJvbSBcIi4vZGVjbGFyYXRpb25zXCI7XG5cblxuZGVjbGFyZSBnbG9iYWwge1xuICAgIGludGVyZmFjZSBXaW5kb3cge1xuICAgICAgICBtYXBraXQ6IGFueTtcbiAgICB9XG59XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIEFwcGxlTWFwc1NlcnZpY2Uge1xuICAgIHB1YmxpYyBpc0Jyb3dzZXI6IGJvb2xlYW47XG4gICAgcHVibGljIG1hcHMgPSBbXTtcbiAgICBwdWJsaWMgbWFwc1F1ZXVlID0gW107XG4gICAgcHVibGljIGluaXRpYWxpemVkID0gJ1NUT1BQRUQnO1xuICAgIHB1YmxpYyBhbm5vdGF0aW9ucyA9IHt9O1xuICAgIHByaXZhdGUgb3B0aW9uczogYW55O1xuICAgIHB1YmxpYyBsb2NhdGlvbjogYW55O1xuICAgIHB1YmxpYyByZWdpb246IGFueTtcbiAgICBwdWJsaWMgY2VudGVyOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCkge1xuICAgICAgICB0aGlzLmlzQnJvd3NlciA9IGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgc2V0dGluZ3NMb2FkZWRUcmFuc2Zvcm0oc2V0dGluZ3MgPSB7fSkge1xuICAgICAgICBjb25zdCBuZXdTZXR0aW5ncyA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gaW4gc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIGlmIChzZXR0aW5nc1tpdGVtXSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2V0dGluZ3NbaXRlbV0gPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlKHNldHRpbmdzW2l0ZW1dLmxhdGl0dWRlLCBzZXR0aW5nc1tpdGVtXS5sb25naXR1ZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlZ2lvbic6XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWdpb25DZW50ZXIgPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlKHNldHRpbmdzW2l0ZW1dLmNlbnRlci5sYXRpdHVkZSwgc2V0dGluZ3NbaXRlbV0uY2VudGVyLmxvbmdpdHVkZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3NbaXRlbV0uc3Bhbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvblNwYW4gPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlU3BhbihzZXR0aW5nc1tpdGVtXS5zcGFuLmZyb20sIHNldHRpbmdzW2l0ZW1dLnNwYW4udG8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NldHRpbmdzW2l0ZW1dID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZVJlZ2lvbihyZWdpb25DZW50ZXIsIHJlZ2lvblNwYW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2V0dGluZ3NbaXRlbV0gPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlUmVnaW9uKHJlZ2lvbkNlbnRlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncGFkZGluZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTZXR0aW5nc1tpdGVtXSA9IG5ldyB3aW5kb3cubWFwa2l0LlBhZGRpbmcoc2V0dGluZ3NbaXRlbV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTZXR0aW5nc1tpdGVtXSA9IHNldHRpbmdzW2l0ZW1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdTZXR0aW5ncztcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdChvcHRpb25zOiBNYXBLaXRJbml0T3B0aW9ucywgc2V0dGluZ3M6IGFueSA9IHt9LCBjYiA9IChkYXRhKSA9PiB7XG4gICAgfSkge1xuICAgICAgICBpZiAoIW9wdGlvbnMuSldUIHx8ICF0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhzZXR0aW5ncykubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm1hcHNRdWV1ZS5wdXNoKHtzZXR0aW5ncywgY2J9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCA9PT0gJ1NUT1BQRUQnKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gJ1BFTkRJTkcnO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICAgIHdpbmRvdy5tYXBraXQuaW5pdCh7XG4gICAgICAgICAgICAgICAgYXV0aG9yaXphdGlvbkNhbGxiYWNrOiAoZG9uZTogKHRva2VuOiBzdHJpbmcpID0+IHZvaWQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZG9uZShvcHRpb25zLkpXVCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsYW5ndWFnZTogdGhpcy5vcHRpb25zLmxhbmd1YWdlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuYWRkTWFwSW5pdE9wdGlvbnNMaXN0ZW5lcnMob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQgPT09ICdGSU5JU0hFRCcpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTWFwcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVNYXBzKCkge1xuICAgICAgICBjb25zdCBtYXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbmd4LWFwcGxlLW1hcGtpdCcpO1xuICAgICAgICBtYXBzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBtYXBDb250YWluZXIgPSBlbGVtZW50LmNoaWxkTm9kZXNbMF0uY2hpbGROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgIGlmICghbWFwQ29udGFpbmVyLmlubmVySFRNTCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTWFwKG1hcENvbnRhaW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVNYXAoZWxlbWVudCkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5tYXBzUXVldWUuc2hpZnQoKTtcbiAgICAgICAgLy8gbm9pbnNwZWN0aW9uIFR5cGVTY3JpcHRWYWxpZGF0ZUpTVHlwZXNcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLm1hcHMucHVzaChuZXcgd2luZG93Lm1hcGtpdC5NYXAoZWxlbWVudCwgQXBwbGVNYXBzU2VydmljZS5zZXR0aW5nc0xvYWRlZFRyYW5zZm9ybShvcHRpb25zLnNldHRpbmdzKSkpO1xuICAgICAgICBjb25zdCBvYmplY3QgPSB7XG4gICAgICAgICAgICBrZXk6IGluZGV4IC0gMSxcbiAgICAgICAgICAgIG1hcDogdGhpcy5tYXBzW2luZGV4IC0gMV0sXG4gICAgICAgICAgICBhZGRFdmVudExpc3RlbmVyOiAodHlwZSwgY2IsIGNvbnRleHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXR5cGUgfHwgIWNiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVHlwZSBhbmQgbGlzdGVuZXIgYXJlIHJlcXVpcmVkJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgY2IsIGNvbnRleHQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzUm90YXRpb25BdmFpbGFibGU6ICgpOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uaXNSb3RhdGlvbkF2YWlsYWJsZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc1JvdGF0aW9uRW5hYmxlZDogKCk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5pc1JvdGF0aW9uRW5hYmxlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc1Njcm9sbEVuYWJsZWQ6ICgpOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uaXNTY3JvbGxFbmFibGVkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzWm9vbUVuYWJsZWQ6ICgpOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uaXNab29tRW5hYmxlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRDZW50ZXI6ICgpOiBvYmplY3QgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtsYXRpdHVkZSwgbG9uZ2l0dWRlfSA9IHRoaXMubWFwc1tpbmRleCAtIDFdLmNlbnRlcjtcbiAgICAgICAgICAgICAgICByZXR1cm4ge2xhdGl0dWRlLCBsb25naXR1ZGV9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHNldENlbnRlcjogKGxhdGl0dWRlOiBudW1iZXIsIGxvbmdpdHVkZTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAvLyAgIHRoaXMubWFwc1tpbmRleCAtIDFdLmNlbnRlciA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUobGF0aXR1ZGUsIGxvbmdpdHVkZSk7XG4gICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAgc2V0Q2VudGVyQW5pbWF0ZWQ6IChsYXRpdHVkZTogbnVtYmVyLCBsb25naXR1ZGU6IG51bWJlciwgYW5pbWF0ZTogYm9vbGVhbiA9IHRydWUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zZXRDZW50ZXJBbmltYXRlZChuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlKGxhdGl0dWRlLCBsb25naXR1ZGUpLCBhbmltYXRlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRSZWdpb246ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0ucmVnaW9uO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFJlZ2lvbkFuaW1hdGVkOiAoY2VudGVyOiBDb29yZGluYXRlc0ludGVyZmFjZSwgc3BhbjogU3BhbkludGVyZmFjZSA9IG51bGwsIGFuaW1hdGU6IGJvb2xlYW4gPSB0cnVlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uQ2VudGVyID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZShjZW50ZXIubGF0aXR1ZGUsIGNlbnRlci5sb25naXR1ZGUpO1xuICAgICAgICAgICAgICAgIGlmIChzcGFuKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvblNwYW4gPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlU3BhbihzcGFuLmZyb20sIHNwYW4udG8pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zZXRSZWdpb25BbmltYXRlZChuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlUmVnaW9uKHJlZ2lvbkNlbnRlciwgcmVnaW9uU3BhbiksIGFuaW1hdGUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNldFJlZ2lvbkFuaW1hdGVkKG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVSZWdpb24ocmVnaW9uQ2VudGVyKSwgYW5pbWF0ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0Um90YXRpb246ICgpOiBudW1iZXIgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5yb3RhdGlvbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRSb3RhdGlvbkFuaW1hdGVkOiAoZGVncmVlczogbnVtYmVyLCBhbmltYXRlOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNldFJvdGF0aW9uQW5pbWF0ZWQoZGVncmVlcywgYW5pbWF0ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gZ2V0VmlzaWJsZU1hcFJlY3Q6ICgpID0+IHtcbiAgICAgICAgICAgIC8vICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnZpc2libGVNYXBzUmVjdDtcbiAgICAgICAgICAgIC8vIH0sICAgICAgLy8gc2V0VmlzaWJsZU1hcFJlY3RBbmltYXRlZDogKCkgPT4ge1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgZ2V0Q2FtZXJhRGlzdGFuY2U6ICgpOiBudW1iZXIgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5jYW1lcmFEaXN0YW5jZTtcbiAgICAgICAgICAgIH0sIHNldENhbWVyYURpc3RhbmNlQW5pbWF0ZWQ6IChkaXN0YW5jZTogbnVtYmVyLCBhbmltYXRlOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNldENhbWVyYURpc3RhbmNlQW5pbWF0ZWQoZGlzdGFuY2UsIGFuaW1hdGUpO1xuICAgICAgICAgICAgfSwgZ2V0Q2FtZXJhWm9vbVJhbmdlOiAoKTogb2JqZWN0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7bWluQ2FtZXJhRGlzdGFuY2UsIG1heENhbWVyYURpc3RhbmNlfSA9IHRoaXMubWFwc1tpbmRleCAtIDFdLmNhbWVyYVpvb21SYW5nZTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge21pbkNhbWVyYURpc3RhbmNlLCBtYXhDYW1lcmFEaXN0YW5jZX07XG4gICAgICAgICAgICB9LCBzZXRDYW1lcmFab29tUmFuZ2VBbmltYXRlZDogKG1pbkNhbWVyYURpc3RhbmNlLCBtYXhDYW1lcmFEaXN0YW5jZSwgYW5pbWF0ZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zZXRDYW1lcmFab29tUmFuZ2VBbmltYXRlZChuZXcgd2luZG93Lm1hcGtpdC5DYW1lcmFab29tUmFuZ2UobWluQ2FtZXJhRGlzdGFuY2UsIG1heENhbWVyYURpc3RhbmNlKSwgYW5pbWF0ZSk7XG4gICAgICAgICAgICB9LCBnZXRDb2xvclNjaGVtZTogKCk6IHN0cmluZyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLmNvbG9yU2NoZW1lO1xuICAgICAgICAgICAgfSwgc2V0Q29sb3JTY2hlbWU6IChzY2hlbWU6IFNjaGVtZVN0cmluZyA9ICdsaWdodCcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5jb2xvclNjaGVtZSA9IHNjaGVtZTtcbiAgICAgICAgICAgIH0sIGdldERpc3RhbmNlczogKCk6IHN0cmluZyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLmRpc3RhbmNlcztcbiAgICAgICAgICAgIH0sIHNldERpc3RhbmNlczogKGRpc3RhbmNlOiBEaXN0YW5jZXNTdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5kaXN0YW5jZXMgPSBkaXN0YW5jZTtcbiAgICAgICAgICAgIH0sIGdldE1hcFR5cGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0ubWFwVHlwZTtcbiAgICAgICAgICAgIH0sIHNldE1hcFR5cGU6ICh0eXBlOiBNYXBUeXBlU3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0ubWFwVHlwZSA9IHR5cGU7XG4gICAgICAgICAgICB9LCBnZXRQYWRkaW5nOiAoKTogb2JqZWN0ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0ucGFkZGluZztcbiAgICAgICAgICAgIH0sIHNldFBhZGRpbmc6IChwYWRkaW5nOiBQYWRkaW5nSW50ZXJmYWNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0ucGFkZGluZyA9IG5ldyB3aW5kb3cubWFwa2l0LlBhZGRpbmcocGFkZGluZyk7XG4gICAgICAgICAgICB9LCBnZXRTaG93c01hcFR5cGVDb250cm9sOiAoKTogYm9vbGVhbiA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzTWFwVHlwZUNvbnRyb2w7XG4gICAgICAgICAgICB9LCBzZXRTaG93c01hcFR5cGVDb250cm9sOiAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c01hcFR5cGVDb250cm9sID0gdmFsdWU7XG4gICAgICAgICAgICB9LCBnZXRTaG93c1pvb21Db250cm9sOiAoKTogYm9vbGVhbiA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzWm9vbUNvbnRyb2w7XG4gICAgICAgICAgICB9LCBzZXRTaG93c1pvb21Db250cm9sOiAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1pvb21Db250cm9sID0gdmFsdWU7XG4gICAgICAgICAgICB9LCBnZXRTaG93c1VzZXJMb2NhdGlvbkNvbnRyb2w6ICgpOiBib29sZWFuID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NVc2VyTG9jYXRpb25Db250cm9sO1xuICAgICAgICAgICAgfSwgc2V0U2hvd3NVc2VyTG9jYXRpb25Db250cm9sOiAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1VzZXJMb2NhdGlvbkNvbnRyb2wgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sIGdldFNob3dzUG9pbnRzT2ZJbnRlcmVzdDogKCk6IGJvb2xlYW4gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1BvaW50c09mSW50ZXJlc3Q7XG4gICAgICAgICAgICB9LCBzZXRTaG93c1BvaW50c09mSW50ZXJlc3Q6ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzUG9pbnRzT2ZJbnRlcmVzdCA9IHZhbHVlO1xuICAgICAgICAgICAgfSwgZ2V0U2hvd3NTY2FsZTogKCk6IHN0cmluZyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzU2NhbGU7XG4gICAgICAgICAgICB9LCBzZXRTaG93c1NjYWxlOiAodmFsdWU6IFNob3dzU2NhbGVTdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1NjYWxlID0gdmFsdWU7XG4gICAgICAgICAgICB9LCBnZXRUaW50Q29sb3I6ICgpOiBzdHJpbmcgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS50aW50Q29sb3I7XG4gICAgICAgICAgICB9LCBzZXRUaW50Q29sb3I6IChjb2xvcjogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0udGludENvbG9yID0gY29sb3I7XG4gICAgICAgICAgICB9LCBzaG93SXRlbXM6IChpdGVtcywgbWFwU2hvd0l0ZW1PcHRpb25zOiBNYXBTaG93SXRlbU9wdGlvbnNJbnRlcmZhY2UgPSB7fSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhc3NpbmdPcHRpb25zID0ge2FuaW1hdGU6IG9wdGlvbnMuYW5pbWF0ZSB8fCB0cnVlfTtcbiAgICAgICAgICAgICAgICBpZiAobWFwU2hvd0l0ZW1PcHRpb25zLnNwYW4pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBwYXNzaW5nT3B0aW9ucy5taW5pbXVtU3BhbiA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVTcGFuKG1hcFNob3dJdGVtT3B0aW9ucy5zcGFuLmZyb20sIG1hcFNob3dJdGVtT3B0aW9ucy5zcGFuLnRvKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG1hcFNob3dJdGVtT3B0aW9ucy5wYWRkaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgcGFzc2luZ09wdGlvbnMucGFkZGluZyA9IG5ldyB3aW5kb3cubWFwa2l0LlBhZGRpbmcobWFwU2hvd0l0ZW1PcHRpb25zLnBhZGRpbmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBwYXNzaW5nSXRlbXMgPSBBcnJheS5pc0FycmF5KGl0ZW1zKSA/IGl0ZW1zIDogW2l0ZW1zXTtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93SXRlbXMocGFzc2luZ0l0ZW1zLCBwYXNzaW5nT3B0aW9ucyk7XG4gICAgICAgICAgICB9LCBnZXRBbm5vdGF0aW9uczogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5ub3RhdGlvbnNbaW5kZXggLSAxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmFubm90YXRpb25zW2luZGV4IC0gMV0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5ub3RhdGlvbnNbaW5kZXggLSAxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuYW5ub3RhdGlvbnNbaW5kZXggLSAxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIHJldHVybiB0aGlzLmFubm90YXRpb25zW2luZGV4IC0gMV07XG4gICAgICAgICAgICB9LCBnZXRTZWxlY3RlZEFubm90YXRpb25zOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnNlbGVjdGVkQW5ub3RhdGlvbjtcbiAgICAgICAgICAgIH0sIHNldCB6b29tKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXAuX2ltcGwuem9vbUxldmVsID0gdmFsdWU7XG4gICAgICAgICAgICB9LCBnZXQgem9vbSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXAuX2ltcGwuem9vbUxldmVsO1xuICAgICAgICAgICAgfSwgc2V0IHNob3dDb21wYXNzKHZhbHVlOiAnaGlkZGVuJyB8ICdhZGFwdGl2ZScgfCAndmlzaWJsZScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcC5zaG93c0NvbXBhc3MgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sIGdldCBzaG93Q29tcGFzcygpOiAnaGlkZGVuJyB8ICdhZGFwdGl2ZScgfCAndmlzaWJsZScge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNob3dDb21wYXNzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBvcHRpb25zLmNiKG9iamVjdCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRNYXBJbml0T3B0aW9uc0xpc3RlbmVycyhvcHRpb25zKSB7XG4gICAgICAgIHdpbmRvdy5tYXBraXQuYWRkRXZlbnRMaXN0ZW5lcignY29uZmlndXJhdGlvbi1jaGFuZ2UnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5jYWxsYmFjayhldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LnN0YXR1cykge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0luaXRpYWxpemVkJzpcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFwS2l0IEpTIGluaXRpYWxpemVkIGFuZCBjb25maWd1cmVkLlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gJ0ZJTklTSEVEJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVNYXBzKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuY3JlYXRlTWFwKHNldHRpbmdzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUmVmcmVzaGVkJzpcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFwS2l0IEpTIGNvbmZpZ3VyYXRpb24gdXBkYXRlZC5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB3aW5kb3cubWFwa2l0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gJ1NUT1BQRUQnO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmNhbGxiYWNrKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFVzZXJMb2NhdGlvbih0aW1lb3V0ID0gNTAwMCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhdGlvbiA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9LCB7dGltZW91dH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb3B0aW9uc0NoYW5nZWQoY2hhbmdlcykge1xuICAgICAgICBjaGFuZ2VzLmZvckVhY2hJdGVtKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5wcmV2aW91c1ZhbHVlICE9PSBpdGVtLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5rZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbGFuZ3VhZ2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Lm1hcGtpdC5sYW5ndWFnZSA9IGl0ZW0uY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0pXVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldHRpbmdzQ2hhbmdlZChjaGFuZ2VzOiBhbnksIGtleTogYW55KSB7XG4gICAgICAgIGlmIChrZXkgPj0gMCkge1xuICAgICAgICAgICAgY2hhbmdlcy5mb3JFYWNoSXRlbSgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLnByZXZpb3VzVmFsdWUgIT09IGl0ZW0uY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5rZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NvbG9yU2NoZW1lJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHNba2V5XVtpdGVtLmtleV0gPSBpdGVtLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBzW2tleV0uc2V0Q2VudGVyQW5pbWF0ZWQobmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZShpdGVtLmN1cnJlbnRWYWx1ZS5sYXRpdHVkZSwgaXRlbS5jdXJyZW50VmFsdWUubG9uZ2l0dWRlKSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZWdpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWdpb25DZW50ZXIgPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlKGl0ZW0uY3VycmVudFZhbHVlLmNlbnRlci5sYXRpdHVkZSwgaXRlbS5jdXJyZW50VmFsdWUuY2VudGVyLmxvbmdpdHVkZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uY3VycmVudFZhbHVlLnNwYW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uU3BhbiA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVTcGFuKGl0ZW0uY3VycmVudFZhbHVlLnNwYW4uZnJvbSwgaXRlbS5jdXJyZW50VmFsdWUuc3Bhbi50byk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwc1trZXldLnNldFJlZ2lvbkFuaW1hdGVkKG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVSZWdpb24ocmVnaW9uQ2VudGVyLCByZWdpb25TcGFuKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHNba2V5XS5zZXRSZWdpb25BbmltYXRlZChuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlUmVnaW9uKHJlZ2lvbkNlbnRlcikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncGFkZGluZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBzW2tleV0gPSBuZXcgd2luZG93Lm1hcGtpdC5QYWRkaW5nKGl0ZW0uY3VycmVudFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBzW2tleV1baXRlbS5rZXldID0gaXRlbS5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXRBbm5vdGF0aW9uKGFubm90YXRpb246IGFueSwga2V5OiBhbnkpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFubm90YXRpb25zW2tleV0pIHtcbiAgICAgICAgICAgIHRoaXMuYW5ub3RhdGlvbnNba2V5XSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5hbm5vdGF0aW9uc1trZXldLmluY2x1ZGVzKGFubm90YXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLmFubm90YXRpb25zW2tleV0ucHVzaChhbm5vdGF0aW9uKTtcbiAgICAgICAgICAgIHRoaXMubWFwc1trZXldLmFkZEFubm90YXRpb24oYW5ub3RhdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbiJdfQ==
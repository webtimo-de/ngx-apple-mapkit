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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGUtbWFwcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFwcGxlLW1hcGtpdC9zcmMvbGliL2FwcGxlLW1hcHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0saUJBQWlCLENBQUM7O0FBb0JsRCxNQUFNLE9BQU8sZ0JBQWdCO0lBV3pCLFlBQXlDLFVBQWtCO1FBQWxCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFUcEQsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixnQkFBVyxHQUFHLFNBQVMsQ0FBQztRQUN4QixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQU9wQixJQUFJLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRU8sTUFBTSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsR0FBRyxFQUFFO1FBQ2hELE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN2QixLQUFLLE1BQU0sSUFBSSxJQUFJLFFBQVEsRUFBRTtZQUN6QixJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDaEIsUUFBUSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxRQUFRO3dCQUNULFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUNwRyxNQUFNO29CQUNWLEtBQUssUUFBUTt3QkFDVCxNQUFNLFlBQVksR0FBRyxJQUFJLE1BQU0s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bmplY3QsIEluamVjdGFibGUsIFBMQVRGT1JNX0lEfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aXNQbGF0Zm9ybUJyb3dzZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIENvb3JkaW5hdGVzSW50ZXJmYWNlLFxuICAgIERpc3RhbmNlc1N0cmluZywgTWFwS2l0SW5pdE9wdGlvbnMsXG4gICAgTWFwU2hvd0l0ZW1PcHRpb25zSW50ZXJmYWNlLFxuICAgIE1hcFR5cGVTdHJpbmcsXG4gICAgUGFkZGluZ0ludGVyZmFjZSxcbiAgICBTY2hlbWVTdHJpbmcsXG4gICAgU2hvd3NTY2FsZVN0cmluZyxcbiAgICBTcGFuSW50ZXJmYWNlXG59IGZyb20gXCIuL2RlY2xhcmF0aW9uc1wiO1xuXG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICAgICAgbWFwa2l0OiBhbnk7XG4gICAgfVxufVxuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBBcHBsZU1hcHNTZXJ2aWNlIHtcbiAgICBwdWJsaWMgaXNCcm93c2VyOiBib29sZWFuO1xuICAgIHB1YmxpYyBtYXBzID0gW107XG4gICAgcHVibGljIG1hcHNRdWV1ZSA9IFtdO1xuICAgIHB1YmxpYyBpbml0aWFsaXplZCA9ICdTVE9QUEVEJztcbiAgICBwdWJsaWMgYW5ub3RhdGlvbnMgPSB7fTtcbiAgICBwcml2YXRlIG9wdGlvbnM6IGFueTtcbiAgICBwdWJsaWMgbG9jYXRpb246IGFueTtcbiAgICBwdWJsaWMgcmVnaW9uOiBhbnk7XG4gICAgcHVibGljIGNlbnRlcjogYW55O1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QpIHtcbiAgICAgICAgdGhpcy5pc0Jyb3dzZXIgPSBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIHNldHRpbmdzTG9hZGVkVHJhbnNmb3JtKHNldHRpbmdzID0ge30pIHtcbiAgICAgICAgY29uc3QgbmV3U2V0dGluZ3MgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBpdGVtIGluIHNldHRpbmdzKSB7XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3NbaXRlbV0pIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NldHRpbmdzW2l0ZW1dID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZShzZXR0aW5nc1tpdGVtXS5sYXRpdHVkZSwgc2V0dGluZ3NbaXRlbV0ubG9uZ2l0dWRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdyZWdpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uQ2VudGVyID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZShzZXR0aW5nc1tpdGVtXS5jZW50ZXIubGF0aXR1ZGUsIHNldHRpbmdzW2l0ZW1dLmNlbnRlci5sb25naXR1ZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzW2l0ZW1dLnNwYW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWdpb25TcGFuID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZVNwYW4oc2V0dGluZ3NbaXRlbV0uc3Bhbi5mcm9tLCBzZXR0aW5nc1tpdGVtXS5zcGFuLnRvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdTZXR0aW5nc1tpdGVtXSA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVSZWdpb24ocmVnaW9uQ2VudGVyLCByZWdpb25TcGFuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NldHRpbmdzW2l0ZW1dID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZVJlZ2lvbihyZWdpb25DZW50ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3BhZGRpbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2V0dGluZ3NbaXRlbV0gPSBuZXcgd2luZG93Lm1hcGtpdC5QYWRkaW5nKHNldHRpbmdzW2l0ZW1dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2V0dGluZ3NbaXRlbV0gPSBzZXR0aW5nc1tpdGVtXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3U2V0dGluZ3M7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXQob3B0aW9uczogTWFwS2l0SW5pdE9wdGlvbnMsIHNldHRpbmdzOiBhbnkgPSB7fSwgY2IgPSAoZGF0YSkgPT4ge30pIHtcbiAgICAgICAgaWYgKCFvcHRpb25zLkpXVCB8fCAhdGhpcy5pc0Jyb3dzZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1hcHNRdWV1ZS5wdXNoKHtzZXR0aW5ncywgY2J9KTtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQgPT09ICdTVE9QUEVEJykge1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9ICdQRU5ESU5HJztcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgICAgICB3aW5kb3cubWFwa2l0LmluaXQoe1xuICAgICAgICAgICAgICAgIGF1dGhvcml6YXRpb25DYWxsYmFjazogKGRvbmU6ICh0b2tlbjogc3RyaW5nKSA9PiB2b2lkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUob3B0aW9ucy5KV1QpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2U6IHRoaXMub3B0aW9ucy5sYW5ndWFnZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmFkZE1hcEluaXRPcHRpb25zTGlzdGVuZXJzKG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkID09PSAnRklOSVNIRUQnKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1hcHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlTWFwcygpIHtcbiAgICAgICAgY29uc3QgbWFwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ25neC1hcHBsZS1tYXBraXQnKTtcbiAgICAgICAgbWFwcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWFwQ29udGFpbmVyID0gZWxlbWVudC5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAoIW1hcENvbnRhaW5lci5pbm5lckhUTUwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU1hcChtYXBDb250YWluZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlTWFwKGVsZW1lbnQpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMubWFwc1F1ZXVlLnNoaWZ0KCk7XG4gICAgICAgIC8vIG5vaW5zcGVjdGlvbiBUeXBlU2NyaXB0VmFsaWRhdGVKU1R5cGVzXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5tYXBzLnB1c2gobmV3IHdpbmRvdy5tYXBraXQuTWFwKGVsZW1lbnQsIEFwcGxlTWFwc1NlcnZpY2Uuc2V0dGluZ3NMb2FkZWRUcmFuc2Zvcm0ob3B0aW9ucy5zZXR0aW5ncykpKTtcbiAgICAgICAgY29uc3Qgb2JqZWN0ID0ge1xuICAgICAgICAgICAga2V5OiBpbmRleCAtIDEsXG4gICAgICAgICAgICBtYXA6IHRoaXMubWFwc1tpbmRleCAtIDFdLFxuICAgICAgICAgICAgaXNSb3RhdGlvbkF2YWlsYWJsZTogKCk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5pc1JvdGF0aW9uQXZhaWxhYmxlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzUm90YXRpb25FbmFibGVkOiAoKTogdm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLmlzUm90YXRpb25FbmFibGVkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzU2Nyb2xsRW5hYmxlZDogKCk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5pc1Njcm9sbEVuYWJsZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNab29tRW5hYmxlZDogKCk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5pc1pvb21FbmFibGVkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldENlbnRlcjogKCk6IG9iamVjdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge2xhdGl0dWRlLCBsb25naXR1ZGV9ID0gdGhpcy5tYXBzW2luZGV4IC0gMV0uY2VudGVyO1xuICAgICAgICAgICAgICAgIHJldHVybiB7bGF0aXR1ZGUsIGxvbmdpdHVkZX07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gc2V0Q2VudGVyOiAobGF0aXR1ZGU6IG51bWJlciwgbG9uZ2l0dWRlOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIC8vICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uY2VudGVyID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZShsYXRpdHVkZSwgbG9uZ2l0dWRlKTtcbiAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICBzZXRDZW50ZXJBbmltYXRlZDogKGxhdGl0dWRlOiBudW1iZXIsIGxvbmdpdHVkZTogbnVtYmVyLCBhbmltYXRlOiBib29sZWFuID0gdHJ1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNldENlbnRlckFuaW1hdGVkKG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUobGF0aXR1ZGUsIGxvbmdpdHVkZSksIGFuaW1hdGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFJlZ2lvbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5yZWdpb247XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0UmVnaW9uQW5pbWF0ZWQ6IChjZW50ZXI6IENvb3JkaW5hdGVzSW50ZXJmYWNlLCBzcGFuOiBTcGFuSW50ZXJmYWNlID0gbnVsbCwgYW5pbWF0ZTogYm9vbGVhbiA9IHRydWUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWdpb25DZW50ZXIgPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlKGNlbnRlci5sYXRpdHVkZSwgY2VudGVyLmxvbmdpdHVkZSk7XG4gICAgICAgICAgICAgICAgaWYgKHNwYW4pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uU3BhbiA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVTcGFuKHNwYW4uZnJvbSwgc3Bhbi50byk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNldFJlZ2lvbkFuaW1hdGVkKG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVSZWdpb24ocmVnaW9uQ2VudGVyLCByZWdpb25TcGFuKSwgYW5pbWF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2V0UmVnaW9uQW5pbWF0ZWQobmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZVJlZ2lvbihyZWdpb25DZW50ZXIpLCBhbmltYXRlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRSb3RhdGlvbjogKCk6IG51bWJlciA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnJvdGF0aW9uO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFJvdGF0aW9uQW5pbWF0ZWQ6IChkZWdyZWVzOiBudW1iZXIsIGFuaW1hdGU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2V0Um90YXRpb25BbmltYXRlZChkZWdyZWVzLCBhbmltYXRlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBnZXRWaXNpYmxlTWFwUmVjdDogKCkgPT4ge1xuICAgICAgICAgICAgLy8gICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0udmlzaWJsZU1hcHNSZWN0O1xuICAgICAgICAgICAgLy8gfSwgICAgICAvLyBzZXRWaXNpYmxlTWFwUmVjdEFuaW1hdGVkOiAoKSA9PiB7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICBnZXRDYW1lcmFEaXN0YW5jZTogKCk6IG51bWJlciA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLmNhbWVyYURpc3RhbmNlO1xuICAgICAgICAgICAgfSwgc2V0Q2FtZXJhRGlzdGFuY2VBbmltYXRlZDogKGRpc3RhbmNlOiBudW1iZXIsIGFuaW1hdGU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2V0Q2FtZXJhRGlzdGFuY2VBbmltYXRlZChkaXN0YW5jZSwgYW5pbWF0ZSk7XG4gICAgICAgICAgICB9LCBnZXRDYW1lcmFab29tUmFuZ2U6ICgpOiBvYmplY3QgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHttaW5DYW1lcmFEaXN0YW5jZSwgbWF4Q2FtZXJhRGlzdGFuY2V9ID0gdGhpcy5tYXBzW2luZGV4IC0gMV0uY2FtZXJhWm9vbVJhbmdlO1xuICAgICAgICAgICAgICAgIHJldHVybiB7bWluQ2FtZXJhRGlzdGFuY2UsIG1heENhbWVyYURpc3RhbmNlfTtcbiAgICAgICAgICAgIH0sIHNldENhbWVyYVpvb21SYW5nZUFuaW1hdGVkOiAobWluQ2FtZXJhRGlzdGFuY2UsIG1heENhbWVyYURpc3RhbmNlLCBhbmltYXRlOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNldENhbWVyYVpvb21SYW5nZUFuaW1hdGVkKG5ldyB3aW5kb3cubWFwa2l0LkNhbWVyYVpvb21SYW5nZShtaW5DYW1lcmFEaXN0YW5jZSwgbWF4Q2FtZXJhRGlzdGFuY2UpLCBhbmltYXRlKTtcbiAgICAgICAgICAgIH0sIGdldENvbG9yU2NoZW1lOiAoKTogc3RyaW5nID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uY29sb3JTY2hlbWU7XG4gICAgICAgICAgICB9LCBzZXRDb2xvclNjaGVtZTogKHNjaGVtZTogU2NoZW1lU3RyaW5nID0gJ2xpZ2h0JykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLmNvbG9yU2NoZW1lID0gc2NoZW1lO1xuICAgICAgICAgICAgfSwgZ2V0RGlzdGFuY2VzOiAoKTogc3RyaW5nID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uZGlzdGFuY2VzO1xuICAgICAgICAgICAgfSwgc2V0RGlzdGFuY2VzOiAoZGlzdGFuY2U6IERpc3RhbmNlc1N0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLmRpc3RhbmNlcyA9IGRpc3RhbmNlO1xuICAgICAgICAgICAgfSwgZ2V0TWFwVHlwZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5tYXBUeXBlO1xuICAgICAgICAgICAgfSwgc2V0TWFwVHlwZTogKHR5cGU6IE1hcFR5cGVTdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5tYXBUeXBlID0gdHlwZTtcbiAgICAgICAgICAgIH0sIGdldFBhZGRpbmc6ICgpOiBvYmplY3QgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5wYWRkaW5nO1xuICAgICAgICAgICAgfSwgc2V0UGFkZGluZzogKHBhZGRpbmc6IFBhZGRpbmdJbnRlcmZhY2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5wYWRkaW5nID0gbmV3IHdpbmRvdy5tYXBraXQuUGFkZGluZyhwYWRkaW5nKTtcbiAgICAgICAgICAgIH0sIGdldFNob3dzTWFwVHlwZUNvbnRyb2w6ICgpOiBib29sZWFuID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NNYXBUeXBlQ29udHJvbDtcbiAgICAgICAgICAgIH0sIHNldFNob3dzTWFwVHlwZUNvbnRyb2w6ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzTWFwVHlwZUNvbnRyb2wgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sIGdldFNob3dzWm9vbUNvbnRyb2w6ICgpOiBib29sZWFuID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3Nab29tQ29udHJvbDtcbiAgICAgICAgICAgIH0sIHNldFNob3dzWm9vbUNvbnRyb2w6ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzWm9vbUNvbnRyb2wgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sIGdldFNob3dzVXNlckxvY2F0aW9uQ29udHJvbDogKCk6IGJvb2xlYW4gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1VzZXJMb2NhdGlvbkNvbnRyb2w7XG4gICAgICAgICAgICB9LCBzZXRTaG93c1VzZXJMb2NhdGlvbkNvbnRyb2w6ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzVXNlckxvY2F0aW9uQ29udHJvbCA9IHZhbHVlO1xuICAgICAgICAgICAgfSwgZ2V0U2hvd3NQb2ludHNPZkludGVyZXN0OiAoKTogYm9vbGVhbiA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzUG9pbnRzT2ZJbnRlcmVzdDtcbiAgICAgICAgICAgIH0sIHNldFNob3dzUG9pbnRzT2ZJbnRlcmVzdDogKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NQb2ludHNPZkludGVyZXN0ID0gdmFsdWU7XG4gICAgICAgICAgICB9LCBnZXRTaG93c1NjYWxlOiAoKTogc3RyaW5nID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NTY2FsZTtcbiAgICAgICAgICAgIH0sIHNldFNob3dzU2NhbGU6ICh2YWx1ZTogU2hvd3NTY2FsZVN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzU2NhbGUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sIGdldFRpbnRDb2xvcjogKCk6IHN0cmluZyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnRpbnRDb2xvcjtcbiAgICAgICAgICAgIH0sIHNldFRpbnRDb2xvcjogKGNvbG9yOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS50aW50Q29sb3IgPSBjb2xvcjtcbiAgICAgICAgICAgIH0sIHNob3dJdGVtczogKGl0ZW1zLCBtYXBTaG93SXRlbU9wdGlvbnM6IE1hcFNob3dJdGVtT3B0aW9uc0ludGVyZmFjZSA9IHt9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFzc2luZ09wdGlvbnMgPSB7YW5pbWF0ZTogb3B0aW9ucy5hbmltYXRlIHx8IHRydWV9O1xuICAgICAgICAgICAgICAgIGlmIChtYXBTaG93SXRlbU9wdGlvbnMuc3Bhbikge1xuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIHBhc3NpbmdPcHRpb25zLm1pbmltdW1TcGFuID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZVNwYW4obWFwU2hvd0l0ZW1PcHRpb25zLnNwYW4uZnJvbSwgbWFwU2hvd0l0ZW1PcHRpb25zLnNwYW4udG8pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobWFwU2hvd0l0ZW1PcHRpb25zLnBhZGRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBwYXNzaW5nT3B0aW9ucy5wYWRkaW5nID0gbmV3IHdpbmRvdy5tYXBraXQuUGFkZGluZyhtYXBTaG93SXRlbU9wdGlvbnMucGFkZGluZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHBhc3NpbmdJdGVtcyA9IEFycmF5LmlzQXJyYXkoaXRlbXMpID8gaXRlbXMgOiBbaXRlbXNdO1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dJdGVtcyhwYXNzaW5nSXRlbXMsIHBhc3NpbmdPcHRpb25zKTtcbiAgICAgICAgICAgIH0sIGdldEFubm90YXRpb25zOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbm5vdGF0aW9uc1tpbmRleCAtIDFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuYW5ub3RhdGlvbnNbaW5kZXggLSAxXSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbm5vdGF0aW9uc1tpbmRleCAtIDFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5hbm5vdGF0aW9uc1tpbmRleCAtIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHRoaXMuYW5ub3RhdGlvbnNbaW5kZXggLSAxXTtcbiAgICAgICAgICAgIH0sIGdldFNlbGVjdGVkQW5ub3RhdGlvbnM6ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uc2VsZWN0ZWRBbm5vdGF0aW9uO1xuICAgICAgICAgICAgfSwgc2V0IHpvb20odmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcC5faW1wbC56b29tTGV2ZWwgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sIGdldCB6b29tKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcC5faW1wbC56b29tTGV2ZWw7XG4gICAgICAgICAgICB9LCBzZXQgc2hvd0NvbWFzcyh2YWx1ZTogJ2hpZGRlbicgfCAnYWRhcHRpdmUnIHwgJ3Zpc2libGUnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXAuc2hvd3NDb21wYXNzID0gdmFsdWU7XG4gICAgICAgICAgICB9LCBnZXQgc2hvd0NvbXBhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaG93Q29tcGFzcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgb3B0aW9ucy5jYihvYmplY3QpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkTWFwSW5pdE9wdGlvbnNMaXN0ZW5lcnMob3B0aW9ucykge1xuICAgICAgICB3aW5kb3cubWFwa2l0LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbmZpZ3VyYXRpb24tY2hhbmdlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5jYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuY2FsbGJhY2soZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoIChldmVudC5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdJbml0aWFsaXplZCc6XG4gICAgICAgICAgICAgICAgICAgIC8vIE1hcEtpdCBKUyBpbml0aWFsaXplZCBhbmQgY29uZmlndXJlZC5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9ICdGSU5JU0hFRCc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTWFwcygpO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmNyZWF0ZU1hcChzZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1JlZnJlc2hlZCc6XG4gICAgICAgICAgICAgICAgICAgIC8vIE1hcEtpdCBKUyBjb25maWd1cmF0aW9uIHVwZGF0ZWQuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgd2luZG93Lm1hcGtpdC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9ICdTVE9QUEVEJztcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5jYWxsYmFjayhldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRVc2VyTG9jYXRpb24odGltZW91dCA9IDUwMDApIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb24gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSwge3RpbWVvdXR9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9wdGlvbnNDaGFuZ2VkKGNoYW5nZXMpIHtcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoSXRlbSgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0ucHJldmlvdXNWYWx1ZSAhPT0gaXRlbS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGl0ZW0ua2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2xhbmd1YWdlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5tYXBraXQubGFuZ3VhZ2UgPSBpdGVtLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdKV1QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXR0aW5nc0NoYW5nZWQoY2hhbmdlczogYW55LCBrZXk6IGFueSkge1xuICAgICAgICBpZiAoa2V5ID49IDApIHtcbiAgICAgICAgICAgIGNoYW5nZXMuZm9yRWFjaEl0ZW0oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5wcmV2aW91c1ZhbHVlICE9PSBpdGVtLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGl0ZW0ua2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjb2xvclNjaGVtZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBzW2tleV1baXRlbS5rZXldID0gaXRlbS5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwc1trZXldLnNldENlbnRlckFuaW1hdGVkKG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUoaXRlbS5jdXJyZW50VmFsdWUubGF0aXR1ZGUsIGl0ZW0uY3VycmVudFZhbHVlLmxvbmdpdHVkZSksIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVnaW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uQ2VudGVyID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZShpdGVtLmN1cnJlbnRWYWx1ZS5jZW50ZXIubGF0aXR1ZGUsIGl0ZW0uY3VycmVudFZhbHVlLmNlbnRlci5sb25naXR1ZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmN1cnJlbnRWYWx1ZS5zcGFuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvblNwYW4gPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlU3BhbihpdGVtLmN1cnJlbnRWYWx1ZS5zcGFuLmZyb20sIGl0ZW0uY3VycmVudFZhbHVlLnNwYW4udG8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHNba2V5XS5zZXRSZWdpb25BbmltYXRlZChuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlUmVnaW9uKHJlZ2lvbkNlbnRlciwgcmVnaW9uU3BhbikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBzW2tleV0uc2V0UmVnaW9uQW5pbWF0ZWQobmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZVJlZ2lvbihyZWdpb25DZW50ZXIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3BhZGRpbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwc1trZXldID0gbmV3IHdpbmRvdy5tYXBraXQuUGFkZGluZyhpdGVtLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwc1trZXldW2l0ZW0ua2V5XSA9IGl0ZW0uY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0QW5ub3RhdGlvbihhbm5vdGF0aW9uOiBhbnksIGtleTogYW55KSB7XG4gICAgICAgIGlmICghdGhpcy5hbm5vdGF0aW9uc1trZXldKSB7XG4gICAgICAgICAgICB0aGlzLmFubm90YXRpb25zW2tleV0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuYW5ub3RhdGlvbnNba2V5XS5pbmNsdWRlcyhhbm5vdGF0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5hbm5vdGF0aW9uc1trZXldLnB1c2goYW5ub3RhdGlvbik7XG4gICAgICAgICAgICB0aGlzLm1hcHNba2V5XS5hZGRBbm5vdGF0aW9uKGFubm90YXRpb24pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4iXX0=
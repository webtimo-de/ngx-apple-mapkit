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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGUtbWFwcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFwcGxlLW1hcGtpdC9zcmMvbGliL2FwcGxlLW1hcHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0saUJBQWlCLENBQUM7O0FBeUJsRCxNQUFNLE9BQU8sZ0JBQWdCO0lBV3pCLFlBQXlDLFVBQWtCO1FBQWxCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFUcEQsU0FBSSxHQUFpQixFQUFFLENBQUM7UUFDeEIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLGdCQUFXLEdBQUcsU0FBUyxDQUFDO1FBQ3hCLGdCQUFXLEdBQXVDLEVBQUUsQ0FBQztRQU94RCxJQUFJLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRU8sTUFBTSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsR0FBRyxFQUFFO1FBQ2hELE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN2QixLQUFLLE1BQU0sSUFBSSxJQUFJLFFBQVEsRUFBRTtZQUN6QixJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDaEIsUUFBUSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxRQUFRO3dCQUNULFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUNwRyxNQUFNO29CQUNWLEtBQUssUUFBUTt3QkFDVCxNQUFNLFlBQVksR0FBRyxJQUFJLE1B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RyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzdDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzVDO0lBQ0wsQ0FBQzs4R0FwWFEsZ0JBQWdCLGtCQVdMLFdBQVc7a0hBWHRCLGdCQUFnQixjQURKLE1BQU07OzJGQUNsQixnQkFBZ0I7a0JBRDVCLFVBQVU7bUJBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzswQkFZZixNQUFNOzJCQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgUExBVEZPUk1fSUR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtpc1BsYXRmb3JtQnJvd3Nlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gICAgQ29vcmRpbmF0ZXNJbnRlcmZhY2UsXG4gICAgRGlzdGFuY2VzU3RyaW5nLFxuICAgIE1hcENvbnN0cnVjdG9yT3B0aW9ucyxcbiAgICBNYXBLaXRDb21wYXNzLFxuICAgIE1hcEtpdEdldENhbWVyYVpvb21SYW5nZSxcbiAgICBNYXBLaXRJbml0T3B0aW9ucyxcbiAgICBNYXBLaXRMb2FkZWQsXG4gICAgTWFwU2hvd0l0ZW1PcHRpb25zSW50ZXJmYWNlLFxuICAgIE1hcFR5cGVTdHJpbmcsXG4gICAgUGFkZGluZ0ludGVyZmFjZSxcbiAgICBTY2hlbWVTdHJpbmcsXG4gICAgU2hvd3NTY2FsZVN0cmluZyxcbiAgICBTcGFuSW50ZXJmYWNlXG59IGZyb20gXCIuL2RlY2xhcmF0aW9uc1wiO1xuaW1wb3J0IHtNYXBLaXR9IGZyb20gXCIuL21hcGtpdFwiO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gICAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgICAgIG1hcGtpdDogYW55O1xuICAgIH1cbn1cblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgQXBwbGVNYXBzU2VydmljZSB7XG4gICAgcHVibGljIGlzQnJvd3NlcjogYm9vbGVhbjtcbiAgICBwdWJsaWMgbWFwczogTWFwS2l0Lk1hcFtdID0gW107XG4gICAgcHVibGljIG1hcHNRdWV1ZSA9IFtdO1xuICAgIHB1YmxpYyBpbml0aWFsaXplZCA9ICdTVE9QUEVEJztcbiAgICBwdWJsaWMgYW5ub3RhdGlvbnM6IHtbczogbnVtYmVyXTogTWFwS2l0LkFubm90YXRpb25bXX0gPSB7fTtcbiAgICBwcml2YXRlIG9wdGlvbnM6IGFueTtcbiAgICBwdWJsaWMgbG9jYXRpb246IGFueTtcbiAgICBwdWJsaWMgcmVnaW9uOiBhbnk7XG4gICAgcHVibGljIGNlbnRlcjogYW55O1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QpIHtcbiAgICAgICAgdGhpcy5pc0Jyb3dzZXIgPSBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIHNldHRpbmdzTG9hZGVkVHJhbnNmb3JtKHNldHRpbmdzID0ge30pIHtcbiAgICAgICAgY29uc3QgbmV3U2V0dGluZ3MgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBpdGVtIGluIHNldHRpbmdzKSB7XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3NbaXRlbV0pIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NldHRpbmdzW2l0ZW1dID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZShzZXR0aW5nc1tpdGVtXS5sYXRpdHVkZSwgc2V0dGluZ3NbaXRlbV0ubG9uZ2l0dWRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdyZWdpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uQ2VudGVyID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZShzZXR0aW5nc1tpdGVtXS5jZW50ZXIubGF0aXR1ZGUsIHNldHRpbmdzW2l0ZW1dLmNlbnRlci5sb25naXR1ZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzW2l0ZW1dLnNwYW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWdpb25TcGFuID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZVNwYW4oc2V0dGluZ3NbaXRlbV0uc3Bhbi5mcm9tLCBzZXR0aW5nc1tpdGVtXS5zcGFuLnRvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdTZXR0aW5nc1tpdGVtXSA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVSZWdpb24ocmVnaW9uQ2VudGVyLCByZWdpb25TcGFuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NldHRpbmdzW2l0ZW1dID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZVJlZ2lvbihyZWdpb25DZW50ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3BhZGRpbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2V0dGluZ3NbaXRlbV0gPSBuZXcgd2luZG93Lm1hcGtpdC5QYWRkaW5nKHNldHRpbmdzW2l0ZW1dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2V0dGluZ3NbaXRlbV0gPSBzZXR0aW5nc1tpdGVtXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3U2V0dGluZ3M7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXQob3B0aW9uczogTWFwS2l0SW5pdE9wdGlvbnMsIHNldHRpbmdzOiBNYXBDb25zdHJ1Y3Rvck9wdGlvbnMgPSB7fSwgY2IgPSAoZGF0YTogTWFwS2l0TG9hZGVkKSA9PiB7XG4gICAgfSkge1xuICAgICAgICBpZiAoIW9wdGlvbnMuSldUIHx8ICF0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhzZXR0aW5ncykubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm1hcHNRdWV1ZS5wdXNoKHtzZXR0aW5ncywgY2J9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCA9PT0gJ1NUT1BQRUQnKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gJ1BFTkRJTkcnO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICAgIHdpbmRvdy5tYXBraXQuaW5pdCh7XG4gICAgICAgICAgICAgICAgYXV0aG9yaXphdGlvbkNhbGxiYWNrOiAoZG9uZTogKHRva2VuOiBzdHJpbmcpID0+IHZvaWQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZG9uZShvcHRpb25zLkpXVCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsYW5ndWFnZTogb3B0aW9ucy5sYW5ndWFnZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmFkZE1hcEluaXRPcHRpb25zTGlzdGVuZXJzKG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkID09PSAnRklOSVNIRUQnKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1hcHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlTWFwcygpIHtcbiAgICAgICAgY29uc3QgbWFwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ25neC1hcHBsZS1tYXBraXQnKTtcbiAgICAgICAgbWFwcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWFwQ29udGFpbmVyID0gZWxlbWVudC5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAoIW1hcENvbnRhaW5lci5pbm5lckhUTUwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU1hcChtYXBDb250YWluZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlTWFwKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm1hcHNRdWV1ZS5zaGlmdCgpO1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMubWFwcy5wdXNoKG5ldyB3aW5kb3cubWFwa2l0Lk1hcChlbGVtZW50LCBBcHBsZU1hcHNTZXJ2aWNlLnNldHRpbmdzTG9hZGVkVHJhbnNmb3JtKG9wdGlvbnMuc2V0dGluZ3MpKSk7XG4gICAgICAgIGNvbnN0IG9iamVjdDogTWFwS2l0TG9hZGVkID0ge1xuICAgICAgICAgICAga2V5OiBpbmRleCAtIDEsXG4gICAgICAgICAgICBtYXA6IHRoaXMubWFwc1tpbmRleCAtIDFdLFxuICAgICAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcjogKHR5cGUsIGxpc3RlbmVyLCBjb250ZXh0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0eXBlIHx8ICFsaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1R5cGUgYW5kIGxpc3RlbmVyIGFyZSByZXF1aXJlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCA8YW55Pmxpc3RlbmVyLCBjb250ZXh0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc1JvdGF0aW9uQXZhaWxhYmxlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLmlzUm90YXRpb25BdmFpbGFibGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNSb3RhdGlvbkVuYWJsZWQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uaXNSb3RhdGlvbkVuYWJsZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNTY3JvbGxFbmFibGVkOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLmlzU2Nyb2xsRW5hYmxlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc1pvb21FbmFibGVkOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLmlzWm9vbUVuYWJsZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0Q2VudGVyOiAoKTogQ29vcmRpbmF0ZXNJbnRlcmZhY2UgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtsYXRpdHVkZSwgbG9uZ2l0dWRlfSA9IHRoaXMubWFwc1tpbmRleCAtIDFdLmNlbnRlcjtcbiAgICAgICAgICAgICAgICByZXR1cm4ge2xhdGl0dWRlLCBsb25naXR1ZGV9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHNldENlbnRlcjogKGxhdGl0dWRlOiBudW1iZXIsIGxvbmdpdHVkZTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAvLyAgIHRoaXMubWFwc1tpbmRleCAtIDFdLmNlbnRlciA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUobGF0aXR1ZGUsIGxvbmdpdHVkZSk7XG4gICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAgc2V0Q2VudGVyQW5pbWF0ZWQ6IChsYXRpdHVkZTogbnVtYmVyLCBsb25naXR1ZGU6IG51bWJlciwgYW5pbWF0ZTogYm9vbGVhbiA9IHRydWUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zZXRDZW50ZXJBbmltYXRlZChuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlKGxhdGl0dWRlLCBsb25naXR1ZGUpLCBhbmltYXRlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRSZWdpb246ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0ucmVnaW9uO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFJlZ2lvbkFuaW1hdGVkOiAoY2VudGVyOiBDb29yZGluYXRlc0ludGVyZmFjZSwgc3BhbjogU3BhbkludGVyZmFjZSA9IG51bGwsIGFuaW1hdGU6IGJvb2xlYW4gPSB0cnVlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uQ2VudGVyID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZShjZW50ZXIubGF0aXR1ZGUsIGNlbnRlci5sb25naXR1ZGUpO1xuICAgICAgICAgICAgICAgIGlmIChzcGFuKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvblNwYW4gPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlU3BhbihzcGFuLmZyb20sIHNwYW4udG8pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zZXRSZWdpb25BbmltYXRlZChuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlUmVnaW9uKHJlZ2lvbkNlbnRlciwgcmVnaW9uU3BhbiksIGFuaW1hdGUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNldFJlZ2lvbkFuaW1hdGVkKG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVSZWdpb24ocmVnaW9uQ2VudGVyKSwgYW5pbWF0ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0Um90YXRpb246ICgpOiBudW1iZXIgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5yb3RhdGlvbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRSb3RhdGlvbkFuaW1hdGVkOiAoZGVncmVlczogbnVtYmVyLCBhbmltYXRlOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNldFJvdGF0aW9uQW5pbWF0ZWQoZGVncmVlcywgYW5pbWF0ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gZ2V0VmlzaWJsZU1hcFJlY3Q6ICgpID0+IHtcbiAgICAgICAgICAgIC8vICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnZpc2libGVNYXBzUmVjdDtcbiAgICAgICAgICAgIC8vIH0sICAgICAgLy8gc2V0VmlzaWJsZU1hcFJlY3RBbmltYXRlZDogKCkgPT4ge1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgZ2V0Q2FtZXJhRGlzdGFuY2U6ICgpOiBudW1iZXIgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5jYW1lcmFEaXN0YW5jZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRDYW1lcmFEaXN0YW5jZUFuaW1hdGVkOiAoZGlzdGFuY2U6IG51bWJlciwgYW5pbWF0ZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zZXRDYW1lcmFEaXN0YW5jZUFuaW1hdGVkKGRpc3RhbmNlLCBhbmltYXRlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRDYW1lcmFab29tUmFuZ2U6ICgpOiBNYXBLaXRHZXRDYW1lcmFab29tUmFuZ2UgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHttaW5DYW1lcmFEaXN0YW5jZSwgbWF4Q2FtZXJhRGlzdGFuY2V9ID0gdGhpcy5tYXBzW2luZGV4IC0gMV0uY2FtZXJhWm9vbVJhbmdlO1xuICAgICAgICAgICAgICAgIHJldHVybiB7bWluQ2FtZXJhRGlzdGFuY2UsIG1heENhbWVyYURpc3RhbmNlfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRDYW1lcmFab29tUmFuZ2VBbmltYXRlZDogKG1pbkNhbWVyYURpc3RhbmNlLCBtYXhDYW1lcmFEaXN0YW5jZSwgYW5pbWF0ZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zZXRDYW1lcmFab29tUmFuZ2VBbmltYXRlZChuZXcgd2luZG93Lm1hcGtpdC5DYW1lcmFab29tUmFuZ2UobWluQ2FtZXJhRGlzdGFuY2UsIG1heENhbWVyYURpc3RhbmNlKSwgYW5pbWF0ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0Q29sb3JTY2hlbWU6ICgpOiBzdHJpbmcgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5jb2xvclNjaGVtZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRDb2xvclNjaGVtZTogKHNjaGVtZTogU2NoZW1lU3RyaW5nID0gJ2xpZ2h0JykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLmNvbG9yU2NoZW1lID0gc2NoZW1lO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldERpc3RhbmNlczogKCk6IERpc3RhbmNlc1N0cmluZyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxhbnk+dGhpcy5tYXBzW2luZGV4IC0gMV0uZGlzdGFuY2VzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldERpc3RhbmNlczogKGRpc3RhbmNlOiBEaXN0YW5jZXNTdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5kaXN0YW5jZXMgPSBkaXN0YW5jZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRNYXBUeXBlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxhbnk+dGhpcy5tYXBzW2luZGV4IC0gMV0ubWFwVHlwZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRNYXBUeXBlOiAodHlwZTogTWFwVHlwZVN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLm1hcFR5cGUgPSB0eXBlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFBhZGRpbmc6ICgpOiBvYmplY3QgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5wYWRkaW5nO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFBhZGRpbmc6IChwYWRkaW5nOiBQYWRkaW5nSW50ZXJmYWNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0ucGFkZGluZyA9IG5ldyB3aW5kb3cubWFwa2l0LlBhZGRpbmcocGFkZGluZyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0U2hvd3NNYXBUeXBlQ29udHJvbDogKCk6IGJvb2xlYW4gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c01hcFR5cGVDb250cm9sO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFNob3dzTWFwVHlwZUNvbnRyb2w6ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzTWFwVHlwZUNvbnRyb2wgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRTaG93c1pvb21Db250cm9sOiAoKTogYm9vbGVhbiA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzWm9vbUNvbnRyb2w7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0U2hvd3Nab29tQ29udHJvbDogKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3Nab29tQ29udHJvbCA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFNob3dzVXNlckxvY2F0aW9uQ29udHJvbDogKCk6IGJvb2xlYW4gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1VzZXJMb2NhdGlvbkNvbnRyb2w7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0U2hvd3NVc2VyTG9jYXRpb25Db250cm9sOiAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1VzZXJMb2NhdGlvbkNvbnRyb2wgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRTaG93c1BvaW50c09mSW50ZXJlc3Q6ICgpOiBib29sZWFuID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NQb2ludHNPZkludGVyZXN0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFNob3dzUG9pbnRzT2ZJbnRlcmVzdDogKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NQb2ludHNPZkludGVyZXN0ID0gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0U2hvd3NTY2FsZTogKCk6IFNob3dzU2NhbGVTdHJpbmcgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiA8YW55PnRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzU2NhbGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0U2hvd3NTY2FsZTogKHZhbHVlOiBTaG93c1NjYWxlU3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NTY2FsZSA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFRpbnRDb2xvcjogKCk6IHN0cmluZyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnRpbnRDb2xvcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRUaW50Q29sb3I6IChjb2xvcjogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0udGludENvbG9yID0gY29sb3I7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2hvd0l0ZW1zOiAoaXRlbXMsIG1hcFNob3dJdGVtT3B0aW9uczogTWFwU2hvd0l0ZW1PcHRpb25zSW50ZXJmYWNlID0ge30pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXNzaW5nT3B0aW9ucyA9IHthbmltYXRlOiBvcHRpb25zLmFuaW1hdGUgfHwgdHJ1ZX07XG4gICAgICAgICAgICAgICAgaWYgKG1hcFNob3dJdGVtT3B0aW9ucy5zcGFuKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgcGFzc2luZ09wdGlvbnMubWluaW11bVNwYW4gPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlU3BhbihtYXBTaG93SXRlbU9wdGlvbnMuc3Bhbi5mcm9tLCBtYXBTaG93SXRlbU9wdGlvbnMuc3Bhbi50byk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChtYXBTaG93SXRlbU9wdGlvbnMucGFkZGluZykge1xuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIHBhc3NpbmdPcHRpb25zLnBhZGRpbmcgPSBuZXcgd2luZG93Lm1hcGtpdC5QYWRkaW5nKG1hcFNob3dJdGVtT3B0aW9ucy5wYWRkaW5nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcGFzc2luZ0l0ZW1zID0gQXJyYXkuaXNBcnJheShpdGVtcykgPyBpdGVtcyA6IFtpdGVtc107XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd0l0ZW1zKHBhc3NpbmdJdGVtcywgcGFzc2luZ09wdGlvbnMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldEFubm90YXRpb25zOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbm5vdGF0aW9uc1tpbmRleCAtIDFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuYW5ub3RhdGlvbnNbaW5kZXggLSAxXSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbm5vdGF0aW9uc1tpbmRleCAtIDFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5hbm5vdGF0aW9uc1tpbmRleCAtIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHRoaXMuYW5ub3RhdGlvbnNbaW5kZXggLSAxXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRTZWxlY3RlZEFubm90YXRpb25zOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnNlbGVjdGVkQW5ub3RhdGlvbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgc2hvd3NDb21wYXNzKHZhbHVlOiBNYXBLaXRDb21wYXNzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NDb21wYXNzID0gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0IHNob3dzQ29tcGFzcygpOiBNYXBLaXRDb21wYXNzIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NDb21wYXNzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldCBzaG93c01hcFR5cGVDb250cm9sKCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c01hcFR5cGVDb250cm9sO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCBzaG93c01hcFR5cGVDb250cm9sKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NNYXBUeXBlQ29udHJvbCA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldCBzaG93c1pvb21Db250cm9sKCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1pvb21Db250cm9sO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCBzaG93c1pvb21Db250cm9sKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3Nab29tQ29udHJvbCA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldCBzaG93c1VzZXJMb2NhdGlvbkNvbnRyb2woKTogYm9vbGVhbiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzVXNlckxvY2F0aW9uQ29udHJvbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgc2hvd3NVc2VyTG9jYXRpb25Db250cm9sKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NVc2VyTG9jYXRpb25Db250cm9sID0gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0IHNob3dzUG9pbnRzT2ZJbnRlcmVzdCgpOiBib29sZWFuIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NQb2ludHNPZkludGVyZXN0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCBzaG93c1BvaW50c09mSW50ZXJlc3QodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1BvaW50c09mSW50ZXJlc3QgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQgdGludENvbG9yKCk6IHN0cmluZyB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnRpbnRDb2xvcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgdGludENvbG9yKGNvbG9yOiBzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS50aW50Q29sb3IgPSBjb2xvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgb3B0aW9ucy5jYihvYmplY3QpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkTWFwSW5pdE9wdGlvbnNMaXN0ZW5lcnMob3B0aW9ucykge1xuICAgICAgICB3aW5kb3cubWFwa2l0LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbmZpZ3VyYXRpb24tY2hhbmdlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5jYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuY2FsbGJhY2soZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoIChldmVudC5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdJbml0aWFsaXplZCc6XG4gICAgICAgICAgICAgICAgICAgIC8vIE1hcEtpdCBKUyBpbml0aWFsaXplZCBhbmQgY29uZmlndXJlZC5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9ICdGSU5JU0hFRCc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTWFwcygpO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmNyZWF0ZU1hcChzZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1JlZnJlc2hlZCc6XG4gICAgICAgICAgICAgICAgICAgIC8vIE1hcEtpdCBKUyBjb25maWd1cmF0aW9uIHVwZGF0ZWQuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgd2luZG93Lm1hcGtpdC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9ICdTVE9QUEVEJztcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5jYWxsYmFjayhldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRVc2VyTG9jYXRpb24odGltZW91dCA9IDUwMDApIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb24gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSwge3RpbWVvdXR9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9wdGlvbnNDaGFuZ2VkKGNoYW5nZXMpIHtcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoSXRlbSgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0ucHJldmlvdXNWYWx1ZSAhPT0gaXRlbS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGl0ZW0ua2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2xhbmd1YWdlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5tYXBraXQubGFuZ3VhZ2UgPSBpdGVtLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdKV1QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXR0aW5nc0NoYW5nZWQoY2hhbmdlczogYW55LCBrZXk6IGFueSkge1xuICAgICAgICBpZiAoa2V5ID49IDApIHtcbiAgICAgICAgICAgIGNoYW5nZXMuZm9yRWFjaEl0ZW0oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5wcmV2aW91c1ZhbHVlICE9PSBpdGVtLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGl0ZW0ua2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjb2xvclNjaGVtZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBzW2tleV1baXRlbS5rZXldID0gaXRlbS5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwc1trZXldLnNldENlbnRlckFuaW1hdGVkKG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUoaXRlbS5jdXJyZW50VmFsdWUubGF0aXR1ZGUsIGl0ZW0uY3VycmVudFZhbHVlLmxvbmdpdHVkZSksIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVnaW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uQ2VudGVyID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZShpdGVtLmN1cnJlbnRWYWx1ZS5jZW50ZXIubGF0aXR1ZGUsIGl0ZW0uY3VycmVudFZhbHVlLmNlbnRlci5sb25naXR1ZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmN1cnJlbnRWYWx1ZS5zcGFuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvblNwYW4gPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlU3BhbihpdGVtLmN1cnJlbnRWYWx1ZS5zcGFuLmZyb20sIGl0ZW0uY3VycmVudFZhbHVlLnNwYW4udG8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHNba2V5XS5zZXRSZWdpb25BbmltYXRlZChuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlUmVnaW9uKHJlZ2lvbkNlbnRlciwgcmVnaW9uU3BhbikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBzW2tleV0uc2V0UmVnaW9uQW5pbWF0ZWQobmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZVJlZ2lvbihyZWdpb25DZW50ZXIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3BhZGRpbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwc1trZXldID0gbmV3IHdpbmRvdy5tYXBraXQuUGFkZGluZyhpdGVtLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwc1trZXldW2l0ZW0ua2V5XSA9IGl0ZW0uY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0QW5ub3RhdGlvbihhbm5vdGF0aW9uOiBhbnksIGtleTogYW55KSB7XG4gICAgICAgIGlmICghdGhpcy5hbm5vdGF0aW9uc1trZXldKSB7XG4gICAgICAgICAgICB0aGlzLmFubm90YXRpb25zW2tleV0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuYW5ub3RhdGlvbnNba2V5XS5pbmNsdWRlcyhhbm5vdGF0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5hbm5vdGF0aW9uc1trZXldLnB1c2goYW5ub3RhdGlvbik7XG4gICAgICAgICAgICB0aGlzLm1hcHNba2V5XS5hZGRBbm5vdGF0aW9uKGFubm90YXRpb24pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4iXX0=
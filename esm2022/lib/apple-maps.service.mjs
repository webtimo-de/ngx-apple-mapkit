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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGUtbWFwcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFwcGxlLW1hcGtpdC9zcmMvbGliL2FwcGxlLW1hcHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0saUJBQWlCLENBQUM7O0FBeUJsRCxNQUFNLE9BQU8sZ0JBQWdCO0lBV3pCLFlBQXlDLFVBQWtCO1FBQWxCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFUcEQsU0FBSSxHQUFpQixFQUFFLENBQUM7UUFDeEIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLGdCQUFXLEdBQUcsU0FBUyxDQUFDO1FBQ3hCLGdCQUFXLEdBQXVDLEVBQUUsQ0FBQztRQU94RCxJQUFJLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRU8sTUFBTSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsR0FBRyxFQUFFO1FBQ2hELE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN2QixLQUFLLE1BQU0sSUFBSSxJQUFJLFFBQVEsRUFBRTtZQUN6QixJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDaEIsUUFBUSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxRQUFRO3dCQUNULFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUNwRyxNQUFNO29CQUNWLEtBQUssUUFBUTt3QkFDVCxNQUFNLFlBQVksR0FBRyxJQUFJLE1B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RyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzdDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzVDO0lBQ0wsQ0FBQzs4R0FwWFEsZ0JBQWdCLGtCQVdMLFdBQVc7a0hBWHRCLGdCQUFnQixjQURKLE1BQU07OzJGQUNsQixnQkFBZ0I7a0JBRDVCLFVBQVU7bUJBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzswQkFZZixNQUFNOzJCQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgUExBVEZPUk1fSUR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge2lzUGxhdGZvcm1Ccm93c2VyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge1xyXG4gICAgQ29vcmRpbmF0ZXNJbnRlcmZhY2UsXHJcbiAgICBEaXN0YW5jZXNTdHJpbmcsXHJcbiAgICBNYXBDb25zdHJ1Y3Rvck9wdGlvbnMsXHJcbiAgICBNYXBLaXRDb21wYXNzLFxyXG4gICAgTWFwS2l0R2V0Q2FtZXJhWm9vbVJhbmdlLFxyXG4gICAgTWFwS2l0SW5pdE9wdGlvbnMsXHJcbiAgICBNYXBLaXRMb2FkZWQsXHJcbiAgICBNYXBTaG93SXRlbU9wdGlvbnNJbnRlcmZhY2UsXHJcbiAgICBNYXBUeXBlU3RyaW5nLFxyXG4gICAgUGFkZGluZ0ludGVyZmFjZSxcclxuICAgIFNjaGVtZVN0cmluZyxcclxuICAgIFNob3dzU2NhbGVTdHJpbmcsXHJcbiAgICBTcGFuSW50ZXJmYWNlXHJcbn0gZnJvbSBcIi4vZGVjbGFyYXRpb25zXCI7XHJcbmltcG9ydCB7TWFwS2l0fSBmcm9tIFwiLi9tYXBraXRcIjtcclxuXHJcbmRlY2xhcmUgZ2xvYmFsIHtcclxuICAgIGludGVyZmFjZSBXaW5kb3cge1xyXG4gICAgICAgIG1hcGtpdDogYW55O1xyXG4gICAgfVxyXG59XHJcblxyXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcclxuZXhwb3J0IGNsYXNzIEFwcGxlTWFwc1NlcnZpY2Uge1xyXG4gICAgcHVibGljIGlzQnJvd3NlcjogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBtYXBzOiBNYXBLaXQuTWFwW10gPSBbXTtcclxuICAgIHB1YmxpYyBtYXBzUXVldWUgPSBbXTtcclxuICAgIHB1YmxpYyBpbml0aWFsaXplZCA9ICdTVE9QUEVEJztcclxuICAgIHB1YmxpYyBhbm5vdGF0aW9uczoge1tzOiBudW1iZXJdOiBNYXBLaXQuQW5ub3RhdGlvbltdfSA9IHt9O1xyXG4gICAgcHJpdmF0ZSBvcHRpb25zOiBhbnk7XHJcbiAgICBwdWJsaWMgbG9jYXRpb246IGFueTtcclxuICAgIHB1YmxpYyByZWdpb246IGFueTtcclxuICAgIHB1YmxpYyBjZW50ZXI6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCkge1xyXG4gICAgICAgIHRoaXMuaXNCcm93c2VyID0gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBzZXR0aW5nc0xvYWRlZFRyYW5zZm9ybShzZXR0aW5ncyA9IHt9KSB7XHJcbiAgICAgICAgY29uc3QgbmV3U2V0dGluZ3MgPSB7fTtcclxuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gaW4gc2V0dGluZ3MpIHtcclxuICAgICAgICAgICAgaWYgKHNldHRpbmdzW2l0ZW1dKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdjZW50ZXInOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTZXR0aW5nc1tpdGVtXSA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUoc2V0dGluZ3NbaXRlbV0ubGF0aXR1ZGUsIHNldHRpbmdzW2l0ZW1dLmxvbmdpdHVkZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlZ2lvbic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvbkNlbnRlciA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUoc2V0dGluZ3NbaXRlbV0uY2VudGVyLmxhdGl0dWRlLCBzZXR0aW5nc1tpdGVtXS5jZW50ZXIubG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzW2l0ZW1dLnNwYW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvblNwYW4gPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlU3BhbihzZXR0aW5nc1tpdGVtXS5zcGFuLmZyb20sIHNldHRpbmdzW2l0ZW1dLnNwYW4udG8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2V0dGluZ3NbaXRlbV0gPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlUmVnaW9uKHJlZ2lvbkNlbnRlciwgcmVnaW9uU3Bhbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTZXR0aW5nc1tpdGVtXSA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVSZWdpb24ocmVnaW9uQ2VudGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncGFkZGluZyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NldHRpbmdzW2l0ZW1dID0gbmV3IHdpbmRvdy5tYXBraXQuUGFkZGluZyhzZXR0aW5nc1tpdGVtXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NldHRpbmdzW2l0ZW1dID0gc2V0dGluZ3NbaXRlbV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXdTZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdChvcHRpb25zOiBNYXBLaXRJbml0T3B0aW9ucywgc2V0dGluZ3M6IE1hcENvbnN0cnVjdG9yT3B0aW9ucyA9IHt9LCBjYiA9IChkYXRhOiBNYXBLaXRMb2FkZWQpID0+IHtcclxuICAgIH0pIHtcclxuICAgICAgICBpZiAoIW9wdGlvbnMuSldUIHx8ICF0aGlzLmlzQnJvd3Nlcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhzZXR0aW5ncykubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwc1F1ZXVlLnB1c2goe3NldHRpbmdzLCBjYn0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCA9PT0gJ1NUT1BQRUQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSAnUEVORElORyc7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICAgICAgICAgIHdpbmRvdy5tYXBraXQuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICBhdXRob3JpemF0aW9uQ2FsbGJhY2s6IChkb25lOiAodG9rZW46IHN0cmluZykgPT4gdm9pZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbmUob3B0aW9ucy5KV1QpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGxhbmd1YWdlOiBvcHRpb25zLmxhbmd1YWdlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmFkZE1hcEluaXRPcHRpb25zTGlzdGVuZXJzKG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCA9PT0gJ0ZJTklTSEVEJykge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1hcHMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVNYXBzKCkge1xyXG4gICAgICAgIGNvbnN0IG1hcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCduZ3gtYXBwbGUtbWFwa2l0Jyk7XHJcbiAgICAgICAgbWFwcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBtYXBDb250YWluZXIgPSBlbGVtZW50LmNoaWxkTm9kZXNbMF0uY2hpbGROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICAgICAgaWYgKCFtYXBDb250YWluZXIuaW5uZXJIVE1MKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU1hcChtYXBDb250YWluZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZU1hcChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm1hcHNRdWV1ZS5zaGlmdCgpO1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5tYXBzLnB1c2gobmV3IHdpbmRvdy5tYXBraXQuTWFwKGVsZW1lbnQsIEFwcGxlTWFwc1NlcnZpY2Uuc2V0dGluZ3NMb2FkZWRUcmFuc2Zvcm0ob3B0aW9ucy5zZXR0aW5ncykpKTtcclxuICAgICAgICBjb25zdCBvYmplY3Q6IE1hcEtpdExvYWRlZCA9IHtcclxuICAgICAgICAgICAga2V5OiBpbmRleCAtIDEsXHJcbiAgICAgICAgICAgIG1hcDogdGhpcy5tYXBzW2luZGV4IC0gMV0sXHJcbiAgICAgICAgICAgIGFkZEV2ZW50TGlzdGVuZXI6ICh0eXBlLCBsaXN0ZW5lciwgY29udGV4dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0eXBlIHx8ICFsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVHlwZSBhbmQgbGlzdGVuZXIgYXJlIHJlcXVpcmVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCA8YW55Pmxpc3RlbmVyLCBjb250ZXh0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaXNSb3RhdGlvbkF2YWlsYWJsZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLmlzUm90YXRpb25BdmFpbGFibGU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGlzUm90YXRpb25FbmFibGVkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uaXNSb3RhdGlvbkVuYWJsZWQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGlzU2Nyb2xsRW5hYmxlZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLmlzU2Nyb2xsRW5hYmxlZDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaXNab29tRW5hYmxlZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLmlzWm9vbUVuYWJsZWQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldENlbnRlcjogKCk6IENvb3JkaW5hdGVzSW50ZXJmYWNlID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHtsYXRpdHVkZSwgbG9uZ2l0dWRlfSA9IHRoaXMubWFwc1tpbmRleCAtIDFdLmNlbnRlcjtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7bGF0aXR1ZGUsIGxvbmdpdHVkZX07XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIHNldENlbnRlcjogKGxhdGl0dWRlOiBudW1iZXIsIGxvbmdpdHVkZTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uY2VudGVyID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZShsYXRpdHVkZSwgbG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgLy8gfSxcclxuICAgICAgICAgICAgc2V0Q2VudGVyQW5pbWF0ZWQ6IChsYXRpdHVkZTogbnVtYmVyLCBsb25naXR1ZGU6IG51bWJlciwgYW5pbWF0ZTogYm9vbGVhbiA9IHRydWUpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNldENlbnRlckFuaW1hdGVkKG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUobGF0aXR1ZGUsIGxvbmdpdHVkZSksIGFuaW1hdGUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRSZWdpb246ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5yZWdpb247XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldFJlZ2lvbkFuaW1hdGVkOiAoY2VudGVyOiBDb29yZGluYXRlc0ludGVyZmFjZSwgc3BhbjogU3BhbkludGVyZmFjZSA9IG51bGwsIGFuaW1hdGU6IGJvb2xlYW4gPSB0cnVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZWdpb25DZW50ZXIgPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlKGNlbnRlci5sYXRpdHVkZSwgY2VudGVyLmxvbmdpdHVkZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3Bhbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvblNwYW4gPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlU3BhbihzcGFuLmZyb20sIHNwYW4udG8pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNldFJlZ2lvbkFuaW1hdGVkKG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVSZWdpb24ocmVnaW9uQ2VudGVyLCByZWdpb25TcGFuKSwgYW5pbWF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2V0UmVnaW9uQW5pbWF0ZWQobmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZVJlZ2lvbihyZWdpb25DZW50ZXIpLCBhbmltYXRlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0Um90YXRpb246ICgpOiBudW1iZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnJvdGF0aW9uO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXRSb3RhdGlvbkFuaW1hdGVkOiAoZGVncmVlczogbnVtYmVyLCBhbmltYXRlOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2V0Um90YXRpb25BbmltYXRlZChkZWdyZWVzLCBhbmltYXRlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gZ2V0VmlzaWJsZU1hcFJlY3Q6ICgpID0+IHtcclxuICAgICAgICAgICAgLy8gICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0udmlzaWJsZU1hcHNSZWN0O1xyXG4gICAgICAgICAgICAvLyB9LCAgICAgIC8vIHNldFZpc2libGVNYXBSZWN0QW5pbWF0ZWQ6ICgpID0+IHtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBnZXRDYW1lcmFEaXN0YW5jZTogKCk6IG51bWJlciA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uY2FtZXJhRGlzdGFuY2U7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldENhbWVyYURpc3RhbmNlQW5pbWF0ZWQ6IChkaXN0YW5jZTogbnVtYmVyLCBhbmltYXRlOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2V0Q2FtZXJhRGlzdGFuY2VBbmltYXRlZChkaXN0YW5jZSwgYW5pbWF0ZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldENhbWVyYVpvb21SYW5nZTogKCk6IE1hcEtpdEdldENhbWVyYVpvb21SYW5nZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7bWluQ2FtZXJhRGlzdGFuY2UsIG1heENhbWVyYURpc3RhbmNlfSA9IHRoaXMubWFwc1tpbmRleCAtIDFdLmNhbWVyYVpvb21SYW5nZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7bWluQ2FtZXJhRGlzdGFuY2UsIG1heENhbWVyYURpc3RhbmNlfTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0Q2FtZXJhWm9vbVJhbmdlQW5pbWF0ZWQ6IChtaW5DYW1lcmFEaXN0YW5jZSwgbWF4Q2FtZXJhRGlzdGFuY2UsIGFuaW1hdGU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zZXRDYW1lcmFab29tUmFuZ2VBbmltYXRlZChuZXcgd2luZG93Lm1hcGtpdC5DYW1lcmFab29tUmFuZ2UobWluQ2FtZXJhRGlzdGFuY2UsIG1heENhbWVyYURpc3RhbmNlKSwgYW5pbWF0ZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldENvbG9yU2NoZW1lOiAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5jb2xvclNjaGVtZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0Q29sb3JTY2hlbWU6IChzY2hlbWU6IFNjaGVtZVN0cmluZyA9ICdsaWdodCcpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLmNvbG9yU2NoZW1lID0gc2NoZW1lO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXREaXN0YW5jZXM6ICgpOiBEaXN0YW5jZXNTdHJpbmcgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxhbnk+dGhpcy5tYXBzW2luZGV4IC0gMV0uZGlzdGFuY2VzO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXREaXN0YW5jZXM6IChkaXN0YW5jZTogRGlzdGFuY2VzU3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5kaXN0YW5jZXMgPSBkaXN0YW5jZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0TWFwVHlwZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxhbnk+dGhpcy5tYXBzW2luZGV4IC0gMV0ubWFwVHlwZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0TWFwVHlwZTogKHR5cGU6IE1hcFR5cGVTdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLm1hcFR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRQYWRkaW5nOiAoKTogb2JqZWN0ID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5wYWRkaW5nO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXRQYWRkaW5nOiAocGFkZGluZzogUGFkZGluZ0ludGVyZmFjZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0ucGFkZGluZyA9IG5ldyB3aW5kb3cubWFwa2l0LlBhZGRpbmcocGFkZGluZyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldFNob3dzTWFwVHlwZUNvbnRyb2w6ICgpOiBib29sZWFuID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c01hcFR5cGVDb250cm9sO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXRTaG93c01hcFR5cGVDb250cm9sOiAodmFsdWU6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzTWFwVHlwZUNvbnRyb2wgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0U2hvd3Nab29tQ29udHJvbDogKCk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzWm9vbUNvbnRyb2w7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldFNob3dzWm9vbUNvbnRyb2w6ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3Nab29tQ29udHJvbCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRTaG93c1VzZXJMb2NhdGlvbkNvbnRyb2w6ICgpOiBib29sZWFuID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1VzZXJMb2NhdGlvbkNvbnRyb2w7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldFNob3dzVXNlckxvY2F0aW9uQ29udHJvbDogKHZhbHVlOiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1VzZXJMb2NhdGlvbkNvbnRyb2wgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0U2hvd3NQb2ludHNPZkludGVyZXN0OiAoKTogYm9vbGVhbiA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NQb2ludHNPZkludGVyZXN0O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXRTaG93c1BvaW50c09mSW50ZXJlc3Q6ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NQb2ludHNPZkludGVyZXN0ID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldFNob3dzU2NhbGU6ICgpOiBTaG93c1NjYWxlU3RyaW5nID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiA8YW55PnRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzU2NhbGU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldFNob3dzU2NhbGU6ICh2YWx1ZTogU2hvd3NTY2FsZVN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NTY2FsZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXRUaW50Q29sb3I6ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnRpbnRDb2xvcjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0VGludENvbG9yOiAoY29sb3I6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0udGludENvbG9yID0gY29sb3I7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNob3dJdGVtczogKGl0ZW1zLCBtYXBTaG93SXRlbU9wdGlvbnM6IE1hcFNob3dJdGVtT3B0aW9uc0ludGVyZmFjZSA9IHt9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXNzaW5nT3B0aW9ucyA9IHthbmltYXRlOiBvcHRpb25zLmFuaW1hdGUgfHwgdHJ1ZX07XHJcbiAgICAgICAgICAgICAgICBpZiAobWFwU2hvd0l0ZW1PcHRpb25zLnNwYW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgcGFzc2luZ09wdGlvbnMubWluaW11bVNwYW4gPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlU3BhbihtYXBTaG93SXRlbU9wdGlvbnMuc3Bhbi5mcm9tLCBtYXBTaG93SXRlbU9wdGlvbnMuc3Bhbi50byk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobWFwU2hvd0l0ZW1PcHRpb25zLnBhZGRpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgcGFzc2luZ09wdGlvbnMucGFkZGluZyA9IG5ldyB3aW5kb3cubWFwa2l0LlBhZGRpbmcobWFwU2hvd0l0ZW1PcHRpb25zLnBhZGRpbmcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFzc2luZ0l0ZW1zID0gQXJyYXkuaXNBcnJheShpdGVtcykgPyBpdGVtcyA6IFtpdGVtc107XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93SXRlbXMocGFzc2luZ0l0ZW1zLCBwYXNzaW5nT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldEFubm90YXRpb25zOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5ub3RhdGlvbnNbaW5kZXggLSAxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuYW5ub3RhdGlvbnNbaW5kZXggLSAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hbm5vdGF0aW9uc1tpbmRleCAtIDFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmFubm90YXRpb25zW2luZGV4IC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFtdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIHJldHVybiB0aGlzLmFubm90YXRpb25zW2luZGV4IC0gMV07XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldFNlbGVjdGVkQW5ub3RhdGlvbnM6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5zZWxlY3RlZEFubm90YXRpb247XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCBzaG93c0NvbXBhc3ModmFsdWU6IE1hcEtpdENvbXBhc3MpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzQ29tcGFzcyA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXQgc2hvd3NDb21wYXNzKCk6IE1hcEtpdENvbXBhc3Mge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzQ29tcGFzcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0IHNob3dzTWFwVHlwZUNvbnRyb2woKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NNYXBUeXBlQ29udHJvbDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0IHNob3dzTWFwVHlwZUNvbnRyb2wodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzTWFwVHlwZUNvbnRyb2wgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0IHNob3dzWm9vbUNvbnRyb2woKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3Nab29tQ29udHJvbDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0IHNob3dzWm9vbUNvbnRyb2wodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzWm9vbUNvbnRyb2wgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0IHNob3dzVXNlckxvY2F0aW9uQ29udHJvbCgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1VzZXJMb2NhdGlvbkNvbnRyb2w7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCBzaG93c1VzZXJMb2NhdGlvbkNvbnRyb2wodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzVXNlckxvY2F0aW9uQ29udHJvbCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXQgc2hvd3NQb2ludHNPZkludGVyZXN0KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzUG9pbnRzT2ZJbnRlcmVzdDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0IHNob3dzUG9pbnRzT2ZJbnRlcmVzdCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NQb2ludHNPZkludGVyZXN0ID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldCB0aW50Q29sb3IoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS50aW50Q29sb3I7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCB0aW50Q29sb3IoY29sb3I6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0udGludENvbG9yID0gY29sb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIG9wdGlvbnMuY2Iob2JqZWN0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZE1hcEluaXRPcHRpb25zTGlzdGVuZXJzKG9wdGlvbnMpIHtcclxuICAgICAgICB3aW5kb3cubWFwa2l0LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbmZpZ3VyYXRpb24tY2hhbmdlJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLmNhbGxiYWNrKGV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LnN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnSW5pdGlhbGl6ZWQnOlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE1hcEtpdCBKUyBpbml0aWFsaXplZCBhbmQgY29uZmlndXJlZC5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gJ0ZJTklTSEVEJztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU1hcHMoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmNyZWF0ZU1hcChzZXR0aW5ncyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdSZWZyZXNoZWQnOlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE1hcEtpdCBKUyBjb25maWd1cmF0aW9uIHVwZGF0ZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB3aW5kb3cubWFwa2l0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSAnU1RPUFBFRCc7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLmNhbGxiYWNrKGV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRVc2VyTG9jYXRpb24odGltZW91dCA9IDUwMDApIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb24gPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0sIChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9LCB7dGltZW91dH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvcHRpb25zQ2hhbmdlZChjaGFuZ2VzKSB7XHJcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoSXRlbSgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5wcmV2aW91c1ZhbHVlICE9PSBpdGVtLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChpdGVtLmtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2xhbmd1YWdlJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Lm1hcGtpdC5sYW5ndWFnZSA9IGl0ZW0uY3VycmVudFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdKV1QnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXR0aW5nc0NoYW5nZWQoY2hhbmdlczogYW55LCBrZXk6IGFueSkge1xyXG4gICAgICAgIGlmIChrZXkgPj0gMCkge1xyXG4gICAgICAgICAgICBjaGFuZ2VzLmZvckVhY2hJdGVtKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5wcmV2aW91c1ZhbHVlICE9PSBpdGVtLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5rZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY29sb3JTY2hlbWUnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBzW2tleV1baXRlbS5rZXldID0gaXRlbS5jdXJyZW50VmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY2VudGVyJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwc1trZXldLnNldENlbnRlckFuaW1hdGVkKG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUoaXRlbS5jdXJyZW50VmFsdWUubGF0aXR1ZGUsIGl0ZW0uY3VycmVudFZhbHVlLmxvbmdpdHVkZSksIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlZ2lvbic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWdpb25DZW50ZXIgPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlKGl0ZW0uY3VycmVudFZhbHVlLmNlbnRlci5sYXRpdHVkZSwgaXRlbS5jdXJyZW50VmFsdWUuY2VudGVyLmxvbmdpdHVkZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5jdXJyZW50VmFsdWUuc3Bhbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvblNwYW4gPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlU3BhbihpdGVtLmN1cnJlbnRWYWx1ZS5zcGFuLmZyb20sIGl0ZW0uY3VycmVudFZhbHVlLnNwYW4udG8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwc1trZXldLnNldFJlZ2lvbkFuaW1hdGVkKG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVSZWdpb24ocmVnaW9uQ2VudGVyLCByZWdpb25TcGFuKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHNba2V5XS5zZXRSZWdpb25BbmltYXRlZChuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlUmVnaW9uKHJlZ2lvbkNlbnRlcikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3BhZGRpbmcnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBzW2tleV0gPSBuZXcgd2luZG93Lm1hcGtpdC5QYWRkaW5nKGl0ZW0uY3VycmVudFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBzW2tleV1baXRlbS5rZXldID0gaXRlbS5jdXJyZW50VmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0QW5ub3RhdGlvbihhbm5vdGF0aW9uOiBhbnksIGtleTogYW55KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmFubm90YXRpb25zW2tleV0pIHtcclxuICAgICAgICAgICAgdGhpcy5hbm5vdGF0aW9uc1trZXldID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5hbm5vdGF0aW9uc1trZXldLmluY2x1ZGVzKGFubm90YXRpb24pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5ub3RhdGlvbnNba2V5XS5wdXNoKGFubm90YXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLm1hcHNba2V5XS5hZGRBbm5vdGF0aW9uKGFubm90YXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuIl19
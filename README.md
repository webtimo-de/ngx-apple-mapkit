# Angular Apple Maps (mapkit.js)

[![npm-version](https://img.shields.io/npm/v/ngx-apple-mapkit.svg?label=npm)](https://www.npmjs.com/package/ngx-apple-mapkit)
![npm](https://img.shields.io/npm/dw/ngx-apple-mapkit)
[![license](https://img.shields.io/npm/l/ngx-apple-mapkit.svg)](https://github.com/webtimo-de/ngx-apple-mapkit/blob/master/LICENSE)

## Install 🌐

```shell
npm install ngx-apple-mapkit
```

## Demo ‍🧑‍💻

You can test it here:

https://projects.web-timo.de/preview/ngx-apple-mapkit

## Before you start 👀

[Generating JWT token](https://developer.apple.com/documentation/mapkitjs/creating_and_using_tokens_with_mapkit_js?changes=latest_minor)

For generating, you need:

- Team ID
- Maps ID
- MapKit key ID
- MapKit Private key

## Get started 🔥

1. Add to the `index.html` script including
   `<script src="https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js"></script>`
2. Add `AppleMapsModule` to imports in your `app.module.ts`

## Map(s) creation ✅

1. Define `options: MapKitInitOptions` in your `*.component.ts`
   file (have to look on [**MapKitInitOptions**](###mapkitinitoptions))
2. Define `settings: MapConstructorOptions` (optional) (have to loon on MapConstructorOptions)
3. Add `<ngx-apple-mapkit [options]="options" [settings]="settings"></ngx-apple-mapkit>` in your `*.component.html`

#### Annotations (markers)

Insert into `ngx-apple-mapkit` tag following code:

```angular2html
<ngx-apple-mapkit-annotation
        [latitude]="latitude"
        [longitude]="longitude"
></ngx-apple-mapkit-annotation>
```

**OR**

```angular2html
<ngx-apple-mapkit-annotation
        *ngFor="const annotation of annotations"
        [latitude]="annotation.latitude"
        [longitude]="annotation.longitude"
></ngx-apple-mapkit-annotation>
```

`latitude` and `longitude` is **required**.

You can provide additional `annotationOptions: AnnotationConstructorOptionsInterface` param for each annotation

```angular2html
<ngx-apple-mapkit-annotation
        [latitude]="latitude"
        [longitude]="longitude"
        [options]="annotationOptions"
></ngx-apple-mapkit-annotation>
```

You can pass elements or component into annotation

```angular2html
<ngx-apple-mapkit-annotation
        [latitude]="latitude"
        [longitude]="longitude"
        [options]="annotationOptions"
>
    <div>Styled div or component with any content</div>
</ngx-apple-mapkit-annotation>
```

### MapKitInitOptions

Description of them [Documentation](https://developer.apple.com/documentation/mapkitjs/mapkit/map)

```typescript
const options: MapKitInitOptions = {
    language: 'en', // default browser language
    callback: (data) => {
        // return map event
    },
    JWT: string // Json Web token
}
```

### Created map changes

Created map getting from the `getting from options: MapKitInitOptions` **callback** response

```angular2html
<ngx-apple-mapkit-annotation
        [latitude]="latitude"
        [longitude]="longitude"
        (onLoaded)="onLoaded($event)"
></ngx-apple-mapkit-annotation>
```

In your `*.component.ts` file

```typescript
onLoaded(e)
{
    this.map = e;
}
```

After successful initialization of the map, you are got map object with next methods and params:

```typescript
export interface MapKitLoaded {
    key: number;
    map: mapkit.Map;

    addEventListener<T, K extends keyof mapkit.MapEvents<this>>(
        type: K,
        listener: (this: T, event: mapkit.MapEvents<this>[K]) => void,
        thisObject?: T
    ): void;

    isRotationAvailable: () => boolean;
    isRotationEnabled: () => boolean;
    isScrollEnabled: () => boolean;
    isZoomEnabled: () => boolean;
    getCenter: () => CoordinatesInterface;
    setCenterAnimated: (latitude: number, longitude: number, animate?: boolean) => void;
    getRegion: () => MapKitRegion;
    setRegionAnimated: (center: CoordinatesInterface, span?: SpanInterface, animate?: boolean) => void;
    getRotation: () => number;
    setRotationAnimated: (degrees: number, animate?: boolean) => void;
    getCameraDistance: () => number;
    setCameraDistanceAnimated: (distance: number, animate?: boolean) => void;
    getCameraZoomRange: () => MapKitGetCameraZoomRange;
    setCameraZoomRangeAnimated: (minCameraDistance: number, maxCameraDistance: number, animate?: boolean) => void;
    getColorScheme: () => SchemeString | string;
    setColorScheme: (scheme: SchemeString) => void;
    getDistances: () => DistancesString;
    setDistances: (distance: DistancesString) => void;
    getMapType: () => MapTypeString;
    setMapType: (type: MapTypeString) => void;
    getPadding: () => PaddingInterface;
    setPadding: (padding: PaddingInterface) => void;
    getShowsMapTypeControl: () => boolean;
    setShowsMapTypeControl: (value: boolean) => void;
    getShowsZoomControl: () => boolean;
    setShowsZoomControl: (value: boolean) => void;
    getShowsUserLocationControl: () => boolean;
    setShowsUserLocationControl: (value: boolean) => void;
    getShowsPointsOfInterest: () => boolean;
    setShowsPointsOfInterest: (value: boolean) => void;
    getShowsScale: () => ShowsScaleString;
    setShowsScale: (padding: ShowsScaleString) => void;
    getTintColor: () => string;
    setTintColor: (value: string) => void;
    showItems: (items: MapKitItem | MapKitItem[], mapShowItemOptions?: MapShowItemOptionsInterface) => void;
    getAnnotations: () => Promise<MapKitAnnotation[]>;
    getSelectedAnnotations: () => MapKitGetSelectedAnnotations;
    showsCompass: MapKitCompass;
    showsMapTypeControl: boolean;
    showsZoomControl: boolean;
    showsUserLocationControl: boolean;
    showsPointsOfInterest: boolean;
    tintColor: string;
}
```

#### Zoom

Since I can't really integrate the zoom. But there is a workaround for this.

```typescript
class NgxAppleMapkitComponent {
    // ...
   
    onLoaded(e: MapKitLoaded) {
        const map = e.map;
        (map as any)._impl.zoomLevel = 4; // <-- Zoom Level
    }

    // ...
}
```

```angular2html
<ngx-apple-mapkit (onLoaded)="onLoaded($event)"
                  [options]="options" [settings]="settings">
</ngx-apple-mapkit>
```

### MapConstructorOptions

All options are optional

```typescript
const settings: MapConstructorOptions = {
    region: {
        center: {
            latitude: 37.3316850890998,
            longitude: -122.030067374026
        },
        span: { // https://developer.apple.com/documentation/mapkitjs/mapkit/coordinatespan/2973870-mapkit_coordinatespan
            from: 0,
            to: 1
        }
    },
    center: { // center of the map
        latitude: 37.3316850890998,
        longitude: -122.030067374026
    },
    rotation: 45, // degrees
    tintColor: '#000', // color of map controls
    colorScheme: 'light', // light or dark, for default it's the browser color cheme
    mapType: 'standart', // 'mutedStandard' | 'standard' | 'satellite' | 'hybrid'
    padding: { // map padding
        top: 10,
        right: 10,
        bottom: 0,
        left: 0
    },
    showsMapTypeControl: true, // is show mapType control on the map
    isRotationEnabled: true,
    showsCompass: 'adaptive', // 'adaptive' (showing always and on the touch screen devices hides if rotationElabled: false and rotation: 0) | 'hidden' | 'visible'
    isZoomEnabled: true, // is zoom available
    showsZoomControl: true,
    isScrollEnabled: true, // A Boolean value that determines whether the user may scroll the map with a pointing device or with gestures on a touchscreen.
    showsScale: 'adaptive', // 'adaptive' | 'hidden' | 'visible' https://developer.apple.com/documentation/mapkitjs/mapkit/map/2973941-showsscale?changes=latest_minor
    showsUserLocation: false,
    tracksUserLocation: false,
    showsUserLocationControl: true
}
```

### AnnotationConstructorOptionsInterface

All params are optional

```typescript
const annotationOptions: AnnotationConstructorOptionsInterface = {
    data: { // object with your custom data 
        anyData: "anyValue"
    },
    title: "Annotation Title",
    subtitle: "Annotation Subtitle",
    appearanceAnimation: "", // A CSS animation that runs when the annotation appears on the map.
    displayPriority: 1000, // A numeric hint the map uses to prioritize displaying annotations. From 0 to 1000
    padding: { // Spacing added around the annotation when showing items.
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    size: { // The desired dimensions of the annotation, in CSS pixels.
        width: 30,
        height: 30
    },
    visible: true,
    animates: true, // A Boolean value that determines if the annotation should be animated.
    draggable: false,
    enabled: true,
    selected: false,
    calloutEnabled: true, // A Boolean value that determines whether an annotation's callout should be shown.
    clusteringIdentifier: null, // String - An identifer used for grouping annotations into the same cluster.
    // More about clusteringIdentifier - https://developer.apple.com/documentation/mapkitjs/mapkit/annotation/2991317-clusteringidentifier?changes=latest_minor
    collisionMode: 'rectangle', // 'rectangle' | 'circle'
    accessibilityLabel: '', // Accessibility text for the annotation.
    color: '#000', // Any CSS color
    glyphText: '$', // Annotation icon on the map
    glyphColor: '#000', // Any CSS color
    glyphImage: 'some/path/to/image.png',
    selectedGlyphImage: 'some/path/to/selected-annotation-image.png'
};
```

## Typed mapkit.js 😎😍

From version **0.0.24** you can use typed `mapkit.js`.

```typescript
import {mapkit} from 'ngx-apple-mapkit';
```

```typescript
class NgxAppleMapkitComponent {
    // ...
    onLoaded(e: MapKitLoaded) {
        this.map = e;
        const map: mapkit.Map = e.map;

       const people = [
          {
             title: "Juan Chavez",
             coordinate: new mapkit.Coordinate(37.3349, -122.0090201),
             role: "developer",
             building: "HQ"
          },
          {
             title: "Anne Johnson",
             coordinate: new mapkit.Coordinate(37.722319, -122.434979),
             role: "manager",
             building: "HQ"
          }
       ];
        
    }
    // ...
}
```

## Other

For using api without map you should initializate API using **AppleMapsService**

1. Init mapkit js using `AppleMapsService`

```typescript
this.appleMapsService.init({
    JWT: 'YOUR_TOKEN'
});
```

#### Search and autocomplete

Import `AppleMapsSearchService`

Methods:

#### 1. Search / Autocomplete

##### 1.1 Init search

```typescript
this.appleMapsSearchService.initSearch(options);
```

##### Using search

```typescript
this.appleMapsSearchService.search(
    query, // search query
    (err, data) => {
    }, // callback
    options // SearchInterface
);
```

##### Using autocomplete

```typescript
this.appleMapsSearchService.autocomplete(
    query, // search query
    (err, data) => {
    }, // callback
    options // SearchInterface
);
```

##### SearchInterface

```typescript
const options = {  // optional
    getsUserLocation: false, // search near user
    coordinate: {
        latitude: number,
        longitude: number,
    },
    language: 'en', // default browser language
    region: {
        center: {
            latitude: number,
            longitude: number,
        };
        span: {
            from: number,
            to: number,
        }
    }
};
```

#### 2. User location

```typescript
getUserLocation(timeout)
```

Return `Promise`<br>
`timeout` - `Promise.reject()` timeout, default `5000`
If `timeout` is 0 reject doesn't call

#### Geocoder

Import `AppleMapsGeocoderService`

Methods:
`reverseLookup(lat, lon, callback, options: GeocoderReverseLookupOptionsInterface)`

```typescript
interface GeocoderReverseLookupOptionsInterface {
    language: string;
}
```

## Angular Universal

Map don't rendering on the server side, all methods unavailable.

---

## ngx-apple-maps ❤️

This is a renewed variant of the [ngx-apple-maps](https://github.com/ihor-zinchenko/ngx-apple-maps). This runs on
Angular 16 and Ivy. I personally use the library, and it is therefore regularly maintained.

You can find more information in the original project:
[github.com/ihor-zinchenko/ngx-apple-maps](https://github.com/ihor-zinchenko/ngx-apple-maps/blob/master/README.md)

### ⚠️ Important
As of version **ngx-apple-mapkit@0.0.24**, more significant changes have been made. 
This has an impact, please pay attention when replacing (or updating)!

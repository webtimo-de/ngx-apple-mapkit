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

[Apple mapkit.js Documentation](https://developer.apple.com/documentation/mapkitjs/mapkit/map)

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

1. Define `options: MapKitInitOptions` in your `*.component.ts` file
2. Define `settings: MapConstructorOptions`
3. Add `<ngx-apple-mapkit [options]="options" [settings]="settings"></ngx-apple-mapkit>` in your `*.component.html`

# Usage

## Map

To start the map, the `ngx-apple-mapkit` must be described in the HTML component.

```html
<ngx-apple-mapkit (onLoaded)="onLoaded($event)"
                  *ngIf="options && settings"
                  [options]="options" [settings]="settings">
</ngx-apple-mapkit>
```

```typescript
export class NgxAppleMapkitComponent implements OnInit, OnDestroy {
    public settings: MapConstructorOptions;
    public options: MapKitInitOptions;
    private map: MapKitLoaded;

    // ...

    ngOnInit(): void {
        const token: string = "YOUR_TOKEN";
        this.initMapkit(token);
    }

    // ...

    private initMapkit(token: string) {
        const dark: boolean = this.themeService.isDark;

        const home = {
            latitude: 51.68,
            longitude: 7.86
        };

        this.settings = {
            colorScheme: dark ? "dark" : "light",
            isZoomEnabled: true,
            showsZoomControl: true,
            showsUserLocationControl: false,
            showsMapTypeControl: true,
            showsUserLocation: false,
            tracksUserLocation: false,
            isScrollEnabled: true,
            mapType: "standard",
            center: home,
            isRotationEnabled: true,
            region: {
                center: home,
                span: {
                    from: 0.050, // Zoom
                    to: 0.050 // Zoom
                }
            }
        };

        this.options = {
            JWT: token, // <-- Here your MapKit Token
            language: window.navigator.language,
            callback: (data: any) => {
                console.log('data ', data);
            }
        };
    }

    onLoaded(e: MapKitLoaded) {
        this.map = e;
    }

    ngOnDestroy(): void {
        this.map?.map?.destroy();
    }
}
```

| Parameter  | Typ                                             | Use                              | Default | Required |
|------------|-------------------------------------------------|----------------------------------|---------|----------|
| [options]  | MapKitInitOptions                               | Needed for Token and Init Option | -       | ✅        |
| [settings] | MapConstructorOptions                           | Settings for Apple Maps          | -       | ✅        |
| [logging]  | boolean                                         | For Development                  | false   | ❌        |
| [language] | "en" \| "de" \| "es" \| "it" \|  "fr" \| string | Set Language                     | "en"    | ❌        |
| (onLoaded) | (event: MapKitLoaded) => void;                  | Return Map                       | -       | ❎        |

### Set MapKit Token

As you can see from the previous code examples, the token is set in `options`.

```typescript
this.options = {
    JWT: token, // <-- Here your MapKit Token
    language: window.navigator.language,
    callback: (data: any) => {
        console.log('data ', data);
    }
};
```

### Control MapKit

With the `ngx-apple-mapkit`, you get an object back via the onLoaded that contains the map and some pre-built functions.

```html
<ngx-apple-mapkit-annotation
        ...
        (onLoaded)="onLoaded($event)"
></ngx-apple-mapkit-annotation>
```

```typescript
function onLoaded(e: MapKitLoaded) {
    this.map = e;
}
```

```typescript
export declare interface MapKitLoaded {
    key: number;
    map: MapKit.Map; // <-- Native mapkit.js Map

    addEventListener<T, K extends keyof MapKit.MapEvents<this>>(
        type: K,
        listener: (this: T, event: MapKit.MapEvents<this>[K]) => void,
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
        const map: MapKit.Map = e.map;
        map._impl.zoomLevel = 4; // <-- Zoom Level
    }

    // ...
}
```

## Annotations (Markers)

```html
<ngx-apple-mapkit ...>
    <ngx-apple-mapkit-annotation
            [options]="{title: 'Timo Köhler', subtitle: 'web-timo.de', glyphText: '🧑‍💻', selected: true}"
            (onSelect)="onSelect($event)"
            (onDeselect)="onDeselect($event)"
            [latitude]="51.68"
            [longitude]="7.86"
    ></ngx-apple-mapkit-annotation>
</ngx-apple-mapkit>
```

| Parameter    | Typ                                   | Use                                                     | Required |
|--------------|---------------------------------------|---------------------------------------------------------|----------|
| [options]    | AnnotationConstructorOptionsInterface | For example, name, subtitle or icon are specified there | ✅        |
| [latitude]   | number                                | Latitude                                                | ✅        |
| [longitude]  | number                                | Longitude                                               | ✅        |
| (onSelect)   | (event: any) => void;                 | This is triggered when the user clicks on the marker    | ❌        |
| (onDeselect) | (event: any) => void;                 | This is triggered when the user leaves the marker       | ❌        |

### Custom Selected Marker

```html
<ngx-apple-mapkit ...>
    <ngx-apple-mapkit-annotation ...>
        <div style="background-color: white; padding: 10px; border-radius: 10px; color: red">
            Timo Köhler
        </div>
    </ngx-apple-mapkit-annotation>
</ngx-apple-mapkit>
```

## Typed mapkit.js 😎😍

From version **0.0.24** you can use typed `mapkit.js`.

This makes it much easier for them to find and use functions themselves rather than having to constantly try them out.
Thanks to IDE.

```typescript
import {MapKit, mapkit} from 'ngx-apple-mapkit';
```

```typescript
class NgxAppleMapkitComponent {
    // ...
    onLoaded(e: MapKitLoaded) {
        this.map = e;
        const map: MapKit.Map = e.map;

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

`MapKit`: Typed Namespace.

`mapkit`: Basically the window.mapkit but with `MapKit` Type.

## Service

For using api without map you should initialize API using **AppleMapsService**:

Init mapkit js using `AppleMapsService`

```typescript
this.appleMapsService.initialize({
    JWT: 'YOUR_TOKEN'
});
```

### Search / Autocomplete
Import `AppleMapsSearchService`

#### Initialize

```typescript
this.appleMapsSearchService.initialize(options);
```

#### Using Search

```typescript
const result: MapKit.SearchResponse = await this.appleMapsSearchService.searchPromised(query, options);
```

#### Using Autocomplete

```typescript
const result: MapKit.SearchAutocompleteResponse = await this.appleMapsSearchService.autocompletePromised(query, options);
```

### Geocoder

Import `AppleMapsGeocoderService`

#### Initialize

```typescript
this.appleMapsGeocoderService.initialize(options);
```

#### Using Reverse Lookup

```typescript
const result: MapKit.GeocoderResponse = await this.appleMapsGeocoderService.reverseLookupPromised(latitude, longitude, options);
```

## Angular Universal

Map don't rendering on the server side, all methods unavailable.

Tip: You can use the Native mapkit.js

# Info

## ngx-apple-maps ❤️

This is a renewed variant of the [ngx-apple-maps](https://github.com/ihor-zinchenko/ngx-apple-maps). This runs on
Angular 16 and Ivy. I personally use the library, and it is therefore regularly maintained.

You can find more information in the original project:
[github.com/ihor-zinchenko/ngx-apple-maps](https://github.com/ihor-zinchenko/ngx-apple-maps/blob/master/README.md)

## ⚠️ Important

As of version **ngx-apple-mapkit@0.0.24**, more significant changes have been made.
This has an impact, please pay attention when replacing or updating!

## TODO 🎉

- Standalone Angular Component
- Use MapKit Namespace overall
- Remove functions in `MapKitLoaded` and directly use mapkit

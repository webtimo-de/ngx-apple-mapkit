import { mapkit } from "./mapkit";
export declare interface CoordinatesInterface {
    latitude: number;
    longitude: number;
}
export declare interface CoordinatesAnimatedInterface {
    latitude: number;
    longitude: number;
    animate?: boolean;
}
export declare interface SpanInterface {
    from: number;
    to: number;
}
export declare interface RegionInterface {
    center: CoordinatesInterface;
    span?: SpanInterface;
}
export declare interface RegionInterfaceAnimated {
    center: CoordinatesInterface;
    span?: SpanInterface;
    animate?: boolean;
}
export declare interface RotationAnimated {
    rotation: number;
    animate?: boolean;
}
export declare interface PaddingInterface {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
}
export declare interface MapConstructorOptions {
    region?: RegionInterface;
    center?: CoordinatesInterface;
    rotation?: number;
    tintColor?: string;
    colorScheme?: 'light' | 'dark';
    mapType?: 'mutedStandard' | 'standard' | 'satellite' | 'hybrid';
    padding?: PaddingInterface;
    showsMapTypeControl?: boolean;
    isRotationEnabled?: boolean;
    showsCompass?: 'adaptive' | 'hidden' | 'visible';
    isZoomEnabled?: boolean;
    showsZoomControl?: boolean;
    isScrollEnabled?: boolean;
    showsScale?: 'adaptive' | 'hidden' | 'visible';
    showsUserLocation?: boolean;
    tracksUserLocation?: boolean;
    showsUserLocationControl?: boolean;
}
export declare interface MapKitRegionSpan {
    latitudeDelta: number;
    longitudeDelta: number;
}
export declare interface MapKitRegion {
    center: CoordinatesInterface;
    span: MapKitRegionSpan;
}
export declare interface MapKitGetCameraZoomRange {
    minCameraDistance: number;
    maxCameraDistance: number;
}
export declare type MapKitItem = mapkit.Annotation | mapkit.Overlay;
export declare type MapKitAnnotation = mapkit.Annotation;
export declare interface MapKitGetSelectedAnnotations extends mapkit.Annotation {
    _impl: any;
}
export declare interface MapKitLoaded {
    key: number;
    map: mapkit.Map;
    addEventListener<T, K extends keyof mapkit.MapEvents<this>>(type: K, listener: (this: T, event: mapkit.MapEvents<this>[K]) => void, thisObject?: T): void;
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
export declare interface MapKitInitOptions {
    language?: string;
    callback?: any;
    JWT: string;
}
export declare type DistancesString = 'metric' | 'imperial' | 'adaptive';
export declare type SchemeString = 'dark' | 'light';
export declare type MapTypeString = 'standard' | 'mutedStandard' | 'hybrid' | 'satellite';
export declare type ShowsScaleString = 'visible' | 'hidden';
export declare type MapKitCompass = 'hidden' | 'adaptive' | 'visible';
export declare interface MapShowItemOptionsInterface {
    animate?: boolean;
    padding?: PaddingInterface;
    span?: SpanInterface;
}
export declare interface DOMPointInterface {
    x: number;
    y: number;
}
export declare interface SizeInterface {
    width: number;
    height: number;
}
export declare interface AnnotationConstructorOptionsInterface {
    data?: object;
    title?: string;
    subtitle?: string;
    appearanceAnimation?: string;
    displayPriority?: number;
    padding?: PaddingInterface;
    size?: SizeInterface;
    visible?: boolean;
    animates?: boolean;
    draggable?: boolean;
    enabled?: boolean;
    selected?: boolean;
    callout?: boolean;
    calloutEnabled?: boolean;
    clusteringIdentifier?: string;
    collisionMode?: 'rectangle' | 'circle';
    accessibilityLabel?: string;
    color?: string;
    glyphText?: string;
    glyphColor?: string;
    glyphImage?: string;
    selectedGlyphImage?: string;
}
export declare interface SearchInterface {
    language?: string;
    getUserLocation?: boolean;
    coordinate?: CoordinatesInterface;
    region?: RegionInterface;
}
export declare interface GeocoderConstructorOptionsInterface {
    language?: string;
    getsUserLocation?: boolean;
}
export declare interface GeocoderReverseLookupOptionsInterface {
    language?: string;
}

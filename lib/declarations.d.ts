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
export declare interface MapKitInitOptions {
    language?: string;
    callback?: any;
    JWT: string;
}
export declare type DistancesString = 'metric' | 'imperial' | 'adaptive';
export declare type SchemeString = 'dark' | 'light';
export declare type MapTypeString = 'standard' | 'mutedStandard' | 'hybrid' | 'satellite';
export declare type ShowsScaleString = 'visible' | 'hidden';
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

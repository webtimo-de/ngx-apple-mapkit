import { Component, Inject, Input } from '@angular/core';
import { AppleMapkitComponent } from "../../apple-mapkit.component";
import * as i0 from "@angular/core";
import * as i1 from "../../apple-maps.service";
import * as i2 from "../../apple-mapkit.component";
export class AppleMapkitAnnotationComponent {
    set latitude(value) {
        if (this.annotation) {
            this.annotation.coordinate = new window.mapkit.Coordinate(value, this._longitude);
        }
        this._latitude = value;
    }
    get latitude() {
        return this._latitude;
    }
    set longitude(value) {
        if (this.annotation) {
            this.annotation.coordinate = new window.mapkit.Coordinate(this._latitude, value);
        }
        this._longitude = value;
    }
    get longitude() {
        return this._longitude;
    }
    constructor(appleMapsService, differs, ref, renderer, parent) {
        this.appleMapsService = appleMapsService;
        this.differs = differs;
        this.ref = ref;
        this.renderer = renderer;
        this.parent = parent;
        this.calloutEnabled = true;
    }
    ngOnInit() {
        this.annotationElement = this.renderer.createElement('div');
        this.annotationElement.className = 'ngx-apple-mapkit__map-annotation';
        this.renderer.appendChild(this.annotationElement, this.ref.nativeElement);
        this.initAnnotation(this.options);
        this.parent.key.subscribe(value => {
            if (value >= 0) {
                this.parentKey = value;
                this.appleMapsService.setAnnotation(this.annotation, value);
            }
        });
    }
    initAnnotation(options = {}) {
        const transformedOptions = this.transformOptions(options);
        // @ts-ignore
        if (!this.ref.nativeElement.children.length || (transformedOptions && transformedOptions.calloutEnabled === false)) {
            this.options.calloutEnabled = false;
        }
        this._options = this.differs.find(this.options).create();
        if (this.latitude && this.longitude) {
            this.createAnnotation(this.latitude, this.longitude, transformedOptions || {});
        }
        else {
            throw new Error('Latitude and longitude params are required');
        }
    }
    transformOption(key, value) {
        let transformed = null;
        switch (key) {
            case 'padding':
                transformed = new window.mapkit.Padding(value);
                break;
            default:
                transformed = value;
        }
        return transformed;
    }
    transformOptions(options) {
        const transformedOptions = {};
        for (const item in options) {
            if (options[item]) {
                transformedOptions[item] = transformedOptions[item] = this.transformOption(item, options[item]);
            }
        }
        return transformedOptions;
    }
    createAnnotation(latitude, longitude, options = {}) {
        this.annotation = new window.mapkit.MarkerAnnotation(new window.mapkit.Coordinate(latitude, longitude), options);
        // console.log('this ', this.annotation);
        if (this.ref.nativeElement.children.length) {
            this.landmarkAnnotationCallout = {
                calloutElementForAnnotation: (annotation) => {
                    return this.calloutForLandmarkAnnotation(annotation);
                }
            };
            this.annotation.callout = this.landmarkAnnotationCallout;
        }
    }
    calloutForLandmarkAnnotation(annotation) {
        return this.annotationElement;
    }
    ngDoCheck() {
        if (this.options) {
            const changes = this._options.diff(this.options);
            if (changes) {
                this.optionsChanged(changes);
            }
        }
    }
    optionsChanged(changes) {
        changes.forEachItem((item) => {
            if (item.previousValue !== item.currentValue) {
                this.annotation[item.key] = this.transformOption(item.key, item.currentValue);
            }
        });
    }
    ngOnDestroy() {
        this.appleMapsService.maps[this.parentKey].removeAnnotation(this.annotation);
    }
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapkitAnnotationComponent, deps: [{ token: i1.AppleMapsService }, { token: i0.KeyValueDiffers }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: AppleMapkitComponent }], target: i0.ɵɵFactoryTarget.Component }); }
    /** @nocollapse */ static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.3", type: AppleMapkitAnnotationComponent, selector: "ngx-apple-mapkit-annotation", inputs: { options: "options", latitude: "latitude", longitude: "longitude" }, ngImport: i0, template: "<ng-content></ng-content>\n", styles: [".ngx-apple-mapkit__map-landmark{background:#fff}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapkitAnnotationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-apple-mapkit-annotation', template: "<ng-content></ng-content>\n", styles: [".ngx-apple-mapkit__map-landmark{background:#fff}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.AppleMapsService }, { type: i0.KeyValueDiffers }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i2.AppleMapkitComponent, decorators: [{
                    type: Inject,
                    args: [AppleMapkitComponent]
                }] }]; }, propDecorators: { options: [{
                type: Input
            }], latitude: [{
                type: Input
            }], longitude: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGUtbWFwa2l0LWFubm90YXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFwcGxlLW1hcGtpdC9zcmMvbGliL2NvbXBvbmVudHMvYXBwbGUtbWFwa2l0LWFubm90YXRpb24vYXBwbGUtbWFwa2l0LWFubm90YXRpb24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFwcGxlLW1hcGtpdC9zcmMvbGliL2NvbXBvbmVudHMvYXBwbGUtbWFwa2l0LWFubm90YXRpb24vYXBwbGUtbWFwa2l0LWFubm90YXRpb24uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsRUFHVCxNQUFNLEVBQ04sS0FBSyxFQU1SLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDOzs7O0FBT2xFLE1BQU0sT0FBTyw4QkFBOEI7SUFHdkMsSUFBYSxRQUFRLENBQUMsS0FBYTtRQUMvQixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3JGO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQUksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBYSxTQUFTLENBQUMsS0FBYTtRQUNoQyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENB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QyxPQUFPLENBQUMsQ0FBQzthQUNoQztTQUNKO0lBQ0wsQ0FBQztJQUVPLGNBQWMsQ0FBQyxPQUFxQztRQUN4RCxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDekIsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDakY7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7aUlBOUhRLDhCQUE4QixvSUFzQ25CLG9CQUFvQjtxSEF0Qy9CLDhCQUE4QixpSkNyQjNDLDZCQUNBOzsyRkRvQmEsOEJBQThCO2tCQUwxQyxTQUFTOytCQUNJLDZCQUE2Qjs7MEJBMEMxQixNQUFNOzJCQUFDLG9CQUFvQjs0Q0FyQy9CLE9BQU87c0JBQWYsS0FBSztnQkFFTyxRQUFRO3NCQUFwQixLQUFLO2dCQVdPLFNBQVM7c0JBQXJCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBEb0NoZWNrLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIEtleVZhbHVlQ2hhbmdlcyxcbiAgICBLZXlWYWx1ZURpZmZlcnMsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Fubm90YXRpb25Db25zdHJ1Y3Rvck9wdGlvbnNJbnRlcmZhY2V9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5pbXBvcnQge0FwcGxlTWFwc1NlcnZpY2V9IGZyb20gXCIuLi8uLi9hcHBsZS1tYXBzLnNlcnZpY2VcIjtcbmltcG9ydCB7QXBwbGVNYXBraXRDb21wb25lbnR9IGZyb20gXCIuLi8uLi9hcHBsZS1tYXBraXQuY29tcG9uZW50XCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmd4LWFwcGxlLW1hcGtpdC1hbm5vdGF0aW9uJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwbGUtbWFwa2l0LWFubm90YXRpb24uY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2FwcGxlLW1hcGtpdC1hbm5vdGF0aW9uLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBsZU1hcGtpdEFubm90YXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIERvQ2hlY2ssIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgb3B0aW9uczogQW5ub3RhdGlvbkNvbnN0cnVjdG9yT3B0aW9uc0ludGVyZmFjZTtcblxuICAgIEBJbnB1dCgpIHNldCBsYXRpdHVkZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmFubm90YXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuYW5ub3RhdGlvbi5jb29yZGluYXRlID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZSh2YWx1ZSwgdGhpcy5fbG9uZ2l0dWRlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sYXRpdHVkZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBsYXRpdHVkZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGF0aXR1ZGU7XG4gICAgfVxuXG4gICAgQElucHV0KCkgc2V0IGxvbmdpdHVkZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmFubm90YXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuYW5ub3RhdGlvbi5jb29yZGluYXRlID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZSh0aGlzLl9sYXRpdHVkZSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xvbmdpdHVkZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBsb25naXR1ZGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvbmdpdHVkZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9sYXRpdHVkZTogbnVtYmVyO1xuICAgIHByaXZhdGUgX2xvbmdpdHVkZTogbnVtYmVyO1xuICAgIHByaXZhdGUgX29wdGlvbnM6IGFueTtcbiAgICBwcml2YXRlIGFubm90YXRpb246IGFueTtcbiAgICBwcml2YXRlIGxhbmRtYXJrQW5ub3RhdGlvbkNhbGxvdXQ6IGFueTtcbiAgICBwcml2YXRlIGFubm90YXRpb25FbGVtZW50OiBhbnk7XG4gICAgcHJpdmF0ZSBjYWxsb3V0RW5hYmxlZCA9IHRydWU7XG4gICAgcHJpdmF0ZSBwYXJlbnRLZXk6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBwbGVNYXBzU2VydmljZTogQXBwbGVNYXBzU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGRpZmZlcnM6IEtleVZhbHVlRGlmZmVycyxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgICAgICAgICAgQEluamVjdChBcHBsZU1hcGtpdENvbXBvbmVudCkgcHJpdmF0ZSBwYXJlbnQ6IEFwcGxlTWFwa2l0Q29tcG9uZW50KSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuYW5ub3RhdGlvbkVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmFubm90YXRpb25FbGVtZW50LmNsYXNzTmFtZSA9ICduZ3gtYXBwbGUtbWFwa2l0X19tYXAtYW5ub3RhdGlvbic7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5hbm5vdGF0aW9uRWxlbWVudCwgdGhpcy5yZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIHRoaXMuaW5pdEFubm90YXRpb24odGhpcy5vcHRpb25zKTtcbiAgICAgICAgdGhpcy5wYXJlbnQua2V5LnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPj0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50S2V5ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBsZU1hcHNTZXJ2aWNlLnNldEFubm90YXRpb24odGhpcy5hbm5vdGF0aW9uLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEFubm90YXRpb24ob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybWVkT3B0aW9ucyA9IHRoaXMudHJhbnNmb3JtT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpZiAoIXRoaXMucmVmLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoIHx8ICh0cmFuc2Zvcm1lZE9wdGlvbnMgJiYgdHJhbnNmb3JtZWRPcHRpb25zLmNhbGxvdXRFbmFibGVkID09PSBmYWxzZSkpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5jYWxsb3V0RW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSB0aGlzLmRpZmZlcnMuZmluZCh0aGlzLm9wdGlvbnMpLmNyZWF0ZSgpO1xuICAgICAgICBpZiAodGhpcy5sYXRpdHVkZSAmJiB0aGlzLmxvbmdpdHVkZSkge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVBbm5vdGF0aW9uKHRoaXMubGF0aXR1ZGUsIHRoaXMubG9uZ2l0dWRlLCB0cmFuc2Zvcm1lZE9wdGlvbnMgfHwge30pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdMYXRpdHVkZSBhbmQgbG9uZ2l0dWRlIHBhcmFtcyBhcmUgcmVxdWlyZWQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdHJhbnNmb3JtT3B0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgICAgbGV0IHRyYW5zZm9ybWVkID0gbnVsbDtcbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICAgIGNhc2UgJ3BhZGRpbmcnOlxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybWVkID0gbmV3IHdpbmRvdy5tYXBraXQuUGFkZGluZyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybWVkID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybWVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgdHJhbnNmb3JtT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybWVkT3B0aW9ucyA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnNbaXRlbV0pIHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1lZE9wdGlvbnNbaXRlbV0gPSB0cmFuc2Zvcm1lZE9wdGlvbnNbaXRlbV0gPSB0aGlzLnRyYW5zZm9ybU9wdGlvbihpdGVtLCBvcHRpb25zW2l0ZW1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJhbnNmb3JtZWRPcHRpb25zO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlQW5ub3RhdGlvbihsYXRpdHVkZSwgbG9uZ2l0dWRlLCBvcHRpb25zOiBBbm5vdGF0aW9uQ29uc3RydWN0b3JPcHRpb25zSW50ZXJmYWNlID0ge30pIHtcbiAgICAgICAgdGhpcy5hbm5vdGF0aW9uID0gbmV3IHdpbmRvdy5tYXBraXQuTWFya2VyQW5ub3RhdGlvbihuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlKGxhdGl0dWRlLCBsb25naXR1ZGUpLCBvcHRpb25zKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3RoaXMgJywgdGhpcy5hbm5vdGF0aW9uKTtcbiAgICAgICAgaWYgKHRoaXMucmVmLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmxhbmRtYXJrQW5ub3RhdGlvbkNhbGxvdXQgPSB7XG4gICAgICAgICAgICAgICAgY2FsbG91dEVsZW1lbnRGb3JBbm5vdGF0aW9uOiAoYW5ub3RhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWxsb3V0Rm9yTGFuZG1hcmtBbm5vdGF0aW9uKGFubm90YXRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLmFubm90YXRpb24uY2FsbG91dCA9IHRoaXMubGFuZG1hcmtBbm5vdGF0aW9uQ2FsbG91dDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2FsbG91dEZvckxhbmRtYXJrQW5ub3RhdGlvbihhbm5vdGF0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFubm90YXRpb25FbGVtZW50O1xuICAgIH1cblxuICAgIG5nRG9DaGVjaygpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgY29uc3QgY2hhbmdlcyA9IHRoaXMuX29wdGlvbnMuZGlmZih0aGlzLm9wdGlvbnMpO1xuICAgICAgICAgICAgaWYgKGNoYW5nZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNDaGFuZ2VkKGNoYW5nZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvcHRpb25zQ2hhbmdlZChjaGFuZ2VzOiBLZXlWYWx1ZUNoYW5nZXM8c3RyaW5nLCBhbnk+KSB7XG4gICAgICAgIGNoYW5nZXMuZm9yRWFjaEl0ZW0oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLnByZXZpb3VzVmFsdWUgIT09IGl0ZW0uY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbm5vdGF0aW9uW2l0ZW0ua2V5XSA9IHRoaXMudHJhbnNmb3JtT3B0aW9uKGl0ZW0ua2V5LCBpdGVtLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmFwcGxlTWFwc1NlcnZpY2UubWFwc1t0aGlzLnBhcmVudEtleV0ucmVtb3ZlQW5ub3RhdGlvbih0aGlzLmFubm90YXRpb24pO1xuICAgIH1cbn1cbiIsIjxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiJdfQ==
import { Component, Inject, Input } from '@angular/core';
import { NgxAppleMapsComponent } from "../ngx-apple-maps/ngx-apple-maps.component";
import * as i0 from "@angular/core";
import * as i1 from "../../ngx-apple-maps.service";
import * as i2 from "../ngx-apple-maps/ngx-apple-maps.component";
export class NgxAppleMapsAnnotationComponent {
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
        this.annotationElement.className = 'ngx-apple-maps__map-annotation';
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: NgxAppleMapsAnnotationComponent, deps: [{ token: i1.NgxAppleMapsService }, { token: i0.KeyValueDiffers }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: NgxAppleMapsComponent }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.3", type: NgxAppleMapsAnnotationComponent, selector: "ngx-apple-maps-annotation", inputs: { options: "options", latitude: "latitude", longitude: "longitude" }, ngImport: i0, template: "<ng-content></ng-content>\n", styles: [".ngx-apple-maps__map-landmark{background:#fff}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: NgxAppleMapsAnnotationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-apple-maps-annotation', template: "<ng-content></ng-content>\n", styles: [".ngx-apple-maps__map-landmark{background:#fff}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NgxAppleMapsService }, { type: i0.KeyValueDiffers }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i2.NgxAppleMapsComponent, decorators: [{
                    type: Inject,
                    args: [NgxAppleMapsComponent]
                }] }]; }, propDecorators: { options: [{
                type: Input
            }], latitude: [{
                type: Input
            }], longitude: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFwcGxlLW1hcHMtYW5ub3RhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtYXBwbGUtbWFwcy9zcmMvbGliL2NvbXBvbmVudHMvbmd4LWFwcGxlLW1hcHMtYW5ub3RhdGlvbi9uZ3gtYXBwbGUtbWFwcy1hbm5vdGF0aW9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1hcHBsZS1tYXBzL3NyYy9saWIvY29tcG9uZW50cy9uZ3gtYXBwbGUtbWFwcy1hbm5vdGF0aW9uL25neC1hcHBsZS1tYXBzLWFubm90YXRpb24uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsRUFHVCxNQUFNLEVBQ04sS0FBSyxFQU1SLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDRDQUE0QyxDQUFDOzs7O0FBT2pGLE1BQU0sT0FBTywrQkFBK0I7SUFHeEMsSUFBYSxRQUFRLENBQUMsS0FBYTtRQUMvQixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3JGO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQUksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBYSxTQUFTLENBQUMsS0FBYTtRQUNoQyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJ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QWMsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNoQztTQUNKO0lBQ0wsQ0FBQztJQUVPLGNBQWMsQ0FBQyxPQUFxQztRQUN4RCxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDekIsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDakY7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7OEdBOUhRLCtCQUErQix1SUFzQ3BCLHFCQUFxQjtrR0F0Q2hDLCtCQUErQiwrSUNyQjVDLDZCQUNBOzsyRkRvQmEsK0JBQStCO2tCQUwzQyxTQUFTOytCQUNJLDJCQUEyQjs7MEJBMEN4QixNQUFNOzJCQUFDLHFCQUFxQjs0Q0FyQ2hDLE9BQU87c0JBQWYsS0FBSztnQkFFTyxRQUFRO3NCQUFwQixLQUFLO2dCQVdPLFNBQVM7c0JBQXJCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBEb0NoZWNrLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIEtleVZhbHVlQ2hhbmdlcyxcbiAgICBLZXlWYWx1ZURpZmZlcnMsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Fubm90YXRpb25Db25zdHJ1Y3Rvck9wdGlvbnNJbnRlcmZhY2V9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5pbXBvcnQge05neEFwcGxlTWFwc1NlcnZpY2V9IGZyb20gXCIuLi8uLi9uZ3gtYXBwbGUtbWFwcy5zZXJ2aWNlXCI7XG5pbXBvcnQge05neEFwcGxlTWFwc0NvbXBvbmVudH0gZnJvbSBcIi4uL25neC1hcHBsZS1tYXBzL25neC1hcHBsZS1tYXBzLmNvbXBvbmVudFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25neC1hcHBsZS1tYXBzLWFubm90YXRpb24nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9uZ3gtYXBwbGUtbWFwcy1hbm5vdGF0aW9uLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9uZ3gtYXBwbGUtbWFwcy1hbm5vdGF0aW9uLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTmd4QXBwbGVNYXBzQW5ub3RhdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgRG9DaGVjaywgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBvcHRpb25zOiBBbm5vdGF0aW9uQ29uc3RydWN0b3JPcHRpb25zSW50ZXJmYWNlO1xuXG4gICAgQElucHV0KCkgc2V0IGxhdGl0dWRlKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuYW5ub3RhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5hbm5vdGF0aW9uLmNvb3JkaW5hdGUgPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlKHZhbHVlLCB0aGlzLl9sb25naXR1ZGUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xhdGl0dWRlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IGxhdGl0dWRlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXRpdHVkZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBzZXQgbG9uZ2l0dWRlKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuYW5ub3RhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5hbm5vdGF0aW9uLmNvb3JkaW5hdGUgPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlKHRoaXMuX2xhdGl0dWRlLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbG9uZ2l0dWRlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IGxvbmdpdHVkZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9uZ2l0dWRlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2xhdGl0dWRlOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfbG9uZ2l0dWRlOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfb3B0aW9uczogYW55O1xuICAgIHByaXZhdGUgYW5ub3RhdGlvbjogYW55O1xuICAgIHByaXZhdGUgbGFuZG1hcmtBbm5vdGF0aW9uQ2FsbG91dDogYW55O1xuICAgIHByaXZhdGUgYW5ub3RhdGlvbkVsZW1lbnQ6IGFueTtcbiAgICBwcml2YXRlIGNhbGxvdXRFbmFibGVkID0gdHJ1ZTtcbiAgICBwcml2YXRlIHBhcmVudEtleTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhcHBsZU1hcHNTZXJ2aWNlOiBOZ3hBcHBsZU1hcHNTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgICAgICAgICBASW5qZWN0KE5neEFwcGxlTWFwc0NvbXBvbmVudCkgcHJpdmF0ZSBwYXJlbnQ6IE5neEFwcGxlTWFwc0NvbXBvbmVudCkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmFubm90YXRpb25FbGVtZW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5hbm5vdGF0aW9uRWxlbWVudC5jbGFzc05hbWUgPSAnbmd4LWFwcGxlLW1hcHNfX21hcC1hbm5vdGF0aW9uJztcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmFubm90YXRpb25FbGVtZW50LCB0aGlzLnJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgdGhpcy5pbml0QW5ub3RhdGlvbih0aGlzLm9wdGlvbnMpO1xuICAgICAgICB0aGlzLnBhcmVudC5rZXkuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRLZXkgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGxlTWFwc1NlcnZpY2Uuc2V0QW5ub3RhdGlvbih0aGlzLmFubm90YXRpb24sIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0QW5ub3RhdGlvbihvcHRpb25zID0ge30pIHtcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtZWRPcHRpb25zID0gdGhpcy50cmFuc2Zvcm1PcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGlmICghdGhpcy5yZWYubmF0aXZlRWxlbWVudC5jaGlsZHJlbi5sZW5ndGggfHwgKHRyYW5zZm9ybWVkT3B0aW9ucyAmJiB0cmFuc2Zvcm1lZE9wdGlvbnMuY2FsbG91dEVuYWJsZWQgPT09IGZhbHNlKSkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmNhbGxvdXRFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHRoaXMuZGlmZmVycy5maW5kKHRoaXMub3B0aW9ucykuY3JlYXRlKCk7XG4gICAgICAgIGlmICh0aGlzLmxhdGl0dWRlICYmIHRoaXMubG9uZ2l0dWRlKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFubm90YXRpb24odGhpcy5sYXRpdHVkZSwgdGhpcy5sb25naXR1ZGUsIHRyYW5zZm9ybWVkT3B0aW9ucyB8fCB7fSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xhdGl0dWRlIGFuZCBsb25naXR1ZGUgcGFyYW1zIGFyZSByZXF1aXJlZCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0cmFuc2Zvcm1PcHRpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgICBsZXQgdHJhbnNmb3JtZWQgPSBudWxsO1xuICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICAgICAgY2FzZSAncGFkZGluZyc6XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtZWQgPSBuZXcgd2luZG93Lm1hcGtpdC5QYWRkaW5nKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtZWQgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJhbnNmb3JtZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0cmFuc2Zvcm1PcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtZWRPcHRpb25zID0ge307XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9uc1tpdGVtXSkge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybWVkT3B0aW9uc1tpdGVtXSA9IHRyYW5zZm9ybWVkT3B0aW9uc1tpdGVtXSA9IHRoaXMudHJhbnNmb3JtT3B0aW9uKGl0ZW0sIG9wdGlvbnNbaXRlbV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm1lZE9wdGlvbnM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVBbm5vdGF0aW9uKGxhdGl0dWRlLCBsb25naXR1ZGUsIG9wdGlvbnM6IEFubm90YXRpb25Db25zdHJ1Y3Rvck9wdGlvbnNJbnRlcmZhY2UgPSB7fSkge1xuICAgICAgICB0aGlzLmFubm90YXRpb24gPSBuZXcgd2luZG93Lm1hcGtpdC5NYXJrZXJBbm5vdGF0aW9uKG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUobGF0aXR1ZGUsIGxvbmdpdHVkZSksIG9wdGlvbnMpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygndGhpcyAnLCB0aGlzLmFubm90YXRpb24pO1xuICAgICAgICBpZiAodGhpcy5yZWYubmF0aXZlRWxlbWVudC5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMubGFuZG1hcmtBbm5vdGF0aW9uQ2FsbG91dCA9IHtcbiAgICAgICAgICAgICAgICBjYWxsb3V0RWxlbWVudEZvckFubm90YXRpb246IChhbm5vdGF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbGxvdXRGb3JMYW5kbWFya0Fubm90YXRpb24oYW5ub3RhdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuYW5ub3RhdGlvbi5jYWxsb3V0ID0gdGhpcy5sYW5kbWFya0Fubm90YXRpb25DYWxsb3V0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxsb3V0Rm9yTGFuZG1hcmtBbm5vdGF0aW9uKGFubm90YXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYW5ub3RhdGlvbkVsZW1lbnQ7XG4gICAgfVxuXG4gICAgbmdEb0NoZWNrKCkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCBjaGFuZ2VzID0gdGhpcy5fb3B0aW9ucy5kaWZmKHRoaXMub3B0aW9ucyk7XG4gICAgICAgICAgICBpZiAoY2hhbmdlcykge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc0NoYW5nZWQoY2hhbmdlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9wdGlvbnNDaGFuZ2VkKGNoYW5nZXM6IEtleVZhbHVlQ2hhbmdlczxzdHJpbmcsIGFueT4pIHtcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoSXRlbSgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0ucHJldmlvdXNWYWx1ZSAhPT0gaXRlbS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFubm90YXRpb25baXRlbS5rZXldID0gdGhpcy50cmFuc2Zvcm1PcHRpb24oaXRlbS5rZXksIGl0ZW0uY3VycmVudFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYXBwbGVNYXBzU2VydmljZS5tYXBzW3RoaXMucGFyZW50S2V5XS5yZW1vdmVBbm5vdGF0aW9uKHRoaXMuYW5ub3RhdGlvbik7XG4gICAgfVxufVxuIiwiPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuIl19
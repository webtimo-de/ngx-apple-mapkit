import { Component, Inject, Input } from '@angular/core';
import { NgxAppleMapsComponent } from "../ngx-apple-maps/ngx-apple-maps.component";
import * as i0 from "@angular/core";
import * as i1 from "../../apple-maps.service";
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: NgxAppleMapsAnnotationComponent, deps: [{ token: i1.AppleMapsService }, { token: i0.KeyValueDiffers }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: NgxAppleMapsComponent }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.3", type: NgxAppleMapsAnnotationComponent, selector: "ngx-apple-maps-annotation", inputs: { options: "options", latitude: "latitude", longitude: "longitude" }, ngImport: i0, template: "<ng-content></ng-content>\n", styles: [".ngx-apple-maps__map-landmark{background:#fff}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: NgxAppleMapsAnnotationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-apple-maps-annotation', template: "<ng-content></ng-content>\n", styles: [".ngx-apple-maps__map-landmark{background:#fff}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.AppleMapsService }, { type: i0.KeyValueDiffers }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i2.NgxAppleMapsComponent, decorators: [{
                    type: Inject,
                    args: [NgxAppleMapsComponent]
                }] }]; }, propDecorators: { options: [{
                type: Input
            }], latitude: [{
                type: Input
            }], longitude: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFwcGxlLW1hcHMtYW5ub3RhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtYXBwbGUtbWFwcy9zcmMvbGliL2NvbXBvbmVudHMvbmd4LWFwcGxlLW1hcHMtYW5ub3RhdGlvbi9uZ3gtYXBwbGUtbWFwcy1hbm5vdGF0aW9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1hcHBsZS1tYXBzL3NyYy9saWIvY29tcG9uZW50cy9uZ3gtYXBwbGUtbWFwcy1hbm5vdGF0aW9uL25neC1hcHBsZS1tYXBzLWFubm90YXRpb24uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsRUFHVCxNQUFNLEVBQ04sS0FBSyxFQU1SLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDRDQUE0QyxDQUFDOzs7O0FBT2pGLE1BQU0sT0FBTywrQkFBK0I7SUFHeEMsSUFBYSxRQUFRLENBQUMsS0FBYTtRQUMvQixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3JGO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQUksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBYSxTQUFTLENBQUMsS0FBYTtRQUNoQyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJ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QWMsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNoQztTQUNKO0lBQ0wsQ0FBQztJQUVPLGNBQWMsQ0FBQyxPQUFxQztRQUN4RCxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDekIsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDakY7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7OEdBOUhRLCtCQUErQixvSUFzQ3BCLHFCQUFxQjtrR0F0Q2hDLCtCQUErQiwrSUNyQjVDLDZCQUNBOzsyRkRvQmEsK0JBQStCO2tCQUwzQyxTQUFTOytCQUNJLDJCQUEyQjs7MEJBMEN4QixNQUFNOzJCQUFDLHFCQUFxQjs0Q0FyQ2hDLE9BQU87c0JBQWYsS0FBSztnQkFFTyxRQUFRO3NCQUFwQixLQUFLO2dCQVdPLFNBQVM7c0JBQXJCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBEb0NoZWNrLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIEtleVZhbHVlQ2hhbmdlcyxcbiAgICBLZXlWYWx1ZURpZmZlcnMsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Fubm90YXRpb25Db25zdHJ1Y3Rvck9wdGlvbnNJbnRlcmZhY2V9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5pbXBvcnQge0FwcGxlTWFwc1NlcnZpY2V9IGZyb20gXCIuLi8uLi9hcHBsZS1tYXBzLnNlcnZpY2VcIjtcbmltcG9ydCB7Tmd4QXBwbGVNYXBzQ29tcG9uZW50fSBmcm9tIFwiLi4vbmd4LWFwcGxlLW1hcHMvbmd4LWFwcGxlLW1hcHMuY29tcG9uZW50XCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmd4LWFwcGxlLW1hcHMtYW5ub3RhdGlvbicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL25neC1hcHBsZS1tYXBzLWFubm90YXRpb24uY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL25neC1hcHBsZS1tYXBzLWFubm90YXRpb24uY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hBcHBsZU1hcHNBbm5vdGF0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBEb0NoZWNrLCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIG9wdGlvbnM6IEFubm90YXRpb25Db25zdHJ1Y3Rvck9wdGlvbnNJbnRlcmZhY2U7XG5cbiAgICBASW5wdXQoKSBzZXQgbGF0aXR1ZGUodmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5hbm5vdGF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmFubm90YXRpb24uY29vcmRpbmF0ZSA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUodmFsdWUsIHRoaXMuX2xvbmdpdHVkZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGF0aXR1ZGUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgbGF0aXR1ZGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhdGl0dWRlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIHNldCBsb25naXR1ZGUodmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5hbm5vdGF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmFubm90YXRpb24uY29vcmRpbmF0ZSA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUodGhpcy5fbGF0aXR1ZGUsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sb25naXR1ZGUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgbG9uZ2l0dWRlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb25naXR1ZGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbGF0aXR1ZGU6IG51bWJlcjtcbiAgICBwcml2YXRlIF9sb25naXR1ZGU6IG51bWJlcjtcbiAgICBwcml2YXRlIF9vcHRpb25zOiBhbnk7XG4gICAgcHJpdmF0ZSBhbm5vdGF0aW9uOiBhbnk7XG4gICAgcHJpdmF0ZSBsYW5kbWFya0Fubm90YXRpb25DYWxsb3V0OiBhbnk7XG4gICAgcHJpdmF0ZSBhbm5vdGF0aW9uRWxlbWVudDogYW55O1xuICAgIHByaXZhdGUgY2FsbG91dEVuYWJsZWQgPSB0cnVlO1xuICAgIHByaXZhdGUgcGFyZW50S2V5OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwcGxlTWFwc1NlcnZpY2U6IEFwcGxlTWFwc1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICAgICAgICAgIEBJbmplY3QoTmd4QXBwbGVNYXBzQ29tcG9uZW50KSBwcml2YXRlIHBhcmVudDogTmd4QXBwbGVNYXBzQ29tcG9uZW50KSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuYW5ub3RhdGlvbkVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmFubm90YXRpb25FbGVtZW50LmNsYXNzTmFtZSA9ICduZ3gtYXBwbGUtbWFwc19fbWFwLWFubm90YXRpb24nO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuYW5ub3RhdGlvbkVsZW1lbnQsIHRoaXMucmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB0aGlzLmluaXRBbm5vdGF0aW9uKHRoaXMub3B0aW9ucyk7XG4gICAgICAgIHRoaXMucGFyZW50LmtleS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbHVlID49IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudEtleSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbGVNYXBzU2VydmljZS5zZXRBbm5vdGF0aW9uKHRoaXMuYW5ub3RhdGlvbiwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRBbm5vdGF0aW9uKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm1lZE9wdGlvbnMgPSB0aGlzLnRyYW5zZm9ybU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgaWYgKCF0aGlzLnJlZi5uYXRpdmVFbGVtZW50LmNoaWxkcmVuLmxlbmd0aCB8fCAodHJhbnNmb3JtZWRPcHRpb25zICYmIHRyYW5zZm9ybWVkT3B0aW9ucy5jYWxsb3V0RW5hYmxlZCA9PT0gZmFsc2UpKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuY2FsbG91dEVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9vcHRpb25zID0gdGhpcy5kaWZmZXJzLmZpbmQodGhpcy5vcHRpb25zKS5jcmVhdGUoKTtcbiAgICAgICAgaWYgKHRoaXMubGF0aXR1ZGUgJiYgdGhpcy5sb25naXR1ZGUpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQW5ub3RhdGlvbih0aGlzLmxhdGl0dWRlLCB0aGlzLmxvbmdpdHVkZSwgdHJhbnNmb3JtZWRPcHRpb25zIHx8IHt9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTGF0aXR1ZGUgYW5kIGxvbmdpdHVkZSBwYXJhbXMgYXJlIHJlcXVpcmVkJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHRyYW5zZm9ybU9wdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICAgIGxldCB0cmFuc2Zvcm1lZCA9IG51bGw7XG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgICBjYXNlICdwYWRkaW5nJzpcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1lZCA9IG5ldyB3aW5kb3cubWFwa2l0LlBhZGRpbmcodmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1lZCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm1lZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHRyYW5zZm9ybU9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm1lZE9wdGlvbnMgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBpdGVtIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zW2l0ZW1dKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtZWRPcHRpb25zW2l0ZW1dID0gdHJhbnNmb3JtZWRPcHRpb25zW2l0ZW1dID0gdGhpcy50cmFuc2Zvcm1PcHRpb24oaXRlbSwgb3B0aW9uc1tpdGVtXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybWVkT3B0aW9ucztcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUFubm90YXRpb24obGF0aXR1ZGUsIGxvbmdpdHVkZSwgb3B0aW9uczogQW5ub3RhdGlvbkNvbnN0cnVjdG9yT3B0aW9uc0ludGVyZmFjZSA9IHt9KSB7XG4gICAgICAgIHRoaXMuYW5ub3RhdGlvbiA9IG5ldyB3aW5kb3cubWFwa2l0Lk1hcmtlckFubm90YXRpb24obmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZShsYXRpdHVkZSwgbG9uZ2l0dWRlKSwgb3B0aW9ucyk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd0aGlzICcsIHRoaXMuYW5ub3RhdGlvbik7XG4gICAgICAgIGlmICh0aGlzLnJlZi5uYXRpdmVFbGVtZW50LmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5sYW5kbWFya0Fubm90YXRpb25DYWxsb3V0ID0ge1xuICAgICAgICAgICAgICAgIGNhbGxvdXRFbGVtZW50Rm9yQW5ub3RhdGlvbjogKGFubm90YXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FsbG91dEZvckxhbmRtYXJrQW5ub3RhdGlvbihhbm5vdGF0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5hbm5vdGF0aW9uLmNhbGxvdXQgPSB0aGlzLmxhbmRtYXJrQW5ub3RhdGlvbkNhbGxvdXQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGxvdXRGb3JMYW5kbWFya0Fubm90YXRpb24oYW5ub3RhdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5hbm5vdGF0aW9uRWxlbWVudDtcbiAgICB9XG5cbiAgICBuZ0RvQ2hlY2soKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoYW5nZXMgPSB0aGlzLl9vcHRpb25zLmRpZmYodGhpcy5vcHRpb25zKTtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zQ2hhbmdlZChjaGFuZ2VzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb3B0aW9uc0NoYW5nZWQoY2hhbmdlczogS2V5VmFsdWVDaGFuZ2VzPHN0cmluZywgYW55Pikge1xuICAgICAgICBjaGFuZ2VzLmZvckVhY2hJdGVtKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5wcmV2aW91c1ZhbHVlICE9PSBpdGVtLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5ub3RhdGlvbltpdGVtLmtleV0gPSB0aGlzLnRyYW5zZm9ybU9wdGlvbihpdGVtLmtleSwgaXRlbS5jdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hcHBsZU1hcHNTZXJ2aWNlLm1hcHNbdGhpcy5wYXJlbnRLZXldLnJlbW92ZUFubm90YXRpb24odGhpcy5hbm5vdGF0aW9uKTtcbiAgICB9XG59XG4iLCI8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4iXX0=
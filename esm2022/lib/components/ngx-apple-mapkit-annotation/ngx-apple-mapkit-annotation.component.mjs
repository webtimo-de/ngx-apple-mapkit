import { Component, Inject, Input } from '@angular/core';
import { NgxAppleMapkitComponent } from "../ngx-apple-mapkit/ngx-apple-mapkit.component";
import * as i0 from "@angular/core";
import * as i1 from "../../apple-maps.service";
import * as i2 from "../ngx-apple-mapkit/ngx-apple-mapkit.component";
export class NgxAppleMapkitAnnotationComponent {
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
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: NgxAppleMapkitAnnotationComponent, deps: [{ token: i1.AppleMapsService }, { token: i0.KeyValueDiffers }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: NgxAppleMapkitComponent }], target: i0.ɵɵFactoryTarget.Component }); }
    /** @nocollapse */ static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.3", type: NgxAppleMapkitAnnotationComponent, selector: "ngx-apple-mapkit-annotation", inputs: { options: "options", latitude: "latitude", longitude: "longitude" }, ngImport: i0, template: "<ng-content></ng-content>\n", styles: [".ngx-apple-mapkit__map-landmark{background:#fff}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: NgxAppleMapkitAnnotationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-apple-mapkit-annotation', template: "<ng-content></ng-content>\n", styles: [".ngx-apple-mapkit__map-landmark{background:#fff}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.AppleMapsService }, { type: i0.KeyValueDiffers }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i2.NgxAppleMapkitComponent, decorators: [{
                    type: Inject,
                    args: [NgxAppleMapkitComponent]
                }] }]; }, propDecorators: { options: [{
                type: Input
            }], latitude: [{
                type: Input
            }], longitude: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFwcGxlLW1hcGtpdC1hbm5vdGF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1hcHBsZS1tYXBraXQvc3JjL2xpYi9jb21wb25lbnRzL25neC1hcHBsZS1tYXBraXQtYW5ub3RhdGlvbi9uZ3gtYXBwbGUtbWFwa2l0LWFubm90YXRpb24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFwcGxlLW1hcGtpdC9zcmMvbGliL2NvbXBvbmVudHMvbmd4LWFwcGxlLW1hcGtpdC1hbm5vdGF0aW9uL25neC1hcHBsZS1tYXBraXQtYW5ub3RhdGlvbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUdULE1BQU0sRUFDTixLQUFLLEVBTVIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZ0RBQWdELENBQUM7Ozs7QUFPdkYsTUFBTSxPQUFPLGlDQUFpQztJQUcxQyxJQUFhLFFBQVEsQ0FBQyxLQUFhO1FBQy9CLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDckY7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFhLFNBQVMsQ0FBQyxLQUFhO1FBQ2hDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENB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VCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2hDO1NBQ0o7SUFDTCxDQUFDO0lBRU8sY0FBYyxDQUFDLE9BQXFDO1FBQ3hELE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN6QixJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNqRjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDakYsQ0FBQztpSUE5SFEsaUNBQWlDLG9JQXNDdEIsdUJBQXVCO3FIQXRDbEMsaUNBQWlDLGlKQ3JCOUMsNkJBQ0E7OzJGRG9CYSxpQ0FBaUM7a0JBTDdDLFNBQVM7K0JBQ0ksNkJBQTZCOzswQkEwQzFCLE1BQU07MkJBQUMsdUJBQXVCOzRDQXJDbEMsT0FBTztzQkFBZixLQUFLO2dCQUVPLFFBQVE7c0JBQXBCLEtBQUs7Z0JBV08sU0FBUztzQkFBckIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIERvQ2hlY2ssXG4gICAgRWxlbWVudFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgS2V5VmFsdWVDaGFuZ2VzLFxuICAgIEtleVZhbHVlRGlmZmVycyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QW5ub3RhdGlvbkNvbnN0cnVjdG9yT3B0aW9uc0ludGVyZmFjZX0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcbmltcG9ydCB7QXBwbGVNYXBzU2VydmljZX0gZnJvbSBcIi4uLy4uL2FwcGxlLW1hcHMuc2VydmljZVwiO1xuaW1wb3J0IHtOZ3hBcHBsZU1hcGtpdENvbXBvbmVudH0gZnJvbSBcIi4uL25neC1hcHBsZS1tYXBraXQvbmd4LWFwcGxlLW1hcGtpdC5jb21wb25lbnRcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZ3gtYXBwbGUtbWFwa2l0LWFubm90YXRpb24nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9uZ3gtYXBwbGUtbWFwa2l0LWFubm90YXRpb24uY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL25neC1hcHBsZS1tYXBraXQtYW5ub3RhdGlvbi5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTmd4QXBwbGVNYXBraXRBbm5vdGF0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBEb0NoZWNrLCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIG9wdGlvbnM6IEFubm90YXRpb25Db25zdHJ1Y3Rvck9wdGlvbnNJbnRlcmZhY2U7XG5cbiAgICBASW5wdXQoKSBzZXQgbGF0aXR1ZGUodmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5hbm5vdGF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmFubm90YXRpb24uY29vcmRpbmF0ZSA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUodmFsdWUsIHRoaXMuX2xvbmdpdHVkZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGF0aXR1ZGUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgbGF0aXR1ZGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhdGl0dWRlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIHNldCBsb25naXR1ZGUodmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5hbm5vdGF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmFubm90YXRpb24uY29vcmRpbmF0ZSA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUodGhpcy5fbGF0aXR1ZGUsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sb25naXR1ZGUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgbG9uZ2l0dWRlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb25naXR1ZGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbGF0aXR1ZGU6IG51bWJlcjtcbiAgICBwcml2YXRlIF9sb25naXR1ZGU6IG51bWJlcjtcbiAgICBwcml2YXRlIF9vcHRpb25zOiBhbnk7XG4gICAgcHJpdmF0ZSBhbm5vdGF0aW9uOiBhbnk7XG4gICAgcHJpdmF0ZSBsYW5kbWFya0Fubm90YXRpb25DYWxsb3V0OiBhbnk7XG4gICAgcHJpdmF0ZSBhbm5vdGF0aW9uRWxlbWVudDogYW55O1xuICAgIHByaXZhdGUgY2FsbG91dEVuYWJsZWQgPSB0cnVlO1xuICAgIHByaXZhdGUgcGFyZW50S2V5OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwcGxlTWFwc1NlcnZpY2U6IEFwcGxlTWFwc1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICAgICAgICAgIEBJbmplY3QoTmd4QXBwbGVNYXBraXRDb21wb25lbnQpIHByaXZhdGUgcGFyZW50OiBOZ3hBcHBsZU1hcGtpdENvbXBvbmVudCkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmFubm90YXRpb25FbGVtZW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5hbm5vdGF0aW9uRWxlbWVudC5jbGFzc05hbWUgPSAnbmd4LWFwcGxlLW1hcGtpdF9fbWFwLWFubm90YXRpb24nO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuYW5ub3RhdGlvbkVsZW1lbnQsIHRoaXMucmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB0aGlzLmluaXRBbm5vdGF0aW9uKHRoaXMub3B0aW9ucyk7XG4gICAgICAgIHRoaXMucGFyZW50LmtleS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbHVlID49IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudEtleSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbGVNYXBzU2VydmljZS5zZXRBbm5vdGF0aW9uKHRoaXMuYW5ub3RhdGlvbiwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRBbm5vdGF0aW9uKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm1lZE9wdGlvbnMgPSB0aGlzLnRyYW5zZm9ybU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgaWYgKCF0aGlzLnJlZi5uYXRpdmVFbGVtZW50LmNoaWxkcmVuLmxlbmd0aCB8fCAodHJhbnNmb3JtZWRPcHRpb25zICYmIHRyYW5zZm9ybWVkT3B0aW9ucy5jYWxsb3V0RW5hYmxlZCA9PT0gZmFsc2UpKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuY2FsbG91dEVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9vcHRpb25zID0gdGhpcy5kaWZmZXJzLmZpbmQodGhpcy5vcHRpb25zKS5jcmVhdGUoKTtcbiAgICAgICAgaWYgKHRoaXMubGF0aXR1ZGUgJiYgdGhpcy5sb25naXR1ZGUpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQW5ub3RhdGlvbih0aGlzLmxhdGl0dWRlLCB0aGlzLmxvbmdpdHVkZSwgdHJhbnNmb3JtZWRPcHRpb25zIHx8IHt9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTGF0aXR1ZGUgYW5kIGxvbmdpdHVkZSBwYXJhbXMgYXJlIHJlcXVpcmVkJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHRyYW5zZm9ybU9wdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICAgIGxldCB0cmFuc2Zvcm1lZCA9IG51bGw7XG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgICBjYXNlICdwYWRkaW5nJzpcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1lZCA9IG5ldyB3aW5kb3cubWFwa2l0LlBhZGRpbmcodmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1lZCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm1lZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHRyYW5zZm9ybU9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm1lZE9wdGlvbnMgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBpdGVtIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zW2l0ZW1dKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtZWRPcHRpb25zW2l0ZW1dID0gdHJhbnNmb3JtZWRPcHRpb25zW2l0ZW1dID0gdGhpcy50cmFuc2Zvcm1PcHRpb24oaXRlbSwgb3B0aW9uc1tpdGVtXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybWVkT3B0aW9ucztcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUFubm90YXRpb24obGF0aXR1ZGUsIGxvbmdpdHVkZSwgb3B0aW9uczogQW5ub3RhdGlvbkNvbnN0cnVjdG9yT3B0aW9uc0ludGVyZmFjZSA9IHt9KSB7XG4gICAgICAgIHRoaXMuYW5ub3RhdGlvbiA9IG5ldyB3aW5kb3cubWFwa2l0Lk1hcmtlckFubm90YXRpb24obmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZShsYXRpdHVkZSwgbG9uZ2l0dWRlKSwgb3B0aW9ucyk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd0aGlzICcsIHRoaXMuYW5ub3RhdGlvbik7XG4gICAgICAgIGlmICh0aGlzLnJlZi5uYXRpdmVFbGVtZW50LmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5sYW5kbWFya0Fubm90YXRpb25DYWxsb3V0ID0ge1xuICAgICAgICAgICAgICAgIGNhbGxvdXRFbGVtZW50Rm9yQW5ub3RhdGlvbjogKGFubm90YXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FsbG91dEZvckxhbmRtYXJrQW5ub3RhdGlvbihhbm5vdGF0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5hbm5vdGF0aW9uLmNhbGxvdXQgPSB0aGlzLmxhbmRtYXJrQW5ub3RhdGlvbkNhbGxvdXQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGxvdXRGb3JMYW5kbWFya0Fubm90YXRpb24oYW5ub3RhdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5hbm5vdGF0aW9uRWxlbWVudDtcbiAgICB9XG5cbiAgICBuZ0RvQ2hlY2soKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoYW5nZXMgPSB0aGlzLl9vcHRpb25zLmRpZmYodGhpcy5vcHRpb25zKTtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zQ2hhbmdlZChjaGFuZ2VzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb3B0aW9uc0NoYW5nZWQoY2hhbmdlczogS2V5VmFsdWVDaGFuZ2VzPHN0cmluZywgYW55Pikge1xuICAgICAgICBjaGFuZ2VzLmZvckVhY2hJdGVtKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5wcmV2aW91c1ZhbHVlICE9PSBpdGVtLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5ub3RhdGlvbltpdGVtLmtleV0gPSB0aGlzLnRyYW5zZm9ybU9wdGlvbihpdGVtLmtleSwgaXRlbS5jdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hcHBsZU1hcHNTZXJ2aWNlLm1hcHNbdGhpcy5wYXJlbnRLZXldLnJlbW92ZUFubm90YXRpb24odGhpcy5hbm5vdGF0aW9uKTtcbiAgICB9XG59XG4iLCI8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4iXX0=
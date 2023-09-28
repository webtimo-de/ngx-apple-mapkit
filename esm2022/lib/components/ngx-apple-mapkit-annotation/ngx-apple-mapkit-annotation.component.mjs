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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: NgxAppleMapkitAnnotationComponent, deps: [{ token: i1.AppleMapsService }, { token: i0.KeyValueDiffers }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: NgxAppleMapkitComponent }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.3", type: NgxAppleMapkitAnnotationComponent, selector: "ngx-apple-mapkit-annotation", inputs: { options: "options", latitude: "latitude", longitude: "longitude" }, ngImport: i0, template: "<ng-content></ng-content>\n", styles: [".ngx-apple-mapkit__map-landmark{background:#fff}\n"] }); }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFwcGxlLW1hcGtpdC1hbm5vdGF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1hcHBsZS1tYXBraXQvc3JjL2xpYi9jb21wb25lbnRzL25neC1hcHBsZS1tYXBraXQtYW5ub3RhdGlvbi9uZ3gtYXBwbGUtbWFwa2l0LWFubm90YXRpb24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFwcGxlLW1hcGtpdC9zcmMvbGliL2NvbXBvbmVudHMvbmd4LWFwcGxlLW1hcGtpdC1hbm5vdGF0aW9uL25neC1hcHBsZS1tYXBraXQtYW5ub3RhdGlvbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUdULE1BQU0sRUFDTixLQUFLLEVBTVIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZ0RBQWdELENBQUM7Ozs7QUFPdkYsTUFBTSxPQUFPLGlDQUFpQztJQUcxQyxJQUFhLFFBQVEsQ0FBQyxLQUFhO1FBQy9CLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDckY7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFhLFNBQVMsQ0FBQyxLQUFhO1FBQ2hDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENB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VCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2hDO1NBQ0o7SUFDTCxDQUFDO0lBRU8sY0FBYyxDQUFDLE9BQXFDO1FBQ3hELE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN6QixJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNqRjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDakYsQ0FBQzs4R0E5SFEsaUNBQWlDLG9JQXNDdEIsdUJBQXVCO2tHQXRDbEMsaUNBQWlDLGlKQ3JCOUMsNkJBQ0E7OzJGRG9CYSxpQ0FBaUM7a0JBTDdDLFNBQVM7K0JBQ0ksNkJBQTZCOzswQkEwQzFCLE1BQU07MkJBQUMsdUJBQXVCOzRDQXJDbEMsT0FBTztzQkFBZixLQUFLO2dCQUVPLFFBQVE7c0JBQXBCLEtBQUs7Z0JBV08sU0FBUztzQkFBckIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIERvQ2hlY2ssXG4gICAgRWxlbWVudFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgS2V5VmFsdWVDaGFuZ2VzLFxuICAgIEtleVZhbHVlRGlmZmVycyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QW5ub3RhdGlvbkNvbnN0cnVjdG9yT3B0aW9uc0ludGVyZmFjZX0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcbmltcG9ydCB7QXBwbGVNYXBzU2VydmljZX0gZnJvbSBcIi4uLy4uL2FwcGxlLW1hcHMuc2VydmljZVwiO1xuaW1wb3J0IHtOZ3hBcHBsZU1hcGtpdENvbXBvbmVudH0gZnJvbSBcIi4uL25neC1hcHBsZS1tYXBraXQvbmd4LWFwcGxlLW1hcGtpdC5jb21wb25lbnRcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZ3gtYXBwbGUtbWFwa2l0LWFubm90YXRpb24nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9uZ3gtYXBwbGUtbWFwa2l0LWFubm90YXRpb24uY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL25neC1hcHBsZS1tYXBraXQtYW5ub3RhdGlvbi5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5neEFwcGxlTWFwa2l0QW5ub3RhdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgRG9DaGVjaywgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBvcHRpb25zOiBBbm5vdGF0aW9uQ29uc3RydWN0b3JPcHRpb25zSW50ZXJmYWNlO1xuXG4gICAgQElucHV0KCkgc2V0IGxhdGl0dWRlKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuYW5ub3RhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5hbm5vdGF0aW9uLmNvb3JkaW5hdGUgPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlKHZhbHVlLCB0aGlzLl9sb25naXR1ZGUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xhdGl0dWRlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IGxhdGl0dWRlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXRpdHVkZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBzZXQgbG9uZ2l0dWRlKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuYW5ub3RhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5hbm5vdGF0aW9uLmNvb3JkaW5hdGUgPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlKHRoaXMuX2xhdGl0dWRlLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbG9uZ2l0dWRlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IGxvbmdpdHVkZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9uZ2l0dWRlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2xhdGl0dWRlOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfbG9uZ2l0dWRlOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfb3B0aW9uczogYW55O1xuICAgIHByaXZhdGUgYW5ub3RhdGlvbjogYW55O1xuICAgIHByaXZhdGUgbGFuZG1hcmtBbm5vdGF0aW9uQ2FsbG91dDogYW55O1xuICAgIHByaXZhdGUgYW5ub3RhdGlvbkVsZW1lbnQ6IGFueTtcbiAgICBwcml2YXRlIGNhbGxvdXRFbmFibGVkID0gdHJ1ZTtcbiAgICBwcml2YXRlIHBhcmVudEtleTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhcHBsZU1hcHNTZXJ2aWNlOiBBcHBsZU1hcHNTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgICAgICAgICBASW5qZWN0KE5neEFwcGxlTWFwa2l0Q29tcG9uZW50KSBwcml2YXRlIHBhcmVudDogTmd4QXBwbGVNYXBraXRDb21wb25lbnQpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5hbm5vdGF0aW9uRWxlbWVudCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuYW5ub3RhdGlvbkVsZW1lbnQuY2xhc3NOYW1lID0gJ25neC1hcHBsZS1tYXBraXRfX21hcC1hbm5vdGF0aW9uJztcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmFubm90YXRpb25FbGVtZW50LCB0aGlzLnJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgdGhpcy5pbml0QW5ub3RhdGlvbih0aGlzLm9wdGlvbnMpO1xuICAgICAgICB0aGlzLnBhcmVudC5rZXkuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRLZXkgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGxlTWFwc1NlcnZpY2Uuc2V0QW5ub3RhdGlvbih0aGlzLmFubm90YXRpb24sIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0QW5ub3RhdGlvbihvcHRpb25zID0ge30pIHtcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtZWRPcHRpb25zID0gdGhpcy50cmFuc2Zvcm1PcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGlmICghdGhpcy5yZWYubmF0aXZlRWxlbWVudC5jaGlsZHJlbi5sZW5ndGggfHwgKHRyYW5zZm9ybWVkT3B0aW9ucyAmJiB0cmFuc2Zvcm1lZE9wdGlvbnMuY2FsbG91dEVuYWJsZWQgPT09IGZhbHNlKSkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmNhbGxvdXRFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHRoaXMuZGlmZmVycy5maW5kKHRoaXMub3B0aW9ucykuY3JlYXRlKCk7XG4gICAgICAgIGlmICh0aGlzLmxhdGl0dWRlICYmIHRoaXMubG9uZ2l0dWRlKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFubm90YXRpb24odGhpcy5sYXRpdHVkZSwgdGhpcy5sb25naXR1ZGUsIHRyYW5zZm9ybWVkT3B0aW9ucyB8fCB7fSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xhdGl0dWRlIGFuZCBsb25naXR1ZGUgcGFyYW1zIGFyZSByZXF1aXJlZCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0cmFuc2Zvcm1PcHRpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgICBsZXQgdHJhbnNmb3JtZWQgPSBudWxsO1xuICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICAgICAgY2FzZSAncGFkZGluZyc6XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtZWQgPSBuZXcgd2luZG93Lm1hcGtpdC5QYWRkaW5nKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtZWQgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJhbnNmb3JtZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0cmFuc2Zvcm1PcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtZWRPcHRpb25zID0ge307XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9uc1tpdGVtXSkge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybWVkT3B0aW9uc1tpdGVtXSA9IHRyYW5zZm9ybWVkT3B0aW9uc1tpdGVtXSA9IHRoaXMudHJhbnNmb3JtT3B0aW9uKGl0ZW0sIG9wdGlvbnNbaXRlbV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm1lZE9wdGlvbnM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVBbm5vdGF0aW9uKGxhdGl0dWRlLCBsb25naXR1ZGUsIG9wdGlvbnM6IEFubm90YXRpb25Db25zdHJ1Y3Rvck9wdGlvbnNJbnRlcmZhY2UgPSB7fSkge1xuICAgICAgICB0aGlzLmFubm90YXRpb24gPSBuZXcgd2luZG93Lm1hcGtpdC5NYXJrZXJBbm5vdGF0aW9uKG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUobGF0aXR1ZGUsIGxvbmdpdHVkZSksIG9wdGlvbnMpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygndGhpcyAnLCB0aGlzLmFubm90YXRpb24pO1xuICAgICAgICBpZiAodGhpcy5yZWYubmF0aXZlRWxlbWVudC5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMubGFuZG1hcmtBbm5vdGF0aW9uQ2FsbG91dCA9IHtcbiAgICAgICAgICAgICAgICBjYWxsb3V0RWxlbWVudEZvckFubm90YXRpb246IChhbm5vdGF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbGxvdXRGb3JMYW5kbWFya0Fubm90YXRpb24oYW5ub3RhdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuYW5ub3RhdGlvbi5jYWxsb3V0ID0gdGhpcy5sYW5kbWFya0Fubm90YXRpb25DYWxsb3V0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxsb3V0Rm9yTGFuZG1hcmtBbm5vdGF0aW9uKGFubm90YXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYW5ub3RhdGlvbkVsZW1lbnQ7XG4gICAgfVxuXG4gICAgbmdEb0NoZWNrKCkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCBjaGFuZ2VzID0gdGhpcy5fb3B0aW9ucy5kaWZmKHRoaXMub3B0aW9ucyk7XG4gICAgICAgICAgICBpZiAoY2hhbmdlcykge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc0NoYW5nZWQoY2hhbmdlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9wdGlvbnNDaGFuZ2VkKGNoYW5nZXM6IEtleVZhbHVlQ2hhbmdlczxzdHJpbmcsIGFueT4pIHtcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoSXRlbSgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0ucHJldmlvdXNWYWx1ZSAhPT0gaXRlbS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFubm90YXRpb25baXRlbS5rZXldID0gdGhpcy50cmFuc2Zvcm1PcHRpb24oaXRlbS5rZXksIGl0ZW0uY3VycmVudFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYXBwbGVNYXBzU2VydmljZS5tYXBzW3RoaXMucGFyZW50S2V5XS5yZW1vdmVBbm5vdGF0aW9uKHRoaXMuYW5ub3RhdGlvbik7XG4gICAgfVxufVxuIiwiPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuIl19
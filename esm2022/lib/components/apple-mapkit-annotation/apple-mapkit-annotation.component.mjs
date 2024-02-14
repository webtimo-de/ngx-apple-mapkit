import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
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
        // TODO: Funktion für Marker auch in unselectieren zustand bearbeiten zu können über ng-content
        //       - https://stackoverflow.com/questions/74630351/content-project-elements-through-directive-and-ng-template-in-angular-13
        //       - https://medium.com/@zeeshankhan8838/content-projection-through-dynamic-components-in-angular-e6465c728e20
        //       - https://stackoverflow.com/questions/71590105/angular-component-ng-content-passing-template-with-dynamic-output-placeholders
        //       - https://www.google.com/search?q=Angular+component+ng-content+passing+template+with+dynamic+output+placeholders
        this.appleMapsService = appleMapsService;
        this.differs = differs;
        this.ref = ref;
        this.renderer = renderer;
        this.parent = parent;
        this.onSelect = new EventEmitter();
        this.onDeselect = new EventEmitter();
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
                this.annotation.addEventListener("select", (event) => {
                    this.onSelect.emit(event.target);
                });
                this.annotation.addEventListener("deselect", (event) => {
                    this.onDeselect.emit(event.target);
                });
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.3", ngImport: i0, type: AppleMapkitAnnotationComponent, deps: [{ token: i1.AppleMapsService }, { token: i0.KeyValueDiffers }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: AppleMapkitComponent }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.3", type: AppleMapkitAnnotationComponent, selector: "ngx-apple-mapkit-annotation", inputs: { options: "options", latitude: "latitude", longitude: "longitude" }, outputs: { onSelect: "onSelect", onDeselect: "onDeselect" }, ngImport: i0, template: "<ng-content></ng-content>\n", styles: [".ngx-apple-mapkit__map-landmark{background:#fff}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.3", ngImport: i0, type: AppleMapkitAnnotationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-apple-mapkit-annotation', template: "<ng-content></ng-content>\n", styles: [".ngx-apple-mapkit__map-landmark{background:#fff}\n"] }]
        }], ctorParameters: () => [{ type: i1.AppleMapsService }, { type: i0.KeyValueDiffers }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i2.AppleMapkitComponent, decorators: [{
                    type: Inject,
                    args: [AppleMapkitComponent]
                }] }], propDecorators: { options: [{
                type: Input,
                args: [{ required: true }]
            }], onSelect: [{
                type: Output
            }], onDeselect: [{
                type: Output
            }], latitude: [{
                type: Input,
                args: [{ required: true }]
            }], longitude: [{
                type: Input,
                args: [{ required: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGUtbWFwa2l0LWFubm90YXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFwcGxlLW1hcGtpdC9zcmMvbGliL2NvbXBvbmVudHMvYXBwbGUtbWFwa2l0LWFubm90YXRpb24vYXBwbGUtbWFwa2l0LWFubm90YXRpb24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFwcGxlLW1hcGtpdC9zcmMvbGliL2NvbXBvbmVudHMvYXBwbGUtbWFwa2l0LWFubm90YXRpb24vYXBwbGUtbWFwa2l0LWFubm90YXRpb24uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsRUFHVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFLTCxNQUFNLEVBRVQsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sOEJBQThCLENBQUM7Ozs7QUFRbEUsTUFBTSxPQUFPLDhCQUE4QjtJQUt2QyxJQUE2QixRQUFRLENBQUMsS0FBYTtRQUMvQyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3JGO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQUksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBNkIsU0FBUyxDQUFDLEtBQWE7UUFDaEQsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0s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SVEsOEJBQThCLG9JQXdDbkIsb0JBQW9CO2tHQXhDL0IsOEJBQThCLDhNQ3hCM0MsNkJBQ0E7OzJGRHVCYSw4QkFBOEI7a0JBTDFDLFNBQVM7K0JBQ0ksNkJBQTZCOzswQkE0QzFCLE1BQU07MkJBQUMsb0JBQW9CO3lDQXZDZixPQUFPO3NCQUEvQixLQUFLO3VCQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQztnQkFDYixRQUFRO3NCQUFqQixNQUFNO2dCQUNHLFVBQVU7c0JBQW5CLE1BQU07Z0JBRXNCLFFBQVE7c0JBQXBDLEtBQUs7dUJBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDO2dCQVdNLFNBQVM7c0JBQXJDLEtBQUs7dUJBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgRG9DaGVjayxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgS2V5VmFsdWVDaGFuZ2VzLFxuICAgIEtleVZhbHVlRGlmZmVycyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Fubm90YXRpb25Db25zdHJ1Y3Rvck9wdGlvbnNJbnRlcmZhY2V9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5pbXBvcnQge0FwcGxlTWFwc1NlcnZpY2V9IGZyb20gXCIuLi8uLi9hcHBsZS1tYXBzLnNlcnZpY2VcIjtcbmltcG9ydCB7QXBwbGVNYXBraXRDb21wb25lbnR9IGZyb20gXCIuLi8uLi9hcHBsZS1tYXBraXQuY29tcG9uZW50XCI7XG5pbXBvcnQge01hcEtpdH0gZnJvbSBcIi4uLy4uL21hcGtpdFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25neC1hcHBsZS1tYXBraXQtYW5ub3RhdGlvbicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcGxlLW1hcGtpdC1hbm5vdGF0aW9uLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9hcHBsZS1tYXBraXQtYW5ub3RhdGlvbi5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQXBwbGVNYXBraXRBbm5vdGF0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBEb0NoZWNrLCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCh7cmVxdWlyZWQ6IHRydWV9KSBvcHRpb25zOiBBbm5vdGF0aW9uQ29uc3RydWN0b3JPcHRpb25zSW50ZXJmYWNlO1xuICAgIEBPdXRwdXQoKSBvblNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICBAT3V0cHV0KCkgb25EZXNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIEBJbnB1dCh7cmVxdWlyZWQ6IHRydWV9KSBzZXQgbGF0aXR1ZGUodmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5hbm5vdGF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmFubm90YXRpb24uY29vcmRpbmF0ZSA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUodmFsdWUsIHRoaXMuX2xvbmdpdHVkZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGF0aXR1ZGUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgbGF0aXR1ZGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhdGl0dWRlO1xuICAgIH1cblxuICAgIEBJbnB1dCh7cmVxdWlyZWQ6IHRydWV9KSBzZXQgbG9uZ2l0dWRlKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuYW5ub3RhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5hbm5vdGF0aW9uLmNvb3JkaW5hdGUgPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlKHRoaXMuX2xhdGl0dWRlLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbG9uZ2l0dWRlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IGxvbmdpdHVkZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9uZ2l0dWRlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2xhdGl0dWRlOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfbG9uZ2l0dWRlOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfb3B0aW9uczogYW55O1xuICAgIHByaXZhdGUgYW5ub3RhdGlvbjogTWFwS2l0Lk1hcmtlckFubm90YXRpb247XG4gICAgcHJpdmF0ZSBsYW5kbWFya0Fubm90YXRpb25DYWxsb3V0OiBhbnk7XG4gICAgcHJpdmF0ZSBhbm5vdGF0aW9uRWxlbWVudDogYW55O1xuICAgIHByaXZhdGUgY2FsbG91dEVuYWJsZWQgPSB0cnVlO1xuICAgIHByaXZhdGUgcGFyZW50S2V5OiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwcGxlTWFwc1NlcnZpY2U6IEFwcGxlTWFwc1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICAgICAgICAgIEBJbmplY3QoQXBwbGVNYXBraXRDb21wb25lbnQpIHByaXZhdGUgcGFyZW50OiBBcHBsZU1hcGtpdENvbXBvbmVudCkge1xuICAgICAgICAvLyBUT0RPOiBGdW5rdGlvbiBmw7xyIE1hcmtlciBhdWNoIGluIHVuc2VsZWN0aWVyZW4genVzdGFuZCBiZWFyYmVpdGVuIHp1IGvDtm5uZW4gw7xiZXIgbmctY29udGVudFxuICAgICAgICAvLyAgICAgICAtIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzc0NjMwMzUxL2NvbnRlbnQtcHJvamVjdC1lbGVtZW50cy10aHJvdWdoLWRpcmVjdGl2ZS1hbmQtbmctdGVtcGxhdGUtaW4tYW5ndWxhci0xM1xuICAgICAgICAvLyAgICAgICAtIGh0dHBzOi8vbWVkaXVtLmNvbS9AemVlc2hhbmtoYW44ODM4L2NvbnRlbnQtcHJvamVjdGlvbi10aHJvdWdoLWR5bmFtaWMtY29tcG9uZW50cy1pbi1hbmd1bGFyLWU2NDY1YzcyOGUyMFxuICAgICAgICAvLyAgICAgICAtIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzcxNTkwMTA1L2FuZ3VsYXItY29tcG9uZW50LW5nLWNvbnRlbnQtcGFzc2luZy10ZW1wbGF0ZS13aXRoLWR5bmFtaWMtb3V0cHV0LXBsYWNlaG9sZGVyc1xuICAgICAgICAvLyAgICAgICAtIGh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vc2VhcmNoP3E9QW5ndWxhcitjb21wb25lbnQrbmctY29udGVudCtwYXNzaW5nK3RlbXBsYXRlK3dpdGgrZHluYW1pYytvdXRwdXQrcGxhY2Vob2xkZXJzXG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5hbm5vdGF0aW9uRWxlbWVudCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuYW5ub3RhdGlvbkVsZW1lbnQuY2xhc3NOYW1lID0gJ25neC1hcHBsZS1tYXBraXRfX21hcC1hbm5vdGF0aW9uJztcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmFubm90YXRpb25FbGVtZW50LCB0aGlzLnJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgdGhpcy5pbml0QW5ub3RhdGlvbih0aGlzLm9wdGlvbnMpO1xuICAgICAgICB0aGlzLnBhcmVudC5rZXkuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRLZXkgPSB2YWx1ZTtcblxuICAgICAgICAgICAgICAgIHRoaXMuYW5ub3RhdGlvbi5hZGRFdmVudExpc3RlbmVyKFwic2VsZWN0XCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmFubm90YXRpb24uYWRkRXZlbnRMaXN0ZW5lcihcImRlc2VsZWN0XCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRGVzZWxlY3QuZW1pdChldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBsZU1hcHNTZXJ2aWNlLnNldEFubm90YXRpb24odGhpcy5hbm5vdGF0aW9uLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEFubm90YXRpb24ob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybWVkT3B0aW9ucyA9IHRoaXMudHJhbnNmb3JtT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpZiAoIXRoaXMucmVmLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoIHx8ICh0cmFuc2Zvcm1lZE9wdGlvbnMgJiYgdHJhbnNmb3JtZWRPcHRpb25zLmNhbGxvdXRFbmFibGVkID09PSBmYWxzZSkpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5jYWxsb3V0RW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSB0aGlzLmRpZmZlcnMuZmluZCh0aGlzLm9wdGlvbnMpLmNyZWF0ZSgpO1xuICAgICAgICBpZiAodGhpcy5sYXRpdHVkZSAmJiB0aGlzLmxvbmdpdHVkZSkge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVBbm5vdGF0aW9uKHRoaXMubGF0aXR1ZGUsIHRoaXMubG9uZ2l0dWRlLCB0cmFuc2Zvcm1lZE9wdGlvbnMgfHwge30pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdMYXRpdHVkZSBhbmQgbG9uZ2l0dWRlIHBhcmFtcyBhcmUgcmVxdWlyZWQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdHJhbnNmb3JtT3B0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgICAgbGV0IHRyYW5zZm9ybWVkID0gbnVsbDtcbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICAgIGNhc2UgJ3BhZGRpbmcnOlxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybWVkID0gbmV3IHdpbmRvdy5tYXBraXQuUGFkZGluZyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybWVkID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybWVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgdHJhbnNmb3JtT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybWVkT3B0aW9ucyA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnNbaXRlbV0pIHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1lZE9wdGlvbnNbaXRlbV0gPSB0cmFuc2Zvcm1lZE9wdGlvbnNbaXRlbV0gPSB0aGlzLnRyYW5zZm9ybU9wdGlvbihpdGVtLCBvcHRpb25zW2l0ZW1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJhbnNmb3JtZWRPcHRpb25zO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlQW5ub3RhdGlvbihsYXRpdHVkZSwgbG9uZ2l0dWRlLCBvcHRpb25zOiBBbm5vdGF0aW9uQ29uc3RydWN0b3JPcHRpb25zSW50ZXJmYWNlID0ge30pIHtcbiAgICAgICAgdGhpcy5hbm5vdGF0aW9uID0gbmV3IHdpbmRvdy5tYXBraXQuTWFya2VyQW5ub3RhdGlvbihuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlKGxhdGl0dWRlLCBsb25naXR1ZGUpLCBvcHRpb25zKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3RoaXMgJywgdGhpcy5hbm5vdGF0aW9uKTtcbiAgICAgICAgaWYgKHRoaXMucmVmLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmxhbmRtYXJrQW5ub3RhdGlvbkNhbGxvdXQgPSB7XG4gICAgICAgICAgICAgICAgY2FsbG91dEVsZW1lbnRGb3JBbm5vdGF0aW9uOiAoYW5ub3RhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWxsb3V0Rm9yTGFuZG1hcmtBbm5vdGF0aW9uKGFubm90YXRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLmFubm90YXRpb24uY2FsbG91dCA9IHRoaXMubGFuZG1hcmtBbm5vdGF0aW9uQ2FsbG91dDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2FsbG91dEZvckxhbmRtYXJrQW5ub3RhdGlvbihhbm5vdGF0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFubm90YXRpb25FbGVtZW50O1xuICAgIH1cblxuICAgIG5nRG9DaGVjaygpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgY29uc3QgY2hhbmdlcyA9IHRoaXMuX29wdGlvbnMuZGlmZih0aGlzLm9wdGlvbnMpO1xuICAgICAgICAgICAgaWYgKGNoYW5nZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNDaGFuZ2VkKGNoYW5nZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvcHRpb25zQ2hhbmdlZChjaGFuZ2VzOiBLZXlWYWx1ZUNoYW5nZXM8c3RyaW5nLCBhbnk+KSB7XG4gICAgICAgIGNoYW5nZXMuZm9yRWFjaEl0ZW0oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLnByZXZpb3VzVmFsdWUgIT09IGl0ZW0uY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbm5vdGF0aW9uW2l0ZW0ua2V5XSA9IHRoaXMudHJhbnNmb3JtT3B0aW9uKGl0ZW0ua2V5LCBpdGVtLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmFwcGxlTWFwc1NlcnZpY2UubWFwc1t0aGlzLnBhcmVudEtleV0ucmVtb3ZlQW5ub3RhdGlvbih0aGlzLmFubm90YXRpb24pO1xuICAgIH1cbn1cbiIsIjxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiJdfQ==
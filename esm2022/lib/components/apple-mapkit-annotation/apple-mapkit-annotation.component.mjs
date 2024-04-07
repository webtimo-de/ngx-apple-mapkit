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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGUtbWFwa2l0LWFubm90YXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFwcGxlLW1hcGtpdC9zcmMvbGliL2NvbXBvbmVudHMvYXBwbGUtbWFwa2l0LWFubm90YXRpb24vYXBwbGUtbWFwa2l0LWFubm90YXRpb24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFwcGxlLW1hcGtpdC9zcmMvbGliL2NvbXBvbmVudHMvYXBwbGUtbWFwa2l0LWFubm90YXRpb24vYXBwbGUtbWFwa2l0LWFubm90YXRpb24uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsRUFHVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFLTCxNQUFNLEVBRVQsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sOEJBQThCLENBQUM7Ozs7QUFRbEUsTUFBTSxPQUFPLDhCQUE4QjtJQUt2QyxJQUE2QixRQUFRLENBQUMsS0FBYTtRQUMvQyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3JGO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQUksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBNkIsU0FBUyxDQUFDLEtBQWE7UUFDaEQsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0s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QTlJUSw4QkFBOEIsb0lBd0NuQixvQkFBb0I7a0dBeEMvQiw4QkFBOEIsOE1DeEIzQyw2QkFDQTs7MkZEdUJhLDhCQUE4QjtrQkFMMUMsU0FBUzsrQkFDSSw2QkFBNkI7OzBCQTRDMUIsTUFBTTsyQkFBQyxvQkFBb0I7eUNBdkNmLE9BQU87c0JBQS9CLEtBQUs7dUJBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDO2dCQUNiLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csVUFBVTtzQkFBbkIsTUFBTTtnQkFFc0IsUUFBUTtzQkFBcEMsS0FBSzt1QkFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUM7Z0JBV00sU0FBUztzQkFBckMsS0FBSzt1QkFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBEb0NoZWNrLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBLZXlWYWx1ZUNoYW5nZXMsXG4gICAgS2V5VmFsdWVEaWZmZXJzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QW5ub3RhdGlvbkNvbnN0cnVjdG9yT3B0aW9uc0ludGVyZmFjZX0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcbmltcG9ydCB7QXBwbGVNYXBzU2VydmljZX0gZnJvbSBcIi4uLy4uL2FwcGxlLW1hcHMuc2VydmljZVwiO1xuaW1wb3J0IHtBcHBsZU1hcGtpdENvbXBvbmVudH0gZnJvbSBcIi4uLy4uL2FwcGxlLW1hcGtpdC5jb21wb25lbnRcIjtcbmltcG9ydCB7TWFwS2l0fSBmcm9tIFwiLi4vLi4vbWFwa2l0XCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmd4LWFwcGxlLW1hcGtpdC1hbm5vdGF0aW9uJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwbGUtbWFwa2l0LWFubm90YXRpb24uY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2FwcGxlLW1hcGtpdC1hbm5vdGF0aW9uLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBsZU1hcGtpdEFubm90YXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIERvQ2hlY2ssIE9uRGVzdHJveSB7XG4gICAgQElucHV0KHtyZXF1aXJlZDogdHJ1ZX0pIG9wdGlvbnM6IEFubm90YXRpb25Db25zdHJ1Y3Rvck9wdGlvbnNJbnRlcmZhY2U7XG4gICAgQE91dHB1dCgpIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIEBPdXRwdXQoKSBvbkRlc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQElucHV0KHtyZXF1aXJlZDogdHJ1ZX0pIHNldCBsYXRpdHVkZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmFubm90YXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuYW5ub3RhdGlvbi5jb29yZGluYXRlID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZSh2YWx1ZSwgdGhpcy5fbG9uZ2l0dWRlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sYXRpdHVkZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBsYXRpdHVkZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGF0aXR1ZGU7XG4gICAgfVxuXG4gICAgQElucHV0KHtyZXF1aXJlZDogdHJ1ZX0pIHNldCBsb25naXR1ZGUodmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5hbm5vdGF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmFubm90YXRpb24uY29vcmRpbmF0ZSA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUodGhpcy5fbGF0aXR1ZGUsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sb25naXR1ZGUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgbG9uZ2l0dWRlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb25naXR1ZGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbGF0aXR1ZGU6IG51bWJlcjtcbiAgICBwcml2YXRlIF9sb25naXR1ZGU6IG51bWJlcjtcbiAgICBwcml2YXRlIF9vcHRpb25zOiBhbnk7XG4gICAgcHJpdmF0ZSBhbm5vdGF0aW9uOiBNYXBLaXQuTWFya2VyQW5ub3RhdGlvbjtcbiAgICBwcml2YXRlIGxhbmRtYXJrQW5ub3RhdGlvbkNhbGxvdXQ6IGFueTtcbiAgICBwcml2YXRlIGFubm90YXRpb25FbGVtZW50OiBhbnk7XG4gICAgcHJpdmF0ZSBjYWxsb3V0RW5hYmxlZCA9IHRydWU7XG4gICAgcHJpdmF0ZSBwYXJlbnRLZXk6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBwbGVNYXBzU2VydmljZTogQXBwbGVNYXBzU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGRpZmZlcnM6IEtleVZhbHVlRGlmZmVycyxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgICAgICAgICAgQEluamVjdChBcHBsZU1hcGtpdENvbXBvbmVudCkgcHJpdmF0ZSBwYXJlbnQ6IEFwcGxlTWFwa2l0Q29tcG9uZW50KSB7XG4gICAgICAgIC8vIFRPRE86IEZ1bmt0aW9uIGbDvHIgTWFya2VyIGF1Y2ggaW4gdW5zZWxlY3RpZXJlbiB6dXN0YW5kIGJlYXJiZWl0ZW4genUga8O2bm5lbiDDvGJlciBuZy1jb250ZW50XG4gICAgICAgIC8vICAgICAgIC0gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNzQ2MzAzNTEvY29udGVudC1wcm9qZWN0LWVsZW1lbnRzLXRocm91Z2gtZGlyZWN0aXZlLWFuZC1uZy10ZW1wbGF0ZS1pbi1hbmd1bGFyLTEzXG4gICAgICAgIC8vICAgICAgIC0gaHR0cHM6Ly9tZWRpdW0uY29tL0B6ZWVzaGFua2hhbjg4MzgvY29udGVudC1wcm9qZWN0aW9uLXRocm91Z2gtZHluYW1pYy1jb21wb25lbnRzLWluLWFuZ3VsYXItZTY0NjVjNzI4ZTIwXG4gICAgICAgIC8vICAgICAgIC0gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNzE1OTAxMDUvYW5ndWxhci1jb21wb25lbnQtbmctY29udGVudC1wYXNzaW5nLXRlbXBsYXRlLXdpdGgtZHluYW1pYy1vdXRwdXQtcGxhY2Vob2xkZXJzXG4gICAgICAgIC8vICAgICAgIC0gaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9zZWFyY2g/cT1Bbmd1bGFyK2NvbXBvbmVudCtuZy1jb250ZW50K3Bhc3NpbmcrdGVtcGxhdGUrd2l0aCtkeW5hbWljK291dHB1dCtwbGFjZWhvbGRlcnNcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmFubm90YXRpb25FbGVtZW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5hbm5vdGF0aW9uRWxlbWVudC5jbGFzc05hbWUgPSAnbmd4LWFwcGxlLW1hcGtpdF9fbWFwLWFubm90YXRpb24nO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuYW5ub3RhdGlvbkVsZW1lbnQsIHRoaXMucmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB0aGlzLmluaXRBbm5vdGF0aW9uKHRoaXMub3B0aW9ucyk7XG4gICAgICAgIHRoaXMucGFyZW50LmtleS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbHVlID49IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudEtleSA9IHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5hbm5vdGF0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJzZWxlY3RcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25TZWxlY3QuZW1pdChldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5ub3RhdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiZGVzZWxlY3RcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25EZXNlbGVjdC5lbWl0KGV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFwcGxlTWFwc1NlcnZpY2Uuc2V0QW5ub3RhdGlvbih0aGlzLmFubm90YXRpb24sIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0QW5ub3RhdGlvbihvcHRpb25zID0ge30pIHtcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtZWRPcHRpb25zID0gdGhpcy50cmFuc2Zvcm1PcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGlmICghdGhpcy5yZWYubmF0aXZlRWxlbWVudC5jaGlsZHJlbi5sZW5ndGggfHwgKHRyYW5zZm9ybWVkT3B0aW9ucyAmJiB0cmFuc2Zvcm1lZE9wdGlvbnMuY2FsbG91dEVuYWJsZWQgPT09IGZhbHNlKSkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmNhbGxvdXRFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHRoaXMuZGlmZmVycy5maW5kKHRoaXMub3B0aW9ucykuY3JlYXRlKCk7XG4gICAgICAgIGlmICh0aGlzLmxhdGl0dWRlICYmIHRoaXMubG9uZ2l0dWRlKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFubm90YXRpb24odGhpcy5sYXRpdHVkZSwgdGhpcy5sb25naXR1ZGUsIHRyYW5zZm9ybWVkT3B0aW9ucyB8fCB7fSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xhdGl0dWRlIGFuZCBsb25naXR1ZGUgcGFyYW1zIGFyZSByZXF1aXJlZCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0cmFuc2Zvcm1PcHRpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgICBsZXQgdHJhbnNmb3JtZWQgPSBudWxsO1xuICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICAgICAgY2FzZSAncGFkZGluZyc6XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtZWQgPSBuZXcgd2luZG93Lm1hcGtpdC5QYWRkaW5nKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtZWQgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJhbnNmb3JtZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0cmFuc2Zvcm1PcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtZWRPcHRpb25zID0ge307XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9uc1tpdGVtXSkge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybWVkT3B0aW9uc1tpdGVtXSA9IHRyYW5zZm9ybWVkT3B0aW9uc1tpdGVtXSA9IHRoaXMudHJhbnNmb3JtT3B0aW9uKGl0ZW0sIG9wdGlvbnNbaXRlbV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm1lZE9wdGlvbnM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVBbm5vdGF0aW9uKGxhdGl0dWRlOiBudW1iZXIsIGxvbmdpdHVkZTogbnVtYmVyLCBvcHRpb25zOiBBbm5vdGF0aW9uQ29uc3RydWN0b3JPcHRpb25zSW50ZXJmYWNlID0ge30pIHtcbiAgICAgICAgdGhpcy5hbm5vdGF0aW9uID0gbmV3IHdpbmRvdy5tYXBraXQuTWFya2VyQW5ub3RhdGlvbihuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlKGxhdGl0dWRlLCBsb25naXR1ZGUpLCBvcHRpb25zKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3RoaXMgJywgdGhpcy5hbm5vdGF0aW9uKTtcbiAgICAgICAgaWYgKHRoaXMucmVmLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmxhbmRtYXJrQW5ub3RhdGlvbkNhbGxvdXQgPSB7XG4gICAgICAgICAgICAgICAgY2FsbG91dEVsZW1lbnRGb3JBbm5vdGF0aW9uOiAoYW5ub3RhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWxsb3V0Rm9yTGFuZG1hcmtBbm5vdGF0aW9uKGFubm90YXRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLmFubm90YXRpb24uY2FsbG91dCA9IHRoaXMubGFuZG1hcmtBbm5vdGF0aW9uQ2FsbG91dDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2FsbG91dEZvckxhbmRtYXJrQW5ub3RhdGlvbihhbm5vdGF0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFubm90YXRpb25FbGVtZW50O1xuICAgIH1cblxuICAgIG5nRG9DaGVjaygpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgY29uc3QgY2hhbmdlcyA9IHRoaXMuX29wdGlvbnMuZGlmZih0aGlzLm9wdGlvbnMpO1xuICAgICAgICAgICAgaWYgKGNoYW5nZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNDaGFuZ2VkKGNoYW5nZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvcHRpb25zQ2hhbmdlZChjaGFuZ2VzOiBLZXlWYWx1ZUNoYW5nZXM8c3RyaW5nLCBhbnk+KSB7XG4gICAgICAgIGNoYW5nZXMuZm9yRWFjaEl0ZW0oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLnByZXZpb3VzVmFsdWUgIT09IGl0ZW0uY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbm5vdGF0aW9uW2l0ZW0ua2V5XSA9IHRoaXMudHJhbnNmb3JtT3B0aW9uKGl0ZW0ua2V5LCBpdGVtLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmFwcGxlTWFwc1NlcnZpY2UubWFwc1t0aGlzLnBhcmVudEtleV0ucmVtb3ZlQW5ub3RhdGlvbih0aGlzLmFubm90YXRpb24pO1xuICAgIH1cbn1cbiIsIjxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiJdfQ==
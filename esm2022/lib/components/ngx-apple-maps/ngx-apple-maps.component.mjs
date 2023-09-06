import { Component, ContentChildren, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import * as i0 from "@angular/core";
import * as i1 from "../../ngx-apple-maps.service";
export class NgxAppleMapsComponent {
    constructor(differs, appleMapsService, viewTemplateRef, cdr) {
        this.differs = differs;
        this.appleMapsService = appleMapsService;
        this.viewTemplateRef = viewTemplateRef;
        this.cdr = cdr;
        this.onLoaded = new EventEmitter();
        // @ContentChildren(TemplateRef, {descendants: true}) template: QueryList<TemplateRef<any>>;
        // private templates: QueryList<TemplateRef<any>>;
        this.defaultOptions = { language: 'en' };
        // annotations = [];
        this.defaultSettings = {
            colorScheme: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
            isZoomEnabled: true,
            mapType: 'standard',
            showsZoomControl: true,
            showsMapTypeControl: true
        };
        this.keySource = new BehaviorSubject(-1);
        this.key = this.keySource.asObservable();
        this.settings = {};
    }
    init() {
        const settings = Object.assign({ ...this.defaultSettings, ...this.settings });
        const options = Object.assign({ ...this.defaultOptions, ...this.options });
        this.appleMapsService.init(options, settings, (data) => {
            if (this.onLoaded.observers.length) {
                this.onLoaded.emit(data);
            }
            this.keyValue = data.key;
            this.keySource.next(data.key);
        });
    }
    optionsChanged(changes) {
        this.appleMapsService.optionsChanged(changes);
    }
    settingsChanged(changes) {
        this.appleMapsService.settingsChanged(changes, this.keyValue);
    }
    // ngAfterContentInit(): void {
    //     this.template.forEach(item => {
    //         const template = this.viewTemplateRef.createEmbeddedView(item);
    //         this.viewTemplateRef.remove(this.viewTemplateRef.indexOf(template));
    //         template.detectChanges();
    //         this.annotations.push(item);
    //         this.viewTemplateRef.clear();
    //     });
    // }
    ngOnInit() {
        if (!this.options) {
            throw new Error('You must provide JWT token');
        }
        else {
            this._options = this.differs.find(this.options).create();
            this.init();
        }
        if (this.settings) {
            this._settings = this.differs.find(this.settings).create();
        }
    }
    ngDoCheck() {
        if (this.options) {
            const options = this._options.diff(this.options);
            if (options) {
                this.optionsChanged(options);
            }
        }
        if (this.settings) {
            const settings = this._settings.diff(this.settings);
            if (settings) {
                this.settingsChanged(settings);
            }
        }
    }
    ngAfterViewInit() {
        this.cdr.detectChanges();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: NgxAppleMapsComponent, deps: [{ token: i0.KeyValueDiffers }, { token: i1.NgxAppleMapsService }, { token: i0.ViewContainerRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.3", type: NgxAppleMapsComponent, selector: "ngx-apple-maps", inputs: { options: "options", settings: "settings", height: "height" }, outputs: { onLoaded: "onLoaded" }, queries: [{ propertyName: "annotations", predicate: ["ngx-apple-maps-annotation"], descendants: true }], ngImport: i0, template: "<div class=\"ngx-apple-maps\">\r\n    <div class=\"ngx-apple-maps__map\"></div>\r\n</div>\r\n<ng-content></ng-content>\r\n<ng-container></ng-container>\r\n", styles: [".ngx-apple-maps{height:100%;position:relative}.ngx-apple-maps .ngx-apple-maps__map{inset:0;position:absolute}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: NgxAppleMapsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-apple-maps', template: "<div class=\"ngx-apple-maps\">\r\n    <div class=\"ngx-apple-maps__map\"></div>\r\n</div>\r\n<ng-content></ng-content>\r\n<ng-container></ng-container>\r\n", styles: [".ngx-apple-maps{height:100%;position:relative}.ngx-apple-maps .ngx-apple-maps__map{inset:0;position:absolute}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.KeyValueDiffers }, { type: i1.NgxAppleMapsService }, { type: i0.ViewContainerRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { options: [{
                type: Input
            }], settings: [{
                type: Input
            }], height: [{
                type: Input
            }], onLoaded: [{
                type: Output
            }], annotations: [{
                type: ContentChildren,
                args: ['ngx-apple-maps-annotation', { descendants: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFwcGxlLW1hcHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFwcGxlLW1hcHMvc3JjL2xpYi9jb21wb25lbnRzL25neC1hcHBsZS1tYXBzL25neC1hcHBsZS1tYXBzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1hcHBsZS1tYXBzL3NyYy9saWIvY29tcG9uZW50cy9uZ3gtYXBwbGUtbWFwcy9uZ3gtYXBwbGUtbWFwcy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0gsU0FBUyxFQUNULGVBQWUsRUFFZixZQUFZLEVBQ1osS0FBSyxFQUlMLE1BQU0sRUFHVCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sTUFBTSxDQUFDOzs7QUFTckMsTUFBTSxPQUFPLHFCQUFxQjtJQXlCOUIsWUFBb0IsT0FBd0IsRUFBVSxnQkFBcUMsRUFBVSxlQUFpQyxFQUFVLEdBQXNCO1FBQWxKLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFxQjtRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBckI1SixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV4Qyw0RkFBNEY7UUFDNUYsa0RBQWtEO1FBQzNDLG1CQUFjLEdBQUcsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUM7UUFDekMsb0JBQW9CO1FBQ2Isb0JBQWUsR0FBRztZQUNyQixXQUFXLEVBQUUsTUFBTSxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLDhCQUE4QixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU87WUFDOUcsYUFBYSxFQUFFLElB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YUFDbEM7U0FDSjtJQUNMLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM3QixDQUFDOzhHQXhGUSxxQkFBcUI7a0dBQXJCLHFCQUFxQiwwUUN6QmxDLDZKQUtBOzsyRkRvQmEscUJBQXFCO2tCQUxqQyxTQUFTOytCQUNJLGdCQUFnQjt1TUFLakIsT0FBTztzQkFBZixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNJLFFBQVE7c0JBQWpCLE1BQU07Z0JBQzRELFdBQVc7c0JBQTdFLGVBQWU7dUJBQUMsMkJBQTJCLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRG9DaGVjayxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgS2V5VmFsdWVDaGFuZ2VzLFxuICAgIEtleVZhbHVlRGlmZmVycyxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXBDb25zdHJ1Y3Rvck9wdGlvbnMsIE1hcEtpdEluaXRPcHRpb25zfSBmcm9tIFwiLi4vLi4vZGVjbGFyYXRpb25zXCI7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7Tmd4QXBwbGVNYXBzU2VydmljZX0gZnJvbSBcIi4uLy4uL25neC1hcHBsZS1tYXBzLnNlcnZpY2VcIjtcbmltcG9ydCB7Tmd4QXBwbGVNYXBzQW5ub3RhdGlvbkNvbXBvbmVudH0gZnJvbSBcIi4uL25neC1hcHBsZS1tYXBzLWFubm90YXRpb24vbmd4LWFwcGxlLW1hcHMtYW5ub3RhdGlvbi5jb21wb25lbnRcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZ3gtYXBwbGUtbWFwcycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL25neC1hcHBsZS1tYXBzLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9uZ3gtYXBwbGUtbWFwcy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5neEFwcGxlTWFwc0NvbXBvbmVudCBpbXBsZW1lbnRzIERvQ2hlY2ssIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gICAgQElucHV0KCkgb3B0aW9uczogTWFwS2l0SW5pdE9wdGlvbnM7XG4gICAgQElucHV0KCkgc2V0dGluZ3M6IE1hcENvbnN0cnVjdG9yT3B0aW9ucztcbiAgICBASW5wdXQoKSBoZWlnaHQ6IHN0cmluZztcbiAgICBAT3V0cHV0KCkgb25Mb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQENvbnRlbnRDaGlsZHJlbignbmd4LWFwcGxlLW1hcHMtYW5ub3RhdGlvbicsIHtkZXNjZW5kYW50czogdHJ1ZX0pIGFubm90YXRpb25zOiBRdWVyeUxpc3Q8Tmd4QXBwbGVNYXBzQW5ub3RhdGlvbkNvbXBvbmVudD47XG4gICAgLy8gQENvbnRlbnRDaGlsZHJlbihUZW1wbGF0ZVJlZiwge2Rlc2NlbmRhbnRzOiB0cnVlfSkgdGVtcGxhdGU6IFF1ZXJ5TGlzdDxUZW1wbGF0ZVJlZjxhbnk+PjtcbiAgICAvLyBwcml2YXRlIHRlbXBsYXRlczogUXVlcnlMaXN0PFRlbXBsYXRlUmVmPGFueT4+O1xuICAgIHB1YmxpYyBkZWZhdWx0T3B0aW9ucyA9IHtsYW5ndWFnZTogJ2VuJ307XG4gICAgLy8gYW5ub3RhdGlvbnMgPSBbXTtcbiAgICBwdWJsaWMgZGVmYXVsdFNldHRpbmdzID0ge1xuICAgICAgICBjb2xvclNjaGVtZTogd2luZG93Lm1hdGNoTWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzID8gJ2RhcmsnIDogJ2xpZ2h0JyxcbiAgICAgICAgaXNab29tRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgbWFwVHlwZTogJ3N0YW5kYXJkJyxcbiAgICAgICAgc2hvd3Nab29tQ29udHJvbDogdHJ1ZSxcbiAgICAgICAgc2hvd3NNYXBUeXBlQ29udHJvbDogdHJ1ZVxuICAgIH07XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhcmlhYmxlLW5hbWVcbiAgICBwcml2YXRlIF9vcHRpb25zOiBhbnk7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhcmlhYmxlLW5hbWVcbiAgICBwcml2YXRlIF9zZXR0aW5nczogYW55O1xuICAgIHByaXZhdGUga2V5VmFsdWU6IG51bWJlcjtcbiAgICBwdWJsaWMga2V5U291cmNlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KC0xKTtcbiAgICBwdWJsaWMga2V5ID0gdGhpcy5rZXlTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRpZmZlcnM6IEtleVZhbHVlRGlmZmVycywgcHJpdmF0ZSBhcHBsZU1hcHNTZXJ2aWNlOiBOZ3hBcHBsZU1hcHNTZXJ2aWNlLCBwcml2YXRlIHZpZXdUZW1wbGF0ZVJlZjogVmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSB7fTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXQoKSB7XG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7Li4udGhpcy5kZWZhdWx0U2V0dGluZ3MsIC4uLnRoaXMuc2V0dGluZ3N9KTtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oey4uLnRoaXMuZGVmYXVsdE9wdGlvbnMsIC4uLnRoaXMub3B0aW9uc30pO1xuICAgICAgICB0aGlzLmFwcGxlTWFwc1NlcnZpY2UuaW5pdChvcHRpb25zLCBzZXR0aW5ncywgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9uTG9hZGVkLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTG9hZGVkLmVtaXQoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmtleVZhbHVlID0gZGF0YS5rZXk7XG4gICAgICAgICAgICB0aGlzLmtleVNvdXJjZS5uZXh0KGRhdGEua2V5KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvcHRpb25zQ2hhbmdlZChjaGFuZ2VzOiBLZXlWYWx1ZUNoYW5nZXM8c3RyaW5nLCBhbnk+KSB7XG4gICAgICAgIHRoaXMuYXBwbGVNYXBzU2VydmljZS5vcHRpb25zQ2hhbmdlZChjaGFuZ2VzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldHRpbmdzQ2hhbmdlZChjaGFuZ2VzOiBLZXlWYWx1ZUNoYW5nZXM8c3RyaW5nLCBhbnk+KSB7XG4gICAgICAgIHRoaXMuYXBwbGVNYXBzU2VydmljZS5zZXR0aW5nc0NoYW5nZWQoY2hhbmdlcywgdGhpcy5rZXlWYWx1ZSk7XG4gICAgfVxuXG4gICAgLy8gbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIC8vICAgICB0aGlzLnRlbXBsYXRlLmZvckVhY2goaXRlbSA9PiB7XG4gICAgLy8gICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IHRoaXMudmlld1RlbXBsYXRlUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyhpdGVtKTtcbiAgICAvLyAgICAgICAgIHRoaXMudmlld1RlbXBsYXRlUmVmLnJlbW92ZSh0aGlzLnZpZXdUZW1wbGF0ZVJlZi5pbmRleE9mKHRlbXBsYXRlKSk7XG4gICAgLy8gICAgICAgICB0ZW1wbGF0ZS5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgLy8gICAgICAgICB0aGlzLmFubm90YXRpb25zLnB1c2goaXRlbSk7XG4gICAgLy8gICAgICAgICB0aGlzLnZpZXdUZW1wbGF0ZVJlZi5jbGVhcigpO1xuICAgIC8vICAgICB9KTtcbiAgICAvLyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG11c3QgcHJvdmlkZSBKV1QgdG9rZW4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMgPSB0aGlzLmRpZmZlcnMuZmluZCh0aGlzLm9wdGlvbnMpLmNyZWF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzID0gdGhpcy5kaWZmZXJzLmZpbmQodGhpcy5zZXR0aW5ncykuY3JlYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0RvQ2hlY2soKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLl9vcHRpb25zLmRpZmYodGhpcy5vcHRpb25zKTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zQ2hhbmdlZChvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncykge1xuICAgICAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSB0aGlzLl9zZXR0aW5ncy5kaWZmKHRoaXMuc2V0dGluZ3MpO1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nc0NoYW5nZWQoc2V0dGluZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxufVxuIiwiPGRpdiBjbGFzcz1cIm5neC1hcHBsZS1tYXBzXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwibmd4LWFwcGxlLW1hcHNfX21hcFwiPjwvZGl2PlxyXG48L2Rpdj5cclxuPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG48bmctY29udGFpbmVyPjwvbmctY29udGFpbmVyPlxyXG4iXX0=
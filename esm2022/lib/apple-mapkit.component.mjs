import { Component, ContentChildren, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import * as i0 from "@angular/core";
import * as i1 from "./apple-maps.service";
export class AppleMapkitComponent {
    constructor(differs, appleMapsService, viewTemplateRef, cdr) {
        this.differs = differs;
        this.appleMapsService = appleMapsService;
        this.viewTemplateRef = viewTemplateRef;
        this.cdr = cdr;
        this.onLoaded = new EventEmitter();
        this.loaded = null;
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
            console.log("[Init ngx-apple-mapkit]", data);
            if (!this.loaded) {
                this.onLoaded.emit(data);
                this.loaded = data;
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapkitComponent, deps: [{ token: i0.KeyValueDiffers }, { token: i1.AppleMapsService }, { token: i0.ViewContainerRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.3", type: AppleMapkitComponent, selector: "ngx-apple-mapkit", inputs: { options: "options", settings: "settings", height: "height" }, outputs: { onLoaded: "onLoaded" }, queries: [{ propertyName: "annotations", predicate: ["apple-mapkit-annotation"], descendants: true }], ngImport: i0, template: "<div class=\"ngx-apple-mapkit\">\r\n    <div class=\"ngx-apple-mapkit__map\"></div>\r\n</div>\r\n<ng-content></ng-content>\r\n<ng-container></ng-container>\r\n", styles: [".ngx-apple-mapkit{height:100%;position:relative}.ngx-apple-mapkit .ngx-apple-mapkit__map{inset:0;position:absolute}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapkitComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-apple-mapkit', template: "<div class=\"ngx-apple-mapkit\">\r\n    <div class=\"ngx-apple-mapkit__map\"></div>\r\n</div>\r\n<ng-content></ng-content>\r\n<ng-container></ng-container>\r\n", styles: [".ngx-apple-mapkit{height:100%;position:relative}.ngx-apple-mapkit .ngx-apple-mapkit__map{inset:0;position:absolute}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.KeyValueDiffers }, { type: i1.AppleMapsService }, { type: i0.ViewContainerRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { options: [{
                type: Input
            }], settings: [{
                type: Input
            }], height: [{
                type: Input
            }], onLoaded: [{
                type: Output
            }], annotations: [{
                type: ContentChildren,
                args: ['apple-mapkit-annotation', { descendants: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGUtbWFwa2l0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1hcHBsZS1tYXBraXQvc3JjL2xpYi9hcHBsZS1tYXBraXQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFwcGxlLW1hcGtpdC9zcmMvbGliL2FwcGxlLW1hcGtpdC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0gsU0FBUyxFQUNULGVBQWUsRUFFZixZQUFZLEVBQ1osS0FBSyxFQUlMLE1BQU0sRUFHVCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sTUFBTSxDQUFDOzs7QUFTckMsTUFBTSxPQUFPLG9CQUFvQjtJQTBCN0IsWUFBb0IsT0FBd0IsRUFBVSxnQkFBa0MsRUFBVSxlQUFpQyxFQUFVLEdBQXNCO1FBQS9JLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBdEJ6SixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNoQyxXQUFNLEdBQVEsSUFBSSxDQUFDO1FBRTNCLDRGQUE0RjtRQUM1RixrREFBa0Q7UUFDM0MsbUJBQWMsR0FBRyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQztRQUN6QyxvQkFBb0I7UUFDYixvQkFBZSxHQUFHO1lBQ3JCLFdBQVcsRUFBRSxNQUFNLENBQUMsVUFBVSxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsOEJBQThCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTztZQUM5RyxhQUFhLEVBQUUsSUFBSTtZQUNuQixPQUFPLEVBQUUsVUFBVTtZQUNuQixnQkFBZ0IsRUFB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QUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2xDO1NBQ0o7SUFDTCxDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDN0IsQ0FBQzs4R0EzRlEsb0JBQW9CO2tHQUFwQixvQkFBb0IsMFFDekJqQyxpS0FLQTs7MkZEb0JhLG9CQUFvQjtrQkFMaEMsU0FBUzsrQkFDSSxrQkFBa0I7b01BS25CLE9BQU87c0JBQWYsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDSSxRQUFRO3NCQUFqQixNQUFNO2dCQUUwRCxXQUFXO3NCQUEzRSxlQUFlO3VCQUFDLHlCQUF5QixFQUFFLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIERvQ2hlY2ssXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIEtleVZhbHVlQ2hhbmdlcyxcbiAgICBLZXlWYWx1ZURpZmZlcnMsXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWFwQ29uc3RydWN0b3JPcHRpb25zLCBNYXBLaXRJbml0T3B0aW9uc30gZnJvbSBcIi4vZGVjbGFyYXRpb25zXCI7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7QXBwbGVNYXBzU2VydmljZX0gZnJvbSBcIi4vYXBwbGUtbWFwcy5zZXJ2aWNlXCI7XG5pbXBvcnQge0FwcGxlTWFwa2l0QW5ub3RhdGlvbkNvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9hcHBsZS1tYXBraXQtYW5ub3RhdGlvbi9hcHBsZS1tYXBraXQtYW5ub3RhdGlvbi5jb21wb25lbnRcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZ3gtYXBwbGUtbWFwa2l0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwbGUtbWFwa2l0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9hcHBsZS1tYXBraXQuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEFwcGxlTWFwa2l0Q29tcG9uZW50IGltcGxlbWVudHMgRG9DaGVjaywgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgICBASW5wdXQoKSBvcHRpb25zOiBNYXBLaXRJbml0T3B0aW9ucztcbiAgICBASW5wdXQoKSBzZXR0aW5nczogTWFwQ29uc3RydWN0b3JPcHRpb25zO1xuICAgIEBJbnB1dCgpIGhlaWdodDogc3RyaW5nO1xuICAgIEBPdXRwdXQoKSBvbkxvYWRlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBwcml2YXRlIGxvYWRlZDogYW55ID0gbnVsbDtcbiAgICBAQ29udGVudENoaWxkcmVuKCdhcHBsZS1tYXBraXQtYW5ub3RhdGlvbicsIHtkZXNjZW5kYW50czogdHJ1ZX0pIGFubm90YXRpb25zOiBRdWVyeUxpc3Q8QXBwbGVNYXBraXRBbm5vdGF0aW9uQ29tcG9uZW50PjtcbiAgICAvLyBAQ29udGVudENoaWxkcmVuKFRlbXBsYXRlUmVmLCB7ZGVzY2VuZGFudHM6IHRydWV9KSB0ZW1wbGF0ZTogUXVlcnlMaXN0PFRlbXBsYXRlUmVmPGFueT4+O1xuICAgIC8vIHByaXZhdGUgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8VGVtcGxhdGVSZWY8YW55Pj47XG4gICAgcHVibGljIGRlZmF1bHRPcHRpb25zID0ge2xhbmd1YWdlOiAnZW4nfTtcbiAgICAvLyBhbm5vdGF0aW9ucyA9IFtdO1xuICAgIHB1YmxpYyBkZWZhdWx0U2V0dGluZ3MgPSB7XG4gICAgICAgIGNvbG9yU2NoZW1lOiB3aW5kb3cubWF0Y2hNZWRpYSAmJiB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXMgPyAnZGFyaycgOiAnbGlnaHQnLFxuICAgICAgICBpc1pvb21FbmFibGVkOiB0cnVlLFxuICAgICAgICBtYXBUeXBlOiAnc3RhbmRhcmQnLFxuICAgICAgICBzaG93c1pvb21Db250cm9sOiB0cnVlLFxuICAgICAgICBzaG93c01hcFR5cGVDb250cm9sOiB0cnVlXG4gICAgfTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZVxuICAgIHByaXZhdGUgX29wdGlvbnM6IGFueTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZVxuICAgIHByaXZhdGUgX3NldHRpbmdzOiBhbnk7XG4gICAgcHJpdmF0ZSBrZXlWYWx1ZTogbnVtYmVyO1xuICAgIHB1YmxpYyBrZXlTb3VyY2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oLTEpO1xuICAgIHB1YmxpYyBrZXkgPSB0aGlzLmtleVNvdXJjZS5hc09ic2VydmFibGUoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLCBwcml2YXRlIGFwcGxlTWFwc1NlcnZpY2U6IEFwcGxlTWFwc1NlcnZpY2UsIHByaXZhdGUgdmlld1RlbXBsYXRlUmVmOiBWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHt9O1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdCgpIHtcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHsuLi50aGlzLmRlZmF1bHRTZXR0aW5ncywgLi4udGhpcy5zZXR0aW5nc30pO1xuICAgICAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7Li4udGhpcy5kZWZhdWx0T3B0aW9ucywgLi4udGhpcy5vcHRpb25zfSk7XG4gICAgICAgIHRoaXMuYXBwbGVNYXBzU2VydmljZS5pbml0KG9wdGlvbnMsIHNldHRpbmdzLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJbSW5pdCBuZ3gtYXBwbGUtbWFwa2l0XVwiLCBkYXRhKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5sb2FkZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTG9hZGVkLmVtaXQoZGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSBkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5rZXlWYWx1ZSA9IGRhdGEua2V5O1xuICAgICAgICAgICAgdGhpcy5rZXlTb3VyY2UubmV4dChkYXRhLmtleSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgb3B0aW9uc0NoYW5nZWQoY2hhbmdlczogS2V5VmFsdWVDaGFuZ2VzPHN0cmluZywgYW55Pikge1xuICAgICAgICB0aGlzLmFwcGxlTWFwc1NlcnZpY2Uub3B0aW9uc0NoYW5nZWQoY2hhbmdlcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXR0aW5nc0NoYW5nZWQoY2hhbmdlczogS2V5VmFsdWVDaGFuZ2VzPHN0cmluZywgYW55Pikge1xuICAgICAgICB0aGlzLmFwcGxlTWFwc1NlcnZpY2Uuc2V0dGluZ3NDaGFuZ2VkKGNoYW5nZXMsIHRoaXMua2V5VmFsdWUpO1xuICAgIH1cblxuICAgIC8vIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAvLyAgICAgdGhpcy50ZW1wbGF0ZS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIC8vICAgICAgICAgY29uc3QgdGVtcGxhdGUgPSB0aGlzLnZpZXdUZW1wbGF0ZVJlZi5jcmVhdGVFbWJlZGRlZFZpZXcoaXRlbSk7XG4gICAgLy8gICAgICAgICB0aGlzLnZpZXdUZW1wbGF0ZVJlZi5yZW1vdmUodGhpcy52aWV3VGVtcGxhdGVSZWYuaW5kZXhPZih0ZW1wbGF0ZSkpO1xuICAgIC8vICAgICAgICAgdGVtcGxhdGUuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIC8vICAgICAgICAgdGhpcy5hbm5vdGF0aW9ucy5wdXNoKGl0ZW0pO1xuICAgIC8vICAgICAgICAgdGhpcy52aWV3VGVtcGxhdGVSZWYuY2xlYXIoKTtcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHByb3ZpZGUgSldUIHRva2VuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zID0gdGhpcy5kaWZmZXJzLmZpbmQodGhpcy5vcHRpb25zKS5jcmVhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5ncyA9IHRoaXMuZGlmZmVycy5maW5kKHRoaXMuc2V0dGluZ3MpLmNyZWF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdEb0NoZWNrKCkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5fb3B0aW9ucy5kaWZmKHRoaXMub3B0aW9ucyk7XG4gICAgICAgICAgICBpZiAob3B0aW9ucykge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc0NoYW5nZWQob3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIGNvbnN0IHNldHRpbmdzID0gdGhpcy5fc2V0dGluZ3MuZGlmZih0aGlzLnNldHRpbmdzKTtcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3NDaGFuZ2VkKHNldHRpbmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJuZ3gtYXBwbGUtbWFwa2l0XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwibmd4LWFwcGxlLW1hcGtpdF9fbWFwXCI+PC9kaXY+XHJcbjwvZGl2PlxyXG48bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbjxuZy1jb250YWluZXI+PC9uZy1jb250YWluZXI+XHJcbiJdfQ==
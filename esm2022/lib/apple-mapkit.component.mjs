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
        this.logging = false;
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
        if (this.language && typeof this.language === "string") {
            this.defaultOptions.language = this.language;
        }
        const settings = Object.assign({ ...this.defaultSettings, ...this.settings });
        const options = Object.assign({ ...this.defaultOptions, ...this.options });
        this.appleMapsService.init(options, settings, (data) => {
            if (this.logging) {
                console.log("[ngx-apple-mapkit] Init", data);
            }
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.3", type: AppleMapkitComponent, selector: "ngx-apple-mapkit", inputs: { options: "options", settings: "settings", logging: "logging", language: "language", height: "height" }, outputs: { onLoaded: "onLoaded" }, queries: [{ propertyName: "annotations", predicate: ["apple-mapkit-annotation"], descendants: true }], ngImport: i0, template: "<div class=\"ngx-apple-mapkit\">\r\n    <div class=\"ngx-apple-mapkit__map\"></div>\r\n</div>\r\n<ng-content></ng-content>\r\n<ng-container></ng-container>\r\n", styles: [".ngx-apple-mapkit{height:100%;position:relative}.ngx-apple-mapkit .ngx-apple-mapkit__map{inset:0;position:absolute}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapkitComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-apple-mapkit', template: "<div class=\"ngx-apple-mapkit\">\r\n    <div class=\"ngx-apple-mapkit__map\"></div>\r\n</div>\r\n<ng-content></ng-content>\r\n<ng-container></ng-container>\r\n", styles: [".ngx-apple-mapkit{height:100%;position:relative}.ngx-apple-mapkit .ngx-apple-mapkit__map{inset:0;position:absolute}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.KeyValueDiffers }, { type: i1.AppleMapsService }, { type: i0.ViewContainerRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { options: [{
                type: Input
            }], settings: [{
                type: Input
            }], logging: [{
                type: Input
            }], language: [{
                type: Input
            }], height: [{
                type: Input
            }], onLoaded: [{
                type: Output
            }], annotations: [{
                type: ContentChildren,
                args: ['apple-mapkit-annotation', { descendants: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGUtbWFwa2l0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1hcHBsZS1tYXBraXQvc3JjL2xpYi9hcHBsZS1tYXBraXQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFwcGxlLW1hcGtpdC9zcmMvbGliL2FwcGxlLW1hcGtpdC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0gsU0FBUyxFQUNULGVBQWUsRUFFZixZQUFZLEVBQ1osS0FBSyxFQUlMLE1BQU0sRUFHVCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sTUFBTSxDQUFDOzs7QUFTckMsTUFBTSxPQUFPLG9CQUFvQjtJQTRCN0IsWUFBb0IsT0FBd0IsRUFDeEIsZ0JBQWtDLEVBQ2xDLGVBQWlDLEVBQ2pDLEdBQXNCO1FBSHRCLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBQ3hCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsb0JBQWUsR0FBZixlQUFlLENBQWtCO1FBQ2pDLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBNUJqQyxZQUFPLEdBQVksS0FBSyxDQUFDO1FBR3hCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hDLFdBQU0sR0FBUSxJQUFJLENBQUM7UUFFM0IsNEZBQTRGO1FBQzVGLGtEQUFrRDtRQUMzQyxtQkFBYyxHQUFHLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDO1FBQ3pDLG9CQUFvQjtRQUNiLG9CQUFlLEdBQUc7WUFDckIsV0FBVyxFQUFFLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPO1lBQzlHLGFBQWEsRUFBRSxJQUFJO1lBQ25C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T0FBTyxFQUFFO2dCQUNULElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDaEM7U0FDSjtRQUNELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwRCxJQUFJLFFBQVEsRUFBRTtnQkFDVixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2xDO1NBQ0o7SUFDTCxDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDN0IsQ0FBQzs4R0FyR1Esb0JBQW9CO2tHQUFwQixvQkFBb0Isb1RDekJqQyxpS0FLQTs7MkZEb0JhLG9CQUFvQjtrQkFMaEMsU0FBUzsrQkFDSSxrQkFBa0I7b01BS25CLE9BQU87c0JBQWYsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDSSxRQUFRO3NCQUFqQixNQUFNO2dCQUUwRCxXQUFXO3NCQUEzRSxlQUFlO3VCQUFDLHlCQUF5QixFQUFFLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIERvQ2hlY2ssXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIEtleVZhbHVlQ2hhbmdlcyxcbiAgICBLZXlWYWx1ZURpZmZlcnMsXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWFwQ29uc3RydWN0b3JPcHRpb25zLCBNYXBLaXRJbml0T3B0aW9uc30gZnJvbSBcIi4vZGVjbGFyYXRpb25zXCI7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7QXBwbGVNYXBzU2VydmljZX0gZnJvbSBcIi4vYXBwbGUtbWFwcy5zZXJ2aWNlXCI7XG5pbXBvcnQge0FwcGxlTWFwa2l0QW5ub3RhdGlvbkNvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9hcHBsZS1tYXBraXQtYW5ub3RhdGlvbi9hcHBsZS1tYXBraXQtYW5ub3RhdGlvbi5jb21wb25lbnRcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZ3gtYXBwbGUtbWFwa2l0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwbGUtbWFwa2l0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9hcHBsZS1tYXBraXQuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEFwcGxlTWFwa2l0Q29tcG9uZW50IGltcGxlbWVudHMgRG9DaGVjaywgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgICBASW5wdXQoKSBvcHRpb25zOiBNYXBLaXRJbml0T3B0aW9ucztcbiAgICBASW5wdXQoKSBzZXR0aW5nczogTWFwQ29uc3RydWN0b3JPcHRpb25zO1xuICAgIEBJbnB1dCgpIGxvZ2dpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBsYW5ndWFnZTogXCJlblwiIHwgXCJkZVwiIHwgXCJlc1wiIHwgXCJpdFwiIHwgIFwiZnJcIiB8IHN0cmluZztcbiAgICBASW5wdXQoKSBoZWlnaHQ6IHN0cmluZztcbiAgICBAT3V0cHV0KCkgb25Mb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgcHJpdmF0ZSBsb2FkZWQ6IGFueSA9IG51bGw7XG4gICAgQENvbnRlbnRDaGlsZHJlbignYXBwbGUtbWFwa2l0LWFubm90YXRpb24nLCB7ZGVzY2VuZGFudHM6IHRydWV9KSBhbm5vdGF0aW9uczogUXVlcnlMaXN0PEFwcGxlTWFwa2l0QW5ub3RhdGlvbkNvbXBvbmVudD47XG4gICAgLy8gQENvbnRlbnRDaGlsZHJlbihUZW1wbGF0ZVJlZiwge2Rlc2NlbmRhbnRzOiB0cnVlfSkgdGVtcGxhdGU6IFF1ZXJ5TGlzdDxUZW1wbGF0ZVJlZjxhbnk+PjtcbiAgICAvLyBwcml2YXRlIHRlbXBsYXRlczogUXVlcnlMaXN0PFRlbXBsYXRlUmVmPGFueT4+O1xuICAgIHB1YmxpYyBkZWZhdWx0T3B0aW9ucyA9IHtsYW5ndWFnZTogJ2VuJ307XG4gICAgLy8gYW5ub3RhdGlvbnMgPSBbXTtcbiAgICBwdWJsaWMgZGVmYXVsdFNldHRpbmdzID0ge1xuICAgICAgICBjb2xvclNjaGVtZTogd2luZG93Lm1hdGNoTWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzID8gJ2RhcmsnIDogJ2xpZ2h0JyxcbiAgICAgICAgaXNab29tRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgbWFwVHlwZTogJ3N0YW5kYXJkJyxcbiAgICAgICAgc2hvd3Nab29tQ29udHJvbDogdHJ1ZSxcbiAgICAgICAgc2hvd3NNYXBUeXBlQ29udHJvbDogdHJ1ZVxuICAgIH07XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhcmlhYmxlLW5hbWVcbiAgICBwcml2YXRlIF9vcHRpb25zOiBhbnk7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhcmlhYmxlLW5hbWVcbiAgICBwcml2YXRlIF9zZXR0aW5nczogYW55O1xuICAgIHByaXZhdGUga2V5VmFsdWU6IG51bWJlcjtcbiAgICBwdWJsaWMga2V5U291cmNlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KC0xKTtcbiAgICBwdWJsaWMga2V5ID0gdGhpcy5rZXlTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRpZmZlcnM6IEtleVZhbHVlRGlmZmVycyxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGFwcGxlTWFwc1NlcnZpY2U6IEFwcGxlTWFwc1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB2aWV3VGVtcGxhdGVSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSB7fTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmxhbmd1YWdlICYmIHR5cGVvZiB0aGlzLmxhbmd1YWdlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRPcHRpb25zLmxhbmd1YWdlID0gdGhpcy5sYW5ndWFnZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oey4uLnRoaXMuZGVmYXVsdFNldHRpbmdzLCAuLi50aGlzLnNldHRpbmdzfSk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHsuLi50aGlzLmRlZmF1bHRPcHRpb25zLCAuLi50aGlzLm9wdGlvbnN9KTtcbiAgICAgICAgdGhpcy5hcHBsZU1hcHNTZXJ2aWNlLmluaXQob3B0aW9ucywgc2V0dGluZ3MsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5sb2dnaW5nKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJbbmd4LWFwcGxlLW1hcGtpdF0gSW5pdFwiLCBkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5sb2FkZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTG9hZGVkLmVtaXQoZGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSBkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5rZXlWYWx1ZSA9IGRhdGEua2V5O1xuICAgICAgICAgICAgdGhpcy5rZXlTb3VyY2UubmV4dChkYXRhLmtleSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgb3B0aW9uc0NoYW5nZWQoY2hhbmdlczogS2V5VmFsdWVDaGFuZ2VzPHN0cmluZywgYW55Pikge1xuICAgICAgICB0aGlzLmFwcGxlTWFwc1NlcnZpY2Uub3B0aW9uc0NoYW5nZWQoY2hhbmdlcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXR0aW5nc0NoYW5nZWQoY2hhbmdlczogS2V5VmFsdWVDaGFuZ2VzPHN0cmluZywgYW55Pikge1xuICAgICAgICB0aGlzLmFwcGxlTWFwc1NlcnZpY2Uuc2V0dGluZ3NDaGFuZ2VkKGNoYW5nZXMsIHRoaXMua2V5VmFsdWUpO1xuICAgIH1cblxuICAgIC8vIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAvLyAgICAgdGhpcy50ZW1wbGF0ZS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIC8vICAgICAgICAgY29uc3QgdGVtcGxhdGUgPSB0aGlzLnZpZXdUZW1wbGF0ZVJlZi5jcmVhdGVFbWJlZGRlZFZpZXcoaXRlbSk7XG4gICAgLy8gICAgICAgICB0aGlzLnZpZXdUZW1wbGF0ZVJlZi5yZW1vdmUodGhpcy52aWV3VGVtcGxhdGVSZWYuaW5kZXhPZih0ZW1wbGF0ZSkpO1xuICAgIC8vICAgICAgICAgdGVtcGxhdGUuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIC8vICAgICAgICAgdGhpcy5hbm5vdGF0aW9ucy5wdXNoKGl0ZW0pO1xuICAgIC8vICAgICAgICAgdGhpcy52aWV3VGVtcGxhdGVSZWYuY2xlYXIoKTtcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHByb3ZpZGUgSldUIHRva2VuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zID0gdGhpcy5kaWZmZXJzLmZpbmQodGhpcy5vcHRpb25zKS5jcmVhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5ncyA9IHRoaXMuZGlmZmVycy5maW5kKHRoaXMuc2V0dGluZ3MpLmNyZWF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdEb0NoZWNrKCkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5fb3B0aW9ucy5kaWZmKHRoaXMub3B0aW9ucyk7XG4gICAgICAgICAgICBpZiAob3B0aW9ucykge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc0NoYW5nZWQob3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIGNvbnN0IHNldHRpbmdzID0gdGhpcy5fc2V0dGluZ3MuZGlmZih0aGlzLnNldHRpbmdzKTtcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3NDaGFuZ2VkKHNldHRpbmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJuZ3gtYXBwbGUtbWFwa2l0XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwibmd4LWFwcGxlLW1hcGtpdF9fbWFwXCI+PC9kaXY+XHJcbjwvZGl2PlxyXG48bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbjxuZy1jb250YWluZXI+PC9uZy1jb250YWluZXI+XHJcbiJdfQ==
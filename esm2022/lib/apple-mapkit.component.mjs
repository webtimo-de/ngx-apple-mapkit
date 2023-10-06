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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.3", type: AppleMapkitComponent, selector: "ngx-apple-mapkit", inputs: { options: "options", settings: "settings", logging: "logging", language: "language" }, outputs: { onLoaded: "onLoaded" }, queries: [{ propertyName: "annotations", predicate: ["apple-mapkit-annotation"], descendants: true }], ngImport: i0, template: "<div class=\"ngx-apple-mapkit\">\r\n    <div class=\"ngx-apple-mapkit__map\"></div>\r\n</div>\r\n<ng-content></ng-content>\r\n<ng-container></ng-container>\r\n", styles: [".ngx-apple-mapkit{height:100%;position:relative}.ngx-apple-mapkit .ngx-apple-mapkit__map{inset:0;position:absolute}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapkitComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-apple-mapkit', template: "<div class=\"ngx-apple-mapkit\">\r\n    <div class=\"ngx-apple-mapkit__map\"></div>\r\n</div>\r\n<ng-content></ng-content>\r\n<ng-container></ng-container>\r\n", styles: [".ngx-apple-mapkit{height:100%;position:relative}.ngx-apple-mapkit .ngx-apple-mapkit__map{inset:0;position:absolute}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.KeyValueDiffers }, { type: i1.AppleMapsService }, { type: i0.ViewContainerRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { options: [{
                type: Input,
                args: [{ required: true }]
            }], settings: [{
                type: Input,
                args: [{ required: true }]
            }], logging: [{
                type: Input
            }], language: [{
                type: Input
            }], onLoaded: [{
                type: Output
            }], annotations: [{
                type: ContentChildren,
                args: ['apple-mapkit-annotation', { descendants: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGUtbWFwa2l0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1hcHBsZS1tYXBraXQvc3JjL2xpYi9hcHBsZS1tYXBraXQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFwcGxlLW1hcGtpdC9zcmMvbGliL2FwcGxlLW1hcGtpdC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0gsU0FBUyxFQUNULGVBQWUsRUFFZixZQUFZLEVBQ1osS0FBSyxFQUlMLE1BQU0sRUFHVCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sTUFBTSxDQUFDOzs7QUFTckMsTUFBTSxPQUFPLG9CQUFvQjtJQTJCN0IsWUFBb0IsT0FBd0IsRUFDeEIsZ0JBQWtDLEVBQ2xDLGVBQWlDLEVBQ2pDLEdBQXNCO1FBSHRCLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBQ3hCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsb0JBQWUsR0FBZixlQUFlLENBQWtCO1FBQ2pDLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBM0JqQyxZQUFPLEdBQVksS0FBSyxDQUFDO1FBRXhCLGFBQVEsR0FBK0IsSUFBSSxZQUFZLEVBQWdCLENBQUM7UUFDMUUsV0FBTSxHQUFpQixJQUFJLENBQUM7UUFFcEMsNEZBQTRGO1FBQzVGLGtEQUFrRDtRQUMzQyxtQkFBYyxHQUFHLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDO1FBQ3pDLG9CQUFvQjtRQUNiLG9CQUFlLEdBQUc7WUFDckIsV0FBVyxFQUFFLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPO1lBQzlHLGFBQWEsRUFBRSxJQUFJO1lB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QUksT0FBTyxFQUFFO2dCQUNULElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDaEM7U0FDSjtRQUNELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwRCxJQUFJLFFBQVEsRUFBRTtnQkFDVixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2xDO1NBQ0o7SUFDTCxDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDN0IsQ0FBQzs4R0FwR1Esb0JBQW9CO2tHQUFwQixvQkFBb0Isa1NDekJqQyxpS0FLQTs7MkZEb0JhLG9CQUFvQjtrQkFMaEMsU0FBUzsrQkFDSSxrQkFBa0I7b01BS0gsT0FBTztzQkFBL0IsS0FBSzt1QkFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUM7Z0JBQ0UsUUFBUTtzQkFBaEMsS0FBSzt1QkFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUM7Z0JBQ2QsT0FBTztzQkFBZixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0ksUUFBUTtzQkFBakIsTUFBTTtnQkFFMEQsV0FBVztzQkFBM0UsZUFBZTt1QkFBQyx5QkFBeUIsRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQWZ0ZXJWaWV3SW5pdCxcclxuICAgIENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgQ29udGVudENoaWxkcmVuLFxyXG4gICAgRG9DaGVjayxcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIElucHV0LFxyXG4gICAgS2V5VmFsdWVDaGFuZ2VzLFxyXG4gICAgS2V5VmFsdWVEaWZmZXJzLFxyXG4gICAgT25Jbml0LFxyXG4gICAgT3V0cHV0LFxyXG4gICAgUXVlcnlMaXN0LFxyXG4gICAgVmlld0NvbnRhaW5lclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge01hcENvbnN0cnVjdG9yT3B0aW9ucywgTWFwS2l0SW5pdE9wdGlvbnMsIE1hcEtpdExvYWRlZH0gZnJvbSBcIi4vZGVjbGFyYXRpb25zXCI7XHJcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0fSBmcm9tIFwicnhqc1wiO1xyXG5pbXBvcnQge0FwcGxlTWFwc1NlcnZpY2V9IGZyb20gXCIuL2FwcGxlLW1hcHMuc2VydmljZVwiO1xyXG5pbXBvcnQge0FwcGxlTWFwa2l0QW5ub3RhdGlvbkNvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9hcHBsZS1tYXBraXQtYW5ub3RhdGlvbi9hcHBsZS1tYXBraXQtYW5ub3RhdGlvbi5jb21wb25lbnRcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICduZ3gtYXBwbGUtbWFwa2l0JyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9hcHBsZS1tYXBraXQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwbGUtbWFwa2l0LmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwbGVNYXBraXRDb21wb25lbnQgaW1wbGVtZW50cyBEb0NoZWNrLCBPbkluaXQsIEFmdGVyVmlld0luaXQge1xyXG4gICAgQElucHV0KHtyZXF1aXJlZDogdHJ1ZX0pIG9wdGlvbnM6IE1hcEtpdEluaXRPcHRpb25zO1xyXG4gICAgQElucHV0KHtyZXF1aXJlZDogdHJ1ZX0pIHNldHRpbmdzOiBNYXBDb25zdHJ1Y3Rvck9wdGlvbnM7XHJcbiAgICBASW5wdXQoKSBsb2dnaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBsYW5ndWFnZTogXCJlblwiIHwgXCJkZVwiIHwgXCJlc1wiIHwgXCJpdFwiIHwgIFwiZnJcIiB8IHN0cmluZztcclxuICAgIEBPdXRwdXQoKSBvbkxvYWRlZDogRXZlbnRFbWl0dGVyPE1hcEtpdExvYWRlZD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEtpdExvYWRlZD4oKTtcclxuICAgIHByaXZhdGUgbG9hZGVkOiBNYXBLaXRMb2FkZWQgPSBudWxsO1xyXG4gICAgQENvbnRlbnRDaGlsZHJlbignYXBwbGUtbWFwa2l0LWFubm90YXRpb24nLCB7ZGVzY2VuZGFudHM6IHRydWV9KSBhbm5vdGF0aW9uczogUXVlcnlMaXN0PEFwcGxlTWFwa2l0QW5ub3RhdGlvbkNvbXBvbmVudD47XHJcbiAgICAvLyBAQ29udGVudENoaWxkcmVuKFRlbXBsYXRlUmVmLCB7ZGVzY2VuZGFudHM6IHRydWV9KSB0ZW1wbGF0ZTogUXVlcnlMaXN0PFRlbXBsYXRlUmVmPGFueT4+O1xyXG4gICAgLy8gcHJpdmF0ZSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxUZW1wbGF0ZVJlZjxhbnk+PjtcclxuICAgIHB1YmxpYyBkZWZhdWx0T3B0aW9ucyA9IHtsYW5ndWFnZTogJ2VuJ307XHJcbiAgICAvLyBhbm5vdGF0aW9ucyA9IFtdO1xyXG4gICAgcHVibGljIGRlZmF1bHRTZXR0aW5ncyA9IHtcclxuICAgICAgICBjb2xvclNjaGVtZTogd2luZG93Lm1hdGNoTWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzID8gJ2RhcmsnIDogJ2xpZ2h0JyxcclxuICAgICAgICBpc1pvb21FbmFibGVkOiB0cnVlLFxyXG4gICAgICAgIG1hcFR5cGU6ICdzdGFuZGFyZCcsXHJcbiAgICAgICAgc2hvd3Nab29tQ29udHJvbDogdHJ1ZSxcclxuICAgICAgICBzaG93c01hcFR5cGVDb250cm9sOiB0cnVlXHJcbiAgICB9O1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhcmlhYmxlLW5hbWVcclxuICAgIHByaXZhdGUgX29wdGlvbnM6IGFueTtcclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YXJpYWJsZS1uYW1lXHJcbiAgICBwcml2YXRlIF9zZXR0aW5nczogYW55O1xyXG4gICAgcHJpdmF0ZSBrZXlWYWx1ZTogbnVtYmVyO1xyXG4gICAgcHVibGljIGtleVNvdXJjZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigtMSk7XHJcbiAgICBwdWJsaWMga2V5ID0gdGhpcy5rZXlTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGFwcGxlTWFwc1NlcnZpY2U6IEFwcGxlTWFwc1NlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHZpZXdUZW1wbGF0ZVJlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubGFuZ3VhZ2UgJiYgdHlwZW9mIHRoaXMubGFuZ3VhZ2UgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0T3B0aW9ucy5sYW5ndWFnZSA9IHRoaXMubGFuZ3VhZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7Li4udGhpcy5kZWZhdWx0U2V0dGluZ3MsIC4uLnRoaXMuc2V0dGluZ3N9KTtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7Li4udGhpcy5kZWZhdWx0T3B0aW9ucywgLi4udGhpcy5vcHRpb25zfSk7XHJcbiAgICAgICAgdGhpcy5hcHBsZU1hcHNTZXJ2aWNlLmluaXQob3B0aW9ucywgc2V0dGluZ3MsIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvZ2dpbmcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW25neC1hcHBsZS1tYXBraXRdIEluaXRcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmxvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkxvYWRlZC5lbWl0KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSBkYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMua2V5VmFsdWUgPSBkYXRhLmtleTtcclxuICAgICAgICAgICAgdGhpcy5rZXlTb3VyY2UubmV4dChkYXRhLmtleSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvcHRpb25zQ2hhbmdlZChjaGFuZ2VzOiBLZXlWYWx1ZUNoYW5nZXM8c3RyaW5nLCBhbnk+KSB7XHJcbiAgICAgICAgdGhpcy5hcHBsZU1hcHNTZXJ2aWNlLm9wdGlvbnNDaGFuZ2VkKGNoYW5nZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0dGluZ3NDaGFuZ2VkKGNoYW5nZXM6IEtleVZhbHVlQ2hhbmdlczxzdHJpbmcsIGFueT4pIHtcclxuICAgICAgICB0aGlzLmFwcGxlTWFwc1NlcnZpY2Uuc2V0dGluZ3NDaGFuZ2VkKGNoYW5nZXMsIHRoaXMua2V5VmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcclxuICAgIC8vICAgICB0aGlzLnRlbXBsYXRlLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAvLyAgICAgICAgIGNvbnN0IHRlbXBsYXRlID0gdGhpcy52aWV3VGVtcGxhdGVSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KGl0ZW0pO1xyXG4gICAgLy8gICAgICAgICB0aGlzLnZpZXdUZW1wbGF0ZVJlZi5yZW1vdmUodGhpcy52aWV3VGVtcGxhdGVSZWYuaW5kZXhPZih0ZW1wbGF0ZSkpO1xyXG4gICAgLy8gICAgICAgICB0ZW1wbGF0ZS5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuYW5ub3RhdGlvbnMucHVzaChpdGVtKTtcclxuICAgIC8vICAgICAgICAgdGhpcy52aWV3VGVtcGxhdGVSZWYuY2xlYXIoKTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHByb3ZpZGUgSldUIHRva2VuJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHRoaXMuZGlmZmVycy5maW5kKHRoaXMub3B0aW9ucykuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncykge1xyXG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5ncyA9IHRoaXMuZGlmZmVycy5maW5kKHRoaXMuc2V0dGluZ3MpLmNyZWF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ0RvQ2hlY2soKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5fb3B0aW9ucy5kaWZmKHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNDaGFuZ2VkKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNldHRpbmdzID0gdGhpcy5fc2V0dGluZ3MuZGlmZih0aGlzLnNldHRpbmdzKTtcclxuICAgICAgICAgICAgaWYgKHNldHRpbmdzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzQ2hhbmdlZChzZXR0aW5ncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwibmd4LWFwcGxlLW1hcGtpdFwiPlxyXG4gICAgPGRpdiBjbGFzcz1cIm5neC1hcHBsZS1tYXBraXRfX21hcFwiPjwvZGl2PlxyXG48L2Rpdj5cclxuPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG48bmctY29udGFpbmVyPjwvbmctY29udGFpbmVyPlxyXG4iXX0=
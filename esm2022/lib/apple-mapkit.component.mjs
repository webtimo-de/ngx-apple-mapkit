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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.3", ngImport: i0, type: AppleMapkitComponent, deps: [{ token: i0.KeyValueDiffers }, { token: i1.AppleMapsService }, { token: i0.ViewContainerRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.3", type: AppleMapkitComponent, selector: "ngx-apple-mapkit", inputs: { options: "options", settings: "settings", logging: "logging", language: "language" }, outputs: { onLoaded: "onLoaded" }, queries: [{ propertyName: "annotations", predicate: ["apple-mapkit-annotation"], descendants: true }], ngImport: i0, template: "<div class=\"ngx-apple-mapkit\">\n    <div class=\"ngx-apple-mapkit__map\"></div>\n</div>\n<ng-content></ng-content>\n<ng-container></ng-container>\n", styles: [".ngx-apple-mapkit{height:100%;position:relative}.ngx-apple-mapkit .ngx-apple-mapkit__map{inset:0;position:absolute}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.3", ngImport: i0, type: AppleMapkitComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-apple-mapkit', template: "<div class=\"ngx-apple-mapkit\">\n    <div class=\"ngx-apple-mapkit__map\"></div>\n</div>\n<ng-content></ng-content>\n<ng-container></ng-container>\n", styles: [".ngx-apple-mapkit{height:100%;position:relative}.ngx-apple-mapkit .ngx-apple-mapkit__map{inset:0;position:absolute}\n"] }]
        }], ctorParameters: () => [{ type: i0.KeyValueDiffers }, { type: i1.AppleMapsService }, { type: i0.ViewContainerRef }, { type: i0.ChangeDetectorRef }], propDecorators: { options: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGUtbWFwa2l0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1hcHBsZS1tYXBraXQvc3JjL2xpYi9hcHBsZS1tYXBraXQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFwcGxlLW1hcGtpdC9zcmMvbGliL2FwcGxlLW1hcGtpdC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0gsU0FBUyxFQUNULGVBQWUsRUFFZixZQUFZLEVBQ1osS0FBSyxFQUlMLE1BQU0sRUFHVCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sTUFBTSxDQUFDOzs7QUFTckMsTUFBTSxPQUFPLG9CQUFvQjtJQTJCN0IsWUFBb0IsT0FBd0IsRUFDeEIsZ0JBQWtDLEVBQ2xDLGVBQWlDLEVBQ2pDLEdBQXNCO1FBSHRCLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBQ3hCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsb0JBQWUsR0FBZixlQUFlLENBQWtCO1FBQ2pDLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBM0JqQyxZQUFPLEdBQVksS0FBSyxDQUFDO1FBRXhCLGFBQVEsR0FBK0IsSUFBSSxZQUFZLEVBQWdCLENBQUM7UUFDMUUsV0FBTSxHQUFpQixJQUFJLENBQUM7UUFFcEMsNEZBQTRGO1FBQzVGLGtEQUFrRDtRQUMzQyxtQkFBYyxHQUFHLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDO1FBQ3pDLG9CQUFvQjtRQUNiLG9CQUFlLEdBQUc7WUFDckIsV0FBVyxFQUFFLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPO1lBQzlHLGFBQWEsRUFBRSxJQUFJO1lB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QUksT0FBTyxFQUFFO2dCQUNULElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDaEM7U0FDSjtRQUNELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwRCxJQUFJLFFBQVEsRUFBRTtnQkFDVixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2xDO1NBQ0o7SUFDTCxDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDN0IsQ0FBQzs4R0FwR1Esb0JBQW9CO2tHQUFwQixvQkFBb0Isa1NDekJqQyx1SkFLQTs7MkZEb0JhLG9CQUFvQjtrQkFMaEMsU0FBUzsrQkFDSSxrQkFBa0I7a0xBS0gsT0FBTztzQkFBL0IsS0FBSzt1QkFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUM7Z0JBQ0UsUUFBUTtzQkFBaEMsS0FBSzt1QkFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUM7Z0JBQ2QsT0FBTztzQkFBZixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0ksUUFBUTtzQkFBakIsTUFBTTtnQkFFMEQsV0FBVztzQkFBM0UsZUFBZTt1QkFBQyx5QkFBeUIsRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBEb0NoZWNrLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBLZXlWYWx1ZUNoYW5nZXMsXG4gICAgS2V5VmFsdWVEaWZmZXJzLFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hcENvbnN0cnVjdG9yT3B0aW9ucywgTWFwS2l0SW5pdE9wdGlvbnMsIE1hcEtpdExvYWRlZH0gZnJvbSBcIi4vZGVjbGFyYXRpb25zXCI7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7QXBwbGVNYXBzU2VydmljZX0gZnJvbSBcIi4vYXBwbGUtbWFwcy5zZXJ2aWNlXCI7XG5pbXBvcnQge0FwcGxlTWFwa2l0QW5ub3RhdGlvbkNvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9hcHBsZS1tYXBraXQtYW5ub3RhdGlvbi9hcHBsZS1tYXBraXQtYW5ub3RhdGlvbi5jb21wb25lbnRcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZ3gtYXBwbGUtbWFwa2l0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwbGUtbWFwa2l0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9hcHBsZS1tYXBraXQuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEFwcGxlTWFwa2l0Q29tcG9uZW50IGltcGxlbWVudHMgRG9DaGVjaywgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgICBASW5wdXQoe3JlcXVpcmVkOiB0cnVlfSkgb3B0aW9uczogTWFwS2l0SW5pdE9wdGlvbnM7XG4gICAgQElucHV0KHtyZXF1aXJlZDogdHJ1ZX0pIHNldHRpbmdzOiBNYXBDb25zdHJ1Y3Rvck9wdGlvbnM7XG4gICAgQElucHV0KCkgbG9nZ2luZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGxhbmd1YWdlOiBcImVuXCIgfCBcImRlXCIgfCBcImVzXCIgfCBcIml0XCIgfCAgXCJmclwiIHwgc3RyaW5nO1xuICAgIEBPdXRwdXQoKSBvbkxvYWRlZDogRXZlbnRFbWl0dGVyPE1hcEtpdExvYWRlZD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1hcEtpdExvYWRlZD4oKTtcbiAgICBwcml2YXRlIGxvYWRlZDogTWFwS2l0TG9hZGVkID0gbnVsbDtcbiAgICBAQ29udGVudENoaWxkcmVuKCdhcHBsZS1tYXBraXQtYW5ub3RhdGlvbicsIHtkZXNjZW5kYW50czogdHJ1ZX0pIGFubm90YXRpb25zOiBRdWVyeUxpc3Q8QXBwbGVNYXBraXRBbm5vdGF0aW9uQ29tcG9uZW50PjtcbiAgICAvLyBAQ29udGVudENoaWxkcmVuKFRlbXBsYXRlUmVmLCB7ZGVzY2VuZGFudHM6IHRydWV9KSB0ZW1wbGF0ZTogUXVlcnlMaXN0PFRlbXBsYXRlUmVmPGFueT4+O1xuICAgIC8vIHByaXZhdGUgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8VGVtcGxhdGVSZWY8YW55Pj47XG4gICAgcHVibGljIGRlZmF1bHRPcHRpb25zID0ge2xhbmd1YWdlOiAnZW4nfTtcbiAgICAvLyBhbm5vdGF0aW9ucyA9IFtdO1xuICAgIHB1YmxpYyBkZWZhdWx0U2V0dGluZ3MgPSB7XG4gICAgICAgIGNvbG9yU2NoZW1lOiB3aW5kb3cubWF0Y2hNZWRpYSAmJiB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXMgPyAnZGFyaycgOiAnbGlnaHQnLFxuICAgICAgICBpc1pvb21FbmFibGVkOiB0cnVlLFxuICAgICAgICBtYXBUeXBlOiAnc3RhbmRhcmQnLFxuICAgICAgICBzaG93c1pvb21Db250cm9sOiB0cnVlLFxuICAgICAgICBzaG93c01hcFR5cGVDb250cm9sOiB0cnVlXG4gICAgfTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZVxuICAgIHByaXZhdGUgX29wdGlvbnM6IGFueTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZVxuICAgIHByaXZhdGUgX3NldHRpbmdzOiBhbnk7XG4gICAgcHJpdmF0ZSBrZXlWYWx1ZTogbnVtYmVyO1xuICAgIHB1YmxpYyBrZXlTb3VyY2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oLTEpO1xuICAgIHB1YmxpYyBrZXkgPSB0aGlzLmtleVNvdXJjZS5hc09ic2VydmFibGUoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgYXBwbGVNYXBzU2VydmljZTogQXBwbGVNYXBzU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHZpZXdUZW1wbGF0ZVJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHt9O1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMubGFuZ3VhZ2UgJiYgdHlwZW9mIHRoaXMubGFuZ3VhZ2UgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdE9wdGlvbnMubGFuZ3VhZ2UgPSB0aGlzLmxhbmd1YWdlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7Li4udGhpcy5kZWZhdWx0U2V0dGluZ3MsIC4uLnRoaXMuc2V0dGluZ3N9KTtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oey4uLnRoaXMuZGVmYXVsdE9wdGlvbnMsIC4uLnRoaXMub3B0aW9uc30pO1xuICAgICAgICB0aGlzLmFwcGxlTWFwc1NlcnZpY2UuaW5pdChvcHRpb25zLCBzZXR0aW5ncywgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxvZ2dpbmcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIltuZ3gtYXBwbGUtbWFwa2l0XSBJbml0XCIsIGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLmxvYWRlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25Mb2FkZWQuZW1pdChkYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRlZCA9IGRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmtleVZhbHVlID0gZGF0YS5rZXk7XG4gICAgICAgICAgICB0aGlzLmtleVNvdXJjZS5uZXh0KGRhdGEua2V5KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvcHRpb25zQ2hhbmdlZChjaGFuZ2VzOiBLZXlWYWx1ZUNoYW5nZXM8c3RyaW5nLCBhbnk+KSB7XG4gICAgICAgIHRoaXMuYXBwbGVNYXBzU2VydmljZS5vcHRpb25zQ2hhbmdlZChjaGFuZ2VzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldHRpbmdzQ2hhbmdlZChjaGFuZ2VzOiBLZXlWYWx1ZUNoYW5nZXM8c3RyaW5nLCBhbnk+KSB7XG4gICAgICAgIHRoaXMuYXBwbGVNYXBzU2VydmljZS5zZXR0aW5nc0NoYW5nZWQoY2hhbmdlcywgdGhpcy5rZXlWYWx1ZSk7XG4gICAgfVxuXG4gICAgLy8gbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIC8vICAgICB0aGlzLnRlbXBsYXRlLmZvckVhY2goaXRlbSA9PiB7XG4gICAgLy8gICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IHRoaXMudmlld1RlbXBsYXRlUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyhpdGVtKTtcbiAgICAvLyAgICAgICAgIHRoaXMudmlld1RlbXBsYXRlUmVmLnJlbW92ZSh0aGlzLnZpZXdUZW1wbGF0ZVJlZi5pbmRleE9mKHRlbXBsYXRlKSk7XG4gICAgLy8gICAgICAgICB0ZW1wbGF0ZS5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgLy8gICAgICAgICB0aGlzLmFubm90YXRpb25zLnB1c2goaXRlbSk7XG4gICAgLy8gICAgICAgICB0aGlzLnZpZXdUZW1wbGF0ZVJlZi5jbGVhcigpO1xuICAgIC8vICAgICB9KTtcbiAgICAvLyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG11c3QgcHJvdmlkZSBKV1QgdG9rZW4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMgPSB0aGlzLmRpZmZlcnMuZmluZCh0aGlzLm9wdGlvbnMpLmNyZWF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzID0gdGhpcy5kaWZmZXJzLmZpbmQodGhpcy5zZXR0aW5ncykuY3JlYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0RvQ2hlY2soKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLl9vcHRpb25zLmRpZmYodGhpcy5vcHRpb25zKTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zQ2hhbmdlZChvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncykge1xuICAgICAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSB0aGlzLl9zZXR0aW5ncy5kaWZmKHRoaXMuc2V0dGluZ3MpO1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nc0NoYW5nZWQoc2V0dGluZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxufVxuIiwiPGRpdiBjbGFzcz1cIm5neC1hcHBsZS1tYXBraXRcIj5cbiAgICA8ZGl2IGNsYXNzPVwibmd4LWFwcGxlLW1hcGtpdF9fbWFwXCI+PC9kaXY+XG48L2Rpdj5cbjxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjxuZy1jb250YWluZXI+PC9uZy1jb250YWluZXI+XG4iXX0=
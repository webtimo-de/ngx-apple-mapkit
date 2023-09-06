import { Component, ContentChildren, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import * as i0 from "@angular/core";
import * as i1 from "../../apple-maps.service";
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: NgxAppleMapsComponent, deps: [{ token: i0.KeyValueDiffers }, { token: i1.AppleMapsService }, { token: i0.ViewContainerRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.3", type: NgxAppleMapsComponent, selector: "ngx-apple-maps", inputs: { options: "options", settings: "settings", height: "height" }, outputs: { onLoaded: "onLoaded" }, queries: [{ propertyName: "annotations", predicate: ["ngx-apple-maps-annotation"], descendants: true }], ngImport: i0, template: "<div class=\"ngx-apple-maps\">\r\n    <div class=\"ngx-apple-maps__map\"></div>\r\n</div>\r\n<ng-content></ng-content>\r\n<ng-container></ng-container>\r\n", styles: [".ngx-apple-maps{height:100%;position:relative}.ngx-apple-maps .ngx-apple-maps__map{inset:0;position:absolute}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: NgxAppleMapsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-apple-maps', template: "<div class=\"ngx-apple-maps\">\r\n    <div class=\"ngx-apple-maps__map\"></div>\r\n</div>\r\n<ng-content></ng-content>\r\n<ng-container></ng-container>\r\n", styles: [".ngx-apple-maps{height:100%;position:relative}.ngx-apple-maps .ngx-apple-maps__map{inset:0;position:absolute}\n"] }]
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
                args: ['ngx-apple-maps-annotation', { descendants: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFwcGxlLW1hcHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFwcGxlLW1hcHMvc3JjL2xpYi9jb21wb25lbnRzL25neC1hcHBsZS1tYXBzL25neC1hcHBsZS1tYXBzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1hcHBsZS1tYXBzL3NyYy9saWIvY29tcG9uZW50cy9uZ3gtYXBwbGUtbWFwcy9uZ3gtYXBwbGUtbWFwcy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0gsU0FBUyxFQUNULGVBQWUsRUFFZixZQUFZLEVBQ1osS0FBSyxFQUlMLE1BQU0sRUFHVCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sTUFBTSxDQUFDOzs7QUFTckMsTUFBTSxPQUFPLHFCQUFxQjtJQXlCOUIsWUFBb0IsT0FBd0IsRUFBVSxnQkFBa0MsRUFBVSxlQUFpQyxFQUFVLEdBQXNCO1FBQS9JLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBckJ6SixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV4Qyw0RkFBNEY7UUFDNUYsa0RBQWtEO1FBQzNDLG1CQUFjLEdBQUcsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUM7UUFDekMsb0JBQW9CO1FBQ2Isb0JBQWUsR0FBRztZQUNyQixXQUFXLEVBQUUsTUFBTSxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLDhCQUE4QixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU87WUFDOUcsYUFBYSxFQUFFLElBQUk7WUFDbkIsT0FBTyxFQUFFLFVBQVU7WUFDbkIsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixtQkFBbUIsRUFBRSxJQUFJO1NBQzVCLENBQUM7UUFNSyxjQUFTLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QyxRQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUd2QyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU8sSUFBSTtRQUNSLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBQyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztRQUM1RSxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDbkQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzVCO1lBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyxjQUFjLENBQUMsT0FBcUM7UUFDeEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRU8sZUFBZSxDQUFDLE9BQXFDO1FBQ3pELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsK0JBQStCO0lBQy9CLHNDQUFzQztJQUN0QywwRUFBMEU7SUFDMUUsK0VBQStFO0lBQy9FLG9DQUFvQztJQUNwQyx1Q0FBdUM7SUFDdkMsd0NBQXdDO0lBQ3hDLFVBQVU7SUFDVixJQUFJO0lBRUosUUFBUTtRQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1NBQ2pEO2FBQU07WUFDSCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN6RCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDZjtRQUNELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzlEO0lBQ0wsQ0FBQztJQUVELFNBQVM7UUFDTCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakQsSUFBSSxPQUFPLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNoQztTQUNKO1FBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BELElBQUksUUFBUSxFQUFFO2dCQUNWLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDbEM7U0FDSjtJQUNMLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM3QixDQUFDOzhHQXhGUSxxQkFBcUI7a0dBQXJCLHFCQUFxQiwwUUN6QmxDLDZKQUtBOzsyRkRvQmEscUJBQXFCO2tCQUxqQyxTQUFTOytCQUNJLGdCQUFnQjtvTUFLakIsT0FBTztzQkFBZixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNJLFFBQVE7c0JBQWpCLE1BQU07Z0JBQzRELFdBQVc7c0JBQTdFLGVBQWU7dUJBQUMsMkJBQTJCLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRG9DaGVjayxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgS2V5VmFsdWVDaGFuZ2VzLFxuICAgIEtleVZhbHVlRGlmZmVycyxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXBDb25zdHJ1Y3Rvck9wdGlvbnMsIE1hcEtpdEluaXRPcHRpb25zfSBmcm9tIFwiLi4vLi4vZGVjbGFyYXRpb25zXCI7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7QXBwbGVNYXBzU2VydmljZX0gZnJvbSBcIi4uLy4uL2FwcGxlLW1hcHMuc2VydmljZVwiO1xuaW1wb3J0IHtOZ3hBcHBsZU1hcHNBbm5vdGF0aW9uQ29tcG9uZW50fSBmcm9tIFwiLi4vbmd4LWFwcGxlLW1hcHMtYW5ub3RhdGlvbi9uZ3gtYXBwbGUtbWFwcy1hbm5vdGF0aW9uLmNvbXBvbmVudFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25neC1hcHBsZS1tYXBzJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbmd4LWFwcGxlLW1hcHMuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL25neC1hcHBsZS1tYXBzLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTmd4QXBwbGVNYXBzQ29tcG9uZW50IGltcGxlbWVudHMgRG9DaGVjaywgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgICBASW5wdXQoKSBvcHRpb25zOiBNYXBLaXRJbml0T3B0aW9ucztcbiAgICBASW5wdXQoKSBzZXR0aW5nczogTWFwQ29uc3RydWN0b3JPcHRpb25zO1xuICAgIEBJbnB1dCgpIGhlaWdodDogc3RyaW5nO1xuICAgIEBPdXRwdXQoKSBvbkxvYWRlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAQ29udGVudENoaWxkcmVuKCduZ3gtYXBwbGUtbWFwcy1hbm5vdGF0aW9uJywge2Rlc2NlbmRhbnRzOiB0cnVlfSkgYW5ub3RhdGlvbnM6IFF1ZXJ5TGlzdDxOZ3hBcHBsZU1hcHNBbm5vdGF0aW9uQ29tcG9uZW50PjtcbiAgICAvLyBAQ29udGVudENoaWxkcmVuKFRlbXBsYXRlUmVmLCB7ZGVzY2VuZGFudHM6IHRydWV9KSB0ZW1wbGF0ZTogUXVlcnlMaXN0PFRlbXBsYXRlUmVmPGFueT4+O1xuICAgIC8vIHByaXZhdGUgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8VGVtcGxhdGVSZWY8YW55Pj47XG4gICAgcHVibGljIGRlZmF1bHRPcHRpb25zID0ge2xhbmd1YWdlOiAnZW4nfTtcbiAgICAvLyBhbm5vdGF0aW9ucyA9IFtdO1xuICAgIHB1YmxpYyBkZWZhdWx0U2V0dGluZ3MgPSB7XG4gICAgICAgIGNvbG9yU2NoZW1lOiB3aW5kb3cubWF0Y2hNZWRpYSAmJiB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXMgPyAnZGFyaycgOiAnbGlnaHQnLFxuICAgICAgICBpc1pvb21FbmFibGVkOiB0cnVlLFxuICAgICAgICBtYXBUeXBlOiAnc3RhbmRhcmQnLFxuICAgICAgICBzaG93c1pvb21Db250cm9sOiB0cnVlLFxuICAgICAgICBzaG93c01hcFR5cGVDb250cm9sOiB0cnVlXG4gICAgfTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZVxuICAgIHByaXZhdGUgX29wdGlvbnM6IGFueTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZVxuICAgIHByaXZhdGUgX3NldHRpbmdzOiBhbnk7XG4gICAgcHJpdmF0ZSBrZXlWYWx1ZTogbnVtYmVyO1xuICAgIHB1YmxpYyBrZXlTb3VyY2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oLTEpO1xuICAgIHB1YmxpYyBrZXkgPSB0aGlzLmtleVNvdXJjZS5hc09ic2VydmFibGUoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLCBwcml2YXRlIGFwcGxlTWFwc1NlcnZpY2U6IEFwcGxlTWFwc1NlcnZpY2UsIHByaXZhdGUgdmlld1RlbXBsYXRlUmVmOiBWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHt9O1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdCgpIHtcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHsuLi50aGlzLmRlZmF1bHRTZXR0aW5ncywgLi4udGhpcy5zZXR0aW5nc30pO1xuICAgICAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7Li4udGhpcy5kZWZhdWx0T3B0aW9ucywgLi4udGhpcy5vcHRpb25zfSk7XG4gICAgICAgIHRoaXMuYXBwbGVNYXBzU2VydmljZS5pbml0KG9wdGlvbnMsIHNldHRpbmdzLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMub25Mb2FkZWQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25Mb2FkZWQuZW1pdChkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMua2V5VmFsdWUgPSBkYXRhLmtleTtcbiAgICAgICAgICAgIHRoaXMua2V5U291cmNlLm5leHQoZGF0YS5rZXkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9wdGlvbnNDaGFuZ2VkKGNoYW5nZXM6IEtleVZhbHVlQ2hhbmdlczxzdHJpbmcsIGFueT4pIHtcbiAgICAgICAgdGhpcy5hcHBsZU1hcHNTZXJ2aWNlLm9wdGlvbnNDaGFuZ2VkKGNoYW5nZXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0dGluZ3NDaGFuZ2VkKGNoYW5nZXM6IEtleVZhbHVlQ2hhbmdlczxzdHJpbmcsIGFueT4pIHtcbiAgICAgICAgdGhpcy5hcHBsZU1hcHNTZXJ2aWNlLnNldHRpbmdzQ2hhbmdlZChjaGFuZ2VzLCB0aGlzLmtleVZhbHVlKTtcbiAgICB9XG5cbiAgICAvLyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgLy8gICAgIHRoaXMudGVtcGxhdGUuZm9yRWFjaChpdGVtID0+IHtcbiAgICAvLyAgICAgICAgIGNvbnN0IHRlbXBsYXRlID0gdGhpcy52aWV3VGVtcGxhdGVSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KGl0ZW0pO1xuICAgIC8vICAgICAgICAgdGhpcy52aWV3VGVtcGxhdGVSZWYucmVtb3ZlKHRoaXMudmlld1RlbXBsYXRlUmVmLmluZGV4T2YodGVtcGxhdGUpKTtcbiAgICAvLyAgICAgICAgIHRlbXBsYXRlLmRldGVjdENoYW5nZXMoKTtcbiAgICAvLyAgICAgICAgIHRoaXMuYW5ub3RhdGlvbnMucHVzaChpdGVtKTtcbiAgICAvLyAgICAgICAgIHRoaXMudmlld1RlbXBsYXRlUmVmLmNsZWFyKCk7XG4gICAgLy8gICAgIH0pO1xuICAgIC8vIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbXVzdCBwcm92aWRlIEpXVCB0b2tlbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHRoaXMuZGlmZmVycy5maW5kKHRoaXMub3B0aW9ucykuY3JlYXRlKCk7XG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncykge1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSB0aGlzLmRpZmZlcnMuZmluZCh0aGlzLnNldHRpbmdzKS5jcmVhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nRG9DaGVjaygpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuX29wdGlvbnMuZGlmZih0aGlzLm9wdGlvbnMpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNDaGFuZ2VkKG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzKSB7XG4gICAgICAgICAgICBjb25zdCBzZXR0aW5ncyA9IHRoaXMuX3NldHRpbmdzLmRpZmYodGhpcy5zZXR0aW5ncyk7XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzQ2hhbmdlZChzZXR0aW5ncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwibmd4LWFwcGxlLW1hcHNcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJuZ3gtYXBwbGUtbWFwc19fbWFwXCI+PC9kaXY+XHJcbjwvZGl2PlxyXG48bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbjxuZy1jb250YWluZXI+PC9uZy1jb250YWluZXI+XHJcbiJdfQ==
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
            if (this.onLoaded.length) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGUtbWFwa2l0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1hcHBsZS1tYXBraXQvc3JjL2xpYi9hcHBsZS1tYXBraXQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFwcGxlLW1hcGtpdC9zcmMvbGliL2FwcGxlLW1hcGtpdC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0gsU0FBUyxFQUNULGVBQWUsRUFFZixZQUFZLEVBQ1osS0FBSyxFQUlMLE1BQU0sRUFHVCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sTUFBTSxDQUFDOzs7QUFTckMsTUFBTSxPQUFPLG9CQUFvQjtJQXlCN0IsWUFBb0IsT0FBd0IsRUFBVSxnQkFBa0MsRUFBVSxlQUFpQyxFQUFVLEdBQXNCO1FBQS9JLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBckJ6SixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV4Qyw0RkFBNEY7UUFDNUYsa0RBQWtEO1FBQzNDLG1CQUFjLEdBQUcsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUM7UUFDekMsb0JBQW9CO1FBQ2Isb0JBQWUsR0FBRztZQUNyQixXQUFXLEVBQUUsTUFBTSxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLDhCQUE4QixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU87WUFDOUcsYUFBYSxFQUFFLElBQUk7WUFDbkIsT0FBTyxFQUFFLFVBQVU7WUFDbkIsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixtQkFBbUIsRUFBRSxJ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LENBQUM7OEdBeEZRLG9CQUFvQjtrR0FBcEIsb0JBQW9CLDBRQ3pCakMsaUtBS0E7OzJGRG9CYSxvQkFBb0I7a0JBTGhDLFNBQVM7K0JBQ0ksa0JBQWtCO29NQUtuQixPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0ksUUFBUTtzQkFBakIsTUFBTTtnQkFDMEQsV0FBVztzQkFBM0UsZUFBZTt1QkFBQyx5QkFBeUIsRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBEb0NoZWNrLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBLZXlWYWx1ZUNoYW5nZXMsXG4gICAgS2V5VmFsdWVEaWZmZXJzLFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hcENvbnN0cnVjdG9yT3B0aW9ucywgTWFwS2l0SW5pdE9wdGlvbnN9IGZyb20gXCIuL2RlY2xhcmF0aW9uc1wiO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3R9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge0FwcGxlTWFwc1NlcnZpY2V9IGZyb20gXCIuL2FwcGxlLW1hcHMuc2VydmljZVwiO1xuaW1wb3J0IHtBcHBsZU1hcGtpdEFubm90YXRpb25Db21wb25lbnR9IGZyb20gXCIuL2NvbXBvbmVudHMvYXBwbGUtbWFwa2l0LWFubm90YXRpb24vYXBwbGUtbWFwa2l0LWFubm90YXRpb24uY29tcG9uZW50XCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmd4LWFwcGxlLW1hcGtpdCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcGxlLW1hcGtpdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vYXBwbGUtbWFwa2l0LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBsZU1hcGtpdENvbXBvbmVudCBpbXBsZW1lbnRzIERvQ2hlY2ssIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gICAgQElucHV0KCkgb3B0aW9uczogTWFwS2l0SW5pdE9wdGlvbnM7XG4gICAgQElucHV0KCkgc2V0dGluZ3M6IE1hcENvbnN0cnVjdG9yT3B0aW9ucztcbiAgICBASW5wdXQoKSBoZWlnaHQ6IHN0cmluZztcbiAgICBAT3V0cHV0KCkgb25Mb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQENvbnRlbnRDaGlsZHJlbignYXBwbGUtbWFwa2l0LWFubm90YXRpb24nLCB7ZGVzY2VuZGFudHM6IHRydWV9KSBhbm5vdGF0aW9uczogUXVlcnlMaXN0PEFwcGxlTWFwa2l0QW5ub3RhdGlvbkNvbXBvbmVudD47XG4gICAgLy8gQENvbnRlbnRDaGlsZHJlbihUZW1wbGF0ZVJlZiwge2Rlc2NlbmRhbnRzOiB0cnVlfSkgdGVtcGxhdGU6IFF1ZXJ5TGlzdDxUZW1wbGF0ZVJlZjxhbnk+PjtcbiAgICAvLyBwcml2YXRlIHRlbXBsYXRlczogUXVlcnlMaXN0PFRlbXBsYXRlUmVmPGFueT4+O1xuICAgIHB1YmxpYyBkZWZhdWx0T3B0aW9ucyA9IHtsYW5ndWFnZTogJ2VuJ307XG4gICAgLy8gYW5ub3RhdGlvbnMgPSBbXTtcbiAgICBwdWJsaWMgZGVmYXVsdFNldHRpbmdzID0ge1xuICAgICAgICBjb2xvclNjaGVtZTogd2luZG93Lm1hdGNoTWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzID8gJ2RhcmsnIDogJ2xpZ2h0JyxcbiAgICAgICAgaXNab29tRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgbWFwVHlwZTogJ3N0YW5kYXJkJyxcbiAgICAgICAgc2hvd3Nab29tQ29udHJvbDogdHJ1ZSxcbiAgICAgICAgc2hvd3NNYXBUeXBlQ29udHJvbDogdHJ1ZVxuICAgIH07XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhcmlhYmxlLW5hbWVcbiAgICBwcml2YXRlIF9vcHRpb25zOiBhbnk7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhcmlhYmxlLW5hbWVcbiAgICBwcml2YXRlIF9zZXR0aW5nczogYW55O1xuICAgIHByaXZhdGUga2V5VmFsdWU6IG51bWJlcjtcbiAgICBwdWJsaWMga2V5U291cmNlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KC0xKTtcbiAgICBwdWJsaWMga2V5ID0gdGhpcy5rZXlTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRpZmZlcnM6IEtleVZhbHVlRGlmZmVycywgcHJpdmF0ZSBhcHBsZU1hcHNTZXJ2aWNlOiBBcHBsZU1hcHNTZXJ2aWNlLCBwcml2YXRlIHZpZXdUZW1wbGF0ZVJlZjogVmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSB7fTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXQoKSB7XG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7Li4udGhpcy5kZWZhdWx0U2V0dGluZ3MsIC4uLnRoaXMuc2V0dGluZ3N9KTtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oey4uLnRoaXMuZGVmYXVsdE9wdGlvbnMsIC4uLnRoaXMub3B0aW9uc30pO1xuICAgICAgICB0aGlzLmFwcGxlTWFwc1NlcnZpY2UuaW5pdChvcHRpb25zLCBzZXR0aW5ncywgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9uTG9hZGVkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25Mb2FkZWQuZW1pdChkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMua2V5VmFsdWUgPSBkYXRhLmtleTtcbiAgICAgICAgICAgIHRoaXMua2V5U291cmNlLm5leHQoZGF0YS5rZXkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9wdGlvbnNDaGFuZ2VkKGNoYW5nZXM6IEtleVZhbHVlQ2hhbmdlczxzdHJpbmcsIGFueT4pIHtcbiAgICAgICAgdGhpcy5hcHBsZU1hcHNTZXJ2aWNlLm9wdGlvbnNDaGFuZ2VkKGNoYW5nZXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0dGluZ3NDaGFuZ2VkKGNoYW5nZXM6IEtleVZhbHVlQ2hhbmdlczxzdHJpbmcsIGFueT4pIHtcbiAgICAgICAgdGhpcy5hcHBsZU1hcHNTZXJ2aWNlLnNldHRpbmdzQ2hhbmdlZChjaGFuZ2VzLCB0aGlzLmtleVZhbHVlKTtcbiAgICB9XG5cbiAgICAvLyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgLy8gICAgIHRoaXMudGVtcGxhdGUuZm9yRWFjaChpdGVtID0+IHtcbiAgICAvLyAgICAgICAgIGNvbnN0IHRlbXBsYXRlID0gdGhpcy52aWV3VGVtcGxhdGVSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KGl0ZW0pO1xuICAgIC8vICAgICAgICAgdGhpcy52aWV3VGVtcGxhdGVSZWYucmVtb3ZlKHRoaXMudmlld1RlbXBsYXRlUmVmLmluZGV4T2YodGVtcGxhdGUpKTtcbiAgICAvLyAgICAgICAgIHRlbXBsYXRlLmRldGVjdENoYW5nZXMoKTtcbiAgICAvLyAgICAgICAgIHRoaXMuYW5ub3RhdGlvbnMucHVzaChpdGVtKTtcbiAgICAvLyAgICAgICAgIHRoaXMudmlld1RlbXBsYXRlUmVmLmNsZWFyKCk7XG4gICAgLy8gICAgIH0pO1xuICAgIC8vIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbXVzdCBwcm92aWRlIEpXVCB0b2tlbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHRoaXMuZGlmZmVycy5maW5kKHRoaXMub3B0aW9ucykuY3JlYXRlKCk7XG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncykge1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSB0aGlzLmRpZmZlcnMuZmluZCh0aGlzLnNldHRpbmdzKS5jcmVhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nRG9DaGVjaygpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuX29wdGlvbnMuZGlmZih0aGlzLm9wdGlvbnMpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnNDaGFuZ2VkKG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzKSB7XG4gICAgICAgICAgICBjb25zdCBzZXR0aW5ncyA9IHRoaXMuX3NldHRpbmdzLmRpZmYodGhpcy5zZXR0aW5ncyk7XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzQ2hhbmdlZChzZXR0aW5ncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwibmd4LWFwcGxlLW1hcGtpdFwiPlxyXG4gICAgPGRpdiBjbGFzcz1cIm5neC1hcHBsZS1tYXBraXRfX21hcFwiPjwvZGl2PlxyXG48L2Rpdj5cclxuPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG48bmctY29udGFpbmVyPjwvbmctY29udGFpbmVyPlxyXG4iXX0=
import { Component, ContentChildren, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import * as i0 from "@angular/core";
import * as i1 from "../../apple-maps.service";
export class NgxAppleMapkitComponent {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: NgxAppleMapkitComponent, deps: [{ token: i0.KeyValueDiffers }, { token: i1.AppleMapsService }, { token: i0.ViewContainerRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.3", type: NgxAppleMapkitComponent, selector: "ngx-apple-mapkit", inputs: { options: "options", settings: "settings", height: "height" }, outputs: { onLoaded: "onLoaded" }, queries: [{ propertyName: "annotations", predicate: ["ngx-apple-mapkit-annotation"], descendants: true }], ngImport: i0, template: "<div class=\"ngx-apple-mapkit\">\r\n    <div class=\"ngx-apple-mapkit__map\"></div>\r\n</div>\r\n<ng-content></ng-content>\r\n<ng-container></ng-container>\r\n", styles: [".ngx-apple-mapkit{height:100%;position:relative}.ngx-apple-mapkit .ngx-apple-mapkit__map{inset:0;position:absolute}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: NgxAppleMapkitComponent, decorators: [{
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
                args: ['ngx-apple-mapkit-annotation', { descendants: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFwcGxlLW1hcGtpdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtYXBwbGUtbWFwa2l0L3NyYy9saWIvY29tcG9uZW50cy9uZ3gtYXBwbGUtbWFwa2l0L25neC1hcHBsZS1tYXBraXQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFwcGxlLW1hcGtpdC9zcmMvbGliL2NvbXBvbmVudHMvbmd4LWFwcGxlLW1hcGtpdC9uZ3gtYXBwbGUtbWFwa2l0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFHSCxTQUFTLEVBQ1QsZUFBZSxFQUVmLFlBQVksRUFDWixLQUFLLEVBSUwsTUFBTSxFQUdULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxNQUFNLENBQUM7OztBQVNyQyxNQUFNLE9BQU8sdUJBQXVCO0lBeUJoQyxZQUFvQixPQUF3QixFQUFVLGdCQUFrQyxFQUFVLGVBQWlDLEVBQVUsR0FBc0I7UUFBL0ksWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWtCO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFyQnpKLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXhDLDRGQUE0RjtRQUM1RixrREFBa0Q7UUFDM0MsbUJBQWMsR0FBRyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQztRQUN6QyxvQkFBb0I7UUFDYixvQkFBZSxHQUFHO1lBQ3JCLFdBQVcsRUFBRSxNQUFNLENBQUMsVUFBVSxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsOEJBQThCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTztZQUM5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QUFRLENBQUMsQ0FBQzthQUNsQztTQUNKO0lBQ0wsQ0FBQztJQUVELGVBQWU7UUFDWCxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzdCLENBQUM7OEdBeEZRLHVCQUF1QjtrR0FBdkIsdUJBQXVCLDhRQ3pCcEMsaUtBS0E7OzJGRG9CYSx1QkFBdUI7a0JBTG5DLFNBQVM7K0JBQ0ksa0JBQWtCO29NQUtuQixPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0ksUUFBUTtzQkFBakIsTUFBTTtnQkFDOEQsV0FBVztzQkFBL0UsZUFBZTt1QkFBQyw2QkFBNkIsRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBEb0NoZWNrLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBLZXlWYWx1ZUNoYW5nZXMsXG4gICAgS2V5VmFsdWVEaWZmZXJzLFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hcENvbnN0cnVjdG9yT3B0aW9ucywgTWFwS2l0SW5pdE9wdGlvbnN9IGZyb20gXCIuLi8uLi9kZWNsYXJhdGlvbnNcIjtcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0fSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtBcHBsZU1hcHNTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vYXBwbGUtbWFwcy5zZXJ2aWNlXCI7XG5pbXBvcnQge05neEFwcGxlTWFwa2l0QW5ub3RhdGlvbkNvbXBvbmVudH0gZnJvbSBcIi4uL25neC1hcHBsZS1tYXBraXQtYW5ub3RhdGlvbi9uZ3gtYXBwbGUtbWFwa2l0LWFubm90YXRpb24uY29tcG9uZW50XCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmd4LWFwcGxlLW1hcGtpdCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL25neC1hcHBsZS1tYXBraXQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL25neC1hcHBsZS1tYXBraXQuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hBcHBsZU1hcGtpdENvbXBvbmVudCBpbXBsZW1lbnRzIERvQ2hlY2ssIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gICAgQElucHV0KCkgb3B0aW9uczogTWFwS2l0SW5pdE9wdGlvbnM7XG4gICAgQElucHV0KCkgc2V0dGluZ3M6IE1hcENvbnN0cnVjdG9yT3B0aW9ucztcbiAgICBASW5wdXQoKSBoZWlnaHQ6IHN0cmluZztcbiAgICBAT3V0cHV0KCkgb25Mb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQENvbnRlbnRDaGlsZHJlbignbmd4LWFwcGxlLW1hcGtpdC1hbm5vdGF0aW9uJywge2Rlc2NlbmRhbnRzOiB0cnVlfSkgYW5ub3RhdGlvbnM6IFF1ZXJ5TGlzdDxOZ3hBcHBsZU1hcGtpdEFubm90YXRpb25Db21wb25lbnQ+O1xuICAgIC8vIEBDb250ZW50Q2hpbGRyZW4oVGVtcGxhdGVSZWYsIHtkZXNjZW5kYW50czogdHJ1ZX0pIHRlbXBsYXRlOiBRdWVyeUxpc3Q8VGVtcGxhdGVSZWY8YW55Pj47XG4gICAgLy8gcHJpdmF0ZSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxUZW1wbGF0ZVJlZjxhbnk+PjtcbiAgICBwdWJsaWMgZGVmYXVsdE9wdGlvbnMgPSB7bGFuZ3VhZ2U6ICdlbid9O1xuICAgIC8vIGFubm90YXRpb25zID0gW107XG4gICAgcHVibGljIGRlZmF1bHRTZXR0aW5ncyA9IHtcbiAgICAgICAgY29sb3JTY2hlbWU6IHdpbmRvdy5tYXRjaE1lZGlhICYmIHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlcyA/ICdkYXJrJyA6ICdsaWdodCcsXG4gICAgICAgIGlzWm9vbUVuYWJsZWQ6IHRydWUsXG4gICAgICAgIG1hcFR5cGU6ICdzdGFuZGFyZCcsXG4gICAgICAgIHNob3dzWm9vbUNvbnRyb2w6IHRydWUsXG4gICAgICAgIHNob3dzTWFwVHlwZUNvbnRyb2w6IHRydWVcbiAgICB9O1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YXJpYWJsZS1uYW1lXG4gICAgcHJpdmF0ZSBfb3B0aW9uczogYW55O1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YXJpYWJsZS1uYW1lXG4gICAgcHJpdmF0ZSBfc2V0dGluZ3M6IGFueTtcbiAgICBwcml2YXRlIGtleVZhbHVlOiBudW1iZXI7XG4gICAgcHVibGljIGtleVNvdXJjZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigtMSk7XG4gICAgcHVibGljIGtleSA9IHRoaXMua2V5U291cmNlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsIHByaXZhdGUgYXBwbGVNYXBzU2VydmljZTogQXBwbGVNYXBzU2VydmljZSwgcHJpdmF0ZSB2aWV3VGVtcGxhdGVSZWY6IFZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICB0aGlzLnNldHRpbmdzID0ge307XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0KCkge1xuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oey4uLnRoaXMuZGVmYXVsdFNldHRpbmdzLCAuLi50aGlzLnNldHRpbmdzfSk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHsuLi50aGlzLmRlZmF1bHRPcHRpb25zLCAuLi50aGlzLm9wdGlvbnN9KTtcbiAgICAgICAgdGhpcy5hcHBsZU1hcHNTZXJ2aWNlLmluaXQob3B0aW9ucywgc2V0dGluZ3MsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5vbkxvYWRlZC5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkxvYWRlZC5lbWl0KGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5rZXlWYWx1ZSA9IGRhdGEua2V5O1xuICAgICAgICAgICAgdGhpcy5rZXlTb3VyY2UubmV4dChkYXRhLmtleSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgb3B0aW9uc0NoYW5nZWQoY2hhbmdlczogS2V5VmFsdWVDaGFuZ2VzPHN0cmluZywgYW55Pikge1xuICAgICAgICB0aGlzLmFwcGxlTWFwc1NlcnZpY2Uub3B0aW9uc0NoYW5nZWQoY2hhbmdlcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXR0aW5nc0NoYW5nZWQoY2hhbmdlczogS2V5VmFsdWVDaGFuZ2VzPHN0cmluZywgYW55Pikge1xuICAgICAgICB0aGlzLmFwcGxlTWFwc1NlcnZpY2Uuc2V0dGluZ3NDaGFuZ2VkKGNoYW5nZXMsIHRoaXMua2V5VmFsdWUpO1xuICAgIH1cblxuICAgIC8vIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAvLyAgICAgdGhpcy50ZW1wbGF0ZS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIC8vICAgICAgICAgY29uc3QgdGVtcGxhdGUgPSB0aGlzLnZpZXdUZW1wbGF0ZVJlZi5jcmVhdGVFbWJlZGRlZFZpZXcoaXRlbSk7XG4gICAgLy8gICAgICAgICB0aGlzLnZpZXdUZW1wbGF0ZVJlZi5yZW1vdmUodGhpcy52aWV3VGVtcGxhdGVSZWYuaW5kZXhPZih0ZW1wbGF0ZSkpO1xuICAgIC8vICAgICAgICAgdGVtcGxhdGUuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIC8vICAgICAgICAgdGhpcy5hbm5vdGF0aW9ucy5wdXNoKGl0ZW0pO1xuICAgIC8vICAgICAgICAgdGhpcy52aWV3VGVtcGxhdGVSZWYuY2xlYXIoKTtcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHByb3ZpZGUgSldUIHRva2VuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zID0gdGhpcy5kaWZmZXJzLmZpbmQodGhpcy5vcHRpb25zKS5jcmVhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5ncyA9IHRoaXMuZGlmZmVycy5maW5kKHRoaXMuc2V0dGluZ3MpLmNyZWF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdEb0NoZWNrKCkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5fb3B0aW9ucy5kaWZmKHRoaXMub3B0aW9ucyk7XG4gICAgICAgICAgICBpZiAob3B0aW9ucykge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc0NoYW5nZWQob3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIGNvbnN0IHNldHRpbmdzID0gdGhpcy5fc2V0dGluZ3MuZGlmZih0aGlzLnNldHRpbmdzKTtcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3NDaGFuZ2VkKHNldHRpbmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJuZ3gtYXBwbGUtbWFwa2l0XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwibmd4LWFwcGxlLW1hcGtpdF9fbWFwXCI+PC9kaXY+XHJcbjwvZGl2PlxyXG48bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbjxuZy1jb250YWluZXI+PC9uZy1jb250YWluZXI+XHJcbiJdfQ==
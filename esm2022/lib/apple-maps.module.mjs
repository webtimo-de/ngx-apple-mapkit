import { NgModule } from '@angular/core';
import { NgxAppleMapsComponent } from './components/ngx-apple-maps/ngx-apple-maps.component';
import { NgxAppleMapsAnnotationComponent } from './components/ngx-apple-maps-annotation/ngx-apple-maps-annotation.component';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
export class AppleMapsModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsModule, bootstrap: [NgxAppleMapsAnnotationComponent], declarations: [NgxAppleMapsComponent,
            NgxAppleMapsAnnotationComponent], imports: [CommonModule], exports: [NgxAppleMapsComponent,
            NgxAppleMapsAnnotationComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        NgxAppleMapsComponent,
                        NgxAppleMapsAnnotationComponent
                    ],
                    imports: [CommonModule],
                    exports: [
                        NgxAppleMapsComponent,
                        NgxAppleMapsAnnotationComponent
                    ],
                    bootstrap: [NgxAppleMapsAnnotationComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGUtbWFwcy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtYXBwbGUtbWFwcy9zcmMvbGliL2FwcGxlLW1hcHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0RBQXNELENBQUM7QUFDM0YsT0FBTyxFQUNILCtCQUErQixFQUNsQyxNQUFNLDRFQUE0RSxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7QUFlN0MsTUFBTSxPQUFPLGVBQWU7OEdBQWYsZUFBZTsrR0FBZixlQUFlLGNBRlosK0JBQStCLGtCQVJ2QyxxQkFBcUI7WUFDckIsK0JBQStCLGFBRXpCLFlBQVksYUFFbEIscUJBQXFCO1lBQ3JCLCtCQUErQjsrR0FJMUIsZUFBZSxZQVBkLFlBQVk7OzJGQU9iLGVBQWU7a0JBWjNCLFFBQVE7bUJBQUM7b0JBQ04sWUFBWSxFQUFFO3dCQUNWLHFCQUFxQjt3QkFDckIsK0JBQStCO3FCQUNsQztvQkFDRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRTt3QkFDTCxxQkFBcUI7d0JBQ3JCLCtCQUErQjtxQkFDbEM7b0JBQ0QsU0FBUyxFQUFFLENBQUMsK0JBQStCLENBQUM7aUJBQy9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05neEFwcGxlTWFwc0NvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnRzL25neC1hcHBsZS1tYXBzL25neC1hcHBsZS1tYXBzLmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICAgIE5neEFwcGxlTWFwc0Fubm90YXRpb25Db21wb25lbnRcbn0gZnJvbSAnLi9jb21wb25lbnRzL25neC1hcHBsZS1tYXBzLWFubm90YXRpb24vbmd4LWFwcGxlLW1hcHMtYW5ub3RhdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTmd4QXBwbGVNYXBzQ29tcG9uZW50LFxuICAgICAgICBOZ3hBcHBsZU1hcHNBbm5vdGF0aW9uQ29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE5neEFwcGxlTWFwc0NvbXBvbmVudCxcbiAgICAgICAgTmd4QXBwbGVNYXBzQW5ub3RhdGlvbkNvbXBvbmVudFxuICAgIF0sXG4gICAgYm9vdHN0cmFwOiBbTmd4QXBwbGVNYXBzQW5ub3RhdGlvbkNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgQXBwbGVNYXBzTW9kdWxlIHtcbn1cbiJdfQ==
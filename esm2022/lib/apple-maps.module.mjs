import { NgModule } from '@angular/core';
import { AppleMapkitComponent } from './apple-mapkit.component';
import { AppleMapkitAnnotationComponent } from './components/apple-mapkit-annotation/apple-mapkit-annotation.component';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
export class AppleMapsModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsModule, bootstrap: [AppleMapkitAnnotationComponent], declarations: [AppleMapkitComponent,
            AppleMapkitAnnotationComponent], imports: [CommonModule], exports: [AppleMapkitComponent,
            AppleMapkitAnnotationComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        AppleMapkitComponent,
                        AppleMapkitAnnotationComponent
                    ],
                    imports: [CommonModule],
                    exports: [
                        AppleMapkitComponent,
                        AppleMapkitAnnotationComponent
                    ],
                    bootstrap: [
                        AppleMapkitAnnotationComponent
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGUtbWFwcy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtYXBwbGUtbWFwa2l0L3NyYy9saWIvYXBwbGUtbWFwcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM5RCxPQUFPLEVBQ0gsOEJBQThCLEVBQ2pDLE1BQU0sd0VBQXdFLENBQUM7QUFDaEYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDOztBQWlCN0MsTUFBTSxPQUFPLGVBQWU7OEdBQWYsZUFBZTsrR0FBZixlQUFlLGNBSHBCLDhCQUE4QixrQkFUOUIsb0JBQW9CO1lBQ3BCLDhCQUE4QixhQUV4QixZQUFZLGFBRWxCLG9CQUFvQjtZQUNwQiw4QkFBOEI7K0dBTXpCLGVBQWUsWUFUZCxZQUFZOzsyRkFTYixlQUFlO2tCQWQzQixRQUFRO21CQUFDO29CQUNOLFlBQVksRUFBRTt3QkFDVixvQkFBb0I7d0JBQ3BCLDhCQUE4QjtxQkFDakM7b0JBQ0QsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUU7d0JBQ0wsb0JBQW9CO3dCQUNwQiw4QkFBOEI7cUJBQ2pDO29CQUNELFNBQVMsRUFBRTt3QkFDUCw4QkFBOEI7cUJBQ2pDO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0FwcGxlTWFwa2l0Q29tcG9uZW50fSBmcm9tICcuL2FwcGxlLW1hcGtpdC5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgICBBcHBsZU1hcGtpdEFubm90YXRpb25Db21wb25lbnRcbn0gZnJvbSAnLi9jb21wb25lbnRzL2FwcGxlLW1hcGtpdC1hbm5vdGF0aW9uL2FwcGxlLW1hcGtpdC1hbm5vdGF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBBcHBsZU1hcGtpdENvbXBvbmVudCxcbiAgICAgICAgQXBwbGVNYXBraXRBbm5vdGF0aW9uQ29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIEFwcGxlTWFwa2l0Q29tcG9uZW50LFxuICAgICAgICBBcHBsZU1hcGtpdEFubm90YXRpb25Db21wb25lbnRcbiAgICBdLFxuICAgIGJvb3RzdHJhcDogW1xuICAgICAgICBBcHBsZU1hcGtpdEFubm90YXRpb25Db21wb25lbnRcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEFwcGxlTWFwc01vZHVsZSB7XG59XG4iXX0=
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusPipe } from './pipe/status.pipe';
import { SeverityPipe } from './pipe/severity.pipe';

@NgModule({
    imports: [CommonModule],  // modules to use in this module itself
    declarations: [
        StatusPipe,
        SeverityPipe
    ], // components, pipes available to all who import SharedModule
    exports: [
        CommonModule,
        StatusPipe, 
        SeverityPipe
        ]  // everything available to the others
        
    // do not put providers services in a shared module! 
})
export class SharedModule { }
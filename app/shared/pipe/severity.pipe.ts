import { Pipe, PipeTransform } from '@angular/core';

import { SEVERITY } from '../constant/constants';

@Pipe({
    name: 'severity'
})

export class SeverityPipe implements PipeTransform {
    private sev = SEVERITY;
    transform(sevNum: number) {
        return this.sev[sevNum];
    }
}
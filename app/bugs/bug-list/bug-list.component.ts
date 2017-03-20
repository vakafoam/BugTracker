import { Component, OnInit } from '@angular/core';

import { BugService } from '../service/bug.service';

import { Bug } from '../model/bug';

@Component({
    moduleId: module.id,
    selector: 'bug-list',
    templateUrl: 'bug-list.component.html',
    styleUrls: ['bug-list.component.css']
})

export class BugListComponent implements OnInit {

    private bugs: Bug[] = [];

    constructor(private bugService: BugService) { }

    ngOnInit() {
        this.getAddedBugs();
        this.getUpdatesBugs();
    }

    getAddedBugs() {
        this.bugService.getAddedBugs()
            .subscribe(bug => {
                this.bugs.push(bug);
            }, err => {
                console.error("Unable to get added bug - ", err);
            });
    }

    getUpdatesBugs() {
        this.bugService.changedListener()
            .subscribe(updatedBug => {
                const bugIndex = this.bugs.map(index => index.id).indexOf(updatedBug['id']); // get index of the updated bug in the local array 
                this.bugs[bugIndex] = updatedBug;
            }, err => {
                console.error("Unable to get updated bug - ", err);
            });
    }
}
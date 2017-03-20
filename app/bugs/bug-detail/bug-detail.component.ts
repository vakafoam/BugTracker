import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { BugService } from '../service/bug.service';
import { Bug } from '../model/bug';
import { STATUS, SEVERITY } from '../../shared/constant/constants';

import { forbiddenStringValidator } from '../../shared/validation/forbidden-string.validator';

@Component({
    moduleId: module.id,
    selector: 'bug-detail',
    templateUrl: 'bug-detail.component.html',
    styleUrls: [ 'bug-detail.component.css']
})

export class BugDetailComponent implements OnInit {
    private modalId = "bugModal";
    private bugForm: FormGroup;
    private statuses = STATUS;
    private severities = SEVERITY;
    private statusArr: string[] = [];     // arrays to extract data from enums
    private severityArr: string[] = [];
    private currentBug = new Bug (null, null, this.statuses.Logged, this.severities.Severe, null, null, null, null, null);

    constructor(
        private formB: FormBuilder,     // this is another way to build reactive form (optional), instead of commented out FormControls
        private bugService: BugService
         ) {}   

    ngOnInit() {
        this.statusArr = Object.keys(this.statuses).filter(Number);  // get the keys, but only numbers (there are both nums and strings)
        this.severityArr = Object.keys(this.severities).filter(Number);
        this.configureForm();
    }

    configureForm(bug?: Bug) {
        // this.bugForm = new FormGroup({
        //     title: new FormControl(null, [Validators.required, forbiddenStringValidator(/puppy/i)]),     // regEx to be forbidden, i -ignore the case
        //     status: new FormControl(1, Validators.required),
        //     severity: new FormControl(1, Validators.required),
        //     description: new FormControl(null, Validators.required)
        // });
        if (bug) {
            this.currentBug = new Bug (
                bug.id,
                bug.title,
                bug.status,
                bug.severity,
                bug.description,
                bug.createdBy,
                bug.createdDate,
                bug.updatedBy,
                bug.createdDate
            );
        }
        this.bugForm = this.formB.group({
            title: [this.currentBug.title, [Validators.required, forbiddenStringValidator(/puppy/i)]],
            status: [this.currentBug.status, Validators.required],
            severity: [this.currentBug.severity, Validators.required],
            description: [this.currentBug.description, Validators.required],
        });
    }

    submitForm() {
        this.currentBug.title = this.bugForm.value["title"];
        this.currentBug.status = this.bugForm.value["status"];
        this.currentBug.severity = this.bugForm.value["severity"];
        this.currentBug.description = this.bugForm.value["description"];
        if (this.currentBug.id) {
            this.updateBug();
        } else {
            this.addBug();
        }
    }

    addBug() {
        this.bugService.addBug(this.currentBug);
    }

    updateBug() {
        this.bugService.updateBug(this.currentBug);
    }

    freshForm() {
        this.bugForm.reset({status: this.statuses.Logged, severity: this.severities.Severe});     //reset the form, set 2 initial values
        this.cleanBug();
    }

    cleanBug() {
        this.currentBug = new Bug(null, null, this.statuses.Logged, this.severities.Severe, null, null, null, null, null);
    }
}
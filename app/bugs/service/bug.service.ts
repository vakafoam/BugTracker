import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { FirebaseConfigService } from '../../core/service/firebase-config.service';

import { Bug } from '../model/bug';

@Injectable()

export class BugService {

    private bugsDbRef = this.fire.database.ref().child('bugs'); // pointing to 'bugs's endpoint in the database

    constructor(private fire: FirebaseConfigService) { }

    // It is a Firebase database listener
    getAddedBugs(): Observable<any> {
        return Observable.create(obs => {
            this.bugsDbRef.on('child_added', bug => {
                // casting received object to our Bug model object
                const newBug = bug.val() as Bug;
                newBug.id = bug.key;   // store the bug id from FB
                obs.next(newBug);  // pass Bug object to the observable
            },
                err => {
                    obs.throw(err);
                });
        });
    }

    changedListener(): Observable<any> {
        return Observable.create(obs => {
            this.bugsDbRef.on('child_changed', bug => {
                const updatedBug = bug.val() as Bug;
                updatedBug.id = bug.key;
                obs.next(updatedBug);
            }, 
            err => {
                obs.throw(err);
            });
        });
    }

    addBug(bug: Bug) {
        const newBugRef = this.bugsDbRef.push();
        newBugRef.set({
            title: bug.title,
            status: bug.status,
            severity: bug.severity,
            description: bug.description,
            createdBy: 'Vaka',
            createdDate: Date.now(),
        })
        .catch(err => console.error("Unable to add bug to Firebase - ", err));     
    }

    updateBug(bug: Bug) {
        const currentBugRef = this.bugsDbRef.child(bug.id);
        bug.id = null;
        bug.updatedBy = "Whoever";
        bug.updatedDate = Date.now();
        currentBugRef.update(bug);
    }
}
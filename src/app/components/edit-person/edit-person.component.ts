import { Component, Inject, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonDTO } from 'src/app/interfaces/person.interface';
import { PersonRestClient } from 'src/app/rest-clients/person.rest-client';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent {

  local_data : any;

  personSubscription : Subscription = new Subscription();

  constructor(public dialogRef: MatDialogRef<EditPersonComponent>, @Inject(MAT_DIALOG_DATA) public data : any , private personRestClient : PersonRestClient) {

    this.local_data = Object.assign({}, data);

   }

  modifyPerson(){

    console.log(this.local_data);
    this.personSubscription =this.personRestClient.modifyPerson(this.local_data).subscribe(resp => {
      if(resp === true){
        this.dialogRef.close({event:'Cancel'});
      }
    });
  }

  closeModify(){
    console.log(this.data);
    this.dialogRef.close({event:'Cancel' ,data:this.local_data});
  }

  ngOnDestroy() {

    this.personSubscription.unsubscribe();

  }
}

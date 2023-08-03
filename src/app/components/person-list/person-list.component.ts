import { Dialog } from '@angular/cdk/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonRestClient } from 'src/app/rest-clients/person.rest-client';
import { PersonDTO } from 'src/app/interfaces/person.interface';
import { EditPersonComponent } from '../edit-person/edit-person.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent {

  @Input()
  todo: any;

  done: any = [];

  personSubscription : Subscription = new Subscription();

  constructor(private personRestClient : PersonRestClient , private snackBar : MatSnackBar , private dialog: MatDialog){

   }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.done = event.container.data;

    }

  }

  sendInvitation(){

    if(this.done){
      this.snackBar.open('La lista de invitados ha sido enviada.', '', {
        duration: 2000
      });

      this.done = [];
    }else {
      this.snackBar.open('La lista de invitados está vacía.', '', {
        duration: 2000
      });
    }


  }

  deletePerson(oid : number){
    this.personSubscription = this.personRestClient.deletePerson(oid).subscribe(data => {
      if(data){

        this.personRestClient.getPersons().subscribe(data =>{
          this.todo = data;
        });
      }
    });

  }

  modifyPerson(personDTO : PersonDTO){

    console.log(personDTO);

    const dialogRef = this.dialog.open(EditPersonComponent, {
      minWidth: '500px',
      data: personDTO
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.event === 'Cancel'){

      }
      this.personRestClient.getPersons().subscribe(data =>{
        this.todo = data;
      });
    });

  }

  ngOnDestroy() {

    this.personSubscription.unsubscribe();

  }
}

import { PersonDTO } from './../../interfaces/person.interface';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { PersonRestClient } from 'src/app/rest-clients/person.rest-client';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-form-person',
  templateUrl: './form-person.component.html',
  styleUrls: ['./form-person.component.css']
})
export class FormPersonComponent {

  name! : string;
  lastName! : string;
  birthday! : string;
  documentType! : string;
  documentNumber! : number;

  personDTO : PersonDTO = new PersonDTO();

  todo : any;

  personSubscription : Subscription = new Subscription();
  listPersonSubscription : Subscription = new Subscription();

  constructor(private snackBar : MatSnackBar , private personRestClient : PersonRestClient){

  }

  ngOnInit(): void {

  }

  addPerson(){

      this.personDTO.name = this.name;
      this.personDTO.lastName = this.lastName;
      this.personDTO.documentType = this.documentType;
      this.personDTO.documentNumber = this.documentNumber;

     if( this.personDTO.name !== "" && this.personDTO.name !== undefined){
      this.personSubscription = this.personRestClient.addPerson(this.personDTO).subscribe(data => {
         this.loadPersons();
      })
     }else {
       this.snackBar.open('No completó los datos requeridos de una persona.', '', {
         duration: 2000
       });
     }

     this.resetBuyItem();
  }

  resetBuyItem(){

      this.name = '';
      this.lastName = '';
      this.documentType = '';
      this.documentNumber = 0;
  }

  public loadPersons() {
    this.listPersonSubscription = this.personRestClient.getPersons().subscribe(data => {
      this.todo = data;
    });
  }

  ngOnDestroy() {

    this.personSubscription.unsubscribe();
    this.listPersonSubscription.unsubscribe();
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-crudbus',
  templateUrl: './crudbus.component.html',
  styleUrls: ['./crudbus.component.css']
})
export class CrudbusComponent {

  
  searchbuses(firstname: string): void {
    const filterValue = firstname.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: User, filter: string) => {
      return data.firstName.toLowerCase().includes(filter);
    };
    this.dataSource.filter = filterValue;
  }

}

import { Component } from '@angular/core';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MyErrorStateMatcher } from './app-ui.module';
import { SearchEmployeeService } from './search-employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface EmployeeElement {
  id: number;
  idNumber: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  salary: number;
  annualSalary: number;
}

const DATA: EmployeeElement[] = [
  //{id: 1, idNumber: '123456789', firstName: 'Chris', lastName: 'Brown', phoneNumber: '+62831447653764', salary: 10000.00, annualSalary: 120000.00}
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  searchForm: FormGroup;
  title = 'challenge-ui';
  isMenuOpen: boolean = false;
  employeeId: string | undefined;

  displayedColumns: string[] = ['id', 'idNumber', 'firstName', 'lastName', 'phoneNumber', 'salary', 'annualSalary'];
  dataSource = DATA;

  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder, private searchService: SearchEmployeeService, private snackBar: MatSnackBar) {
    this.searchForm = this.fb.group({
      employeeIdInput:new FormControl('', [ Validators.pattern('^[0-9]+$')]),
    });
  }

  public onSidenavClick(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public searchEmployees(): void {
    this.dataSource = [];
    this.searchService.getEmployees(this.employeeId).subscribe(
      (data) => {
        console.log(data);
        if (!Array.isArray(data)) {
          this.dataSource = [data];
        } else {
          this.dataSource = data;
        }
      },
      (error) => {
        this.openSnackBar('Error getting employees or employee not found');
      }
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}

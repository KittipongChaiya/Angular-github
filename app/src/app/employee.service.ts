import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  salary: number;
  picture: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees: Employee[] = [
    { id: 1, name: 'John Doe', position: 'Developer', department: 'IT', salary: 70000, picture: 'assets/images/employees/1.png' },
    { id: 2, name: 'Jane Smith', position: 'Designer', department: 'Design', salary: 65000, picture: 'assets/images/employees/1.png' },
    { id: 3, name: 'Michael Brown', position: 'Manager', department: 'Sales', salary: 90000, picture: 'assets/images/employees/1.png' },
    { id: 4, name: 'Adela Smith', position: 'Developer', department: 'IT', salary: 80000, picture: 'assets/images/employees/2.png' },
    { id: 5, name: 'Brown Adelaide', position: 'Designer', department: 'Design', salary: 60000, picture: 'assets/images/employees/2.png' },
    { id: 6, name: 'Jane Agatha', position: 'Manager', department: 'Sales', salary: 50000, picture: 'assets/images/employees/2.png' },
    { id: 7, name: 'Agnes Smith', position: 'Developer', department: 'IT', salary: 40000, picture: 'assets/images/employees/3.png' },
    { id: 8, name: 'Alethea Alethea', position: 'Designer', department: 'Design', salary: 30000, picture: 'assets/images/employees/3.png' },
    { id: 9, name: 'Brown Smith', position: 'Manager', department: 'Sales', salary: 20000, picture: 'assets/images/employees/3.png' },
  ];

  private employeesSubject = new BehaviorSubject<Employee[]>(this.employees);

  constructor() {}

  getEmployees(): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }

  updateEmployee(updatedEmployee: Employee): void {
    const index = this.employees.findIndex(emp => emp.id === updatedEmployee.id);
    if (index !== -1) {
      this.employees[index] = { ...updatedEmployee };
      this.employeesSubject.next([...this.employees]);
    }
  }

  insertEmployee(newEmployee: Employee): void {
    const maxId = Math.max(...this.employees.map(emp => emp.id));
    newEmployee.id = maxId + 1;
    this.employees.push(newEmployee);
    this.employeesSubject.next([...this.employees]);
  }

  deleteEmployee(id: number): void {
    const index = this.employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.employees.splice(index, 1);
      this.employeesSubject.next([...this.employees]);
    }
  }
}
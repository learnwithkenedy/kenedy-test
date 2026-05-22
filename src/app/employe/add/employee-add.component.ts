import { Component } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: [],
})
export class EmployeeAddComponent {
  groups = [
    'Engineering',
    'Marketing',
    'Finance',
    'HR',
    'Operations',
    'Sales',
    'Support',
    'Legal',
    'R&D',
    'Admin',
  ];
  statuses = ['Active', 'Inactive', 'On Leave', 'Resigned', 'Terminated'];
  groupSearch = '';
  showGroupDropdown = false;

  form: Employee = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    birthDate: new Date(),
    basicSalary: 0,
    status: 'Active',
    group: '',
    description: '',
  };

  submitted = false;
  today = new Date().toISOString().split('T')[0];

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
  ) {}

  get filteredGroups(): string[] {
    return this.groups.filter((g) =>
      g.toLowerCase().includes(this.groupSearch.toLowerCase()),
    );
  }

  selectGroup(group: string): void {
    this.form.group = group;
    this.groupSearch = group;
    this.showGroupDropdown = false;
  }

  onGroupInputFocus(): void {
    this.showGroupDropdown = true;
  }

  onGroupInputBlur(): void {
    setTimeout(() => (this.showGroupDropdown = false), 200);
  }

  onDateChange(value: string): void {
    this.form.birthDate = new Date(value);
  }

  isFieldInvalid(field: string): boolean {
    if (!this.submitted) return false;
    const val = (this.form as any)[field];
    return val === undefined || val === null || val === '' || val === 0;
  }

  isEmailInvalid(): boolean {
    if (!this.submitted) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(this.form.email);
  }

  isDateInvalid(): boolean {
    if (!this.submitted) return false;
    return this.form.birthDate >= new Date();
  }

  allFieldsValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      this.form.username.trim() !== '' &&
      this.form.firstName.trim() !== '' &&
      this.form.lastName.trim() !== '' &&
      this.form.email.trim() !== '' &&
      emailRegex.test(this.form.email) &&
      this.form.birthDate < new Date() &&
      this.form.basicSalary > 0 &&
      this.form.status !== '' &&
      this.form.group !== '' &&
      this.form.description.trim() !== ''
    );
  }

  save(): void {
    this.submitted = true;
    if (!this.allFieldsValid()) return;
    this.employeeService.add({ ...this.form });
    this.router.navigate(['/employees']);
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: [],
})
export class EmployeeEditComponent implements OnInit {
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
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,
    private notificationService: NotificationService,
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
    const index = Number(this.route.snapshot.paramMap.get('id'));
    this.submitted = true;
    if (!this.allFieldsValid()) return;

    if (
      this.employeeService.checkUsernameAndEmail(
        this.form.username,
        this.form.email,
        index,
      )
    ) {
      this.notificationService.show(
        'Username or email already exists',
        'error',
      );
    } else {
      this.employeeService.update(this.form, index);
      this.router.navigate(['/employees']);
      this.notificationService.show('Edit has been successfully', 'success');
    }
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }

  ngOnInit(): void {
    const data = this.employeeService.getByIndex(
      Number(this.route.snapshot.paramMap.get('id')),
    ) as Employee;
    this.form.username = data.username;
    this.form.email = data.email;
    this.form.firstName = data.firstName;
    this.form.lastName = data.lastName;
    this.form.basicSalary = data.basicSalary;
    this.form.birthDate = data.birthDate;
    this.form.description = data.description;
    this.form.group = data.group;
    this.groupSearch = data.group;
  }
}

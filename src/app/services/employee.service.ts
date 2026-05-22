import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private employees: Employee[] = [];
  searchState = { query: '', group: '', page: 1, pageSize: 10 };

  constructor() {
    this.generateDummyData();
  }

  private generateDummyData(): void {
    const firstNames = [
      'Andi',
      'Budi',
      'Citra',
      'Dedi',
      'Eka',
      'Fitri',
      'Gilang',
      'Hana',
      'Indra',
      'Joko',
      'Kartika',
      'Lukman',
      'Maya',
      'Nanda',
      'Olivia',
      'Pratama',
      'Qori',
      'Rina',
      'Sari',
      'Teguh',
    ];
    const lastNames = [
      'Pratama',
      'Wijaya',
      'Kusuma',
      'Santoso',
      'Gunawan',
      'Saputra',
      'Purnama',
      'Hidayat',
      'Nugroho',
      'Susanti',
      'Lestari',
      'Utami',
      'Wulandari',
      'Ramadhani',
      'Fadhilah',
    ];
    const groups = [
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
    const statuses = ['Active', 'Inactive'];

    for (let i = 1; i <= 100; i++) {
      const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
      const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
      const emp: Employee = {
        username: `employee${i}`,
        firstName: fn,
        lastName: ln,
        email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@company.com`,
        birthDate: new Date(
          1970 + Math.floor(Math.random() * 30),
          Math.floor(Math.random() * 12),
          Math.floor(Math.random() * 28) + 1,
        ),
        basicSalary: Math.floor(Math.random() * 20000000) + 3000000,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        group: groups[Math.floor(Math.random() * groups.length)],
        description: `Employee ${fn} ${ln} joined on ${new Date(2015 + Math.floor(Math.random() * 9), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString()}.`,
      };
      this.employees.push(emp);
    }
  }

  getAll(): Employee[] {
    return this.employees;
  }

  getByUsername(username: string): Employee | undefined {
    return this.employees.find((e) => e.username === username);
  }

  getByIndex(index: number): Employee | undefined {
    return this.employees.find((_, idx) => idx === index);
  }

  checkUsernameAndEmail(username: string, email: string, index?: number) {
    return this.employees.find((emp, idx) => {
      if (!index) {
        return (
          (emp.username === username && idx !== index) ||
          (emp.email === email && idx !== index)
        );
      } else {
        return emp.username === username || emp.email === email;
      }
    });
  }

  add(employee: Employee): void {
    this.employees.push(employee);
  }

  update(employee: Employee, index: number): void {
    const idx = this.employees.findIndex((_, idx) => idx === index);
    if (idx !== -1) this.employees[idx] = employee;
  }

  delete(username: string): void {
    this.employees = this.employees.filter((e) => e.username !== username);
  }
}

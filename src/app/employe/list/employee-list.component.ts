import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: [],
})
export class EmployeeListComponent implements OnInit {
  allEmployees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  pagedEmployees: Employee[] = [];

  searchQuery = '';
  searchGroup = '';
  pageSize = 10;
  currentPage = 1;
  totalPages = 1;
  sortField = 'username';
  sortDirection: 'asc' | 'desc' = 'asc';

  pageSizeOptions = [5, 10, 25, 50, 100];
  groups: string[] = [];

  constructor(
    private employeeService: EmployeeService,
    private notificationService: NotificationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.allEmployees = this.employeeService.getAll();
    this.groups = [...new Set(this.allEmployees.map((e) => e.group))].sort();

    const state = this.employeeService.searchState;
    this.searchQuery = state.query;
    this.searchGroup = state.group;
    this.pageSize = state.pageSize;

    this.applyFilter();

    this.currentPage = Math.min(state.page, this.totalPages);
    this.updatePage();
  }

  applyFilter(): void {
    let result = [...this.allEmployees];

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.trim().toLowerCase();
      result = result.filter(
        (e) =>
          e.firstName.toLowerCase().includes(q) ||
          e.lastName.toLowerCase().includes(q) ||
          e.username.toLowerCase().includes(q) ||
          e.email.toLowerCase().includes(q),
      );
    }

    if (this.searchGroup) {
      result = result.filter((e) => e.group === this.searchGroup);
    }

    this.filteredEmployees = result;
    this.sort();
  }

  sort(): void {
    this.filteredEmployees.sort((a, b) => {
      const aVal = (a as any)[this.sortField]?.toString().toLowerCase() || '';
      const bVal = (b as any)[this.sortField]?.toString().toLowerCase() || '';
      const cmp = aVal.localeCompare(bVal);
      return this.sortDirection === 'asc' ? cmp : -cmp;
    });
    this.currentPage = 1;
    this.updatePage();
  }

  setSort(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.sort();
    this.saveState();
  }

  updatePage(): void {
    this.totalPages =
      Math.ceil(this.filteredEmployees.length / this.pageSize) || 1;
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
    const start = (this.currentPage - 1) * this.pageSize;
    this.pagedEmployees = this.filteredEmployees.slice(
      start,
      start + this.pageSize,
    );
  }

  saveState(): void {
    this.employeeService.searchState = {
      query: this.searchQuery,
      group: this.searchGroup,
      page: this.currentPage,
      pageSize: this.pageSize,
    };
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePage();
    this.saveState();
  }

  changePageSize(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
    this.updatePage();
    this.saveState();
  }

  onSearch(): void {
    this.currentPage = 1;
    this.applyFilter();
    this.saveState();
  }

  onEdit(emp: Employee): void {
    this.router.navigate([
      '/employees/edit/',
      this.employeeService
        .getAll()
        .findIndex((i) => i.username == emp.username),
    ]);
  }

  onDelete(emp: Employee): void {
    this.employeeService.delete(emp.username);
    this.allEmployees = this.employeeService.getAll();
    this.applyFilter();
    this.notificationService.show(
      `Delete employee: ${emp.firstName} ${emp.lastName}`,
    );
  }

  addEmployee(): void {
    this.router.navigate(['/employees/add']);
  }

  viewDetail(emp: Employee): void {
    this.router.navigate(['/employees', emp.username]);
  }

  get sortIcon(): string {
    return this.sortDirection === 'asc' ? '\u25B2' : '\u25BC';
  }

  get Math(): typeof Math {
    return Math;
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const total = this.totalPages;
    const current = this.currentPage;
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) pages.push(-1);
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (current < total - 2) pages.push(-1);
      pages.push(total);
    }
    return pages;
  }
}

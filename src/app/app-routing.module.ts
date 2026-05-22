import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './employe/login/login.component';
import { EmployeeListComponent } from './employe/list/employee-list.component';
import { EmployeeAddComponent } from './employe/add/employee-add.component';
import { EmployeeDetailComponent } from './employe/detail/employee-detail.component';
import { AuthGuard } from './services/auth.guard';
import { EmployeeEditComponent } from './employe/edit/employee-edit.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employees/add',
    component: EmployeeAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employees/edit/:id',
    component: EmployeeEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employees/:username',
    component: EmployeeDetailComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

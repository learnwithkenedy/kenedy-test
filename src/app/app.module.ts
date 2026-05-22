import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './employe/login/login.component';
import { EmployeeListComponent } from './employe/list/employee-list.component';
import { EmployeeAddComponent } from './employe/add/employee-add.component';
import { EmployeeDetailComponent } from './employe/detail/employee-detail.component';
import { EmployeeEditComponent } from './employe/edit/employee-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeListComponent,
    EmployeeAddComponent,
    EmployeeEditComponent,
    EmployeeDetailComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

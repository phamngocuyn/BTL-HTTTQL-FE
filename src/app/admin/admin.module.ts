import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components/components/components.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { HomeComponent } from './components/home/home.component';
import { ItemsComponent } from './components/items/items.component';
import { OrdersComponent } from './components/orders/orders.component';
import { UsersComponent } from './components/users/users.component';
import { DetailUserComponent } from './components/users/detail-user/detail-user.component';
import { DetailOrderComponent } from './components/orders/detail-order/detail-order.component';
import { CreateItemComponent } from './components/items/create-item/create-item.component';
import { DetailItemComponent } from './components/items/detail-item/detail-item.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { AdminRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { CreateEmployeeComponent } from './components/employees/create-employee/create-employee.component';
import { DetailEmployeeComponent } from './components/employees/detail-employee/detail-employee.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CoreModule } from '../core/core.module';
import { StatisticComponent } from './components/statistic/statistic.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    // ComponentsComponent,
    EmployeesComponent,
    HomeComponent,
    ItemsComponent,
    OrdersComponent,
    UsersComponent,
    CreateUserComponent,
    DetailUserComponent,
    DetailOrderComponent,
    CreateItemComponent,
    DetailItemComponent,
    SidebarMenuComponent,
    CreateEmployeeComponent,
    DetailEmployeeComponent,
    CommentsComponent,
    StatisticComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    NgxPaginationModule
  ]
})
export class AdminModule { }

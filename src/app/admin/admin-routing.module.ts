import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {UsersComponent} from "./components/users/users.component";
import {ItemsComponent} from "./components/items/items.component";
import {AdminComponent} from "./admin.component";
import {CreateItemComponent} from "./components/items/create-item/create-item.component";
import {DetailItemComponent} from "./components/items/detail-item/detail-item.component";
import {EmployeesComponent} from "./components/employees/employees.component";
import {CreateUserComponent} from "./components/users/create-user/create-user.component";
import {DetailUserComponent} from "./components/users/detail-user/detail-user.component";
import { OrdersComponent } from './components/orders/orders.component';
import { DetailOrderComponent } from './components/orders/detail-order/detail-order.component';
import { DetailEmployeeComponent } from './components/employees/detail-employee/detail-employee.component';
import { CreateEmployeeComponent } from './components/employees/create-employee/create-employee.component';
import { CommentsComponent } from './components/comments/comments.component';
import { StatisticComponent } from './components/statistic/statistic.component';




const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'users', component: UsersComponent },
      { path: 'items', component: ItemsComponent },
      { path: 'oders', component: OrdersComponent },
      { path: 'comments', component: CommentsComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'employees/detail_employee/:id', component: DetailEmployeeComponent },
      { path: 'employees/create_employee', component: CreateEmployeeComponent },
      { path: 'employees/edit/:id', component: CreateEmployeeComponent },
      { path: 'items/create_item', component: CreateItemComponent },
      { path: 'users/create_user', component: CreateUserComponent},
      { path: 'items/detail_item/:id', component: DetailItemComponent },
      { path: 'users/detail_user', component: DetailUserComponent },
      { path: 'oders/detail_oder/:id', component: DetailOrderComponent },
      { path: 'statistic', component: StatisticComponent },
      
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
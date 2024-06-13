import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from './service/auth-service.service';
import { ProductService } from './service/product.service';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './service/employee.service';
import { CustomerService } from './service/customer.service';
import { OrderServices } from './service/orders.service';
import { StatisticService } from './service/statistic.service';
import { CartService } from './service/cart.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule 
  ],
  providers: [
    AuthServiceService,
    ProductService,
    EmployeeService,
    CustomerService,
    OrderServices,
    StatisticService,
    CartService
  ]
})
export class CoreModule { }

import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/core/model/Customer/Customer';
import { CustomerService } from 'src/app/core/service/customer.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  listCustomer: Customer[] = [];
  keyword: string = '';

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers(): void {
    this.customerService.getAllCustomers().subscribe(
      data => {
        this.listCustomer = data;
        console.log("danh sách khách hàng", data)
      },
      error => {
        console.error('Lỗi khi lấy danh sách khách hàng:', error);
      }
    );
  }

  deleteCustomer(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa khách hàng này không?')) {
      this.customerService.deleteCustomer(id).subscribe(
        () => {
          this.listCustomer = this.listCustomer.filter(customer => customer.id !== id);
          console.log('Xóa khách hàng thành công');
        },
        error => {
          console.error('Lỗi khi xóa khách hàng:', error);
        }
      );
    }
  }
  
  searchCustomers(): void {
    if (this.keyword.trim()) {
      console.log(this.keyword)
      this.customerService.searchCustomers(this.keyword).subscribe(
        data => {
          this.listCustomer = data;
          console.log(data)
        },
        error => {
          console.error('Lỗi khi tìm kiếm khách hàng:', error);
        }
      );
    } else {
      this.getAllCustomers(); 
    }
  }

}

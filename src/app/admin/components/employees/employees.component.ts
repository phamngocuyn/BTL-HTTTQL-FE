import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/core/service/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  listEmpoyee: any[] = [];

  constructor(
    private emloyeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.getAllEmployee();
  }

  getAllEmployee(){
    this.emloyeeService.getAllEmployee().subscribe(res => {
      this.listEmpoyee = res;
      console.log("nhân viên", res)
    },error => {
      console.error('Lỗi khi lấy danh sách nhân viên:', error);
    });
  }

  deleteEmployee(id: number) {
    console.log(id)
    this.emloyeeService.deleteEmployee(id).subscribe(res => {
      alert("xóa thành công nhân viên")
      this.getAllEmployee()
    })
  }

  searchEmployees(keyword: string): void {
    if (keyword.trim() !== '') {
      this.emloyeeService.searchEmployees(keyword).subscribe(
        data => {
          this.listEmpoyee = data;
        },
        error => {
          console.error('Lỗi khi tìm kiếm nhân viên:', error);
        }
      );
    } else {
      this.getAllEmployee();
    }
  }

}
 
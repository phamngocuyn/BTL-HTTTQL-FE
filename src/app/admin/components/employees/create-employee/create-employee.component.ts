import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeData } from 'src/app/core/model/Employees/Employee';
import { EmployeeService } from 'src/app/core/service/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  isEditMode = false;
  employeeId: number | null = null;
  employeeData: EmployeeData = {
    username: '',
    email: '',
    phone: '',
    birth_day: '',
    province_id: 0,
    district_id: 0,
    commune_id: 0,
    salary: 0,
    password: '',
    first_name: '',
    last_name: '',
    role: 'EMPLOYEE'
  };

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  // ngOnInit(): void {
  // }

  // onSubmit() {
  //   this.employeeService.addEmployee(this.employeeData).subscribe(
  //     response => {
  //       console.log('Nhân viên đã được thêm thành công:', response);
  //       alert("Thêm nhân viên thành công")
  //     },
  //     error => {
  //       console.error('Lỗi khi thêm nhân viên:', error);
  //       alert("Thêm nhân viên thất bại")
  //     }
  //   );
  // }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.employeeId = +id;
        this.employeeService.getEmployeeById(this.employeeId).subscribe(employee => {
          this.employeeData = employee;
        });
      }
    });
  }

  onSubmit() {
    if (this.isEditMode && this.employeeId !== null) {
      this.employeeService.updateEmployee(this.employeeId, this.employeeData).subscribe(
        response => {
          console.log('Nhân viên đã được cập nhật thành công:', response);
          this.router.navigate(['/employees']); // Điều hướng về trang danh sách nhân viên
        },
        error => {
          console.error('Lỗi khi cập nhật nhân viên:', error);
        }
      );
    } else {
      this.employeeService.addEmployee(this.employeeData).subscribe(
        response => {
          console.log('Nhân viên đã được thêm thành công:', response);
          this.router.navigate(['/employees']); // Điều hướng về trang danh sách nhân viên
        },
        error => {
          console.error('Lỗi khi thêm nhân viên:', error);
        }
      );
    }
  }
}
 
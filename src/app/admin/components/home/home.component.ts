import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }
  chart: any;

  ngOnInit(): void {
  //   // Tạo biểu đồ line
  //   this.chart = new Chart('myChart', {
  //     type: 'line',
  //     data: {
  //       labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  //       datasets: [
  //         {
  //           label: 'Arizona',
  //           data: [70, 69, 95, 145, 182, 215, 252, 265, 233, 183, 139, 196],
  //           borderColor: '#044342',
  //           fill: false
  //         },
  //         {
  //           label: 'Connecticut',
  //           data: [47, 52, 44, 35, 58, 69, 32, 53, 71, 82, 99, 159],
  //           borderColor: '#7e0505',
  //           fill: false
  //         },
  //         {
  //           label: 'Ohio',
  //           data: [17, 22, 14, 25, 18, 19, 22, 43, 11, 32, 29, 59],
  //           borderColor: '#ed9e20',
  //           fill: false
  //         }
  //       ]
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           title: {
  //             display: true,
  //             text: 'Revenue in $'
  //           }
  //         }
  //       }
  //     }
  //   });

  //   // Tạo biểu đồ pie
  //   const pieChart = new Chart('pieChart', {
  //     type: 'pie',
  //     data: {
  //       labels: ['Electronics', 'Groceries', 'Cosmetics', 'Clothes', 'Appliances'],
  //       datasets: [{
  //         label: 'Category wise sales',
  //         data: [41.0, 33.8, 6.5, 15.2, 3.5],
  //         backgroundColor: ['#044342', '#7e0505', '#ed9e20', '#6920fb', '#121212'],
  //       }]
  //     },
  //     options: {
  //       responsive: true,
  //       plugins: {
  //         title: {
  //           display: true,
  //           text: 'Category wise sales'
  //         }
  //       },
  //     }
  //   });
  // }
  }
}

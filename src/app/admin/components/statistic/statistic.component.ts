import { Component, OnInit, OnDestroy } from '@angular/core';
import { StatisticService } from 'src/app/core/service/statistic.service';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { Document, Packer, Paragraph, Table, TableRow, TableCell, WidthType, TextRun, AlignmentType, TableLayoutType, PageOrientation  } from 'docx';



import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit, OnDestroy {

  totalQuantitySold: number = 0;
  totalRevenue: number = 0;
  private statsIntervalId: any;
  private chartIntervalId: any;
  private chart: Chart | undefined;
  private revenueChart: Chart | undefined;
  private categoryChart: Chart | undefined;
  private monthlyQuantityChart: Chart | undefined;
  years: number[] = [2024,2023,2022,2021,2020,2019,2018,2017,2016]; 
  selectedYear: number = new Date().getFullYear(); 

  maxMinOrder: number = 0;
  minOrder !: number;

  maxMinRevenue: number = 0;
  minRevenue !: number;

  maxMinCategory : number = 0;
  minCategory !: number;

  constructor(private statisticService: StatisticService) { }

  ngOnInit(): void {
    this.loadStatistics();

    this.statsIntervalId = setInterval(() => {
      this.loadStatistics();
    }, 10000); 

    this.loadMonthlyOrders(this.selectedYear);

    this.chartIntervalId = setInterval(() => {
      this.loadMonthlyOrders(this.selectedYear);
    }, 10000);

    this.loadMonthlyRevenue(this.selectedYear);

    this.chartIntervalId = setInterval(() => {
      this.loadMonthlyRevenue(this.selectedYear);
    }, 10000);

    this.loadCategoryRevenue();

    this.chartIntervalId = setInterval(() => {
      this.loadCategoryRevenue();
    }, 10000);

    this.loadMonthlyQuantity(this.selectedYear);

    this.chartIntervalId = setInterval(() => {
      this.loadMonthlyQuantity(this.selectedYear);
    }, 10000);

  }

  onYearChange(event: Event): void {
    const selectedYear = (event.target as HTMLSelectElement).value;
    this.selectedYear = +selectedYear;

    // Tải lại dữ liệu cho năm đã chọn
    this.loadMonthlyOrders(this.selectedYear);
    this.loadMonthlyRevenue(this.selectedYear);
    this.loadCategoryRevenue();
    this.loadMonthlyQuantity(this.selectedYear);
  }

  loadStatistics(): void {
    this.statisticService.getTotalRevenue().subscribe(
      (data) => {
        this.totalRevenue = data.total;
      },
      (error) => {
        console.error('Error fetching total revenue', error);
      }
    );

    this.statisticService.getTotalQuantitySold().subscribe(
      (quantity: number) => {
        this.totalQuantitySold = quantity;
      },
      (error) => {
        console.error('Error fetching total quantity sold', error);
      }
    );
  }

  loadMonthlyOrders(year: number): void {
    this.statisticService.getMonthlyOrders(year).subscribe(
      (data) => {
        const months = data.map(item => `Month ${item.month}`);
        const totalOrders = data.map(item => item.total_orders);
        this.renderChart(months, totalOrders);

        // Gọi API để lấy max và min và tính hiệu của chúng
        this.statisticService.getDecisionSupportMonthlyOrders(year).subscribe(
          (response) => {
            this.minOrder = response.min;
            this.maxMinOrder = response.max - response.min;
          },
          (error) => {
            console.error('Error fetching decision support data', error);
          })
      },
      (error) => {
        console.error('Error fetching monthly orders', error);
      }
    );
  }

  loadMonthlyRevenue(year: number): void {
    this.statisticService.getMonthlyRevenue(year).subscribe(
      (data) => {
        const months = data.map(item => `Month ${item.month}`);
        const totalRevenue = data.map(item => item.total_revenue);
        this.renderRevenueChart(months, totalRevenue);

        this.statisticService.getDecisionSupportMonthlyRevenue(this.selectedYear).subscribe(
          (data) => {
            this.minRevenue = data.min
            this.maxMinRevenue = data.max - data.min;
          },
          (error) => {
            console.error('Error fetching decision support for monthly revenue', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching monthly revenue', error);
      }
    );
  }

  loadCategoryRevenue(): void {
    this.statisticService.getCategoryRevenue().subscribe(
      (data) => {
        const categories = data.map(item => item.category_name);
        const totalRevenue = data.map(item => item.total_revenue);
        this.renderCategoryChart(categories, totalRevenue);

        this.statisticService.getDecisionSupportCategoryRevenue(this.selectedYear).subscribe(
          (data) => {
            this.minCategory = data.min
            this.maxMinCategory = data.max - data.min;
          },
          (error) => {
            console.error('Error fetching decision support for category revenue', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching category revenue', error);
      }
    );
  }

  loadMonthlyQuantity(year: number): void {
    this.statisticService.getMonthlyQuantity(year).subscribe(
      (data) => {
        const months = data.map(item => `Month ${item.month}`);
        const totalQuantity = data.map(item => item.total_quantity);
        this.renderMonthlyQuantity(months, totalQuantity);
      },
      (error) => {
        console.error('Error fetching monthly quantity', error);
      }
    );
  }

  renderChart(labels: string[], data: number[]): void {
    const ctx = document.getElementById('monthlyOrdersChart') as HTMLCanvasElement;
    if (this.chart) {
      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = data;
      this.chart.update();
    } else {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Total Orders',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (tooltipItem: any) => {
                  const value = tooltipItem.raw;
                  const month = labels[tooltipItem.dataIndex];
                  const decision = this.makeDecisionChart(month, value); // Sử dụng phương thức makeDecision của class StatisticComponent
                  return `${tooltipItem.label}: ${value.toLocaleString()} - Decision: ${decision}`;
                }
              }
            }
          }
        }
      } as ChartConfiguration);
    }
  }

  makeDecisionChart(month: string, value: number): string {
    // So sánh giá trị với một ngưỡng nào đó và đưa ra quyết định tương ứng
    if (value < this.minOrder + this.maxMinOrder*10/100) {
      return "Tăng cường quảng cáo tiếp thị sản phẩm"; 
    } else if (value >= this.minOrder + this.maxMinOrder*10/100 && value <= this.minOrder + this.maxMinOrder*40/100) {
      return "Duy trì các mặt hàng"; 
    } else {
      return "Mở rộng chiến dịch kinh doanh"; 
    }
  }


  renderRevenueChart(labels: string[], data: number[]): void {
    const ctx = document.getElementById('monthlyRevenueChart') as HTMLCanvasElement;
    if (this.revenueChart) {
      this.revenueChart.data.labels = labels;
      this.revenueChart.data.datasets[0].data = data;
      this.revenueChart.update();
    } else {
      this.revenueChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Total Revenue',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (tooltipItem: any) => {
                  const value = tooltipItem.raw;
                  const month = labels[tooltipItem.dataIndex];
                  const decision = this.makeDecisionRevenueChart(month, value); // Sử dụng phương thức makeDecision của class StatisticComponent
                  return `${tooltipItem.label}: ${value.toLocaleString()} - Decision: ${decision}`;
                }
              }
            }
          }
        }
      } as ChartConfiguration);
    }
  }

  makeDecisionRevenueChart(month: string, value: number): string {
    // So sánh giá trị với một ngưỡng nào đó và đưa ra quyết định tương ứng
    if (value < this.minRevenue + this.maxMinRevenue*10/100) {
      return "Tăng cường quảng cáo"; 
    } else if (value >= this.minRevenue + this.maxMinRevenue*10/100 && value <= this.minRevenue + this.maxMinRevenue*40/100) {
      return "Duy trì quảng cáo"; 
    } else {
      return "Mở rộng quy mô"; 
    }
  }
  
  renderCategoryChart(labels: string[], data: number[]): void {
    const ctx = document.getElementById('categoryRevenueChart') as HTMLCanvasElement;
    if (this.categoryChart) {
      this.categoryChart.data.labels = labels;
      this.categoryChart.data.datasets[0].data = data;
      this.categoryChart.update();
    } else {
      this.categoryChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Total Revenue by Category',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 122, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem: any) => {
                  const value = tooltipItem.raw;
                  const category = labels[tooltipItem.dataIndex];
                  const decision = this.makeCategoryDecision(category, value);
                  return `${(value as number).toLocaleString()} - Decision: ${decision}`;
                }
              }
            }
          }
        }
      } as ChartConfiguration);
    }
  }
  

  makeCategoryDecision(category: string, value: number): string {
    if (value > this.minCategory + this.maxMinCategory*10/100) {
      return "Tăng cường sản phẩm";
    } else if (value >= this.minCategory + this.maxMinCategory*10/100 && value <= this.minCategory + this.maxMinCategory*40/100) {
      return "Giữ nguyên chiến lược";
    } else {
      return "Cần cải thiện";
    }
  }

  renderMonthlyQuantity(labels: string[], data: number[]): void {
    const ctx = document.getElementById('monthlyQuantityChart') as HTMLCanvasElement;
    if (this.monthlyQuantityChart) {
      this.monthlyQuantityChart.data.labels = labels;
      this.monthlyQuantityChart.data.datasets[0].data = data;
      this.monthlyQuantityChart.update();
    } else {
      this.monthlyQuantityChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Total Quantity Sold',
            data: data,
            backgroundColor: 'rgba(75, 122, 132, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (tooltipItem: any) => {
                  const quantity = tooltipItem.raw;
                  const month = labels[tooltipItem.dataIndex];
                  const decision = this.makeMonthlyQuantityDecision(month, quantity);
                  return `${tooltipItem.label}: ${(quantity as number).toLocaleString()} - Decision: ${decision}`;
                }
              }
            }
          }
        }
      } as ChartConfiguration);
    }
  }

  makeMonthlyQuantityDecision(month: string, quantity: number): string {
    // Logic ra quyết định dựa trên số lượng bán hàng
    if (quantity > 1000) {
      return "Tăng cường kinh doanh các mặt hàng";
    } else if (quantity > 600 && quantity <= 1000) {
      return "Duy trì việc nhập các mặt hàng";
    } else {
      return "Cần cải thiện kỹ năng bán hàng";
    }
  }
  

  // exportToExcel(): void {
  //   const monthlyQuantityData = this.getMonthlyChartData(this.monthlyQuantityChart);
  //   const monthlyOrdersData = this.getMonthlyChartData(this.chart);
  //   const monthlyRevenueData = this.getMonthlyChartData(this.revenueChart);
  //   const categoryRevenueData = this.getCategoryChartData(this.categoryChart);

  //   const workbook = new ExcelJS.Workbook();

  //   // Bảng Monthly Quantity
  //   const monthlyQuantitySheet = workbook.addWorksheet('Monthly Quantity');
  //   this.addSheetData(monthlyQuantitySheet, 'Month', 'Total Quantity Sold', monthlyQuantityData);

  //   // Bảng Monthly Orders
  //   const monthlyOrdersSheet = workbook.addWorksheet('Monthly Orders');
  //   this.addSheetData(monthlyOrdersSheet, 'Month', 'Total Orders', monthlyOrdersData);

  //   // Bảng Monthly Revenue
  //   const monthlyRevenueSheet = workbook.addWorksheet('Monthly Revenue');
  //   this.addSheetData(monthlyRevenueSheet, 'Month', 'Total Revenue', monthlyRevenueData);

  //   // Bảng Category Revenue
  //   const categoryRevenueSheet = workbook.addWorksheet('Category Revenue');
  //   this.addSheetData(categoryRevenueSheet, 'Category', 'Total Revenue', categoryRevenueData);

  //   // Xuất file
  //   workbook.xlsx.writeBuffer().then((buffer) => {
  //     saveAs(new Blob([buffer]), 'Báo cáo thống kê.xlsx');
  //   });
  // }

  // addSheetData(sheet: ExcelJS.Worksheet, label1: string, label2: string, data: any[]): void {
  //   // Thêm tiêu đề
  //   sheet.addRow([label1, label2]);
  //   sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFF' } };
  //   sheet.getColumn(1).font = { bold: true, color: { argb: 'blue' } };
  //   sheet.getRow(1).fill = {
  //     type: 'pattern',
  //     pattern: 'solid',
  //     fgColor: { argb: '4472C4' }
  //   };

  //   // Thêm dữ liệu
  //   data.forEach((item) => {
  //     sheet.addRow([item.Month || item.Category, item.Value || item.Revenue]);
  //   });

  //   // Định dạng cột
  //   sheet.columns = [
  //     { key: 'label1', width: 30 },
  //     { key: 'label2', width: 20 }
  //   ];
  // }

  // getMonthlyChartData(chart: Chart | undefined): any[] {
  //   if (!chart) return [];
  //   const data = chart.data.datasets[0].data;
  //   const labels = chart.data.labels;

  //   if (data && labels) {
  //     return labels.map((label, index) => ({
  //       Month: label,
  //       Value: data[index]
  //     }));
  //   }

  //   return [];
  // }

  // getCategoryChartData(chart: Chart | undefined): any[] {
  //   if (!chart) return [];
  //   const data = chart.data.datasets[0].data;
  //   const labels = chart.data.labels;

  //   if (data && labels) {
  //     return labels.map((label, index) => ({
  //       Category: label,
  //       Revenue: data[index]
  //     }));
  //   }

  //   return [];
  // }

  exportToWord(): void {
    const currentYear = new Date().getFullYear();
    const monthlyQuantityData = this.getMonthlyChartData(this.monthlyQuantityChart);
    const monthlyOrdersData = this.getMonthlyChartData(this.chart);
    const monthlyRevenueData = this.getMonthlyChartData(this.revenueChart);
    const categoryRevenueData = this.getCategoryChartData(this.categoryChart);

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: `Báo cáo số lượng sản phẩm bán ra theo tháng (${this.selectedYear})`, bold: true, size: 28 }),
                new TextRun({ text: '\n\n' }) // Khoảng cách giữa các phần tử
              ],
            }),
            this.createTable(monthlyQuantityData, 'Tháng', 'Số lượng sản phẩm'),
          ],
        },
        {
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: `Báo cáo số lượng đơn hàng bán ra theo tháng (${this.selectedYear})`, bold: true, size: 28 }),
                new TextRun({ text: '\n\n' }) // Khoảng cách giữa các phần tử
              ],
            }),
            this.createTable(monthlyOrdersData, 'Tháng', 'Số lượng đơn hàng'),
          ],
        },
        {
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: `Báo cáo doanh thu theo tháng (${this.selectedYear})`, bold: true, size: 28 }),
                new TextRun({ text: '\n\n' }) // Khoảng cách giữa các phần tử
              ],
            }),
            this.createTable(monthlyRevenueData, 'Tháng', 'Doanh thu'),
          ],
        },
        {
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: `Báo cáo doanh thu theo loại sản phẩm (${this.selectedYear})`, bold: true, size: 28 }),
                new TextRun({ text: '\n\n' }) // Khoảng cách giữa các phần tử
              ],
            }),
            this.createTable(categoryRevenueData, 'Loại sản phẩm', 'Doanh thu'),
          ],
        },
      ],
    });

    // Xuất file
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'Báo cáo thống kê.docx');
    });
  }

  createTable(data: any[], label1: string, label2: string): Table {
    const rows = [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: label1, bold: true })] })],
            shading: { fill: '4472C4' },
          }),
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: label2, bold: true })] })],
            shading: { fill: '4472C4' },
          }),
        ],
      }),
    ];

    data.forEach((item) => {
      rows.push(
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ text: item.Month || item.Category })] }),
            new TableCell({ children: [new Paragraph({ text: item.Value ? item.Value.toString() : item.Revenue.toString() })] }),
          ],
        })
      );
    });

    return new Table({
      rows: rows,
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      layout: TableLayoutType.AUTOFIT,
    });
  }

  getMonthlyChartData(chart: Chart | undefined): any[] {
    if (!chart) return [];
    const data = chart.data.datasets[0].data;
    const labels = chart.data.labels;

    if (data && labels) {
      return labels.map((label, index) => ({
        Month: label,
        Value: data[index],
      }));
    }

    return [];
  }

  getCategoryChartData(chart: Chart | undefined): any[] {
    if (!chart) return [];
    const data = chart.data.datasets[0].data;
    const labels = chart.data.labels;

    if (data && labels) {
      return labels.map((label, index) => ({
        Category: label,
        Revenue: data[index],
      }));
    }

    return [];
  }

  ngOnDestroy() {
    clearInterval(this.statsIntervalId);
    clearInterval(this.chartIntervalId);
  }

}

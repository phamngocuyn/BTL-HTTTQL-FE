import { Component, OnInit } from '@angular/core';
import { OrderServices } from 'src/app/core/service/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];
  p: number = 1; // Biến lưu trang hiện tại
  itemsPerPage: number = 8;
  searchKeyword: string = '';
  private statsIntervalId: any;

  constructor(private orderService: OrderServices
  ) { }

  ngOnInit(): void {
    this.loadOrders();

  } 

  loadOrders() {
    this.orderService.getOrders().subscribe(
      (orders) => {
        // Tính tổng số lượng sản phẩm cho mỗi đơn hàng
        this.orders = orders.map(order => {
          const totalQuantity = order.order_items.reduce((sum : any, item: any) => sum + item.quantity, 0);
          return { ...order, totalQuantity };
        });
      },
      (error) => {
        console.error('Error loading orders', error);
      }
    );
  }

  deleteOrder(id: number) {
    if(confirm('Bạn có chắc chắn muốn xóa hóa đơn này?')) {
      this.orderService.deleteOrder(id).subscribe(
        () => {
          this.orders = this.orders.filter(order => order.id !== id);
        },
        (error) => {
          console.error('Error deleting order', error);
        }
      );
    }
  }

  updateStatus(id: number, event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement && selectElement instanceof HTMLSelectElement) {
      const status = selectElement.value;
      console.log("trạng thái", status)
      this.orderService.updateOrderStatus(id, status).subscribe(
        () => {
          const order = this.orders.find(order => order.id === id);
          if (order) {
            order.status = status;
          }
        },
        (error) => {
          console.error('Error updating order status', error);
        }
      );
    }
  }  

  getStatusClass(item: any): string {
    if (item.status === 'Pending') {
      return 'pending';
    } else if (item.status === 'Approved') {
      return 'approved';
    } else if (item.status === 'Not approved') {
      return 'not-approved';
    } else {
      return '';
    }
  }

  onSearch() {
    if (this.searchKeyword.trim() !== '') {
      this.searchOrders(this.searchKeyword.trim());
    } else {
      this.loadOrders();
    }
  }

  searchOrders(keyword: string) {
    this.orderService.searchOrders(keyword).subscribe(
      (orders) => {
        this.orders = orders;
      },
      (error) => {
        console.error('Error searching orders', error);
      }
    );
  }
  
  ngOnDestroy() {
    clearInterval(this.statsIntervalId);
  }
  
  
}
 
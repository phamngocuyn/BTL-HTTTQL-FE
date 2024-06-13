import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/core/service/order.service';
import { OrderServices } from 'src/app/core/service/orders.service';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss']
})
export class DetailOrderComponent implements OnInit {
  orderId!: number;
  order: any;

  constructor(
    private route: ActivatedRoute, 
    private orderService: OrderServices
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = params['id'];
      this.loadOrderDetails();
    });
  }

  loadOrderDetails() {
    this.orderService.getOrderById(this.orderId).subscribe(
      (order) => {
        this.order = order;
      },
      (error) => {
        console.error('Error loading order details', error);
      }
    );
  }

}

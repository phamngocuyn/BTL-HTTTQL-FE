import { ProductService } from 'src/app/core/service/product.service';
import { InforProduct } from 'src/app/core/model/Product/infor-product';
import { Component, Input, OnInit } from '@angular/core';

import Swiper, { Navigation, Pagination } from 'swiper';
import { CartService } from 'src/app/core/service/cart.service';

Swiper.use([Navigation, Pagination]);

 
@Component({
  selector: 'app-inner-product',
  templateUrl: './inner-product.component.html',
  styleUrls: ['./inner-product.component.scss']
})
export class InnerProductComponent implements OnInit {

  @Input() listProduct!: InforProduct[];

  constructor(
    private ProductService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {

    new Swiper('.mySwiper', {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }
 
  loadMoreProducts(){

  }

  getImageUrl(imagePath: string): string {
    return this.ProductService.getFullImageUrl(imagePath);
  } 

  addToCart(productId: number): void {
    this.cartService.addToCart(productId)
      .subscribe(
        response => {
          console.log('Thêm vào giỏ hàng thành công:', response);
          // Xử lý sau khi thêm vào giỏ hàng thành công
        },
        error => {
          console.error('Lỗi khi thêm vào giỏ hàng:', error);
          // Xử lý lỗi nếu cần thiết
        }
      );
  }
}

import { ProductService } from 'src/app/core/service/product.service';
import { InforProduct } from 'src/app/core/model/Product/infor-product';
import { Component, Input, OnInit } from '@angular/core';

import Swiper, { Navigation, Pagination } from 'swiper';
import { CartService } from 'src/app/core/service/cart.service';

Swiper.use([Navigation, Pagination]);


@Component({
  selector: 'app-infor-product',
  templateUrl: './infor-product.component.html',
  styleUrls: ['./infor-product.component.scss']
})
export class InforProductComponent implements OnInit {

  p: number = 1; 
  itemsPerPage: number = 12; 
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
        },
        error => {
          console.error('Lỗi khi thêm vào giỏ hàng:', error);
        }
      );
  }
}

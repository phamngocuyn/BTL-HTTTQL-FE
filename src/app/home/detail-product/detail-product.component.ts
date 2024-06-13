import { ProductService } from 'src/app/core/service/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/core/service/cart.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

  productId!: number;
  productDetail: any;

  constructor(
    private route: ActivatedRoute,
    private ProductService: ProductService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.productId = +id;
      this.getProductDetail();
    } else {
    // Xử lý trường hợp id là null hoặc undefined
    }

    this.getProductDetail();
  }

  getProductDetail(): void {
    this.ProductService.userGetProductById(this.productId)
      .subscribe(
        (data: any) => {
          this.productDetail = data;
          console.log(data)
        },
        error => {
          console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
          // Xử lý lỗi nếu cần thiết
        }
      );
  } 

  getImageUrl(imagePath: string): string {
    return this.ProductService.getFullImageUrl(imagePath);
  }

}
 
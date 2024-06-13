import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InforProduct } from 'src/app/core/model/Product/infor-product';
import { ProductService } from 'src/app/core/service/product.service';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.scss']
})
export class DetailItemComponent implements OnInit {

  product!: InforProduct;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }
 
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe(
      (product) => {
        this.product = product;
        console.log("Chi tiết sản phẩm ", product)
      },
      (error) => {
        console.error('Error fetching product details', error);
      }
    );
  }

}
 
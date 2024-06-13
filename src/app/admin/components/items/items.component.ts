import { Component, OnInit } from '@angular/core';
import { InforProduct } from 'src/app/core/model/Product/infor-product';
import { ProductService } from 'src/app/core/service/product.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  listProduct: InforProduct[] = [];
  searchKeyword: string = '';
  p: number = 1; 
  itemsPerPage: number = 8; 

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }
 
  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      data => {
        this.listProduct = data;
      },
      error => {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
      }
    );
  } 

  deleteProduct(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
      this.productService.deleteProduct(id).subscribe(
        response => {
          this.listProduct = this.listProduct.filter(product => product.id !== id);
        },
        error => {
          console.error('Lỗi khi xóa sản phẩm:', error);
        }
      );
    }
  }

  searchProducts(): void {
    if (this.searchKeyword.trim()) {
      console.log(this.searchKeyword)
      this.productService.searchProducts(this.searchKeyword).subscribe(
        data => {
          this.listProduct = data;
          console.log(data)
        },
        error => {
          console.error('Lỗi khi tìm kiếm sản phẩm:', error);
        }
      );
    } else {
      this.getAllProducts();
    }
  }

}

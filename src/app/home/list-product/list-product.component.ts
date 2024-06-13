import { Component, OnInit } from '@angular/core';
import { InforProduct } from 'src/app/core/model/Product/infor-product';
import { ProductService } from './../../core/service/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  listLaptop !: InforProduct[];
  listChuot !: InforProduct[];
  listBanPhim !: InforProduct[];
  listLotChuot !: InforProduct[];

  constructor(
    private ProductService: ProductService
  ) { }

  ngOnInit(): void {
    this.getListProductLaptop(); 
    this.getListProductChuot(); 
    this.getListProductBanPhim();
    this.getListProductLotChuot();
  }
  
  getListProductLaptop(){
    return this.ProductService.getListProductLaptop().subscribe(res => {
      this.listLaptop = res;
    })
  }

  getListProductChuot(){
    return this.ProductService.getMice().subscribe(res => {
      this.listChuot = res;
    })
  }

  getListProductBanPhim(){
    return this.ProductService.getBanPhim().subscribe(res => {
      this.listBanPhim = res;
    })
  }

  getListProductLotChuot(){
    return this.ProductService.getLotChuot().subscribe(res => {
      this.listLotChuot = res;
    })
  }

}
 
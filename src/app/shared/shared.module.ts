import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InforProductComponent } from './components/infor-product/infor-product.component';
import { ListImgComponent } from './components/list-img/list-img.component';
import { InnerProductComponent } from './components/infor-product/inner-product/inner-product.component';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    InforProductComponent,
    ListImgComponent,
    InnerProductComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    NgxPaginationModule
  ],
  exports: [
    InforProductComponent,
    InnerProductComponent,
    ListImgComponent
  ]
})
export class SharedModule { }

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InforProductComponent } from './infor-product.component';

describe('InforProductComponent', () => {
  let component: InforProductComponent;
  let fixture: ComponentFixture<InforProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InforProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InforProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

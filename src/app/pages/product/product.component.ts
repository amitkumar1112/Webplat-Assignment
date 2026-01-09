import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/core/service/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  productList: Array<any> = [];
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private _apiService: ApiService) {}
  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(): void {
    const query = `limit=12`;
    this._apiService
      .getProductList(query)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.productList = res.products;
        }
      });
  }

  sortByPrice(): void {
    this.productList.sort((a, b) => a.price - b.price); // can be done using traditional for loop as well
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}

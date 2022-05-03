import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, delay } from 'rxjs';
import { InMemoryProductService } from '../in-memory-product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'price', 'action'];

  products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  productCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  isContentLoaded: boolean = false;

  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>(this.products.getValue());
  length: number = this.productCount.getValue();

  constructor(private inMemoryProductService: InMemoryProductService) { }

  ngOnInit(): void {
    this.updateDataSource();
  }

  ngAfterViewInit(): void {
    this.products.subscribe({
      next: (products) => this.dataSource = new MatTableDataSource(products)
    });

    this.productCount.pipe(delay(0)).subscribe({
      next: (productCount: number) => this.length = productCount
    });
  }

  onSortChamge(sort?: Sort) {
    this.updateDataSource();
  }

  getPage(event?: PageEvent) {
    this.updateDataSource();
  }

  private updateDataSource() {
    const pageIndex = this.paginator?.pageIndex || 0;
    const pageSize = this.paginator?.pageSize || 10;
    const active = this.sort?.active || "id";
    const direction = this.sort?.direction || "asc";

    const products: Product[] = this.inMemoryProductService.read(pageIndex, pageSize, active, direction)
    const productCount: number = this.inMemoryProductService.getProductCount();
    this.products.next(products)
    this.productCount.next(productCount);
    this.isContentLoaded = true;
  }
}

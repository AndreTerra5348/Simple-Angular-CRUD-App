import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InMemoryProductService } from '../in-memory-product.service';
import { ProductFormSettings } from '../product-form/product-form.component';
import { ProductFormService } from '../product-form/product-form.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit, OnDestroy {
  productFormSettings: ProductFormSettings = {
    title: "New Product",
    buttonText: "Create",
    buttonColor: "primary",
    isValidatorRequired: true
  }

  private productFormSubscription!: Subscription;

  constructor(private inMemoryProductService: InMemoryProductService,
    private productFormService: ProductFormService,
    private router: Router) { }

  ngOnInit(): void {
    // react to form submission and create the product
    this.productFormSubscription = this.productFormService.getForm().subscribe({
      next: (product: Product) => this.createProduct(product)
    });
  }

  private createProduct(product: Product): void {
    this.inMemoryProductService.create(product);
    this.showCreatedMessage();
  }

  private showCreatedMessage(): void {
    this.inMemoryProductService.showMessage("Product Created!");
    this.router.navigate(['products/'])
  }

  ngOnDestroy(): void {
    this.productFormSubscription.unsubscribe();
  }
}

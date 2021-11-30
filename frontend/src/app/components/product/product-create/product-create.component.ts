import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalProductService } from '../local-product.service';
import { ProductFormSettings } from '../product-form/product-form.component';
import { ProductFormService } from '../product-form/product-form.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit, OnDestroy {
  productFormSettings : ProductFormSettings = {
    title: "New Product",
    buttonText: "Create",
    buttonColor: "primary",
    isValidatorRequired: true
  }

  private productFormSubscription!: Subscription;

  constructor(private productService: ProductService,
    private localProductService: LocalProductService,
    private productFormService: ProductFormService,    
    private router: Router) { }  

  ngOnInit(): void {    
    // react to form submission and create the product
    this.productFormSubscription = this.productFormService.getForm().subscribe({
      next: (product: Product) => this.createProduct(product)
    });
  }

  private createProduct(product: Product): void {
    this.productService.isEnabled ? 
      this.handleServerData(product) :
      this.handleLocalData(product)     
  }

  private handleServerData(product: Product): void {
    this.productService.create(product).subscribe({
      next: () => this.showCreatedMessage()
    });
  }

  private handleLocalData(product: Product): void {
    this.localProductService.create(product);
    this.showCreatedMessage();
  }

  private showCreatedMessage(): void {
    this.productService.showMessage("Product Created!");
    this.router.navigate(['products/'])
  }
  
  ngOnDestroy(): void {
    this.productFormSubscription.unsubscribe();
  }
}

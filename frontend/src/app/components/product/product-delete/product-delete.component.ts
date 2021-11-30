import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalProductService } from '../local-product.service';
import { ProductFormSettings } from '../product-form/product-form.component';
import { ProductFormService } from '../product-form/product-form.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit, OnDestroy {
  productFormSettings: ProductFormSettings = {
    title: "Delete Product",
    buttonText: "Delete",
    buttonColor: "warn",
    isValidatorRequired: false
  }

  private productFormSubscription!: Subscription;

  constructor(private productService: ProductService,
    private localProductService: LocalProductService,
    private productFormService: ProductFormService,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {
    this.productFormService.onFormPropertyToggle("name")
    this.productFormService.onFormPropertyToggle("price")

    const id = this.route.snapshot.paramMap.get("id");    
    this.productService.isEnabled ?
      this.handleServerData(id!) :
      this.handleLocalData(id!);
  }

  private handleLocalData(id: string) {
    // get product and update Form's data
    const _product: Product = this.localProductService.readById(id);
    this.productFormService.onProductUpdate(_product);

    // react to form submission and update the product
    this.productFormSubscription = this.productFormService.getForm().subscribe({
      next: (product: Product) => {
        this.localProductService.delete(product.id?.toString()!)
        this.showDeleteMessage()
      },
    });
  }

  private handleServerData(id: string): void {
    // get product and update Form's data
    this.productService.readById(id).subscribe({
      next: (product: Product) => this.productFormService.onProductUpdate(product)
    });

    // react to form submission and update the product
    this.productFormSubscription = this.productFormService.getForm().subscribe({
      next: (product: Product) => this.productService.delete(product.id?.toString()!).subscribe({
        next: () => this.showDeleteMessage()
      })
    });
  }

  private showDeleteMessage(): void {
    this.productService.showMessage("Product deleted!");
    this.router.navigate(['products/']);
  }

  ngOnDestroy(): void {
    this.productFormSubscription.unsubscribe();
  }
}

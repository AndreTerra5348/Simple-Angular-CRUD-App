import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalProductService } from '../local-product.service';
import { ProductFormSettings } from '../product-form/product-form.component';
import { ProductFormService } from '../product-form/product-form.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit, OnDestroy {
  productFormSettings: ProductFormSettings = {
    title: "Edit Product",
    buttonText: "Update",
    buttonColor: "primary",
    isValidatorRequired: true
  }

  private productFormSubscription!: Subscription;

  constructor(private productService: ProductService,
    private localProductService: LocalProductService,
    private productFormService: ProductFormService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id")
    this.productService.isEnabled ?
      this.handleServerData(id!) :
      this.handleLocalData(id!)
  }

  private handleLocalData(id: string) {
    // get product and update Form's data
    const _product: Product = this.localProductService.readById(id);
    this.productFormService.onProductUpdate(_product);

    // react to form submission and update the product
    this.productFormSubscription = this.productFormService.getForm().subscribe({
      next: (product: Product) => {
        this.localProductService.update(product);
        this.showUpdateMessage();
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
      next: (product: Product) => this.productService.update(product).subscribe({
        next: () => this.showUpdateMessage()
      })
    });
  }

  private showUpdateMessage(): void {
    this.productService.showMessage("Product Updated!");
    this.router.navigate(['/products']);
  }

  ngOnDestroy(): void {
    this.productFormSubscription.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InMemoryProductService } from '../in-memory-product.service';
import { ProductFormSettings } from '../product-form/product-form.component';
import { ProductFormService } from '../product-form/product-form.service';
import { Product } from '../product.model';

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

  constructor(private inMemoryProductService: InMemoryProductService,
    private productFormService: ProductFormService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id") || ""
    // get product and update Form's data
    const _product: Product = this.inMemoryProductService.readById(id);
    this.productFormService.onProductUpdate(_product);

    // react to form submission and update the product
    this.productFormSubscription = this.productFormService.getForm().subscribe({
      next: (product: Product) => {
        this.inMemoryProductService.update(product);
        this.showUpdateMessage();
      },
    });
  }

  private showUpdateMessage(): void {
    this.inMemoryProductService.showMessage("Product Updated!");
    this.router.navigate(['/products']);
  }

  ngOnDestroy(): void {
    this.productFormSubscription.unsubscribe();
  }
}

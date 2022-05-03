import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
    private productFormService: ProductFormService,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {
    this.productFormService.onFormPropertyToggle("name")
    this.productFormService.onFormPropertyToggle("price")

    const id = this.route.snapshot.paramMap.get("id") || "";
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

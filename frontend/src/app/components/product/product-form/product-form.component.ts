import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ProductFormService } from './product-form.service';

export interface ProductFormSettings{
  title: string
  buttonText: string
  buttonColor: string
  isValidatorRequired: boolean
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  @Input() productFormSettings: ProductFormSettings = {
    title:"",
    buttonText:"",
    buttonColor:"primary",
    isValidatorRequired: true
  }

  productForm = this.fb.group({
    name: ['', Validators.required],
    price: [0, Validators.required],
    id: [undefined]
  });

  // subscribe before parent's init method
  constructor(private productService: ProductService,
    private productFormService: ProductFormService,
    private fb: FormBuilder) {
      // update form value
      this.productFormService.getProduct().subscribe({
        next: (product: Product) => this.productForm.patchValue(product)
      });

      // update properties edit state
      this.productFormService.getFormPropertyToggle().subscribe((property: string) => {
        if(this.productForm.controls[property].enabled){
          this.productForm.controls[property].disable()
        }else{
          this.productForm.controls[property].enable()
        }
      })
  }

  ngOnInit(): void {
  }

  onSubmit(): void{
    if(this.productForm.invalid){
      this.productService.showMessage("Invalid Product!");
      return;
    }
    this.productFormService.onFormUpdate(this.productForm.getRawValue());
  }
}

import { Injectable } from '@angular/core';
import { Product } from './product.model';

const PRODUCTS: Product[] = [
    {
      "id": 0,
      "name": "Tv",
      "price": 8504.25
    },
    {
      "id": 1,
      "name": "Charger",
      "price": 191.71
    },
    {
      "id": 2,
      "name": "Sand paper",
      "price": 9291.58
    },
    {
      "id": 3,
      "name": "Pillow",
      "price": 4810.68
    },
    {
      "id": 4,
      "name": "Water bottle",
      "price": 9457.87
    },
    {
      "id": 5,
      "name": "Plastic fork",
      "price": 3990.42
    },
    {
      "id": 6,
      "name": "Doll",
      "price": 1960.63
    },
    {
      "id": 7,
      "name": "Toothpaste",
      "price": 3324.75
    },
    {
      "id": 8,
      "name": "Bread",
      "price": 4036.49
    },
    {
      "id": 9,
      "name": "Boom box",
      "price": 2321.67
    },
    {
      "id": 10,
      "name": "Toe ring",
      "price": 3363.22
    },
    {
      "id": 11,
      "name": "Button",
      "price": 9286.56
    },
    {
      "id": 12,
      "name": "Shirt",
      "price": 120.02
    },
    {
      "id": 13,
      "name": "Window",
      "price": 1251.37
    },
    {
      "id": 14,
      "name": "Table",
      "price": 2024.63
    },
    {
      "id": 15,
      "name": "Bananas",
      "price": 5356.87
    },
    {
      "id": 16,
      "name": "Slipper",
      "price": 4254.51
    },
    {
      "id": 17,
      "name": "Perfume",
      "price": 2432.9
    },
    {
      "id": 18,
      "name": "Hair tie",
      "price": 8358.18
    },
    {
      "id": 19,
      "name": "Toothbrush",
      "price": 34.46
    },
    {
      "id": 20,
      "name": "Ipod",
      "price": 9882.05
    },
    {
      "id": 21,
      "name": "Milk",
      "price": 7875.86
    },
    {
      "id": 22,
      "name": "Pencil",
      "price": 6262.77
    },
    {
      "id": 23,
      "name": "Flag",
      "price": 2047.42
    },
    {
      "id": 24,
      "name": "Needle",
      "price": 4221.42
    },
    {
      "id": 25,
      "name": "Speakers",
      "price": 6072.18
    },
    {
      "id": 26,
      "name": "Sponge",
      "price": 1777.24
    },
    {
      "id": 27,
      "name": "Blouse",
      "price": 344.6
    },
    {
      "id": 28,
      "name": "Tree",
      "price": 3119.49
    },
    {
      "id": 29,
      "name": "Piano",
      "price": 6352.28
    },
    {
      "id": 30,
      "name": "Brocolli",
      "price": 5956.36
    },
    {
      "id": 31,
      "name": "Money",
      "price": 2372.31
    },
    {
      "id": 32,
      "name": "Clay pot",
      "price": 2622.48
    },
    {
      "id": 33,
      "name": "Tire swing",
      "price": 4065.27
    },
    {
      "id": 34,
      "name": "Leg warmers",
      "price": 280.85
    },
    {
      "id": 35,
      "name": "Mp3 player",
      "price": 246.76
    },
    {
      "id": 36,
      "name": "White out",
      "price": 4607.51
    },
    {
      "id": 37,
      "name": "Shampoo",
      "price": 8604.49
    },
    {
      "id": 38,
      "name": "Lamp",
      "price": 6749.51
    },
    {
      "id": 39,
      "name": "Eye liner",
      "price": 8599.29
    },
    {
      "id": 40,
      "name": "Cork",
      "price": 7469.29
    },
    {
      "id": 41,
      "name": "Stockings",
      "price": 6475.23
    },
    {
      "id": 42,
      "name": "Bag",
      "price": 690.34
    },
    {
      "id": 43,
      "name": "Playing card",
      "price": 2327.74
    },
    {
      "id": 44,
      "name": "Candle",
      "price": 3120.94
    },
    {
      "id": 45,
      "name": "Wagon",
      "price": 6787.12
    },
    {
      "id": 46,
      "name": "Checkbook",
      "price": 491.46
    },
    {
      "id": 47,
      "name": "Door",
      "price": 4524.92
    },
    {
      "id": 48,
      "name": "Box",
      "price": 7220.55
    },
    {
      "id": 49,
      "name": "Key chain",
      "price": 5392.47
    }
  ];

@Injectable({
  providedIn: 'root'
})
export class LocalProductService {
  products:Product[] = PRODUCTS;

  constructor() { }

  create(product: Product): Product {
    product.id = this.products.length;
    this.products.push(product);
    return product;
  }

  getProductCount(): number{
    return this.products.length;
  }

  read(pageIndex: number, pageSize: number, active: string, direction: string): Product[]{   
    return this.page(pageIndex, pageSize, this.sort(active, direction, this.products));
  }

  private sort(active: string, direction: string, products: Product[]): Product[] {

    return products.sort((a, b) => {
      const isAsc = direction === 'asc';
      switch (active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'price': return compare(+a.price, +b.price, isAsc);
        case 'id': return compare(+a.id!, +b.id!, isAsc);
        default: return 0;
      }
    });
  }

  private page(pageIndex: number, pageSize: number, products: Product[]): Product[] {
      const startIndex = pageIndex * pageSize;      
      return products.slice(startIndex, startIndex+pageSize);
  }  

  readById(id: string): Product{
    const idNum: number = +id;
    return this.products.find(x => x.id === idNum) || this.products[0];
  }

  update(product: Product): Product{
    const index = this.products.map(p => p.id).indexOf(+product.id!);
    if(~index){
      this.products[index] = product;
    }      
    return product;
  }

  delete(id: string): void {    
    const idNum: number = +id;
    const product: Product | undefined = this.products.find(x => x.id === idNum);
    if(product === undefined){
      return;
    }

    const index = this.products.indexOf(product, 0);
    if(index === -1){
      return;
    }

    this.products.splice(index, 1);
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

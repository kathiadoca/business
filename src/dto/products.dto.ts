export class ProductsDto {
  code: string;

  name: string;

  description: string;

  brand: string;

  quantity: number;

  price: number;

  categoriesId: number;

  companiesId: number;

  active: number;
  constructor(
    code: string,
    name: string,
    description: string,
    brand: string,
    quantity: number,
    price: number,
    active: number,
  ) {
    this.code = code;
    this.name = name;
    this.description = description;
    this.brand = brand;
    this.quantity = quantity;
    this.price = price;
    this.active = active;
  }
}

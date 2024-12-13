import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from "../components/product/product.component";
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from "../components/edit-popup/edit-popup.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule, EditPopupComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
    constructor(
      private productsService: ProductsService
    ){
      console.log('constructor');
    }

    products: Product[] = [];

    totalRecords: number = 0;
    rows: number = 5;

    displayEditPopup: boolean = false;
    displayAddPopup: boolean = false;

    toggleEditPopup(product: Product){
      this.selectedProduct = product;
      this.displayEditPopup = true;
    }

    toggleAddPopup(){
      this.displayAddPopup = true;
    }

    toggleDeleteProduct(product: Product){
      
    }

    selectedProduct: Product = {
      id:0,
      name: '',
      price: '',
      image: '',
      rating: 0,
    };

    onConfirmEdit(product: Product){
      if(!this.selectedProduct.id){
        return;
      }
      this.editProduct(product,this.selectedProduct.id);
      this.displayEditPopup = false;
    }

    onConfirmAdd(product: Product){
      this.addProduct(product);
      this.displayAddPopup = false;
    }

    onProductOutput(product: Product){
      console.log(product, 'Output');

    }

    onPageChange(event: any){
      this.fetchProducts(event.page, event.rows);
    }

    fetchProducts(page: number, perPage: number){
      this.productsService.getProducts('http://localhost:3000/clothes',{page,perPage})
      .subscribe({  
        next: (data: Products) => {
          this.products = data.items;
          this.totalRecords = data.total;
        },
        error: (error)=>{
          console.log(error);
        }
      });
    }

    editProduct(product: Product, id: number){
      this.productsService.editProducts('http://localhost:3000/clothes/${id}' ,product)
      .subscribe(
        {
          next: (data) =>{
            this.fetchProducts(0,this.rows);
            console.log(data);
          },
          error: (error) =>{
            console.log(error);
          }
        }
      );
    }

    deleteProduct(id: number){
      this.productsService.deleteProducts('http://localhost:3000/clothes/${id}' )
      .subscribe(
        {
          next: (data) =>{
            this.fetchProducts(0,this.rows);
            console.log(data);
          },
          error: (error) =>{
            console.log(error);
          }
        }
      );
    }

    addProduct(product: Product){
      this.productsService.addProducts('http://localhost:3000/clothes/${id}' ,product)
      .subscribe(
        {
          next: (data) =>{
            this.fetchProducts(0,this.rows);
            console.log(data);
          },
          error: (error) =>{
            console.log(error);
          }
        }
      );
    }

    ngOnInit(){
      this.fetchProducts(0, this.rows);
    }
}

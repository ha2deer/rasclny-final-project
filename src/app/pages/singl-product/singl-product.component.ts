import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FinalSingelProductService } from 'src/app/services/final-singel-product.service';
  @Component({
    selector: 'app-singl-product',
    templateUrl: './singl-product.component.html',
    styleUrls: ['./singl-product.component.css'],
  })
  export class SinglProductComponent implements OnInit {
    product: any | null = '';
  singleProductData: any;

  constructor(
    private FinalSingelProductService: FinalSingelProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Retrieve the product name from the route parameters
    this.route.paramMap.subscribe(params => {
      this.product = params.get('productName');

      if (this.product) {
        this.FinalSingelProductService.getData().subscribe(response => {
       
          

          // Find the specific product by name
          this.singleProductData = response.find((item: any) => item.product_name === this.product);
         console.log(this.singleProductData);

        });
      }
    });
  }

  };


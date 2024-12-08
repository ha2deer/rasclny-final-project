export interface products {
  product_id: number; // Unique identifier for the product (integer)
product_name: string,
 product_description: string,
 product_type?: string; // Add product_type as an optional property
 price_product: number,
 point_product: number,
 category_name: string,
 QuantityType: string,
 image_url: any
 }
 
 export interface CartItem {
   product: products;      // The product details
   product_type?: string; // Add product_type as an optional property\
   totalAmount: number;    // Quantity of this product in the cart
   subtotal?: number;      // Optional: totalAmount * product.price
 }
 
 export interface productData {
   products: products[];  
   name: string; 
   product_type?: string; // Add product_type as an optional property
   url: string;           
   category: string;      
   price?: string;        
   page?: number;         
   totalPages?: number;   
 }
 
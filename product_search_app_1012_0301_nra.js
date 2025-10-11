// 代码生成时间: 2025-10-12 03:01:23
// Import necessary modules
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ProductProvider } from '../providers/product/product';

// Define the ProductSearchPage component
@IonicPage()
@Component({
  selector: 'page-product-search',
  templateUrl: 'product-search.html',
})
export class ProductSearchPage {
  // Declare searchQuery and products properties
  searchQuery: string = '';
  products: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public productProvider: ProductProvider
  ) { }

  // IonViewDidLoad lifecycle event
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductSearchPage');
  }

  // Perform a search for products based on the searchQuery
  doSearch() {
    if (!this.searchQuery) {
      // Show a toast if the search query is empty
      let toast = this.toastCtrl.create({
        message: 'Please enter a search query.',
        duration: 3000
      });
      toast.present();
      return;
    }

    // Show a loading indicator
    let loading = this.loadingCtrl.create({
      content: 'Searching for products...'
    });
    loading.present();

    // Call the productProvider to fetch products and handle the response
    this.productProvider.searchProducts(this.searchQuery)
      .then((data: any) => {
        this.products = data;
        loading.dismiss();
      }).catch((error: any) => {
        console.error('Error searching for products:', error);
        let toast = this.toastCtrl.create({
          message: 'Failed to load products.',
          duration: 3000
        });
        toast.present();
        loading.dismiss();
      });
  }
}

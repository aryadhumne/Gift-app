import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  items: any[] = [
    {
      id: '1',
      name: 'Coloring Kit',
      price: 999,
      status: true,
      rating: 4.9,
      cover: 'assets/gifts/colours.webp',
      description: 'All in one Painting Box.'
    },
    {
      id: '2',
      name: 'Cadbury Celebration Box',
      price: 500,
      status: true,
      rating: 4.7,
      cover: 'assets/gifts/cadbury.jpg',
      description: 'Indulge in the rich and decadent flavors of our Chocolate , a perfect treat for any occasion.'
    },
    {
      id: '3',
      name: 'Mens Watch',
      price: 3000,
      status: true,
      rating: 4.9,
      cover: 'assets/gifts/menswtach.jpg',
      description: 'Always stay Elegant with Watch.'
    },
    {
      id: '4',
      name: 'Gucci Handbag',
      price: 1200,
      status: true,
      rating: 4.8,
      cover: 'assets/gifts/handbag.webp',
      description: 'Elevate your style with our chic and fashionable Designer Handbag, a statement piece for any ensemble.'
    },
    {
      id: '5',
      name: 'Coffee Mug',
      price: 350,
      status: true,
      rating: 4.5,
      cover: 'assets/gifts/cup.jpg',
      description: 'Start your day with a touch of personalization using our delightful Personalized Mug.'
    },
    {
      id: '6',
      name: 'Bella Vita Perfume',
      price: 600,
      status: true,
      rating: 4.9,
      cover: 'assets/gifts/perfume.jpg',
      description: 'Discover the essence of luxury with our Perfume Set, a captivating blend of enchanting fragrances.'
    },
    {
      id: '7',
      name: 'Rose Bouquet',
      price: 400,
      status: true,
      rating: 4.6,
      cover: 'assets/gifts/rose.webp',
      description: 'Store your precious jewels in style with our exquisitely designed Jewelry Box, a symbol of elegance.'
    },
    {
      id: '8',
      name: ' Dinner Set',
      price: 2000,
      status: true,
      rating: 4.9,
      cover: 'assets/gifts/dinnerset.jpg',
      description: 'Create magical moments with our Romantic Dinner Set, perfect for a candlelit evening with your loved one.'
    },
    {
      id: '9',
      name: 'Women Watch',
      price: 2500,
      status: true,
      rating: 4.6,
      cover: 'assets/gifts/womenwathc.webp',
      description: 'Stay Stylish but dont miss the watch.'
    },
    {
      id: '10',
      name: 'Make-Up Kit',
      price: 2000,
      status: true,
      rating: 4.7,
      cover: 'assets/gifts/makeupkit.webp',
      description: 'Beauty is a quality that evokes feelings of pleasure and admiration.'
    },
    {
      id: '11',
      name: 'Wallet',
      price: 1000,
      status: true,
      rating: 4.6,
      cover: 'assets/gifts/wallet.jpg',
      description: 'Adorn yourself with elegance and grace with our exquisite Diamond Jewelry collection.'
    },
    {
      id: '12',
      name: 'Dyson Hair-dryer Set',
      price: 5000,
      status: true,
      rating: 4.5,
      cover: 'assets/gifts/hairdryer.jpg',
      description: 'Dyson hair straighteners are unique due to their flexing plates (Corrale) and airflow technology (Airstrait), which allow for efficient styling with less heat damage.'
    },
    {
      id: '13',
      name: 'Earring set',
      price: 500,
      status: true,
      rating: 4.7,
      cover: 'assets/gifts/ear.webp',
      description: 'Sight – dazzling, glistening, bright, sparkle..'
    },
    {
      id: '14',
      name: 'Instax Fujifilm Mini 12 Instant Camera',
      price: 7000,
      status: true,
      rating: 4.5,
      cover: 'assets/gifts/cam.jpg',
      description: 'In-built selfie mirror & Close-up mode.'
    },
  ];

  coupons: any[] = [
    {
      id: "1",
      code: "SAVE10",
      discount: 10,
      isPercentage: true,
      description: "Get 10% off on your order",
      isActive: true,
      expiryDate: "2024-06-30",
      minimumOrderAmount: 50,
    },
    {
      id: "2",
      code: "FREESHIP",
      discount: 50,
      isPercentage: false,
      description: "Flat 50 bucks off on all orders",
      isActive: true,
      expiryDate: "2024-12-31",
    },
    {
      id: "3",
      code: "BUNDLEDEAL",
      discount: 20,
      isPercentage: true,
      description: "Buy one get one 50% off",
      isActive: false,
      expiryDate: "2024-09-15",
    },
    {
      id: "4",
      code: "GIFTSHOP",
      discount: 30,
      isPercentage: true,
      description: "Get 30% off on orders above 5000",
      isActive: true,
      expiryDate: "2024-12-31",
      minimumOrderAmount: 5000,
    },
  ];

  constructor() { }

  getCoupons() {
    return this.coupons.filter(coupon => coupon.isActive);
  }
}

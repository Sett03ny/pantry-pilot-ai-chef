
// This is a mock OCR service that simulates extracting text from images
// In a real app, you'd integrate with a real OCR service like Tesseract.js or a cloud API

interface OCRResult {
  items: {
    name: string;
    price?: number;
    quantity?: number;
  }[];
  totalAmount?: number;
  storeName?: string;
  date?: string;
}

export async function performOCR(imageData: string): Promise<OCRResult> {
  // This is a mock function that simulates OCR processing
  // In a real app, this would call an OCR API or use a library like Tesseract.js
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return mock data
  return {
    items: [
      { name: 'Milk', price: 3.99, quantity: 1 },
      { name: 'Eggs', price: 4.49, quantity: 1 },
      { name: 'Bread', price: 2.99, quantity: 1 },
      { name: 'Apples', price: 5.99, quantity: 1 },
      { name: 'Chicken Breast', price: 9.99, quantity: 1 },
      { name: 'Spinach', price: 3.49, quantity: 1 },
      { name: 'Pasta', price: 1.99, quantity: 1 },
      { name: 'Tomatoes', price: 2.99, quantity: 1 },
      { name: 'Onions', price: 1.49, quantity: 1 },
      { name: 'Potatoes', price: 3.99, quantity: 1 },
      { name: 'Cheese', price: 4.99, quantity: 1 },
      { name: 'Yogurt', price: 3.29, quantity: 1 },
    ],
    totalAmount: 49.68,
    storeName: 'Local Grocery Store',
    date: new Date().toLocaleDateString(),
  };
}

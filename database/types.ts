type ProductProperty = {
  key: string;
  label: string;
  type?: string;    
  value?: unknown;  
  relevant?: boolean;

  showInCard?: boolean;         
  iconName?: string;
};

export type Product = {
  title: string;
  category: string;
  image: string;
  brand: string;
  price: string;
  releaseYear?: number;

  properties: ProductProperty[];
};

export type Category = {
  title: string,
  category: string,
}







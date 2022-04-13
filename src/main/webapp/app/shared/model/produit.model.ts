import { IRestaurant } from '@/shared/model/restaurant.model';
import { IPanier } from '@/shared/model/panier.model';

export interface IProduit {
  id?: number;
  nom?: string | null;
  description?: string | null;
  restaurant?: IRestaurant | null;
  panier?: IPanier | null;
}

export class Produit implements IProduit {
  constructor(
    public id?: number,
    public nom?: string | null,
    public description?: string | null,
    public restaurant?: IRestaurant | null,
    public panier?: IPanier | null
  ) {}
}

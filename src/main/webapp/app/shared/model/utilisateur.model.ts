import { IPanier } from '@/shared/model/panier.model';
import { ICourse } from '@/shared/model/course.model';
import { IRestaurant } from '@/shared/model/restaurant.model';
import { ICooperative } from '@/shared/model/cooperative.model';

export interface IUtilisateur {
  id?: number;
  nom?: string;
  paniers?: IPanier[] | null;
  courses?: ICourse[] | null;
  restaurants?: IRestaurant[] | null;
  cooperatives?: ICooperative[] | null;
}

export class Utilisateur implements IUtilisateur {
  constructor(
    public id?: number,
    public nom?: string,
    public paniers?: IPanier[] | null,
    public courses?: ICourse[] | null,
    public restaurants?: IRestaurant[] | null,
    public cooperatives?: ICooperative[] | null
  ) {}
}

import { IUtilisateur } from '@/shared/model/utilisateur.model';
import { IProduit } from '@/shared/model/produit.model';

export interface IRestaurant {
  id?: number;
  nom?: string | null;
  adresse?: string;
  utilisateur?: IUtilisateur | null;
  produits?: IProduit[] | null;
}

export class Restaurant implements IRestaurant {
  constructor(
    public id?: number,
    public nom?: string | null,
    public adresse?: string,
    public utilisateur?: IUtilisateur | null,
    public produits?: IProduit[] | null
  ) {}
}

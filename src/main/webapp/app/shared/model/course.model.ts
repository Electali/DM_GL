import { IPanier } from '@/shared/model/panier.model';
import { IPaiement } from '@/shared/model/paiement.model';
import { IUtilisateur } from '@/shared/model/utilisateur.model';

export interface ICourse {
  id?: number;
  adresse?: string;
  panier?: IPanier | null;
  paiement?: IPaiement | null;
  utilisateur?: IUtilisateur | null;
}

export class Course implements ICourse {
  constructor(
    public id?: number,
    public adresse?: string,
    public panier?: IPanier | null,
    public paiement?: IPaiement | null,
    public utilisateur?: IUtilisateur | null
  ) {}
}

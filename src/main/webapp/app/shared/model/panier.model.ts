import { IProduit } from '@/shared/model/produit.model';
import { ICourse } from '@/shared/model/course.model';
import { IUtilisateur } from '@/shared/model/utilisateur.model';

export interface IPanier {
  id?: number;
  produits?: IProduit[] | null;
  course?: ICourse | null;
  utilisateur?: IUtilisateur | null;
}

export class Panier implements IPanier {
  constructor(
    public id?: number,
    public produits?: IProduit[] | null,
    public course?: ICourse | null,
    public utilisateur?: IUtilisateur | null
  ) {}
}

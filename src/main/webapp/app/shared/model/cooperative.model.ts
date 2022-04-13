import { IUtilisateur } from '@/shared/model/utilisateur.model';

export interface ICooperative {
  id?: number;
  nom?: string | null;
  utilisateurs?: IUtilisateur[] | null;
}

export class Cooperative implements ICooperative {
  constructor(public id?: number, public nom?: string | null, public utilisateurs?: IUtilisateur[] | null) {}
}

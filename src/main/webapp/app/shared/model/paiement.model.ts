import { ICourse } from '@/shared/model/course.model';

export interface IPaiement {
  id?: number;
  montant?: number;
  moyen?: string;
  course?: ICourse | null;
}

export class Paiement implements IPaiement {
  constructor(public id?: number, public montant?: number, public moyen?: string, public course?: ICourse | null) {}
}

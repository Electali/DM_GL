import { Component, Provide, Vue } from 'vue-property-decorator';

import UserService from '@/entities/user/user.service';
import UtilisateurService from './utilisateur/utilisateur.service';
import CourseService from './course/course.service';
import PanierService from './panier/panier.service';
import ProduitService from './produit/produit.service';
import RestaurantService from './restaurant/restaurant.service';
import PaiementService from './paiement/paiement.service';
import CooperativeService from './cooperative/cooperative.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

@Component
export default class Entities extends Vue {
  @Provide('userService') private userService = () => new UserService();
  @Provide('utilisateurService') private utilisateurService = () => new UtilisateurService();
  @Provide('courseService') private courseService = () => new CourseService();
  @Provide('panierService') private panierService = () => new PanierService();
  @Provide('produitService') private produitService = () => new ProduitService();
  @Provide('restaurantService') private restaurantService = () => new RestaurantService();
  @Provide('paiementService') private paiementService = () => new PaiementService();
  @Provide('cooperativeService') private cooperativeService = () => new CooperativeService();
  // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
}

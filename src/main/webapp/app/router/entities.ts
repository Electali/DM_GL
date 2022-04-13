import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
const Entities = () => import('@/entities/entities.vue');

// prettier-ignore
const Utilisateur = () => import('@/entities/utilisateur/utilisateur.vue');
// prettier-ignore
const UtilisateurUpdate = () => import('@/entities/utilisateur/utilisateur-update.vue');
// prettier-ignore
const UtilisateurDetails = () => import('@/entities/utilisateur/utilisateur-details.vue');
// prettier-ignore
const Course = () => import('@/entities/course/course.vue');
// prettier-ignore
const CourseUpdate = () => import('@/entities/course/course-update.vue');
// prettier-ignore
const CourseDetails = () => import('@/entities/course/course-details.vue');
// prettier-ignore
const Panier = () => import('@/entities/panier/panier.vue');
// prettier-ignore
const PanierUpdate = () => import('@/entities/panier/panier-update.vue');
// prettier-ignore
const PanierDetails = () => import('@/entities/panier/panier-details.vue');
// prettier-ignore
const Produit = () => import('@/entities/produit/produit.vue');
// prettier-ignore
const ProduitUpdate = () => import('@/entities/produit/produit-update.vue');
// prettier-ignore
const ProduitDetails = () => import('@/entities/produit/produit-details.vue');
// prettier-ignore
const Restaurant = () => import('@/entities/restaurant/restaurant.vue');
// prettier-ignore
const RestaurantUpdate = () => import('@/entities/restaurant/restaurant-update.vue');
// prettier-ignore
const RestaurantDetails = () => import('@/entities/restaurant/restaurant-details.vue');
// prettier-ignore
const Paiement = () => import('@/entities/paiement/paiement.vue');
// prettier-ignore
const PaiementUpdate = () => import('@/entities/paiement/paiement-update.vue');
// prettier-ignore
const PaiementDetails = () => import('@/entities/paiement/paiement-details.vue');
// prettier-ignore
const Cooperative = () => import('@/entities/cooperative/cooperative.vue');
// prettier-ignore
const CooperativeUpdate = () => import('@/entities/cooperative/cooperative-update.vue');
// prettier-ignore
const CooperativeDetails = () => import('@/entities/cooperative/cooperative-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default {
  path: '/',
  component: Entities,
  children: [
    {
      path: 'utilisateur',
      name: 'Utilisateur',
      component: Utilisateur,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'utilisateur/new',
      name: 'UtilisateurCreate',
      component: UtilisateurUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'utilisateur/:utilisateurId/edit',
      name: 'UtilisateurEdit',
      component: UtilisateurUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'utilisateur/:utilisateurId/view',
      name: 'UtilisateurView',
      component: UtilisateurDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'course',
      name: 'Course',
      component: Course,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'course/new',
      name: 'CourseCreate',
      component: CourseUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'course/:courseId/edit',
      name: 'CourseEdit',
      component: CourseUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'course/:courseId/view',
      name: 'CourseView',
      component: CourseDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'panier',
      name: 'Panier',
      component: Panier,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'panier/new',
      name: 'PanierCreate',
      component: PanierUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'panier/:panierId/edit',
      name: 'PanierEdit',
      component: PanierUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'panier/:panierId/view',
      name: 'PanierView',
      component: PanierDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'produit',
      name: 'Produit',
      component: Produit,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'produit/new',
      name: 'ProduitCreate',
      component: ProduitUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'produit/:produitId/edit',
      name: 'ProduitEdit',
      component: ProduitUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'produit/:produitId/view',
      name: 'ProduitView',
      component: ProduitDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'restaurant',
      name: 'Restaurant',
      component: Restaurant,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'restaurant/new',
      name: 'RestaurantCreate',
      component: RestaurantUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'restaurant/:restaurantId/edit',
      name: 'RestaurantEdit',
      component: RestaurantUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'restaurant/:restaurantId/view',
      name: 'RestaurantView',
      component: RestaurantDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'paiement',
      name: 'Paiement',
      component: Paiement,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'paiement/new',
      name: 'PaiementCreate',
      component: PaiementUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'paiement/:paiementId/edit',
      name: 'PaiementEdit',
      component: PaiementUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'paiement/:paiementId/view',
      name: 'PaiementView',
      component: PaiementDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cooperative',
      name: 'Cooperative',
      component: Cooperative,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cooperative/new',
      name: 'CooperativeCreate',
      component: CooperativeUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cooperative/:cooperativeId/edit',
      name: 'CooperativeEdit',
      component: CooperativeUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cooperative/:cooperativeId/view',
      name: 'CooperativeView',
      component: CooperativeDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};

import { Component, Vue, Inject } from 'vue-property-decorator';

import { required, minLength } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import PanierService from '@/entities/panier/panier.service';
import { IPanier } from '@/shared/model/panier.model';

import CourseService from '@/entities/course/course.service';
import { ICourse } from '@/shared/model/course.model';

import RestaurantService from '@/entities/restaurant/restaurant.service';
import { IRestaurant } from '@/shared/model/restaurant.model';

import CooperativeService from '@/entities/cooperative/cooperative.service';
import { ICooperative } from '@/shared/model/cooperative.model';

import { IUtilisateur, Utilisateur } from '@/shared/model/utilisateur.model';
import UtilisateurService from './utilisateur.service';

const validations: any = {
  utilisateur: {
    nom: {
      required,
      minLength: minLength(3),
    },
  },
};

@Component({
  validations,
})
export default class UtilisateurUpdate extends Vue {
  @Inject('utilisateurService') private utilisateurService: () => UtilisateurService;
  @Inject('alertService') private alertService: () => AlertService;

  public utilisateur: IUtilisateur = new Utilisateur();

  @Inject('panierService') private panierService: () => PanierService;

  public paniers: IPanier[] = [];

  @Inject('courseService') private courseService: () => CourseService;

  public courses: ICourse[] = [];

  @Inject('restaurantService') private restaurantService: () => RestaurantService;

  public restaurants: IRestaurant[] = [];

  @Inject('cooperativeService') private cooperativeService: () => CooperativeService;

  public cooperatives: ICooperative[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.utilisateurId) {
        vm.retrieveUtilisateur(to.params.utilisateurId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
    this.utilisateur.cooperatives = [];
  }

  public save(): void {
    this.isSaving = true;
    if (this.utilisateur.id) {
      this.utilisateurService()
        .update(this.utilisateur)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopcycleApp.utilisateur.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.utilisateurService()
        .create(this.utilisateur)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopcycleApp.utilisateur.created', { param: param.id });
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public retrieveUtilisateur(utilisateurId): void {
    this.utilisateurService()
      .find(utilisateurId)
      .then(res => {
        this.utilisateur = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.panierService()
      .retrieve()
      .then(res => {
        this.paniers = res.data;
      });
    this.courseService()
      .retrieve()
      .then(res => {
        this.courses = res.data;
      });
    this.restaurantService()
      .retrieve()
      .then(res => {
        this.restaurants = res.data;
      });
    this.cooperativeService()
      .retrieve()
      .then(res => {
        this.cooperatives = res.data;
      });
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      return selectedVals.find(value => option.id === value.id) ?? option;
    }
    return option;
  }
}

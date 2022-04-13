import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import PanierService from '@/entities/panier/panier.service';
import { IPanier } from '@/shared/model/panier.model';

import PaiementService from '@/entities/paiement/paiement.service';
import { IPaiement } from '@/shared/model/paiement.model';

import UtilisateurService from '@/entities/utilisateur/utilisateur.service';
import { IUtilisateur } from '@/shared/model/utilisateur.model';

import { ICourse, Course } from '@/shared/model/course.model';
import CourseService from './course.service';

const validations: any = {
  course: {
    adresse: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class CourseUpdate extends Vue {
  @Inject('courseService') private courseService: () => CourseService;
  @Inject('alertService') private alertService: () => AlertService;

  public course: ICourse = new Course();

  @Inject('panierService') private panierService: () => PanierService;

  public paniers: IPanier[] = [];

  @Inject('paiementService') private paiementService: () => PaiementService;

  public paiements: IPaiement[] = [];

  @Inject('utilisateurService') private utilisateurService: () => UtilisateurService;

  public utilisateurs: IUtilisateur[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.courseId) {
        vm.retrieveCourse(to.params.courseId);
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
  }

  public save(): void {
    this.isSaving = true;
    if (this.course.id) {
      this.courseService()
        .update(this.course)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopcycleApp.course.updated', { param: param.id });
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
      this.courseService()
        .create(this.course)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopcycleApp.course.created', { param: param.id });
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

  public retrieveCourse(courseId): void {
    this.courseService()
      .find(courseId)
      .then(res => {
        this.course = res;
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
    this.paiementService()
      .retrieve()
      .then(res => {
        this.paiements = res.data;
      });
    this.utilisateurService()
      .retrieve()
      .then(res => {
        this.utilisateurs = res.data;
      });
  }
}

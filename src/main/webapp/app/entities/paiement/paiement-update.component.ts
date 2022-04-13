import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minValue } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import CourseService from '@/entities/course/course.service';
import { ICourse } from '@/shared/model/course.model';

import { IPaiement, Paiement } from '@/shared/model/paiement.model';
import PaiementService from './paiement.service';

const validations: any = {
  paiement: {
    montant: {
      required,
      numeric,
      min: minValue(0),
    },
    moyen: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class PaiementUpdate extends Vue {
  @Inject('paiementService') private paiementService: () => PaiementService;
  @Inject('alertService') private alertService: () => AlertService;

  public paiement: IPaiement = new Paiement();

  @Inject('courseService') private courseService: () => CourseService;

  public courses: ICourse[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.paiementId) {
        vm.retrievePaiement(to.params.paiementId);
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
    if (this.paiement.id) {
      this.paiementService()
        .update(this.paiement)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopcycleApp.paiement.updated', { param: param.id });
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
      this.paiementService()
        .create(this.paiement)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('coopcycleApp.paiement.created', { param: param.id });
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

  public retrievePaiement(paiementId): void {
    this.paiementService()
      .find(paiementId)
      .then(res => {
        this.paiement = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.courseService()
      .retrieve()
      .then(res => {
        this.courses = res.data;
      });
  }
}

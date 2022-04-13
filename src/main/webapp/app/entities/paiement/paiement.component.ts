import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IPaiement } from '@/shared/model/paiement.model';

import PaiementService from './paiement.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Paiement extends Vue {
  @Inject('paiementService') private paiementService: () => PaiementService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public paiements: IPaiement[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllPaiements();
  }

  public clear(): void {
    this.retrieveAllPaiements();
  }

  public retrieveAllPaiements(): void {
    this.isFetching = true;
    this.paiementService()
      .retrieve()
      .then(
        res => {
          this.paiements = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: IPaiement): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removePaiement(): void {
    this.paiementService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('coopcycleApp.paiement.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllPaiements();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}

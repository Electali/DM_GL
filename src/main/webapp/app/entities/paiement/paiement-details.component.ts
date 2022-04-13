import { Component, Vue, Inject } from 'vue-property-decorator';

import { IPaiement } from '@/shared/model/paiement.model';
import PaiementService from './paiement.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class PaiementDetails extends Vue {
  @Inject('paiementService') private paiementService: () => PaiementService;
  @Inject('alertService') private alertService: () => AlertService;

  public paiement: IPaiement = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.paiementId) {
        vm.retrievePaiement(to.params.paiementId);
      }
    });
  }

  public retrievePaiement(paiementId) {
    this.paiementService()
      .find(paiementId)
      .then(res => {
        this.paiement = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}

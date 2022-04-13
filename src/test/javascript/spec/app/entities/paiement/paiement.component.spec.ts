/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import PaiementComponent from '@/entities/paiement/paiement.vue';
import PaiementClass from '@/entities/paiement/paiement.component';
import PaiementService from '@/entities/paiement/paiement.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(ToastPlugin);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('Paiement Management Component', () => {
    let wrapper: Wrapper<PaiementClass>;
    let comp: PaiementClass;
    let paiementServiceStub: SinonStubbedInstance<PaiementService>;

    beforeEach(() => {
      paiementServiceStub = sinon.createStubInstance<PaiementService>(PaiementService);
      paiementServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<PaiementClass>(PaiementComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          paiementService: () => paiementServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      paiementServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllPaiements();
      await comp.$nextTick();

      // THEN
      expect(paiementServiceStub.retrieve.called).toBeTruthy();
      expect(comp.paiements[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      paiementServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(paiementServiceStub.retrieve.callCount).toEqual(1);

      comp.removePaiement();
      await comp.$nextTick();

      // THEN
      expect(paiementServiceStub.delete.called).toBeTruthy();
      expect(paiementServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});

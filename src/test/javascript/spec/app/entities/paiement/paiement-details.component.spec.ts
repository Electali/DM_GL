/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import PaiementDetailComponent from '@/entities/paiement/paiement-details.vue';
import PaiementClass from '@/entities/paiement/paiement-details.component';
import PaiementService from '@/entities/paiement/paiement.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Paiement Management Detail Component', () => {
    let wrapper: Wrapper<PaiementClass>;
    let comp: PaiementClass;
    let paiementServiceStub: SinonStubbedInstance<PaiementService>;

    beforeEach(() => {
      paiementServiceStub = sinon.createStubInstance<PaiementService>(PaiementService);

      wrapper = shallowMount<PaiementClass>(PaiementDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { paiementService: () => paiementServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundPaiement = { id: 123 };
        paiementServiceStub.find.resolves(foundPaiement);

        // WHEN
        comp.retrievePaiement(123);
        await comp.$nextTick();

        // THEN
        expect(comp.paiement).toBe(foundPaiement);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundPaiement = { id: 123 };
        paiementServiceStub.find.resolves(foundPaiement);

        // WHEN
        comp.beforeRouteEnter({ params: { paiementId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.paiement).toBe(foundPaiement);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});

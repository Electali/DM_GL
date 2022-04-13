/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import PaiementUpdateComponent from '@/entities/paiement/paiement-update.vue';
import PaiementClass from '@/entities/paiement/paiement-update.component';
import PaiementService from '@/entities/paiement/paiement.service';

import CourseService from '@/entities/course/course.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.use(ToastPlugin);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('Paiement Management Update Component', () => {
    let wrapper: Wrapper<PaiementClass>;
    let comp: PaiementClass;
    let paiementServiceStub: SinonStubbedInstance<PaiementService>;

    beforeEach(() => {
      paiementServiceStub = sinon.createStubInstance<PaiementService>(PaiementService);

      wrapper = shallowMount<PaiementClass>(PaiementUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          paiementService: () => paiementServiceStub,
          alertService: () => new AlertService(),

          courseService: () =>
            sinon.createStubInstance<CourseService>(CourseService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.paiement = entity;
        paiementServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(paiementServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.paiement = entity;
        paiementServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(paiementServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundPaiement = { id: 123 };
        paiementServiceStub.find.resolves(foundPaiement);
        paiementServiceStub.retrieve.resolves([foundPaiement]);

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

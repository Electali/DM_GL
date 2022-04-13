/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import CourseUpdateComponent from '@/entities/course/course-update.vue';
import CourseClass from '@/entities/course/course-update.component';
import CourseService from '@/entities/course/course.service';

import PanierService from '@/entities/panier/panier.service';

import PaiementService from '@/entities/paiement/paiement.service';

import UtilisateurService from '@/entities/utilisateur/utilisateur.service';
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
  describe('Course Management Update Component', () => {
    let wrapper: Wrapper<CourseClass>;
    let comp: CourseClass;
    let courseServiceStub: SinonStubbedInstance<CourseService>;

    beforeEach(() => {
      courseServiceStub = sinon.createStubInstance<CourseService>(CourseService);

      wrapper = shallowMount<CourseClass>(CourseUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          courseService: () => courseServiceStub,
          alertService: () => new AlertService(),

          panierService: () =>
            sinon.createStubInstance<PanierService>(PanierService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          paiementService: () =>
            sinon.createStubInstance<PaiementService>(PaiementService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          utilisateurService: () =>
            sinon.createStubInstance<UtilisateurService>(UtilisateurService, {
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
        comp.course = entity;
        courseServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(courseServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.course = entity;
        courseServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(courseServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCourse = { id: 123 };
        courseServiceStub.find.resolves(foundCourse);
        courseServiceStub.retrieve.resolves([foundCourse]);

        // WHEN
        comp.beforeRouteEnter({ params: { courseId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.course).toBe(foundCourse);
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

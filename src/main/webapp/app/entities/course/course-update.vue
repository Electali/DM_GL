<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="coopcycleApp.course.home.createOrEditLabel"
          data-cy="CourseCreateUpdateHeading"
          v-text="$t('coopcycleApp.course.home.createOrEditLabel')"
        >
          Create or edit a Course
        </h2>
        <div>
          <div class="form-group" v-if="course.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="course.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.course.adresse')" for="course-adresse">Adresse</label>
            <input
              type="text"
              class="form-control"
              name="adresse"
              id="course-adresse"
              data-cy="adresse"
              :class="{ valid: !$v.course.adresse.$invalid, invalid: $v.course.adresse.$invalid }"
              v-model="$v.course.adresse.$model"
              required
            />
            <div v-if="$v.course.adresse.$anyDirty && $v.course.adresse.$invalid">
              <small class="form-text text-danger" v-if="!$v.course.adresse.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.course.panier')" for="course-panier">Panier</label>
            <select class="form-control" id="course-panier" data-cy="panier" name="panier" v-model="course.panier">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="course.panier && panierOption.id === course.panier.id ? course.panier : panierOption"
                v-for="panierOption in paniers"
                :key="panierOption.id"
              >
                {{ panierOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.course.paiement')" for="course-paiement">Paiement</label>
            <select class="form-control" id="course-paiement" data-cy="paiement" name="paiement" v-model="course.paiement">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="course.paiement && paiementOption.id === course.paiement.id ? course.paiement : paiementOption"
                v-for="paiementOption in paiements"
                :key="paiementOption.id"
              >
                {{ paiementOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.course.utilisateur')" for="course-utilisateur">Utilisateur</label>
            <select class="form-control" id="course-utilisateur" data-cy="utilisateur" name="utilisateur" v-model="course.utilisateur">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="course.utilisateur && utilisateurOption.id === course.utilisateur.id ? course.utilisateur : utilisateurOption"
                v-for="utilisateurOption in utilisateurs"
                :key="utilisateurOption.id"
              >
                {{ utilisateurOption.id }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.course.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./course-update.component.ts"></script>

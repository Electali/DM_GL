<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="coopcycleApp.utilisateur.home.createOrEditLabel"
          data-cy="UtilisateurCreateUpdateHeading"
          v-text="$t('coopcycleApp.utilisateur.home.createOrEditLabel')"
        >
          Create or edit a Utilisateur
        </h2>
        <div>
          <div class="form-group" v-if="utilisateur.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="utilisateur.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.utilisateur.nom')" for="utilisateur-nom">Nom</label>
            <input
              type="text"
              class="form-control"
              name="nom"
              id="utilisateur-nom"
              data-cy="nom"
              :class="{ valid: !$v.utilisateur.nom.$invalid, invalid: $v.utilisateur.nom.$invalid }"
              v-model="$v.utilisateur.nom.$model"
              required
            />
            <div v-if="$v.utilisateur.nom.$anyDirty && $v.utilisateur.nom.$invalid">
              <small class="form-text text-danger" v-if="!$v.utilisateur.nom.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.utilisateur.nom.minLength"
                v-text="$t('entity.validation.minlength', { min: 3 })"
              >
                This field is required to be at least 3 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label v-text="$t('coopcycleApp.utilisateur.cooperative')" for="utilisateur-cooperative">Cooperative</label>
            <select
              class="form-control"
              id="utilisateur-cooperatives"
              data-cy="cooperative"
              multiple
              name="cooperative"
              v-if="utilisateur.cooperatives !== undefined"
              v-model="utilisateur.cooperatives"
            >
              <option
                v-bind:value="getSelected(utilisateur.cooperatives, cooperativeOption)"
                v-for="cooperativeOption in cooperatives"
                :key="cooperativeOption.id"
              >
                {{ cooperativeOption.id }}
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
            :disabled="$v.utilisateur.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./utilisateur-update.component.ts"></script>

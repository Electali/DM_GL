<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="coopcycleApp.panier.home.createOrEditLabel"
          data-cy="PanierCreateUpdateHeading"
          v-text="$t('coopcycleApp.panier.home.createOrEditLabel')"
        >
          Create or edit a Panier
        </h2>
        <div>
          <div class="form-group" v-if="panier.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="panier.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.panier.utilisateur')" for="panier-utilisateur">Utilisateur</label>
            <select class="form-control" id="panier-utilisateur" data-cy="utilisateur" name="utilisateur" v-model="panier.utilisateur">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="panier.utilisateur && utilisateurOption.id === panier.utilisateur.id ? panier.utilisateur : utilisateurOption"
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
            :disabled="$v.panier.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./panier-update.component.ts"></script>

<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="coopcycleApp.paiement.home.createOrEditLabel"
          data-cy="PaiementCreateUpdateHeading"
          v-text="$t('coopcycleApp.paiement.home.createOrEditLabel')"
        >
          Create or edit a Paiement
        </h2>
        <div>
          <div class="form-group" v-if="paiement.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="paiement.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.paiement.montant')" for="paiement-montant">Montant</label>
            <input
              type="number"
              class="form-control"
              name="montant"
              id="paiement-montant"
              data-cy="montant"
              :class="{ valid: !$v.paiement.montant.$invalid, invalid: $v.paiement.montant.$invalid }"
              v-model.number="$v.paiement.montant.$model"
              required
            />
            <div v-if="$v.paiement.montant.$anyDirty && $v.paiement.montant.$invalid">
              <small class="form-text text-danger" v-if="!$v.paiement.montant.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small class="form-text text-danger" v-if="!$v.paiement.montant.min" v-text="$t('entity.validation.min', { min: 0 })">
                This field should be at least 0.
              </small>
              <small class="form-text text-danger" v-if="!$v.paiement.montant.numeric" v-text="$t('entity.validation.number')">
                This field should be a number.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.paiement.moyen')" for="paiement-moyen">Moyen</label>
            <input
              type="text"
              class="form-control"
              name="moyen"
              id="paiement-moyen"
              data-cy="moyen"
              :class="{ valid: !$v.paiement.moyen.$invalid, invalid: $v.paiement.moyen.$invalid }"
              v-model="$v.paiement.moyen.$model"
              required
            />
            <div v-if="$v.paiement.moyen.$anyDirty && $v.paiement.moyen.$invalid">
              <small class="form-text text-danger" v-if="!$v.paiement.moyen.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
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
            :disabled="$v.paiement.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./paiement-update.component.ts"></script>

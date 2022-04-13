<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="coopcycleApp.produit.home.createOrEditLabel"
          data-cy="ProduitCreateUpdateHeading"
          v-text="$t('coopcycleApp.produit.home.createOrEditLabel')"
        >
          Create or edit a Produit
        </h2>
        <div>
          <div class="form-group" v-if="produit.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="produit.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.produit.nom')" for="produit-nom">Nom</label>
            <input
              type="text"
              class="form-control"
              name="nom"
              id="produit-nom"
              data-cy="nom"
              :class="{ valid: !$v.produit.nom.$invalid, invalid: $v.produit.nom.$invalid }"
              v-model="$v.produit.nom.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.produit.description')" for="produit-description">Description</label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="produit-description"
              data-cy="description"
              :class="{ valid: !$v.produit.description.$invalid, invalid: $v.produit.description.$invalid }"
              v-model="$v.produit.description.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.produit.restaurant')" for="produit-restaurant">Restaurant</label>
            <select class="form-control" id="produit-restaurant" data-cy="restaurant" name="restaurant" v-model="produit.restaurant">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="produit.restaurant && restaurantOption.id === produit.restaurant.id ? produit.restaurant : restaurantOption"
                v-for="restaurantOption in restaurants"
                :key="restaurantOption.id"
              >
                {{ restaurantOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('coopcycleApp.produit.panier')" for="produit-panier">Panier</label>
            <select class="form-control" id="produit-panier" data-cy="panier" name="panier" v-model="produit.panier">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="produit.panier && panierOption.id === produit.panier.id ? produit.panier : panierOption"
                v-for="panierOption in paniers"
                :key="panierOption.id"
              >
                {{ panierOption.id }}
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
            :disabled="$v.produit.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./produit-update.component.ts"></script>

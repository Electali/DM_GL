<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="produit">
        <h2 class="jh-entity-heading" data-cy="produitDetailsHeading">
          <span v-text="$t('coopcycleApp.produit.detail.title')">Produit</span> {{ produit.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('coopcycleApp.produit.nom')">Nom</span>
          </dt>
          <dd>
            <span>{{ produit.nom }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopcycleApp.produit.description')">Description</span>
          </dt>
          <dd>
            <span>{{ produit.description }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopcycleApp.produit.restaurant')">Restaurant</span>
          </dt>
          <dd>
            <div v-if="produit.restaurant">
              <router-link :to="{ name: 'RestaurantView', params: { restaurantId: produit.restaurant.id } }">{{
                produit.restaurant.id
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('coopcycleApp.produit.panier')">Panier</span>
          </dt>
          <dd>
            <div v-if="produit.panier">
              <router-link :to="{ name: 'PanierView', params: { panierId: produit.panier.id } }">{{ produit.panier.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="produit.id" :to="{ name: 'ProduitEdit', params: { produitId: produit.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./produit-details.component.ts"></script>

<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="paiement">
        <h2 class="jh-entity-heading" data-cy="paiementDetailsHeading">
          <span v-text="$t('coopcycleApp.paiement.detail.title')">Paiement</span> {{ paiement.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('coopcycleApp.paiement.montant')">Montant</span>
          </dt>
          <dd>
            <span>{{ paiement.montant }}</span>
          </dd>
          <dt>
            <span v-text="$t('coopcycleApp.paiement.moyen')">Moyen</span>
          </dt>
          <dd>
            <span>{{ paiement.moyen }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="paiement.id" :to="{ name: 'PaiementEdit', params: { paiementId: paiement.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./paiement-details.component.ts"></script>

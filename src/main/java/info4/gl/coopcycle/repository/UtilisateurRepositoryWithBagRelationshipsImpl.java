package info4.gl.coopcycle.repository;

import info4.gl.coopcycle.domain.Utilisateur;
import java.util.List;
import java.util.Optional;
import javax.persistence.EntityManager;
import org.hibernate.annotations.QueryHints;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class UtilisateurRepositoryWithBagRelationshipsImpl implements UtilisateurRepositoryWithBagRelationships {

    @Autowired
    private EntityManager entityManager;

    @Override
    public Optional<Utilisateur> fetchBagRelationships(Optional<Utilisateur> utilisateur) {
        return utilisateur.map(this::fetchCooperatives);
    }

    @Override
    public Page<Utilisateur> fetchBagRelationships(Page<Utilisateur> utilisateurs) {
        return new PageImpl<>(
            fetchBagRelationships(utilisateurs.getContent()),
            utilisateurs.getPageable(),
            utilisateurs.getTotalElements()
        );
    }

    @Override
    public List<Utilisateur> fetchBagRelationships(List<Utilisateur> utilisateurs) {
        return Optional.of(utilisateurs).map(this::fetchCooperatives).get();
    }

    Utilisateur fetchCooperatives(Utilisateur result) {
        return entityManager
            .createQuery(
                "select utilisateur from Utilisateur utilisateur left join fetch utilisateur.cooperatives where utilisateur is :utilisateur",
                Utilisateur.class
            )
            .setParameter("utilisateur", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Utilisateur> fetchCooperatives(List<Utilisateur> utilisateurs) {
        return entityManager
            .createQuery(
                "select distinct utilisateur from Utilisateur utilisateur left join fetch utilisateur.cooperatives where utilisateur in :utilisateurs",
                Utilisateur.class
            )
            .setParameter("utilisateurs", utilisateurs)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }
}

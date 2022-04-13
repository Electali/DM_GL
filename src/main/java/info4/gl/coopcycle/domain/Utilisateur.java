package info4.gl.coopcycle.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Utilisateur.
 */
@Entity
@Table(name = "utilisateur")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Utilisateur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "nom", nullable = false)
    private String nom;

    @OneToMany(mappedBy = "utilisateur")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "produits", "course", "utilisateur" }, allowSetters = true)
    private Set<Panier> paniers = new HashSet<>();

    @OneToMany(mappedBy = "utilisateur")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "panier", "paiement", "utilisateur" }, allowSetters = true)
    private Set<Course> courses = new HashSet<>();

    @OneToMany(mappedBy = "utilisateur")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "utilisateur", "produits" }, allowSetters = true)
    private Set<Restaurant> restaurants = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_utilisateur__cooperative",
        joinColumns = @JoinColumn(name = "utilisateur_id"),
        inverseJoinColumns = @JoinColumn(name = "cooperative_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "utilisateurs" }, allowSetters = true)
    private Set<Cooperative> cooperatives = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Utilisateur id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return this.nom;
    }

    public Utilisateur nom(String nom) {
        this.setNom(nom);
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Set<Panier> getPaniers() {
        return this.paniers;
    }

    public void setPaniers(Set<Panier> paniers) {
        if (this.paniers != null) {
            this.paniers.forEach(i -> i.setUtilisateur(null));
        }
        if (paniers != null) {
            paniers.forEach(i -> i.setUtilisateur(this));
        }
        this.paniers = paniers;
    }

    public Utilisateur paniers(Set<Panier> paniers) {
        this.setPaniers(paniers);
        return this;
    }

    public Utilisateur addPanier(Panier panier) {
        this.paniers.add(panier);
        panier.setUtilisateur(this);
        return this;
    }

    public Utilisateur removePanier(Panier panier) {
        this.paniers.remove(panier);
        panier.setUtilisateur(null);
        return this;
    }

    public Set<Course> getCourses() {
        return this.courses;
    }

    public void setCourses(Set<Course> courses) {
        if (this.courses != null) {
            this.courses.forEach(i -> i.setUtilisateur(null));
        }
        if (courses != null) {
            courses.forEach(i -> i.setUtilisateur(this));
        }
        this.courses = courses;
    }

    public Utilisateur courses(Set<Course> courses) {
        this.setCourses(courses);
        return this;
    }

    public Utilisateur addCourse(Course course) {
        this.courses.add(course);
        course.setUtilisateur(this);
        return this;
    }

    public Utilisateur removeCourse(Course course) {
        this.courses.remove(course);
        course.setUtilisateur(null);
        return this;
    }

    public Set<Restaurant> getRestaurants() {
        return this.restaurants;
    }

    public void setRestaurants(Set<Restaurant> restaurants) {
        if (this.restaurants != null) {
            this.restaurants.forEach(i -> i.setUtilisateur(null));
        }
        if (restaurants != null) {
            restaurants.forEach(i -> i.setUtilisateur(this));
        }
        this.restaurants = restaurants;
    }

    public Utilisateur restaurants(Set<Restaurant> restaurants) {
        this.setRestaurants(restaurants);
        return this;
    }

    public Utilisateur addRestaurant(Restaurant restaurant) {
        this.restaurants.add(restaurant);
        restaurant.setUtilisateur(this);
        return this;
    }

    public Utilisateur removeRestaurant(Restaurant restaurant) {
        this.restaurants.remove(restaurant);
        restaurant.setUtilisateur(null);
        return this;
    }

    public Set<Cooperative> getCooperatives() {
        return this.cooperatives;
    }

    public void setCooperatives(Set<Cooperative> cooperatives) {
        this.cooperatives = cooperatives;
    }

    public Utilisateur cooperatives(Set<Cooperative> cooperatives) {
        this.setCooperatives(cooperatives);
        return this;
    }

    public Utilisateur addCooperative(Cooperative cooperative) {
        this.cooperatives.add(cooperative);
        cooperative.getUtilisateurs().add(this);
        return this;
    }

    public Utilisateur removeCooperative(Cooperative cooperative) {
        this.cooperatives.remove(cooperative);
        cooperative.getUtilisateurs().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Utilisateur)) {
            return false;
        }
        return id != null && id.equals(((Utilisateur) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Utilisateur{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            "}";
    }
}

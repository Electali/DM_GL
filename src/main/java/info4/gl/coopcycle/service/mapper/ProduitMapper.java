package info4.gl.coopcycle.service.mapper;

import info4.gl.coopcycle.domain.Produit;
import info4.gl.coopcycle.service.dto.ProduitDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Produit} and its DTO {@link ProduitDTO}.
 */
@Mapper(componentModel = "spring", uses = { RestaurantMapper.class, PanierMapper.class })
public interface ProduitMapper extends EntityMapper<ProduitDTO, Produit> {
    @Mapping(target = "restaurant", source = "restaurant", qualifiedByName = "id")
    @Mapping(target = "panier", source = "panier", qualifiedByName = "id")
    ProduitDTO toDto(Produit s);
}

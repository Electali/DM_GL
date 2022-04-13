package info4.gl.coopcycle.service.mapper;

import info4.gl.coopcycle.domain.Restaurant;
import info4.gl.coopcycle.service.dto.RestaurantDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Restaurant} and its DTO {@link RestaurantDTO}.
 */
@Mapper(componentModel = "spring", uses = { UtilisateurMapper.class })
public interface RestaurantMapper extends EntityMapper<RestaurantDTO, Restaurant> {
    @Mapping(target = "utilisateur", source = "utilisateur", qualifiedByName = "id")
    RestaurantDTO toDto(Restaurant s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    RestaurantDTO toDtoId(Restaurant restaurant);
}

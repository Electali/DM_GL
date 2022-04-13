package info4.gl.coopcycle.service.mapper;

import info4.gl.coopcycle.domain.Paiement;
import info4.gl.coopcycle.service.dto.PaiementDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Paiement} and its DTO {@link PaiementDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PaiementMapper extends EntityMapper<PaiementDTO, Paiement> {
    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    PaiementDTO toDtoId(Paiement paiement);
}

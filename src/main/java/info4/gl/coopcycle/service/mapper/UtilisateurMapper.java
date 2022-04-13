package info4.gl.coopcycle.service.mapper;

import info4.gl.coopcycle.domain.Utilisateur;
import info4.gl.coopcycle.service.dto.UtilisateurDTO;
import java.util.Set;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Utilisateur} and its DTO {@link UtilisateurDTO}.
 */
@Mapper(componentModel = "spring", uses = { CooperativeMapper.class })
public interface UtilisateurMapper extends EntityMapper<UtilisateurDTO, Utilisateur> {
    @Mapping(target = "cooperatives", source = "cooperatives", qualifiedByName = "idSet")
    UtilisateurDTO toDto(Utilisateur s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UtilisateurDTO toDtoId(Utilisateur utilisateur);

    @Mapping(target = "removeCooperative", ignore = true)
    Utilisateur toEntity(UtilisateurDTO utilisateurDTO);
}

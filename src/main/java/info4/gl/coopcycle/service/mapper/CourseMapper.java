package info4.gl.coopcycle.service.mapper;

import info4.gl.coopcycle.domain.Course;
import info4.gl.coopcycle.service.dto.CourseDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Course} and its DTO {@link CourseDTO}.
 */
@Mapper(componentModel = "spring", uses = { PanierMapper.class, PaiementMapper.class, UtilisateurMapper.class })
public interface CourseMapper extends EntityMapper<CourseDTO, Course> {
    @Mapping(target = "panier", source = "panier", qualifiedByName = "id")
    @Mapping(target = "paiement", source = "paiement", qualifiedByName = "id")
    @Mapping(target = "utilisateur", source = "utilisateur", qualifiedByName = "id")
    CourseDTO toDto(Course s);
}

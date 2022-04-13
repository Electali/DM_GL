package info4.gl.coopcycle.service.mapper;

import info4.gl.coopcycle.domain.Cooperative;
import info4.gl.coopcycle.service.dto.CooperativeDTO;
import java.util.Set;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Cooperative} and its DTO {@link CooperativeDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CooperativeMapper extends EntityMapper<CooperativeDTO, Cooperative> {
    @Named("idSet")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    Set<CooperativeDTO> toDtoIdSet(Set<Cooperative> cooperative);
}

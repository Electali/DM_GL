package info4.gl.coopcycle.service.impl;

import info4.gl.coopcycle.domain.Panier;
import info4.gl.coopcycle.repository.PanierRepository;
import info4.gl.coopcycle.service.PanierService;
import info4.gl.coopcycle.service.dto.PanierDTO;
import info4.gl.coopcycle.service.mapper.PanierMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Panier}.
 */
@Service
@Transactional
public class PanierServiceImpl implements PanierService {

    private final Logger log = LoggerFactory.getLogger(PanierServiceImpl.class);

    private final PanierRepository panierRepository;

    private final PanierMapper panierMapper;

    public PanierServiceImpl(PanierRepository panierRepository, PanierMapper panierMapper) {
        this.panierRepository = panierRepository;
        this.panierMapper = panierMapper;
    }

    @Override
    public PanierDTO save(PanierDTO panierDTO) {
        log.debug("Request to save Panier : {}", panierDTO);
        Panier panier = panierMapper.toEntity(panierDTO);
        panier = panierRepository.save(panier);
        return panierMapper.toDto(panier);
    }

    @Override
    public Optional<PanierDTO> partialUpdate(PanierDTO panierDTO) {
        log.debug("Request to partially update Panier : {}", panierDTO);

        return panierRepository
            .findById(panierDTO.getId())
            .map(existingPanier -> {
                panierMapper.partialUpdate(existingPanier, panierDTO);

                return existingPanier;
            })
            .map(panierRepository::save)
            .map(panierMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PanierDTO> findAll() {
        log.debug("Request to get all Paniers");
        return panierRepository.findAll().stream().map(panierMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     *  Get all the paniers where Course is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<PanierDTO> findAllWhereCourseIsNull() {
        log.debug("Request to get all paniers where Course is null");
        return StreamSupport
            .stream(panierRepository.findAll().spliterator(), false)
            .filter(panier -> panier.getCourse() == null)
            .map(panierMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<PanierDTO> findOne(Long id) {
        log.debug("Request to get Panier : {}", id);
        return panierRepository.findById(id).map(panierMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Panier : {}", id);
        panierRepository.deleteById(id);
    }
}

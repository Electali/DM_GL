package info4.gl.coopcycle.service.impl;

import info4.gl.coopcycle.domain.Paiement;
import info4.gl.coopcycle.repository.PaiementRepository;
import info4.gl.coopcycle.service.PaiementService;
import info4.gl.coopcycle.service.dto.PaiementDTO;
import info4.gl.coopcycle.service.mapper.PaiementMapper;
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
 * Service Implementation for managing {@link Paiement}.
 */
@Service
@Transactional
public class PaiementServiceImpl implements PaiementService {

    private final Logger log = LoggerFactory.getLogger(PaiementServiceImpl.class);

    private final PaiementRepository paiementRepository;

    private final PaiementMapper paiementMapper;

    public PaiementServiceImpl(PaiementRepository paiementRepository, PaiementMapper paiementMapper) {
        this.paiementRepository = paiementRepository;
        this.paiementMapper = paiementMapper;
    }

    @Override
    public PaiementDTO save(PaiementDTO paiementDTO) {
        log.debug("Request to save Paiement : {}", paiementDTO);
        Paiement paiement = paiementMapper.toEntity(paiementDTO);
        paiement = paiementRepository.save(paiement);
        return paiementMapper.toDto(paiement);
    }

    @Override
    public Optional<PaiementDTO> partialUpdate(PaiementDTO paiementDTO) {
        log.debug("Request to partially update Paiement : {}", paiementDTO);

        return paiementRepository
            .findById(paiementDTO.getId())
            .map(existingPaiement -> {
                paiementMapper.partialUpdate(existingPaiement, paiementDTO);

                return existingPaiement;
            })
            .map(paiementRepository::save)
            .map(paiementMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaiementDTO> findAll() {
        log.debug("Request to get all Paiements");
        return paiementRepository.findAll().stream().map(paiementMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     *  Get all the paiements where Course is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<PaiementDTO> findAllWhereCourseIsNull() {
        log.debug("Request to get all paiements where Course is null");
        return StreamSupport
            .stream(paiementRepository.findAll().spliterator(), false)
            .filter(paiement -> paiement.getCourse() == null)
            .map(paiementMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<PaiementDTO> findOne(Long id) {
        log.debug("Request to get Paiement : {}", id);
        return paiementRepository.findById(id).map(paiementMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Paiement : {}", id);
        paiementRepository.deleteById(id);
    }
}

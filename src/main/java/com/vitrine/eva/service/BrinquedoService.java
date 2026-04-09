package com.vitrine.eva.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vitrine.eva.dto.BrinquedoDTO;
import com.vitrine.eva.model.entity.Brinquedo;
import com.vitrine.eva.repository.BrinquedoRepository;

@Service
public class BrinquedoService {
    
    @Autowired
    private BrinquedoRepository brinquedoRepository;
    
    public List<BrinquedoDTO> listarTodos() {
        return brinquedoRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    public Optional<BrinquedoDTO> buscarPorId(Long id) {
        return brinquedoRepository.findById(id).map(this::toDTO);
    }
    
    public List<BrinquedoDTO> buscarPorNome(String nome) {
        return brinquedoRepository.findByNomeBrinquedoContainingIgnoreCase(nome).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public BrinquedoDTO salvar(BrinquedoDTO dto) {
        Brinquedo brinquedo = toEntity(dto);
        // Define a data de cadastro apenas na criação
        brinquedo.setDataCadastro(LocalDateTime.now());
        // Garante que o destaque não seja nulo ao salvar
        if (brinquedo.getDestacar() == null) brinquedo.setDestacar(false);
        
        return toDTO(brinquedoRepository.save(brinquedo));
    }

    @Transactional
    public Optional<BrinquedoDTO> atualizar(Long id, BrinquedoDTO dto) {
        return brinquedoRepository.findById(id).map(brinquedo -> {
            brinquedo.setNomeBrinquedo(dto.getNomeBrinquedo());
            brinquedo.setDescricao(dto.getDescricao());
            brinquedo.setValor(dto.getValor());
            brinquedo.setCategoria(dto.getCategoria());
            brinquedo.setMarca(dto.getMarca());
            brinquedo.setIdadeRecomendada(dto.getIdadeRecomendada());
            brinquedo.setQuantidadeEstoque(dto.getQuantidadeEstoque());
            brinquedo.setDesconto(dto.getDesconto());
            brinquedo.setImagens(dto.getImagens());
            brinquedo.setDestacar(dto.getDestacar() != null ? dto.getDestacar() : false);
            brinquedo.setDtCriacao(dto.getDtCriacao());
            
            return toDTO(brinquedoRepository.save(brinquedo));
        });
    }

    @Transactional
    public boolean deletar(Long id) {
        if (brinquedoRepository.existsById(id)) {
            brinquedoRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private BrinquedoDTO toDTO(Brinquedo b) {
        BrinquedoDTO dto = new BrinquedoDTO();
        dto.setId(b.getId());
        dto.setNomeBrinquedo(b.getNomeBrinquedo());
        dto.setImagens(b.getImagens());
        dto.setDescricao(b.getDescricao());
        dto.setValor(b.getValor());
        dto.setCategoria(b.getCategoria());
        dto.setMarca(b.getMarca());
        dto.setIdadeRecomendada(b.getIdadeRecomendada());
        dto.setQuantidadeEstoque(b.getQuantidadeEstoque());
        dto.setDesconto(b.getDesconto());
        dto.setDataCadastro(b.getDataCadastro());
        dto.setDestacar(b.getDestacar() != null ? b.getDestacar() : false);
        dto.setDtCriacao(b.getDtCriacao());
        
        return dto;
    }

    private Brinquedo toEntity(BrinquedoDTO dto) {
        Brinquedo b = new Brinquedo();
        b.setId(dto.getId());
        b.setNomeBrinquedo(dto.getNomeBrinquedo());
        b.setImagens(dto.getImagens());
        b.setDescricao(dto.getDescricao());
        b.setValor(dto.getValor());
        b.setCategoria(dto.getCategoria());
        b.setMarca(dto.getMarca());
        b.setIdadeRecomendada(dto.getIdadeRecomendada());
        b.setQuantidadeEstoque(dto.getQuantidadeEstoque());
        b.setDesconto(dto.getDesconto());
        b.setDataCadastro(dto.getDataCadastro()); // Preserva a data vinda do DTO se houver
        b.setDestacar(dto.getDestacar() != null ? dto.getDestacar() : false);
        b.setDtCriacao(dto.getDtCriacao());
        return b;
    }
    
    public List<BrinquedoDTO> listarPromocoes() {
        return brinquedoRepository.findEmPromocao()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public List<BrinquedoDTO> salvarLote(List<BrinquedoDTO> dtos) {
        LocalDateTime agora = LocalDateTime.now();

        List<Brinquedo> entidades = dtos.stream().map(dto -> {
            Brinquedo brinquedo = toEntity(dto);
            
            // Regras de negócio para novos registros
            if (brinquedo.getDataCadastro() == null) {
                brinquedo.setDataCadastro(agora);
            }
            if (brinquedo.getDestacar() == null) {
                brinquedo.setDestacar(false);
            }
            
            return brinquedo;
        }).collect(Collectors.toList());

        // O saveAll é muito mais performático que salvar um por um num loop
        List<Brinquedo> salvas = brinquedoRepository.saveAll(entidades);

        return salvas.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

}
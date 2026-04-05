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
    
    // Listar todos convertendo para DTO
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
        brinquedo.setDataCadastro(LocalDateTime.now());
        return toDTO(brinquedoRepository.save(brinquedo));
    }

    @Transactional
    public Optional<BrinquedoDTO> atualizar(Long id, BrinquedoDTO dto) {
        return brinquedoRepository.findById(id).map(brinquedo -> {
            brinquedo.setNomeBrinquedo(dto.getNomeBrinquedo());
            brinquedo.setDescricao(dto.getDescricao());
            brinquedo.setValor(dto.getValor());
            brinquedo.setCategoria(dto.getCategoria());
            brinquedo.setMarca(dto.getMarca()); // Adicionado marca
            brinquedo.setFornecedor(dto.getFornecedor());
            brinquedo.setIdadeRecomendada(dto.getIdadeRecomendada());
            brinquedo.setQuantidadeEstoque(dto.getQuantidadeEstoque());
            brinquedo.setDesconto(dto.getDesconto());
            brinquedo.setImagens(dto.getImagens());
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

    // Métodos Auxiliares de Conversão
    private BrinquedoDTO toDTO(Brinquedo b) {
        BrinquedoDTO dto = new BrinquedoDTO();
        dto.setId(b.getId());
        dto.setNomeBrinquedo(b.getNomeBrinquedo());
        dto.setImagens(b.getImagens());
        dto.setDescricao(b.getDescricao());
        dto.setValor(b.getValor());
        dto.setCategoria(b.getCategoria());
        dto.setMarca(b.getMarca());
        dto.setFornecedor(b.getFornecedor());
        dto.setIdadeRecomendada(b.getIdadeRecomendada());
        dto.setQuantidadeEstoque(b.getQuantidadeEstoque());
        dto.setDesconto(b.getDesconto());
        dto.setDataCadastro(b.getDataCadastro());
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
        b.setFornecedor(dto.getFornecedor());
        b.setIdadeRecomendada(dto.getIdadeRecomendada());
        b.setQuantidadeEstoque(dto.getQuantidadeEstoque());
        b.setDesconto(dto.getDesconto());
        return b;
    }
}
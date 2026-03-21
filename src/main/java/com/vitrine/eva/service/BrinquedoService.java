package com.vitrine.eva.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vitrine.eva.model.entity.Brinquedo;
import com.vitrine.eva.repository.BrinquedoRepository;

@Service
public class BrinquedoService {
    
    @Autowired
    private BrinquedoRepository brinquedoRepository;
    
    // Listar todos os brinquedos
    public List<Brinquedo> listarTodos() {
        return brinquedoRepository.findAll();
    }
    
    // Buscar brinquedo por ID
    public Optional<Brinquedo> buscarPorId(Long id) {
        return brinquedoRepository.findById(id);
    }
    
    // Buscar por nome
    public List<Brinquedo> buscarPorNome(String nome) {
        return brinquedoRepository.findByNomeBrinquedoContainingIgnoreCase(nome);
    }
    
    // Buscar por categoria
    public List<Brinquedo> buscarPorCategoria(String categoria) {
        return brinquedoRepository.findByCategoria(categoria);
    }
    
    // Buscar em promoção
    public List<Brinquedo> buscarEmPromocao() {
        return brinquedoRepository.findEmPromocao();
    }
    
    // Salvar novo brinquedo
    @Transactional
    public Brinquedo salvar(Brinquedo brinquedo) {
        brinquedo.setDataCadastro(LocalDateTime.now());
        return brinquedoRepository.save(brinquedo);
    }
    
    // Atualizar brinquedo existente
    @Transactional
    public Optional<Brinquedo> atualizar(Long id, Brinquedo brinquedoAtualizado) {
        return brinquedoRepository.findById(id).map(brinquedo -> {
            brinquedo.setNomeBrinquedo(brinquedoAtualizado.getNomeBrinquedo());
            brinquedo.setDescricao(brinquedoAtualizado.getDescricao());
            brinquedo.setValor(brinquedoAtualizado.getValor());
            brinquedo.setCategoria(brinquedoAtualizado.getCategoria());
            brinquedo.setFornecedor(brinquedoAtualizado.getFornecedor());
            brinquedo.setIdadeRecomendada(brinquedoAtualizado.getIdadeRecomendada());
            brinquedo.setQuantidadeEstoque(brinquedoAtualizado.getQuantidadeEstoque());
            brinquedo.setDesconto(brinquedoAtualizado.getDesconto());
            brinquedo.setImagens(brinquedoAtualizado.getImagens());
            return brinquedoRepository.save(brinquedo);
        });
    }
    
    // Deletar brinquedo
    @Transactional
    public boolean deletar(Long id) {
        if (brinquedoRepository.existsById(id)) {
            brinquedoRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // Atualizar estoque
    @Transactional
    public Optional<Brinquedo> atualizarEstoque(Long id, Integer quantidade) {
        return brinquedoRepository.findById(id).map(brinquedo -> {
            brinquedo.setQuantidadeEstoque(quantidade);
            return brinquedoRepository.save(brinquedo);
        });
    }
    
    // Aplicar desconto em um brinquedo
    @Transactional
    public Optional<Brinquedo> aplicarDesconto(Long id, Double percentualDesconto) {
        return brinquedoRepository.findById(id).map(brinquedo -> {
            brinquedo.setDesconto(percentualDesconto);
            return brinquedoRepository.save(brinquedo);
        });
    }
}
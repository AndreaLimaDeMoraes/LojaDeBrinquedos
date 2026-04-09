package com.vitrine.eva.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vitrine.eva.dto.MarcaDTO;
import com.vitrine.eva.model.entity.Marca;
import com.vitrine.eva.repository.MarcaRepository;

@Service
public class MarcaService {

    @Autowired
    private MarcaRepository marcaRepository;

    @Transactional
    public Marca salvar(Marca marca) {
        return marcaRepository.save(marca);
    }

    public List<Marca> listar() {
        return marcaRepository.findAll();
    }

    public Marca buscarPorId(Long id) {
        return marcaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Marca não encontrada com o id: " + id));
    }
    
    @Transactional
    public boolean deletar(Long id) {
        return marcaRepository.findById(id).map(marca -> {
            marcaRepository.delete(marca);
            return true;
        }).orElse(false);
    }
    
    @Transactional
    public List<MarcaDTO> criarVarios(List<MarcaDTO> dtos) {
        // 1. Converte a lista de DTOs para lista de Entidades
        List<Marca> entidades = dtos.stream().map(dto -> {
            Marca m = new Marca();
            m.setNome(dto.getNome());
            m.setLogoUrl(dto.getLogoUrl()); // Verifique se o nome do campo na Entity é exatamente este
            return m;
        }).collect(Collectors.toList());

        // 2. Salva todas as marcas de uma vez (mais eficiente)
        List<Marca> salvas = marcaRepository.saveAll(entidades);

        // 3. Converte de volta para DTO para retornar ao Front-end (com os IDs gerados)
        return salvas.stream().map(m -> new MarcaDTO(
                m.getId(),
                m.getNome(),
                m.getLogoUrl()
        )).collect(Collectors.toList());
    }

}
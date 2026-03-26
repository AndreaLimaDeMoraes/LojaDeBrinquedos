package com.vitrine.eva.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vitrine.eva.model.entity.Marca;
import com.vitrine.eva.repository.MarcaRepository;

@Service
public class MarcaService {

    @Autowired
    private MarcaRepository marcaRepository;

    public Marca salvar(Marca marca) {
        return marcaRepository.save(marca);
    }

    public List<Marca> listar() {
        return marcaRepository.findAll();
    }

    public Marca buscarPorId(Long id) {
        return marcaRepository.findById(id).orElse(null);
    }
    
	@Transactional
    public void deletar(Long id) {
        marcaRepository.deleteById(id);
    }
}

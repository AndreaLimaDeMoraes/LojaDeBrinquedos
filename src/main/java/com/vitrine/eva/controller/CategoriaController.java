package com.vitrine.eva.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vitrine.eva.dto.CategoriaDTO;
import com.vitrine.eva.service.CategoriaService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/categoria")

public class CategoriaController {
	
	private final CategoriaService categoriaService;
	
	public CategoriaController(CategoriaService categoriaService) {
		this.categoriaService = categoriaService;
	}
	
	@GetMapping
	public List<CategoriaDTO> listar() {
		return categoriaService.listar();
	}
	
	@PostMapping
	public CategoriaDTO criar(@Valid @RequestBody CategoriaDTO dto) {
		return categoriaService.criar(dto);
	}
	
	@PutMapping("/{id}")
	public CategoriaDTO editar(@PathVariable Long id, @Valid @RequestBody CategoriaDTO dto) {
	    return categoriaService.alterar(id, dto);
	}
	
	// DELETE - Deletar brinquedo
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (categoriaService.deletar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
	
	

}

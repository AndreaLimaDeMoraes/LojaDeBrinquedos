package com.vitrine.eva.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.vitrine.eva.dto.CategoriaDTO;
import com.vitrine.eva.model.entity.Categoria;
import com.vitrine.eva.repository.CategoriaRepository;

@Service
public class CategoriaService {
	private final CategoriaRepository categoriaRepository;
	
	public CategoriaService(CategoriaRepository categoriaRepository) {
		this.categoriaRepository = categoriaRepository;
	}
	
	public List<CategoriaDTO> listar(){
		List<Categoria> categorias = categoriaRepository.findAll();
		List<CategoriaDTO> dtos = new ArrayList<>();
		
		for (Categoria categoria : categorias) {
			dtos.add(toDto(categoria));
		}
		
		return dtos;
	}
	
	public CategoriaDTO criar (CategoriaDTO dto) {
		Categoria categoria = new Categoria();
		
		categoria = toCategoria(dto);
		
		categoriaRepository.save(categoria);
		
		return toDto(categoria);
	}
	
	public CategoriaDTO alterar (Long id, CategoriaDTO dto) {
		Categoria categoria = categoriaRepository.findById(id).
				orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
		
		categoria.setNome(dto.getNome());
		categoria.setDescricao(dto.getDescricao());
		
		categoriaRepository.save(categoria);
		
		return toDto(categoria);
	}
	
	public void excluir(Long id) {
		Categoria categoria = categoriaRepository.findById(id).
				orElseThrow(() -> new RuntimeException("Aluno não encontrada"));
		
		categoriaRepository.delete(categoria);
	}
	
	
	
	private Categoria toCategoria(CategoriaDTO dto) {
		
		Categoria categoria = new Categoria();
		
		categoria.setNome(dto.getNome());
		categoria.setDescricao(dto.getDescricao());
		
		return categoria;
	}
	
	private CategoriaDTO toDto (Categoria categoria) {
		
	CategoriaDTO dto = new CategoriaDTO();
		
	dto.setNome(categoria.getNome());
	dto.setDescricao(categoria.getDescricao());
		
		return dto;
	}
	
	
	
	
}

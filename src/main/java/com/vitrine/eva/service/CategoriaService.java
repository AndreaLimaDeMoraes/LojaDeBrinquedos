package com.vitrine.eva.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
	
	 @Transactional
	    public boolean deletar(Long id) {
		 return categoriaRepository.findById(id).map(categoria -> {
		        categoriaRepository.delete(categoria);
		        return true;
		    }).orElse(false);
		}
	 
	 @Transactional
	 public void deletarVarios(List<Long> ids) {
	     // deleteAllByIdInBatch mais rápido pois faz um único comando SQL
		 List<Categoria> categorias = categoriaRepository.findAllById(ids);
		    categoriaRepository.deleteAll(categorias);
	 }
	
	
	
	private Categoria toCategoria(CategoriaDTO dto) {
		
		Categoria categoria = new Categoria();
		
		categoria.setNome(dto.getNome());
		categoria.setDescricao(dto.getDescricao());
		categoria.setId(dto.getId());
		
		return categoria;
	}
	
	private CategoriaDTO toDto (Categoria categoria) {
		
	CategoriaDTO dto = new CategoriaDTO();
		
	dto.setNome(categoria.getNome());
	dto.setDescricao(categoria.getDescricao());
	dto.setId(categoria.getId());

		
		return dto;
	}
	
	@Transactional
	public List<CategoriaDTO> criarVarios(List<CategoriaDTO> dtos) {
	    // Transforma a lista de DTOs em lista de Entidades
	    List<Categoria> categorias = dtos.stream()
	            .map(this::toCategoria)
	            .toList();

	    // Salva tudo de uma vez
	    List<Categoria> salvas = categoriaRepository.saveAll(categorias);

	    // Retorna a lista de DTOs atualizada (agora com os IDs gerados)
	    return salvas.stream()
	            .map(this::toDto)
	            .toList();
	}

	
	
}

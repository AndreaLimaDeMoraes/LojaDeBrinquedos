package com.vitrine.eva.controller;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.vitrine.eva.dto.MarcaDTO;
import com.vitrine.eva.model.entity.Marca;
import com.vitrine.eva.service.MarcaService;

@RestController
@RequestMapping("/marcas")
@CrossOrigin(origins = "http://localhost:5173")
public class MarcaController {

    @Autowired
    private MarcaService marcaService;

    @PostMapping
    public MarcaDTO criar(@RequestBody MarcaDTO dto) {
        Marca marca = new Marca();
        marca.setNome(dto.getNome());
        marca.setLogoUrl(dto.getLogoUrl());

        Marca salva = marcaService.salvar(marca);

        return new MarcaDTO(
                salva.getId(),
                salva.getNome(),
                salva.getLogoUrl() 
        );
    }

    @GetMapping
    public List<MarcaDTO> listar() {
        return marcaService.listar().stream()
                .map(m -> new MarcaDTO(
                        m.getId(),
                        m.getNome(),
                        m.getLogoUrl())) 
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public MarcaDTO buscar(@PathVariable Long id) {
        Marca marca = marcaService.buscarPorId(id);
        return new MarcaDTO(
                marca.getId(),
                marca.getNome(),
                marca.getLogoUrl() 
        );
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        marcaService.deletar(id);
    }
    
    @PostMapping("/deletar-varios")
    public void deletarVarios(@RequestBody List<Long> ids) {
        ids.forEach(id -> marcaService.deletar(id));
    }
    
    @PutMapping("/{id}")
    public MarcaDTO editar(@PathVariable Long id, @RequestBody MarcaDTO dto) {
        Marca marca = marcaService.buscarPorId(id);
        if (marca != null) {
            marca.setNome(dto.getNome());
            marca.setLogoUrl(dto.getLogoUrl());
            Marca atualizada = marcaService.salvar(marca);
            return new MarcaDTO(
                atualizada.getId(), 
                atualizada.getNome(), 
                atualizada.getLogoUrl() 
            );
        }
        return null;
    }
    
    @PostMapping("/lote")
    public ResponseEntity<List<MarcaDTO>> criarEmLote(@RequestBody List<MarcaDTO> dtos) {
        List<MarcaDTO> criadas = marcaService.criarVarios(dtos);
        return ResponseEntity.ok(criadas);
    }

}
package com.vitrine.eva.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vitrine.eva.dto.BrinquedoDTO;
import com.vitrine.eva.service.BrinquedoService;

@RestController
@RequestMapping("/brinquedos")
@CrossOrigin(origins = "*")
public class BrinquedoController {
    
    @Autowired
    private BrinquedoService brinquedoService;
    
    @GetMapping
    public ResponseEntity<List<BrinquedoDTO>> listarTodos() {
        return ResponseEntity.ok(brinquedoService.listarTodos());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<BrinquedoDTO> buscarPorId(@PathVariable Long id) {
        return brinquedoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/buscar/nome")
    public ResponseEntity<List<BrinquedoDTO>> buscarPorNome(@RequestParam String nome) {
        return ResponseEntity.ok(brinquedoService.buscarPorNome(nome));
    }
    
    @PostMapping
    public ResponseEntity<BrinquedoDTO> criar(@RequestBody BrinquedoDTO dto) {
        BrinquedoDTO novo = brinquedoService.salvar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novo);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<BrinquedoDTO> atualizar(@PathVariable Long id, @RequestBody BrinquedoDTO dto) {
        return brinquedoService.atualizar(id, dto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        return brinquedoService.deletar(id) 
                ? ResponseEntity.noContent().build() 
                : ResponseEntity.notFound().build();
    }
    
    @PostMapping("/excluir-varios")
    public ResponseEntity<Void> deletarVarios(@RequestBody List<Long> ids) {
        ids.forEach(id -> brinquedoService.deletar(id));
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/promocoes")
    public ResponseEntity<List<BrinquedoDTO>> listarPromocoes() {
        return ResponseEntity.ok(brinquedoService.listarPromocoes());
    }
    
    @PostMapping("/lote")
    public ResponseEntity<List<BrinquedoDTO>> criarEmLote(@RequestBody List<BrinquedoDTO> dtos) {
        List<BrinquedoDTO> novos = brinquedoService.salvarLote(dtos);
        return ResponseEntity.status(HttpStatus.CREATED).body(novos);
    }

    
    
}
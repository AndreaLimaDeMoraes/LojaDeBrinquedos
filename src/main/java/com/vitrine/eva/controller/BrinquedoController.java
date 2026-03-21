package com.vitrine.eva.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vitrine.eva.model.entity.Brinquedo;
import com.vitrine.eva.service.BrinquedoService;

@RestController
@RequestMapping("/api/brinquedos")
@CrossOrigin(origins = "*") // Permite requisições de qualquer origem (útil para front-end)
public class BrinquedoController {
    
    @Autowired
    private BrinquedoService brinquedoService;
    
    // GET - Listar todos
    @GetMapping
    public ResponseEntity<List<Brinquedo>> listarTodos() {
        List<Brinquedo> brinquedos = brinquedoService.listarTodos();
        return ResponseEntity.ok(brinquedos);
    }
    
    // GET - Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<Brinquedo> buscarPorId(@PathVariable Long id) {
        return brinquedoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // GET - Buscar por nome
    @GetMapping("/buscar/nome")
    public ResponseEntity<List<Brinquedo>> buscarPorNome(@RequestParam String nome) {
        List<Brinquedo> brinquedos = brinquedoService.buscarPorNome(nome);
        return ResponseEntity.ok(brinquedos);
    }
    
    // GET - Buscar por categoria
    @GetMapping("/buscar/categoria")
    public ResponseEntity<List<Brinquedo>> buscarPorCategoria(@RequestParam String categoria) {
        List<Brinquedo> brinquedos = brinquedoService.buscarPorCategoria(categoria);
        return ResponseEntity.ok(brinquedos);
    }
    
    // GET - Buscar em promoção
    @GetMapping("/promocao")
    public ResponseEntity<List<Brinquedo>> buscarEmPromocao() {
        List<Brinquedo> brinquedos = brinquedoService.buscarEmPromocao();
        return ResponseEntity.ok(brinquedos);
    }
    
    // POST - Criar novo brinquedo
    @PostMapping
    public ResponseEntity<Brinquedo> criar(@RequestBody Brinquedo brinquedo) {
        Brinquedo novoBrinquedo = brinquedoService.salvar(brinquedo);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoBrinquedo);
    }
    
    // PUT - Atualizar brinquedo
    @PutMapping("/{id}")
    public ResponseEntity<Brinquedo> atualizar(@PathVariable Long id, @RequestBody Brinquedo brinquedo) {
        return brinquedoService.atualizar(id, brinquedo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // PATCH - Atualizar estoque
    @PatchMapping("/{id}/estoque")
    public ResponseEntity<Brinquedo> atualizarEstoque(@PathVariable Long id, @RequestParam Integer quantidade) {
        return brinquedoService.atualizarEstoque(id, quantidade)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // PATCH - Aplicar desconto
    @PatchMapping("/{id}/desconto")
    public ResponseEntity<Brinquedo> aplicarDesconto(@PathVariable Long id, @RequestParam Double percentual) {
        return brinquedoService.aplicarDesconto(id, percentual)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // DELETE - Deletar brinquedo
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (brinquedoService.deletar(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
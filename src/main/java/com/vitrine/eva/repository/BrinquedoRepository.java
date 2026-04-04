package com.vitrine.eva.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.vitrine.eva.model.entity.Brinquedo;

@Repository
public interface BrinquedoRepository extends JpaRepository<Brinquedo, Long> {
    
    // Buscar brinquedos por nome (ignorando maiúsculas/minúsculas)
    List<Brinquedo> findByNomeBrinquedoContainingIgnoreCase(String nome);
    
    // Buscar brinquedos por categoria
    List<Brinquedo> findByCategoria(String categoria);
    
    // Buscar brinquedos por faixa de preço
    List<Brinquedo> findByValorBetween(Double min, Double max);
    
    // Buscar brinquedos com estoque abaixo de um valor
    List<Brinquedo> findByQuantidadeEstoqueLessThan(Integer quantidade);
    
    // Buscar brinquedos em promoção (desconto > 0)
    @Query("SELECT b FROM Brinquedo b WHERE b.desconto > 0")
    List<Brinquedo> findEmPromocao();
    
    // Buscar brinquedos por idade recomendada
    List<Brinquedo> findByIdadeRecomendada(String idade);
}
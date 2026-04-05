package com.vitrine.eva.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vitrine.eva.model.entity.Marca;

public interface MarcaRepository extends JpaRepository<Marca, Long> {
}

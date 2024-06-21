package it.nextdevs.CapstoneBackend.repository;

import it.nextdevs.CapstoneBackend.model.Pianeta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PianetaRepository extends JpaRepository <Pianeta, Integer> {
}

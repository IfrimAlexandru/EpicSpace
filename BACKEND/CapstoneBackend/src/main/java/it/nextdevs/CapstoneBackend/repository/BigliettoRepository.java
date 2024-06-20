package it.nextdevs.CapstoneBackend.repository;

import it.nextdevs.CapstoneBackend.model.Biglietto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BigliettoRepository extends JpaRepository<Biglietto, Integer> {
}

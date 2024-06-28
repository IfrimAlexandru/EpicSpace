package it.nextdevs.CapstoneBackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Biglietto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String buyerName;
    private String email;
    private String planet;
    private String spaceship;
    private String suit;
    private LocalDateTime dataPrenotazione;
//    private String planetImg;
   private String shipImg;
//    private String suitImg;

}

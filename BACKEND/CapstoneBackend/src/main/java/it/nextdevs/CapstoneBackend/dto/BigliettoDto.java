package it.nextdevs.CapstoneBackend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BigliettoDto {
    private Integer id;
    private String buyerName;
    private String email;
    private String planet;
    private String ship;
    private String suit;
    private LocalDateTime dataPrenotazione;
//    private String planetImg;
//    private String shipImg;
//    private String suitImg;
}

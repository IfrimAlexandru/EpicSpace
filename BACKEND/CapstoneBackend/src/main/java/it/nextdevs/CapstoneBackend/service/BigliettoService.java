package it.nextdevs.CapstoneBackend.service;

import it.nextdevs.CapstoneBackend.dto.BigliettoDto;
import it.nextdevs.CapstoneBackend.model.Biglietto;
import it.nextdevs.CapstoneBackend.repository.BigliettoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BigliettoService {

    private final BigliettoRepository bigliettoRepository;
    private final EmailService emailService;  // Aggiungi il servizio di email

    @Autowired
    public BigliettoService(BigliettoRepository bigliettoRepository, EmailService emailService) {
        this.bigliettoRepository = bigliettoRepository;
        this.emailService = emailService;  // Inietta il servizio di email
    }

    public List<Biglietto> getAllBiglietti() {
        return bigliettoRepository.findAll();
    }

    public Optional<Biglietto> getBigliettoById(Integer id) {
        return bigliettoRepository.findById(id);
    }

    public Biglietto createBiglietto(BigliettoDto bigliettoDto) {
        Biglietto biglietto = mapDtoToEntity(bigliettoDto);
        Biglietto savedBiglietto = bigliettoRepository.save(biglietto);

        // Invio dell'email
        emailService.sendTicketEmail(
                savedBiglietto.getEmail(),
                savedBiglietto.getBuyerName(),
                savedBiglietto.getPlanet(),
                savedBiglietto.getSpaceship(),
                savedBiglietto.getSuit(),
                savedBiglietto.getDataPrenotazione().toString(),
                savedBiglietto.getShipImg(),
                savedBiglietto.getSuitImg(),
                savedBiglietto.getPlanetImg()
        );

        return savedBiglietto;
    }

    public Optional<Biglietto> updateBiglietto(Integer id, BigliettoDto bigliettoDto) {
        return bigliettoRepository.findById(id).map(biglietto -> {
            biglietto.setBuyerName(bigliettoDto.getBuyerName());
            biglietto.setEmail(bigliettoDto.getEmail());
            biglietto.setPlanet(bigliettoDto.getPlanet());
            biglietto.setSpaceship(bigliettoDto.getShip());
            biglietto.setSuit(bigliettoDto.getSuit());
            return bigliettoRepository.save(biglietto);
        });
    }

    public void deleteBiglietto(Integer id) {
        bigliettoRepository.deleteById(id);
    }

    private Biglietto mapDtoToEntity(BigliettoDto bigliettoDto) {
        Biglietto biglietto = new Biglietto();
        biglietto.setBuyerName(bigliettoDto.getBuyerName());
        biglietto.setEmail(bigliettoDto.getEmail());
        biglietto.setPlanet(bigliettoDto.getPlanet());
        biglietto.setSpaceship(bigliettoDto.getShip());
        biglietto.setSuit(bigliettoDto.getSuit());
        biglietto.setShipImg(bigliettoDto.getShipImg()); // Include the ship image URL
        biglietto.setSuitImg(bigliettoDto.getSuitImg()); // Include the suit image URL
        biglietto.setPlanetImg(bigliettoDto.getPlanetImg()); // Include the planet image URL
        biglietto.setDataPrenotazione(LocalDateTime.now());
        return biglietto;
    }
}

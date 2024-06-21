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

    @Autowired
    public BigliettoService(BigliettoRepository bigliettoRepository) {
        this.bigliettoRepository = bigliettoRepository;
    }

    public List<Biglietto> getAllBiglietti() {
        return bigliettoRepository.findAll();
    }

    public Optional<Biglietto> getBigliettoById(Integer id) {
        return bigliettoRepository.findById(id);
    }

    public Biglietto createBiglietto(BigliettoDto bigliettoDto) {
        Biglietto biglietto = mapDtoToEntity(bigliettoDto);
        return bigliettoRepository.save(biglietto);
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
        biglietto.setDataPrenotazione(LocalDateTime.now());
        return biglietto;
    }
}

//    @Autowired
//    private BigliettoRepository bigliettoRepository;
//
//    public Biglietto createBiglietto(BigliettoDto bigliettoDto) {
//        Biglietto biglietto = new Biglietto();
//        biglietto.setBuyerName(bigliettoDto.getBuyerName());
//        biglietto.setEmail(bigliettoDto.getEmail());
//        biglietto.setPlanet(bigliettoDto.getPlanet());
//        biglietto.setSpaceship(bigliettoDto.getShip());
//        biglietto.setSuit(bigliettoDto.getSuit());
//
//        // Set the correct image paths
//        biglietto.setPlanetImg("src/assets/img/" + bigliettoDto.getPlanet().toLowerCase() + ".png");
//        biglietto.setShipImg("src/assets/img/immagini-navicelle/" + bigliettoDto.getShip().toLowerCase() + ".png");
//        biglietto.setSuitImg("src/assets/img/immagini-tute/" + bigliettoDto.getSuit().toLowerCase() + ".png");
//
//        return bigliettoRepository.save(biglietto);
//    }
//}
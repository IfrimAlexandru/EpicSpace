package it.nextdevs.CapstoneBackend.controller;

import it.nextdevs.CapstoneBackend.model.Biglietto;
import it.nextdevs.CapstoneBackend.repository.BigliettoRepository;
import it.nextdevs.CapstoneBackend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/biglietti")
public class BigliettoController {

    @Autowired
    private BigliettoRepository bigliettoRepository;

    @Autowired
    private EmailService emailService;

    @PostMapping("/submit-order")
    public String submitOrder(@RequestBody Biglietto biglietto) {
        bigliettoRepository.save(biglietto);

        String subject = "Il tuo biglietto per il volo spaziale";
        String text = "Ciao " + biglietto.getBuyerName() + ",\n\n" +
                "Grazie per aver acquistato il biglietto per il volo spaziale.\n" +
                "Dettagli del volo:\n" +
                "Pianeta: " + biglietto.getPlanet() + "\n" +
                "Nave: " + biglietto.getSpaceship() + "\n" +
                "Tuta: " + biglietto.getSuit() + "\n\n" +
                "Buon viaggio!\n\n" +
                "Saluti,\nIl team di EpicSpace";

        emailService.sendTicketEmail(biglietto.getEmail(), subject, text);

        return "Ordine ricevuto! Controlla la tua email per il biglietto.";
    }
}

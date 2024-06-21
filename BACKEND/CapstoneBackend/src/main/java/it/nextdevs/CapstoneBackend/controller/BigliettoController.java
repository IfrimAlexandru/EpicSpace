package it.nextdevs.CapstoneBackend.controller;

import it.nextdevs.CapstoneBackend.dto.BigliettoDto;
import it.nextdevs.CapstoneBackend.model.Biglietto;
import it.nextdevs.CapstoneBackend.service.BigliettoService;
import it.nextdevs.CapstoneBackend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/biglietti")
public class BigliettoController {

    @Autowired
    private BigliettoService bigliettoService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/submit-order")
    public String submitOrder(@RequestBody BigliettoDto bigliettoDto) {
        Biglietto biglietto = bigliettoService.createBiglietto(bigliettoDto);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
        String formattedDate = biglietto.getDataPrenotazione().format(formatter);

        String subject = "Il tuo biglietto per il volo spaziale";
        String text = "Ciao " + biglietto.getBuyerName() + ",\n\n" +
                "Grazie per aver acquistato il biglietto per il volo spaziale.\n" +
                "Dettagli del volo:\n" +
                "Pianeta: " + biglietto.getPlanet() + "\n" +
                "Nave: " + biglietto.getSpaceship() + "\n" +
                "Tuta: " + biglietto.getSuit() + "\n" +
                "Data della Prenotazione: " + formattedDate + "\n\n" +
                "Buon viaggio!\n\n" +
                "Saluti,\nIl team di EpicSpace";

        emailService.sendTicketEmail(biglietto.getEmail(), subject, text);

        return "Ordine ricevuto! Controlla la tua email per il biglietto.";
    }
}

//    @Autowired
//    private BigliettoService bigliettoService;
//
//    @Autowired
//    private EmailService emailService;
//
//    @PostMapping("/submit-order")
//    public String submitOrder(@RequestBody BigliettoDto bigliettoDto) {
//        try {
//            Biglietto biglietto = bigliettoService.createBiglietto(bigliettoDto);
//
//            String subject = "Il tuo biglietto per il volo spaziale";
//            String text = buildEmailBody(biglietto);
//
//            emailService.sendTicketEmail(biglietto.getEmail(), subject, text, biglietto);
//
//            return "Ordine ricevuto! Controlla la tua email per il biglietto.";
//        } catch (Exception e) {
//            e.printStackTrace(); // Stampa l'eccezione completa nel log del server
//            return "Errore durante l'elaborazione dell'ordine: " + e.getMessage();
//        }
//    }
//
//    private String buildEmailBody(Biglietto biglietto) {
//        try {
//            return "<html>" +
//                    "<body>" +
//                    "<h1>Grazie per aver acquistato il biglietto per il volo spaziale, " + biglietto.getBuyerName() + "!</h1>" +
//                    "<p>Dettagli del volo:</p>" +
//                    "<p><b>Pianeta selezionato:</b> " + biglietto.getPlanet() + "</p>" +
//                    "<img src='cid:planetImage' alt='Pianeta' width='100' height='100'/>" +
//                    "<p><b>Nave selezionata:</b> " + biglietto.getSpaceship() + "</p>" +
//                    "<img src='cid:shipImage' alt='Nave' width='100' height='100'/>" +
//                    "<p><b>Tuta selezionata:</b> " + biglietto.getSuit() + "</p>" +
//                    "<img src='cid:suitImage' alt='Tuta' width='100' height='100'/>" +
//                    "<p>Buon viaggio!</p>" +
//                    "<p>Saluti,</p>" +
//                    "<p>Il team di EpicSpace</p>" +
//                    "</body>" +
//                    "</html>";
//        } catch (Exception e) {
//            e.printStackTrace(); // Stampa l'eccezione completa nel log del server
//            throw new RuntimeException("Error while building email body", e);
//        }
//    }
//}
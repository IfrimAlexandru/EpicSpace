package it.nextdevs.CapstoneBackend.controller;

import it.nextdevs.CapstoneBackend.model.Recensione;
import it.nextdevs.CapstoneBackend.model.User;
import it.nextdevs.CapstoneBackend.service.RecensioneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/recensioni")
public class RecensioneController {

    @Autowired
    private RecensioneService recensioneService;

    @PostMapping
    public Recensione createRecensione(@RequestBody RecensioneRequest recensioneRequest, @AuthenticationPrincipal User user) {
        return recensioneService.saveRecensione(recensioneRequest.getText(), (Integer) user.getIdUtente());
    }

    // Classe di richiesta interna per gestire i dati della richiesta
    public static class RecensioneRequest {
        private String text;

        // Getters and Setters
        public String getText() {
            return text;
        }

        public void setText(String text) {
            this.text = text;
        }
    }
}

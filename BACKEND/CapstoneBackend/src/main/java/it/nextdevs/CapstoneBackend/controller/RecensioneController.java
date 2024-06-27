package it.nextdevs.CapstoneBackend.controller;

import it.nextdevs.CapstoneBackend.model.Recensione;
import it.nextdevs.CapstoneBackend.model.User;
import it.nextdevs.CapstoneBackend.service.RecensioneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recensioni")
public class RecensioneController {

    @Autowired
    private RecensioneService recensioneService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public Recensione createRecensione(@RequestBody RecensioneRequest recensioneRequest, @AuthenticationPrincipal User user) {
        return recensioneService.saveRecensione(recensioneRequest.getText(), user.getIdUtente());
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public List<Recensione> getAllRecensioni() {
        return recensioneService.getAllRecensioni();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRecensione(@PathVariable Integer id) {
        recensioneService.deleteRecensione(id);
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

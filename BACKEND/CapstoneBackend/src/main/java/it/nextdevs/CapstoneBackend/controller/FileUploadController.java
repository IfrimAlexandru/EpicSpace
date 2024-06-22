package it.nextdevs.CapstoneBackend.controller;

import it.nextdevs.CapstoneBackend.model.NaveSpaziale;
import it.nextdevs.CapstoneBackend.model.Pianeta;
import it.nextdevs.CapstoneBackend.model.TutaSpaziale;
import it.nextdevs.CapstoneBackend.repository.NaveSpazialeRepository;
import it.nextdevs.CapstoneBackend.repository.PianetaRepository;
import it.nextdevs.CapstoneBackend.repository.TutaSpazialeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api")
public class FileUploadController {

    private static String UPLOAD_DIR = "src/main/resources/static/img/";

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/uploadPianetaImage/{id}")
    public String uploadPianetaImage(@PathVariable Integer id, @RequestParam("file") MultipartFile file) throws IOException {
        String fileName = saveFile(file);
        // Logica per salvare il percorso dell'immagine nel database

        return "You successfully uploaded '" + fileName + "' for Pianeta ID: " + id;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/uploadNaveSpazialeImage/{id}")
    public String uploadNaveSpazialeImage(@PathVariable Integer id, @RequestParam("file") MultipartFile file) throws IOException {
        String fileName = saveFile(file);
        // Logica per salvare il percorso dell'immagine nel database

        return "You successfully uploaded '" + fileName + "' for NaveSpaziale ID: " + id;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/uploadTutaSpazialeImageFront/{id}")
    public String uploadTutaSpazialeImageFront(@PathVariable Integer id, @RequestParam("file") MultipartFile file) throws IOException {
        String fileName = saveFile(file);
        // Logica per salvare il percorso dell'immagine nel database

        return "You successfully uploaded '" + fileName + "' for TutaSpaziale ID: " + id;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/uploadTutaSpazialeImageBack/{id}")
    public String uploadTutaSpazialeImageBack(@PathVariable Integer id, @RequestParam("file") MultipartFile file) throws IOException {
        String fileName = saveFile(file);
        // Logica per salvare il percorso dell'immagine nel database

        return "You successfully uploaded '" + fileName + "' for TutaSpaziale ID: " + id;
    }

    private String saveFile(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        byte[] bytes = file.getBytes();
        Path path = Paths.get(UPLOAD_DIR + fileName);
        Files.write(path, bytes);
        return fileName;
    }
}
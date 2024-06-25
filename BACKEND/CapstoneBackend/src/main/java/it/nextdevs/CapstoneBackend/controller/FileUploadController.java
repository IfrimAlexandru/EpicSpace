package it.nextdevs.CapstoneBackend.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import it.nextdevs.CapstoneBackend.model.NaveSpaziale;
import it.nextdevs.CapstoneBackend.model.Pianeta;
import it.nextdevs.CapstoneBackend.model.TutaSpaziale;
import it.nextdevs.CapstoneBackend.repository.NaveSpazialeRepository;
import it.nextdevs.CapstoneBackend.repository.PianetaRepository;
import it.nextdevs.CapstoneBackend.repository.TutaSpazialeRepository;
import it.nextdevs.CapstoneBackend.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class FileUploadController {

    @Autowired
    private PianetaRepository pianetaRepository;

    @Autowired
    private NaveSpazialeRepository naveSpazialeRepository;

    @Autowired
    private TutaSpazialeRepository tutaSpazialeRepository;

    @Autowired
    private FileUploadService fileUploadService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/uploadPianetaImage/{id}")
    public ResponseEntity<String> uploadPianetaImage(@PathVariable Integer id, @RequestParam("file") MultipartFile file) throws IOException {
        String url = fileUploadService.uploadFile(file);

        Optional<Pianeta> pianetaOptional = pianetaRepository.findById(id);
        if (pianetaOptional.isPresent()) {
            Pianeta pianeta = pianetaOptional.get();
            pianeta.setImmagine(url);
            pianetaRepository.save(pianeta);
            return ResponseEntity.ok("You successfully uploaded the image for Pianeta ID: " + id);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pianeta not found");
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/uploadNaveSpazialeImage/{id}")
    public ResponseEntity<String> uploadNaveSpazialeImage(@PathVariable Integer id, @RequestParam("file") MultipartFile file) throws IOException {
        String url = fileUploadService.uploadFile(file);

        Optional<NaveSpaziale> naveSpazialeOptional = naveSpazialeRepository.findById(id);
        if (naveSpazialeOptional.isPresent()) {
            NaveSpaziale naveSpaziale = naveSpazialeOptional.get();
            naveSpaziale.setImmagine(url);
            naveSpazialeRepository.save(naveSpaziale);
            return ResponseEntity.ok("You successfully uploaded the image for NaveSpaziale ID: " + id);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("NaveSpaziale not found");
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/uploadTutaSpazialeImageFront/{id}")
    public ResponseEntity<String> uploadTutaSpazialeImageFront(@PathVariable Integer id, @RequestParam("file") MultipartFile file) throws IOException {
        // Logging for debugging
        System.out.println("Received request to upload front image for TutaSpaziale ID: " + id);
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        System.out.println("Received file: " + file.getOriginalFilename());
        System.out.println("File size: " + file.getSize());
        System.out.println("File content type: " + file.getContentType());

        String url = fileUploadService.uploadFile(file);

        Optional<TutaSpaziale> tutaSpazialeOptional = tutaSpazialeRepository.findById(id);
        if (tutaSpazialeOptional.isPresent()) {
            TutaSpaziale tutaSpaziale = tutaSpazialeOptional.get();
            tutaSpaziale.setImmagineFronte(url);
            tutaSpazialeRepository.save(tutaSpaziale);
            return ResponseEntity.ok(url);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("TutaSpaziale not found");
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/uploadTutaSpazialeImageBack/{id}")
    public ResponseEntity<String> uploadTutaSpazialeImageBack(@PathVariable Integer id, @RequestParam("file") MultipartFile file) throws IOException {
        String url = fileUploadService.uploadFile(file);

        Optional<TutaSpaziale> tutaSpazialeOptional = tutaSpazialeRepository.findById(id);
        if (tutaSpazialeOptional.isPresent()) {
            TutaSpaziale tutaSpaziale = tutaSpazialeOptional.get();
            tutaSpaziale.setImmagineRetro(url);
            tutaSpazialeRepository.save(tutaSpaziale);
            return ResponseEntity.ok(url);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("TutaSpaziale not found");
        }
    }
}
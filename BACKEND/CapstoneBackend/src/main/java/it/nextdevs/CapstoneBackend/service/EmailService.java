package it.nextdevs.CapstoneBackend.service;

import it.nextdevs.CapstoneBackend.model.Biglietto;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${gmail.mail.from}")
    private String fromEmail;

    public Integer sendTicketEmail(String to, String subject, String text) {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        try {
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text);
            mailSender.send(message);
            return 0; // 0 indica successo
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
//public void sendTicketEmail(String to, String subject, String text, Biglietto biglietto) {
//    MimeMessage message = mailSender.createMimeMessage();
//    MimeMessageHelper helper;
//
//    try {
//        helper = new MimeMessageHelper(message, true); // `true` indicates multipart message
//
//        helper.setFrom(fromEmail);
//        helper.setTo(to);
//        helper.setSubject(subject);
//        helper.setText(text, true); // `true` indicates HTML
//
//        // Add images as inline attachments
//        String planetImgPath = biglietto.getPlanetImg();
//        String shipImgPath = biglietto.getShipImg();
//        String suitImgPath = biglietto.getSuitImg();
//
//        System.out.println("Planet Image Path: " + planetImgPath);
//        System.out.println("Ship Image Path: " + shipImgPath);
//        System.out.println("Suit Image Path: " + suitImgPath);
//
//        // Check if files exist
//        File planetImgFile = new ClassPathResource(planetImgPath).getFile();
//        File shipImgFile = new ClassPathResource(shipImgPath).getFile();
//        File suitImgFile = new ClassPathResource(suitImgPath).getFile();
//
//        System.out.println("Planet Image Exists: " + planetImgFile.exists());
//        System.out.println("Ship Image Exists: " + shipImgFile.exists());
//        System.out.println("Suit Image Exists: " + suitImgFile.exists());
//
//        // Log absolute paths for additional debugging
//        System.out.println("Planet Image Absolute Path: " + planetImgFile.getAbsolutePath());
//        System.out.println("Ship Image Absolute Path: " + shipImgFile.getAbsolutePath());
//        System.out.println("Suit Image Absolute Path: " + suitImgFile.getAbsolutePath());
//
//        helper.addInline("planetImage", new ClassPathResource(planetImgPath));
//        helper.addInline("shipImage", new ClassPathResource(shipImgPath));
//        helper.addInline("suitImage", new ClassPathResource(suitImgPath));
//
//        mailSender.send(message);
//    } catch (MessagingException e) {
//        e.printStackTrace(); // Stampa l'eccezione completa nel log del server
//        throw new RuntimeException("Failed to send email", e);
//    } catch (IOException e) {
//        e.printStackTrace(); // Stampa l'eccezione completa nel log del server
//        throw new RuntimeException("Failed to load images", e);
//    } catch (Exception e) {
//        e.printStackTrace(); // Stampa l'eccezione completa nel log del server
//        throw new RuntimeException("Unexpected error occurred", e);
//    }
//}
//}
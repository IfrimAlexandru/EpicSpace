package it.nextdevs.CapstoneBackend.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender mailSender;

    @Value("${gmail.mail.from}")
    private String fromEmail;

    public Integer sendTicketEmail(String to, String buyerName, String planet, String ship, String suit, String dataPrenotazione, String spaceshipImageUrl, String suitImageUrl, String planetImageUrl) {
        MimeMessage message = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            String subject = "Il tuo biglietto per il volo spaziale";
            String htmlContent = "<html>" +
                    "<head>" +
                    "<style>" +
                    "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');" +
                    "body { font-family: 'Montserrat', sans-serif;}" +
                    "</style>" +
                    "</head>" +
                    "<body style='font-family: Montserrat, Arial, sans-serif; padding: 20px; color: #ffffff;'>" +
                    "<div style='max-width: 700px; margin: 0 auto; padding: 10px; background-color: #333333; border-radius: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);'>" +
                    "<div style='text-align: center; padding: 10px; border-radius: 10px;'>" +
                    "<img src='cid:logoImage' alt='EpicSpace Logo' style='max-width: 250px;'/>" +
                    "</div>" +
                    
                    "<p>Ciao <strong>" + buyerName + "</strong>,</p>" +
                    "<p>Grazie per aver acquistato il biglietto per il volo spaziale. Ecco i dettagli del tuo volo:</p>" +
                    "<div style='background-color: #444444; padding: 15px; border-radius: 10px; margin-bottom: 20px;'>" +
                    "<table style='width: 100%; border-collapse: collapse; color: #ffffff;'>" +
                    "<tr>" +
                    "<td style='padding: 10px; border-bottom: 1px solid #555555; font-weight: bold; vertical-align: top;'>Pianeta:</td>" +
                    "<td style='padding: 10px; border-bottom: 1px solid #555555; display: flex; align-items: center;'>" +
                    "<span>" + planet + "</span>" +
                    "<img src='" + planetImageUrl + "' alt='Pianeta' style='max-width: 100px; margin-left: 15px; border-radius: 10px;'>" +
                    "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td style='padding: 10px; border-bottom: 1px solid #555555; font-weight: bold; vertical-align: top;'>Nave:</td>" +
                    "<td style='padding: 10px; border-bottom: 1px solid #555555; display: flex; align-items: center;'>" +
                    "<span>" + ship + "</span>" +
                    "<img src='" + spaceshipImageUrl + "' alt='Nave Spaziale' style='max-width: 100px; margin-left: 15px; border-radius: 10px;'>" +
                    "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td style='padding: 10px; border-bottom: 1px solid #555555; font-weight: bold; vertical-align: top;'>Tuta:</td>" +
                    "<td style='padding: 10px; border-bottom: 1px solid #555555; display: flex; align-items: center;'>" +
                    "<span>" + suit + "</span>" +
                    "<img src='" + suitImageUrl + "' alt='Tuta Spaziale' style='max-width: 100px; margin-left: 15px; border-radius: 10px;'>" +
                    "</td>" +
                    "</tr>" +
                    "<tr><td style='padding: 10px; font-weight: bold;'>Partenza prevista:</td><td style='padding: 10px;'>" + dataPrenotazione + "</td></tr>" +
                    "</table>" +
                    "</div>" +
                    "<p style='text-align: center; color: #ffffff;'>Buon viaggio!</p>" +
                    "<p style='text-align: center;'>Saluti,<br>Il team di EpicSpace</p>" +
                    "</div>" +
                    "</body>" +
                    "</html>";

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true); // true indica che il contenuto è HTML

            // Add the inline image with content ID 'logoImage'
            ClassPathResource imageResource = new ClassPathResource("/static/assets/img/logo/LOGO.png");
            helper.addInline("logoImage", imageResource);

            mailSender.send(message);
            return 0; // 0 indica successo
        } catch (MessagingException e) {
            logger.error("Errore durante l'invio dell'email a " + to, e);
            return 1; // 1 indica errore
        }
    }
}

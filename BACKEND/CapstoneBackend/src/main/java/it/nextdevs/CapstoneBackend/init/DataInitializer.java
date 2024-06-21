package it.nextdevs.CapstoneBackend.init;

import com.fasterxml.jackson.databind.ObjectMapper;
import it.nextdevs.CapstoneBackend.dto.SpaceData;
import it.nextdevs.CapstoneBackend.repository.NaveSpazialeRepository;
import it.nextdevs.CapstoneBackend.repository.PianetaRepository;
import it.nextdevs.CapstoneBackend.repository.TutaSpazialeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private PianetaRepository pianetaRepository;

    @Autowired
    private TutaSpazialeRepository tutaSpazialeRepository;

    @Autowired
    private NaveSpazialeRepository naveSpazialeRepository;

    @Override
    public void run(String... args) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            SpaceData spaceData = objectMapper.readValue(new File("src/main/resources/data.json"), SpaceData.class);
            pianetaRepository.saveAll(spaceData.getPianeti());
            tutaSpazialeRepository.saveAll(spaceData.getTuteSpaziali());
            naveSpazialeRepository.saveAll(spaceData.getNaviSpaziali());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

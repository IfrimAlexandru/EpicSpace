package it.nextdevs.CapstoneBackend.controller;

import it.nextdevs.CapstoneBackend.model.DataVolo;
import it.nextdevs.CapstoneBackend.service.DataVoloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/data_volo")
public class DataVoloController {

    @Autowired
    private DataVoloService dataVoloService;

    @GetMapping("/date")
    public List<DataVolo> getDate() {
        return dataVoloService.findAll();
    }

    @PostMapping("/date")
    public DataVolo createData(@RequestBody DataVolo dataDisponibile) {
        return dataVoloService.save(dataDisponibile);
    }

    @PutMapping("/date/{id}")
    public DataVolo updateData(@PathVariable Integer id, @RequestBody DataVolo dataDisponibile) {
        dataDisponibile.setId(id);
        return dataVoloService.save(dataDisponibile);
    }

    @DeleteMapping("/date/{id}")
    public void deleteData(@PathVariable Integer id) {
        dataVoloService.deleteById(id);
    }
}
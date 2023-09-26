package com.desafio.um.controller;

import com.desafio.um.model.Cliente;
import com.desafio.um.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void cadastrarCliente(@RequestBody Cliente cliente) {
        clienteService.cadastrarCliente(cliente);
    }

    /*@PutMapping("/{id}")
    public ResponseEntity<Void> atualizarCliente(@PathVariable int id, @RequestBody Cliente cliente) {
        if (clienteService.atualizarCliente(id, cliente)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }*/

    /*@GetMapping("/{id}")
    public ResponseEntity<Cliente> consultarCliente(@PathVariable int id) {
        Cliente cliente = clienteService.consultarCliente(id);
        if (cliente != null) {
            return ResponseEntity.ok(cliente);
        }
        return ResponseEntity.notFound().build();
    }*/
}


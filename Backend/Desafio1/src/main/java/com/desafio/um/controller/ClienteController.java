package com.desafio.um.controller;

import com.desafio.um.model.Cliente;
import com.desafio.um.queues.FilaAtendimento;
import com.desafio.um.repository.ClienteRepository;
import com.desafio.um.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private FilaAtendimento filaAtendimento;


    @PostMapping
    public ResponseEntity<String> cadastrarCliente(@RequestBody Cliente cliente) {
        Cliente clienteExistente = clienteRepository.findByCnpj(cliente.getCnpj());

        if (clienteExistente != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Cliente já cadastrado");
        }

        clienteRepository.save(cliente);

        filaAtendimento.adicionarCliente(cliente);

        return ResponseEntity.status(HttpStatus.CREATED).body("Cliente cadastrado com sucesso");
    }




    @GetMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ResponseEntity<?>> consultarClientePorId(@PathVariable int id) {
        ResponseEntity<?> cliente = clienteService.consultarCliente(id);
        if (cliente != null) {
            return ResponseEntity.ok(cliente);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<Cliente>> listarClientes() {
        List<Cliente> clientes = clienteService.listarClientes();

        if (clientes != null && !clientes.isEmpty()) {
            return ResponseEntity.ok(clientes);

        }

        return ResponseEntity.notFound().build();

    }


    @PutMapping("/{cnpj}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Void> atualizarCliente(@PathVariable String cnpj, @RequestBody Cliente cliente) {
        if (clienteService.atualizarCliente(cnpj, cliente)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluirCliente(@PathVariable int id) {
        boolean clienteExcluido = clienteService.excluirCliente(id);

        if (clienteExcluido) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @RestController
    @RequestMapping("/fila-atendimento")
    public class FilaAtendimentoController {

        @GetMapping("/fila-atendimento/proximo")
        public ResponseEntity<?> proximoClienteAtendimento() {
            Cliente cliente = filaAtendimento.retirarProximoCliente();

            if (cliente != null) {
                return ResponseEntity.ok(cliente);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("A fila de atendimento está vazia");
            }
        }


    }

}


package com.desafio.um.service;

import com.desafio.um.model.Cliente;
import com.desafio.um.service.ClienteService;
import com.desafio.um.repository.ClienteRepository;
import com.desafio.um.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public boolean atualizarCliente(String cnpj, Cliente novoCliente) {
        Cliente clienteExistente = clienteRepository.findByCnpj(cnpj);

        if (clienteExistente != null) {
            // Atualize os campos do clienteExistente com os valores do novoCliente
            clienteExistente.setCnpj(novoCliente.getCnpj());
            clienteExistente.setMcc(novoCliente.getMcc());
            clienteExistente.setCpfContato(novoCliente.getCpfContato());
            clienteExistente.setNomeContato(novoCliente.getNomeContato());
            clienteExistente.setEmailContato(novoCliente.getEmailContato());

            clienteRepository.save(clienteExistente);

            return true;
        }

        return false;
    }

    public ResponseEntity<?> consultarCliente(int id) {
        Optional<Cliente> clienteOptional = clienteRepository.findById(id);

        if (clienteOptional.isPresent()) {
            Cliente cliente = clienteOptional.get();
            return ResponseEntity.ok(cliente);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado");
        }
    }

    public List<Cliente> listarClientes() {
        List<Cliente> clientes = clienteRepository.findAll();

        return clientes;
    }


    public ResponseEntity<String> cadastrarCliente(Cliente cliente) {
        Cliente clienteExistente = clienteRepository.findByCnpj(cliente.getCnpj());

        if (clienteExistente != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Cliente já cadastrado");
        }

        clienteRepository.save(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body("Cliente cadastrado com sucesso");
    }

    public boolean excluirCliente(int id) {
        Optional<Cliente> clienteExistente = clienteRepository.findById(id);

        if (clienteExistente.isPresent()) {
            clienteRepository.deleteById(id);
            return true;
        }

        return false;
    }
}
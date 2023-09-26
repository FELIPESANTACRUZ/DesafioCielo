package com.desafio.um.service;

import com.desafio.um.model.Cliente;
import com.desafio.um.service.ClienteService;
import com.desafio.um.repository.ClienteRepository;
import com.desafio.um.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClienteService {

    //@Autowired
    private ClienteRepository clienteRepository;

    public boolean atualizarCliente(int id, Cliente novoCliente) {
        Optional<Cliente> clienteExistente = clienteRepository.findById(id);

        if (clienteExistente.isPresent()) {
            Cliente cliente = clienteExistente.get();

            cliente.setCnpj(novoCliente.getCnpj());
            cliente.setMcc(novoCliente.getMcc());
            cliente.setCpfContato(novoCliente.getCpfContato());
            cliente.setNomeContato(novoCliente.getNomeContato());
            cliente.setEmailContato(novoCliente.getEmailContato());


            clienteRepository.save(cliente);

            return true;
        }

        return false;
    }

    public Cliente consultarCliente(int id) {
        Optional<Cliente> clienteOptional = clienteRepository.findById(id);

        return clienteOptional.orElse(null);
    }

    public void cadastrarCliente(Cliente cliente) {

        clienteRepository.save(cliente);
    }
}
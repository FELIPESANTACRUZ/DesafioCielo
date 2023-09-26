package com.desafio.um.service;

import com.desafio.um.model.Cliente;
import com.desafio.um.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public void cadastrarCliente(Cliente cliente) {
        // Implemente a lógica de validação aqui
        if (cliente == null) {
            throw new IllegalArgumentException("Cliente não pode ser nulo.");
        }

       /* public boolean atualizarCliente ( int id, Cliente cliente){
            // Implemente a lógica de atualização aqui
            return false;
        }

        public Cliente consultarCliente ( int id){
            // Implemente a lógica de consulta aqui
            return null;
        }*/
    }
}
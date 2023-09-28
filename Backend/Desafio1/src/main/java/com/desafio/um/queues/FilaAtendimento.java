package com.desafio.um.queues;

import com.desafio.um.model.Cliente;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.Queue;

@Component
public class FilaAtendimento {

    private Queue<Cliente> fila = new LinkedList<>();

    public void adicionarCliente(Cliente cliente) {
        fila.offer(cliente);
    }

    public Cliente retirarProximoCliente() {
        return fila.poll();
    }

    public boolean isEmpty() {
        return fila.isEmpty();
    }
}

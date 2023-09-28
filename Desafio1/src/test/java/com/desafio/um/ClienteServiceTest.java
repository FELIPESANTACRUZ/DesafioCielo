package com.desafio.um;

import com.desafio.um.model.Cliente;
import com.desafio.um.repository.ClienteRepository;
import com.desafio.um.service.ClienteService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ClienteServiceTest {

    @Mock
    private ClienteRepository clienteRepository;

    private ClienteService clienteService;

    @Before
    public void setUp() {
        clienteService = new ClienteService();
    }

    @Test
    public void testConsultarClienteExistente() {
        Cliente clienteExistente = new Cliente();
        clienteExistente.setId(1L);

        when(clienteRepository.findById(1)).thenReturn(Optional.of(clienteExistente));

        ResponseEntity<?> response = clienteService.consultarCliente(1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(clienteExistente, response.getBody());
    }

    @Test
    public void testConsultarClienteNaoExistente() {
        int clienteId = 2;

        when(clienteRepository.findById(clienteId)).thenReturn(Optional.empty());

        ResponseEntity<?> response = clienteService.consultarCliente(clienteId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Cliente não encontrado", response.getBody());
    }

    @Test
    public void testCadastrarCliente() {
        Cliente clienteNovo = new Cliente();
        clienteNovo.setCnpj("1234567890");

        when(clienteRepository.findByCnpj(clienteNovo.getCnpj())).thenReturn(null);

        ResponseEntity<String> response = clienteService.cadastrarCliente(clienteNovo);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("Cliente cadastrado com sucesso", response.getBody());
    }

    @Test
    public void testCadastrarClienteExistente() {
        Cliente clienteExistente = new Cliente();
        clienteExistente.setCnpj("1234567890");

        when(clienteRepository.findByCnpj(clienteExistente.getCnpj())).thenReturn(clienteExistente);

        ResponseEntity<String> response = clienteService.cadastrarCliente(clienteExistente);

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertEquals("Cliente já cadastrado", response.getBody());
    }
}

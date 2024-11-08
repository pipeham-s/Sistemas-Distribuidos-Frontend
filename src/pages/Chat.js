import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import styled from 'styled-components';
import Header from '../components/Header';
import backgroundImage from '../images/universidad.jpg';

// Contenedor de la página
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif; /* Fuente moderna */
`;

// Contenedor principal para centrar el componente de chat
const MainContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  width: 100%;
  flex: 1;
  box-sizing: border-box;
`;

// Contenedor del chat
const ChatContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 60%;
  max-width: 800px;
  min-width: 300px;
  margin-top: 60px;
  border-left: 5px solid #28a745; /* Detalle en verde */
`;

// Estilo de mensajes
const Message = styled.div`
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 8px;
  background-color: #f1f1f1;
  font-size: 1rem;
  color: #333;

  & strong {
    color: #28a745; /* Detalle en verde */
  }
`;

// Entrada de texto y botón
const Input = styled.input`
  padding: 10px;
  margin: 5px 10px 0 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: calc(50% - 15px);
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #28a745;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 5px;

  &:hover {
    background-color: #218838;
  }

  &:active {
    background-color: #1e7e34;
  }
`;

const Chat = () => {
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [receiverId, setReceiverId] = useState('');

    useEffect(() => {
        // Obtener el token del almacenamiento local
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token no proporcionado');
            return;
        }

        let decodedToken;
        try {
            decodedToken = JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            console.error('Error al decodificar el token:', e);
            return;
        }

        const userId = decodedToken.id;
        console.log('ID de usuario decodificado:', userId);

        if (!userId) {
            console.error('ID de usuario no encontrado en el token');
            return;
        }

        // Configurar SockJS y STOMP con el token en los encabezados
        const socket = new SockJS('http://localhost:8080/chat-websocket');
        const client = Stomp.over(socket);

        client.connect(
            { Authorization: `Bearer ${token}` },  // Encabezado con el token
            () => {
                console.log('Conectado a WebSocket');
                setStompClient(client);

                // Suscribirse al canal de mensajes generales
                client.subscribe(`/topic/messages`, (message) => {
                    const parsedMessage = JSON.parse(message.body);
                    setMessages((prevMessages) => [...prevMessages, parsedMessage]);
                });
            },
            (error) => {
                console.error('Error en la conexión WebSocket:', error);
            }
        );

        // Desconectar al desmontar el componente
        return () => {
            if (client) client.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (stompClient && input.trim() && receiverId.trim()) {
            const token = localStorage.getItem('token');
            let decodedToken;
            try {
                decodedToken = JSON.parse(atob(token.split('.')[1]));
            } catch (e) {
                console.error('Error al decodificar el token:', e);
                return;
            }

            const userId = decodedToken.id; // Ajustar para obtener el campo 'id'

            if (!userId) {
                console.error('ID de usuario no disponible');
                return;
            }

            const message = {
                content: input.trim(),
                senderId: userId,
                receiverId: parseInt(receiverId, 10),
            };

            stompClient.send('/app/send', {}, JSON.stringify(message));
            console.log('Enviando mensaje:', JSON.stringify(message));

            setInput('');
        } else {
            console.error('Cliente STOMP no disponible o datos incompletos');
        }
    };

    return (
        <PageContainer>
            <Header />
            <MainContent>
                <ChatContainer>
                    <h2 style={{ color: '#28a745' }}>Chat en tiempo real</h2>
                    <div className="chat-messages" style={{ maxHeight: '500px', overflowY: 'scroll', padding: '10px' }}>
                        {messages.length > 0 ? (
                            messages.map((msg, index) => (
                                <Message key={index}>
                                    <strong>De {msg.senderId} a {msg.receiverId}:</strong> {msg.content}
                                </Message>
                            ))
                        ) : (
                            <p>No hay mensajes aún</p>
                        )}
                    </div>
                    <Input
                        type="text"
                        placeholder="ID del receptor"
                        value={receiverId}
                        onChange={(e) => setReceiverId(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Escribe un mensaje"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button onClick={sendMessage}>Enviar</Button>
                </ChatContainer>
            </MainContent>
        </PageContainer>
    );
};

export default Chat;

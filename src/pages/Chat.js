import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import styled from 'styled-components';

// Componentes estilizados
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;

const ConversationList = styled.div`
  width: 30%;
  margin-right: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow-y: auto;
  max-height: 80vh;
`;

const ConversationItem = styled.div`
  padding: 15px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  background-color: ${props => (props.selected ? '#28a745' : '#f9f9f9')};
  color: ${props => (props.selected ? 'white' : '#333')};
  &:hover {
    background-color: #28a745;
    color: white;
  }
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  height: 80vh;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fefefe;
`;

const Message = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background-color: ${props => (props.$isSender ? '#d4f8e8' : '#f1f1f1')};
  border-radius: 8px;
  align-self: ${props => (props.$isSender ? 'flex-end' : 'flex-start')};
  max-width: 70%;
  word-wrap: break-word;
`;

const InputContainer = styled.div`
  display: flex;
  padding-top: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const ChatApp = () => {
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [receiverId, setReceiverId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token no proporcionado');
      return;
    }

    let decodedToken;
    try {
      decodedToken = JSON.parse(atob(token.split('.')[1]));
      if (decodedToken?.id) {
        setUserId(decodedToken.id);
        setUserName(decodedToken.nombre); // Suponiendo que el token tiene el nombre del usuario
      } else {
        console.error('ID de usuario no encontrado');
        return;
      }
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return;
    }

    // Conexión WebSocket
    const socket = new SockJS('http://localhost:8080/chat-websocket');
    const client = Stomp.over(socket);

    client.connect(
      { Authorization: `Bearer ${token}` },
      () => {
        console.log('Conectado al servidor WebSocket');
        setStompClient(client);
        setIsConnected(true);

        // Suscribirse para recibir las conversaciones del usuario
        client.subscribe(`/user/queue/conversations`, (message) => {
          try {
            const parsedConversations = JSON.parse(message.body);
            console.log('Conversaciones recibidas:', parsedConversations);
            setConversations(parsedConversations);
          } catch (error) {
            console.error('Error al parsear las conversaciones:', error);
          }
        });

        // Suscribirse para recibir mensajes en tiempo real
        client.subscribe(`/user/queue/messages`, (message) => {
          try {
            const parsedMessage = JSON.parse(message.body);
            console.log('Mensaje en tiempo real recibido:', parsedMessage);

            // Agregar el mensaje si pertenece a la conversación seleccionada
            if (
              selectedConversation &&
              parsedMessage.conversationId === selectedConversation.conversationId
            ) {
              setMessages((prevMessages) => [...prevMessages, parsedMessage]);
            }
          } catch (error) {
            console.error('Error al parsear el mensaje:', error);
          }
        });

        // Obtener las conversaciones del usuario
        client.send('/app/get-conversations', {}, decodedToken.id.toString());
      },
      (error) => {
        console.error('Error al conectar al WebSocket:', error);
        setIsConnected(false);
      }
    );

    return () => {
      if (client) {
        client.disconnect(() => {
          console.log('Desconectado del WebSocket');
        });
      }
    };
  }, []);

  // Manejar selección de conversación
  const handleSelectConversation = async (conversation) => {
    console.log('Cargando mensajes antiguos para la conversación:', conversation);
    setSelectedConversation(conversation);

    // Hacer una solicitud GET para obtener los mensajes antiguos
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(
        `http://localhost:8080/api/conversations/${conversation.conversationId}/messages`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Error al obtener los mensajes antiguos');
      }

      const data = await response.json();
      console.log('Mensajes obtenidos:', data);
      setMessages(data);
    } catch (error) {
      console.error('Error al obtener los mensajes antiguos:', error);
    }
  };

  // Enviar mensaje nuevo
  const sendMessage = () => {
    if (stompClient && isConnected && input.trim() && selectedConversation) {
      const message = {
        content: input.trim(),
        senderId: userId,
        receiverId: selectedConversation.contactId,
        conversationId: selectedConversation.conversationId,
        senderName: userName, // Usar el nombre del usuario que envía el mensaje
      };

      console.log('Enviando mensaje:', message);
      stompClient.send('/app/send', {}, JSON.stringify(message));
      setMessages((prevMessages) => [...prevMessages, message]);
      setInput('');
    } else {
      console.error('No se puede enviar el mensaje. El cliente STOMP no está conectado.');
    }
  };

  // Iniciar una nueva conversación
  const startConversation = () => {
    if (stompClient && isConnected && receiverId.trim()) {
      stompClient.send(
        '/app/start-conversation',
        {},
        JSON.stringify({ initiatorId: userId, receiverId: parseInt(receiverId) })
      );
      setReceiverId('');
    } else {
      console.error('No se puede iniciar la conversación. El cliente STOMP no está conectado.');
    }
  };

  return (
    <Container>
      <h2>Chat App</h2>
      <div style={{ display: 'flex', height: '100%' }}>
        <ConversationList>
          <h3>Conversaciones</h3>
          {conversations.length > 0 ? (
            conversations.map((conv) => (
              <ConversationItem
                key={conv.conversationId}
                selected={selectedConversation?.conversationId === conv.conversationId}
                onClick={() => handleSelectConversation(conv)}
              >
                {conv.contactName}
              </ConversationItem>
            ))
          ) : (
            <p>No hay conversaciones</p>
          )}
        </ConversationList>

        <ChatContainer>
          <MessagesContainer>
            {selectedConversation ? (
              messages.map((msg, index) => (
                <Message key={index} $isSender={msg.senderId === userId}>
                  <strong>{msg.senderId === userId ? 'Yo' : msg.senderName}:</strong> <span>{msg.content}</span>
                </Message>
              ))
            ) : (
              <p>Selecciona una conversación para ver los mensajes</p>
            )}
          </MessagesContainer>

          {selectedConversation && (
            <InputContainer>
              <Input
                type="text"
                placeholder="Escribe un mensaje"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button onClick={sendMessage}>Enviar</Button>
            </InputContainer>
          )}
        </ChatContainer>
      </div>

      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="ID del usuario para iniciar conversación"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
        />
        <Button onClick={startConversation}>Iniciar Conversación</Button>
      </div>
    </Container>
  );
};

export default ChatApp;

import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import styled from 'styled-components';

// Estilos ajustados para ocupar toda la pantalla
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* Ocupa toda la altura de la ventana */
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
  max-height: 80vh; /* Limita el tamaño de la lista de conversaciones */
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
  height: 80vh; /* Ocupa el 80% de la altura de la ventana para ajustarse a la pantalla */
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
  background-color: ${props => (props.isSender ? '#d4f8e8' : '#f1f1f1')};
  border-radius: 8px;
  align-self: ${props => (props.isSender ? 'flex-end' : 'flex-start')};
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
  const [receiverId, setReceiverId] = useState(''); // Para el ID del receptor

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token no proporcionado');
      return;
    }

    let decodedToken;
    try {
      decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserId(decodedToken.id);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return;
    }

    if (!decodedToken.id) {
      console.error('ID de usuario no encontrado');
      return;
    }

    const socket = new SockJS('http://localhost:8080/chat-websocket');
    const client = Stomp.over(socket);

    client.connect(
      { Authorization: `Bearer ${token}` },
      () => {
        console.log('Conectado al servidor WebSocket');
        setStompClient(client);
        setIsConnected(true);

        client.subscribe(`/user/queue/conversations`, (message) => {
          try {
            const parsedConversations = JSON.parse(message.body);
            console.log('Conversaciones recibidas:', parsedConversations);
            setConversations(parsedConversations);
          } catch (error) {
            console.error('Error al parsear las conversaciones:', error);
          }
        });

        client.subscribe(`/user/queue/messages`, (message) => {
          try {
            const parsedMessages = JSON.parse(message.body);
            console.log('Mensajes recibidos:', parsedMessages);

            if (Array.isArray(parsedMessages)) {
              setMessages(parsedMessages);
            } else if (selectedConversation && parsedMessages.conversationId === selectedConversation.contactId) {
              setMessages((prevMessages) => [...prevMessages, parsedMessages]);
            }
          } catch (error) {
            console.error('Error al parsear los mensajes:', error);
          }
        });

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

  useEffect(() => {
    if (selectedConversation && stompClient && isConnected) {
      console.log('Cargando mensajes antiguos para la conversación:', selectedConversation);
      stompClient.send('/app/get-messages', {}, selectedConversation.contactId.toString());
    }
  }, [selectedConversation, stompClient, isConnected]);

  const sendMessage = () => {
    if (stompClient && isConnected && input.trim() && selectedConversation) {
      const message = {
        content: input.trim(),
        senderId: userId,
        receiverId: selectedConversation.contactId,
      };

      console.log('Enviando mensaje:', message);
      stompClient.send('/app/send', {}, JSON.stringify(message));
      setInput('');

      const newMessage = {
        ...message,
        conversationId: selectedConversation.contactId,
        senderName: 'Yo',
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } else {
      console.error('No se puede enviar el mensaje. El cliente STOMP no está conectado.');
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
                key={conv.contactId}
                selected={selectedConversation && selectedConversation.contactId === conv.contactId}
                onClick={() => {
                  console.log('Conversación seleccionada:', conv);
                  setSelectedConversation(conv);
                  setMessages([]); // Limpiar mensajes antes de cargar los nuevos
                }}
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
                <Message key={index} isSender={msg.senderId === userId}>
                  <strong>{msg.senderName}:</strong>
                  <span>{msg.content}</span>
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
    </Container>
  );
};

export default ChatApp;

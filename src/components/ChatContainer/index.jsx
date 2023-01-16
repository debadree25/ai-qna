import React from 'react';
import PropTypes from 'prop-types';
import ChatBubble from '../ChatBubble';
import useChatScroll from '../../hooks/scroll';

import styles from './index.module.css';

function ChatContainer({ messages, botThinking }) {
  const chatWindow = useChatScroll(messages);

  return (
    <main className={styles.container} ref={chatWindow}>
      {messages.map(({ speaker, content, timestamp }) => (
        <ChatBubble user={speaker} content={content} time={timestamp} />
      ))}
      {botThinking && (
        <ChatBubble user="ai" content="Thinking..." time={Date.now()} />
      )}
    </main>
  );
}

ChatContainer.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      speaker: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
    })
  ),
  botThinking: PropTypes.bool.isRequired,
};

export default ChatContainer;

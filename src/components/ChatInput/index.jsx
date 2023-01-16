import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.css';

function ChatInput({ onMessageByUser, botThinking }) {
  const [userInput, setUserInput] = useState('');

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.input}
        placeholder="Ask me anything"
        onChange={(e) => {
          setUserInput(e.target.value);
        }}
        value={userInput}
        disabled={botThinking}
      />
      <button
        type="submit"
        className={styles.btn}
        onClick={() => {
          onMessageByUser(userInput);
          setUserInput('');
        }}
        disabled={botThinking}
      >
        Send
      </button>
    </div>
  );
}

ChatInput.propTypes = {
  onMessageByUser: PropTypes.func.isRequired,
  botThinking: PropTypes.bool.isRequired,
};

export default ChatInput;

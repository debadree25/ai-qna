import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import styles from './index.module.css';

function ChatBubble({ user, content, time }) {
  return (
    <div
      className={`${styles.chat} ${
        styles[`${user === 'ai' ? 'left' : 'right'}`]
      }`}
    >
      <div
        className={styles.avatar}
        style={{
          backgroundImage: `url(${
            user === 'ai'
              ? 'https://media.istockphoto.com/id/178375366/photo/full-sphynx-profile-pyramid-giza-egypt.jpg?s=1024x1024&w=is&k=20&c=x7ll9KWn0zHskEOA6ButYuSwpr4UyEkQ8vI3aK202Y4='
              : null
          })`,
        }}
      />

      <div className={styles.bubble}>
        <div className={styles.info}>
          <div className={styles.name}>{user}</div>
          <div className={styles.time}>{moment(time).format('hh:mm A')}</div>
        </div>

        <div>{content}</div>
      </div>
    </div>
  );
}

ChatBubble.propTypes = {
  user: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
};

export default ChatBubble;

import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
  CssBaseline,
  useTheme,
  styled,
  Button
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SendOutlined } from '@ant-design/icons';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatarRobot from 'assets/images/users/avatar-robot.jpg';
import { useNavigate } from 'react-router';

const MessagesList = styled(List)({
  flex: 1,
  overflowY: 'auto',
  padding: '0 16px',
  '& .MuiListItem-root': {
    padding: '8px 0'
  }
});

const UserMessage = styled(ListItem)({
  flexDirection: 'row-reverse',
  '& .MuiListItemText-root': {
    alignItems: 'flex-end'
  }
});

const BotMessage = styled(ListItem)({
  flexDirection: 'row'
});

const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isuser'
})(({ theme, isuser }) => ({
  maxWidth: '70%',
  padding: theme.spacing(1.5, 2),
  borderRadius: isuser ? '18px 18px 0 18px' : '18px 18px 18px 0',
  backgroundColor: isuser ? theme.palette.primary.main : theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100],
  color: isuser ? theme.palette.primary.contrastText : theme.palette.text.primary,
  wordBreak: 'break-word',
  boxShadow: theme.shadows[1]
}));

const ChatInterface = ({ questionsList, handleQuestionnaireSubmit, setAnswersList }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const messagesEndRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    // Ask the first question when the component mounts
    if (messages.length === 0 && questionsList.length > 0) {
      setMessages([{ text: questionsList[0], isUser: false, id: Date.now() }]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    if (input.includes('@') && input.includes('.')) {
      localStorage.setItem('email', input);
    }
    const userMessage = {
      text: input,
      isUser: true,
      id: Date.now()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const nextIndex = questionIndex + 1;
      if (nextIndex < questionsList.length) {
        setMessages((prev) => [...prev, { text: questionsList[nextIndex], isUser: false, id: Date.now() + 1 }]);
        setQuestionIndex(nextIndex);
      } else {
        setAnswersList(messages.filter((message) => message.isUser).map((message) => message.text));
        setMessages((prev) => [...prev, { text: 'Thank you for answering all the questions!', isUser: false, id: Date.now() + 1 }]);
        setQuestionIndex(nextIndex);
      }
      setLoading(false);
    }, 1000);
  };

  const getButton = () => {
    if (questionIndex === questionsList.length - 1) {
      return (
        <Button
          size="large"
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => {
            handleSend();
            handleQuestionnaireSubmit();
          }}
        >
          Submit
        </Button>
      );
    }

    return (
      <IconButton
        onClick={handleSend}
        disabled={!input.trim()}
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark
          }
        }}
      >
        <SendOutlined />
      </IconButton>
    );
  };

  return (
    <Box
      sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: theme.palette.background.paper, overflow: 'hidden' }}
    >
      <MessagesList>
        {messages.map((message) =>
          message.isUser ? (
            <UserMessage key={message.id}>
              <ListItemAvatar>
                <Avatar src={avatar1} sx={{ bgcolor: theme.palette.primary.main }} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <MessageBubble sx={{ float: 'right', mr: '20px' }} isuser={message.isUser}>
                    {message.text}
                  </MessageBubble>
                }
              />
            </UserMessage>
          ) : (
            <BotMessage key={message.id}>
              <ListItemAvatar>
                <Avatar src={avatarRobot} sx={{ bgcolor: theme.palette.grey[700] }} />
              </ListItemAvatar>
              <ListItemText primary={<MessageBubble isuser={message.isUser}>{message.text}</MessageBubble>} />
            </BotMessage>
          )
        )}
        {loading && (
          <BotMessage>
            <ListItemAvatar>
              <Avatar src={avatarRobot} sx={{ bgcolor: theme.palette.grey[700] }} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <MessageBubble>
                  <CircularProgress size={20} color="inherit" />
                </MessageBubble>
              }
            />
          </BotMessage>
        )}
        <div ref={messagesEndRef} />
      </MessagesList>

      <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}`, backgroundColor: theme.palette.background.paper }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your answer..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '24px',
                backgroundColor: theme.palette.background.default
              }
            }}
          />
          {getButton()}
        </Box>
      </Box>
    </Box>
  );
};

const Chat = ({ questionsList, handleQuestionnaireSubmit, setAnswersList }) => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#6d48e5'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ChatInterface questionsList={questionsList} handleQuestionnaireSubmit={handleQuestionnaireSubmit} setAnswersList={setAnswersList} />
    </ThemeProvider>
  );
};

export default Chat;

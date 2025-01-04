import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TableDisplay from './TableDisplay'; // Importar el nuevo componente

// Archivo de prompts con formato de tabla
const prompts = {
  "こんにちは": "こんにちは　TO-LABOさん！何かお手伝いできますか？",
  "インスタグラムへの毎日の投稿を作成したいのですが、ラテンアメリカでのビジネスを促進するために、投稿時間、投稿内容、ストーリーも記載したグリッドを作成してください。":
    {
      table: [
        { 曜日: '月曜', 投稿内容: 'ブランドの物語', ストーリー内容: '工房での制作風景動画' },
        { 曜日: '火曜', 投稿内容: '商品特集', ストーリー内容: 'クリスタルが光る動画' },
        { 曜日: '水曜', 投稿内容: '顧客の声', ストーリー内容: '著名人のクリップ' },
        { 曜日: '木曜', 投稿内容: '文化の融合', ストーリー内容: '和柄と伝統模様' },
        { 曜日: '金曜', 投稿内容: '限定プロモーション', ストーリー内容: 'カウントダウンストーリー' },
        { 曜日: '土曜', 投稿内容: 'ライフスタイル提案', ストーリー内容: 'モデルの日常生活動画' },
        { 曜日: '日曜', 投稿内容: '感謝のメッセージ', ストーリー内容: 'コメント集めたストーリー' },
      ],
    },
};

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: 'こんにちは！何かお手伝いできますか？', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [tableData, setTableData] = useState(null); // Nuevo estado para los datos de tabla
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (input.trim() === '') return;

    // Agregar el mensaje del usuario
    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    // Simular respuesta del chatbot
    setTimeout(() => {
      const response = prompts[input];

      if (response && response.table) {
        setTableData(response.table); // Si la respuesta contiene datos de tabla, actualizar el estado
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response || '申し訳ありませんが、その質問に対する答えが見つかりません。', sender: 'bot' },
        ]);
        setTableData(null); // Limpiar los datos de tabla si no corresponde
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.container}>
        <div style={styles.header}>チャットボット</div>
        <div style={styles.chatWindow}>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                ...styles.message,
                alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: message.sender === 'user' ? '#F7DC6F' : '#E8E4DA',
              }}
            >
              {message.text}
            </motion.div>
          ))}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                ...styles.message,
                alignSelf: 'flex-start',
                backgroundColor: '#E8E4DA',
              }}
            >
              タイピング中...
            </motion.div>
          )}
        </div>
        {tableData && <TableDisplay data={tableData} />} {/* Mostrar la tabla si hay datos */}
        <div style={styles.inputArea}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={styles.input}
            placeholder="メッセージを入力..."
          />
          <button onClick={handleSend} style={styles.sendButton} disabled={loading}>
            送信
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  // Mantener el mismo estilo de antes
  outerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#4F774E',
  },
  container: {
    width: '400px',
    height: '600px',
    border: '2px solid #C4B998',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFFBEA',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    padding: '10px',
    backgroundColor: '#C4B998',
    color: '#4F774E',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '18px',
    borderRadius: '20px 20px 0 0',
  },
  chatWindow: {
    flex: 1,
    padding: '15px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  message: {
    maxWidth: '70%',
    padding: '10px',
    borderRadius: '10px',
    fontSize: '14px',
    lineHeight: '1.4',
    wordBreak: 'break-word',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  },
  inputArea: {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #C4B998',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '14px',
    border: '2px solid #C4B998',
    borderRadius: '10px',
    outline: 'none',
  },
  sendButton: {
    marginLeft: '10px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '10px',
    backgroundColor: '#F7DC6F',
    color: '#4F774E',
    cursor: 'pointer',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.2s',
  },
};

export default Chatbot;

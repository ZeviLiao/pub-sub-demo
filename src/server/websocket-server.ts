import { WebSocketServer } from 'ws';

const PORT = 8080;

const wss = new WebSocketServer({ port: PORT });

wss.on('connection', (ws) => {
  console.log('Client connected');

  // 一次性生成完整數據
  const completeData = {
    data: Array.from({ length: 10 }, (_, i) => ({
      counter: i + 1, // X 軸刻度
      value: Math.floor(Math.random() * 100), // 隨機整數 Y 值
    })),
  };

  // 發送完整數據給客戶端
  ws.send(JSON.stringify(completeData));

  // 關閉連線
  ws.close();

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

console.log(`WebSocket server is running on ws://localhost:${PORT}`);

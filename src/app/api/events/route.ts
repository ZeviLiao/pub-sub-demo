import { NextRequest, NextResponse } from 'next/server';

const clients: Map<string, any> = new Map(); // 存储客户端的控制器

// GET 请求处理 SSE 连接
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const clientId = url.searchParams.get('clientId'); // 从查询参数获取客户端 ID

  if (!clientId) {
    return new NextResponse('Client ID is required', { status: 400 });
  }

  const stream = new ReadableStream({
    start(controller) {
      // 将 `controller` 存储到 `clients` 中，供后续推送消息使用
      clients.set(clientId, controller);

      // 定期发送心跳包，保持连接
      const interval = setInterval(() => {
        controller.enqueue(':\n\n'); // SSE 心跳包
      }, 10000);

      // 当连接中断时清理
      req.signal.addEventListener('abort', () => {
        clearInterval(interval);
        clients.delete(clientId); // 从订阅列表中移除
      });
    },
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}

// POST 请求处理消息发布
export async function POST(req: NextRequest) {
  const { message } = await req.json();

  if (!message) {
    return NextResponse.json({ success: false, error: 'Message is required' }, { status: 400 });
  }

  // 遍历所有已订阅的客户端并发送消息
  clients.forEach((controller, clientId) => {
    const encoder = new TextEncoder();
    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ clientId, message })}\n\n`));
  });

  return NextResponse.json({ success: true });
}

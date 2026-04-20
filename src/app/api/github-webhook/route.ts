export async function POST(req: Request) {
  const body = await req.json();
  const event = req.headers.get('x-github-event');

  let content = '';

  // PR 이벤트
  if (event === 'pull_request') {
    content = `🟢 PR ${body.action}
제목: ${body.pull_request?.title}
작성자: ${body.pull_request?.user?.login}
링크: ${body.pull_request?.html_url}`;
  }

  // Push 이벤트
  if (event === 'push') {
    const branch = body.ref?.replace('refs/heads/', '');
    content = `🔵 Push 발생
브랜치: ${branch}
커밋 수: ${body.commits?.length ?? 0}`;
  }

  // Discord 전송
  if (content) {
    await fetch(process.env.DISCORD_WEBHOOK_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
  }

  return new Response('ok');
}

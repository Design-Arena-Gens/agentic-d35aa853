type Props = { role: 'assistant' | 'user'; content: string };

export default function MessageBubble({ role, content }: Props) {
  return (
    <div className={`message ${role}`}> 
      <div style={{ whiteSpace: 'pre-wrap' }}>{content}</div>
    </div>
  );
}

import React, { useEffect, useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [wsInstance, setWsInstance] = useState<any>(null);

  useEffect(() => {
    const serverAddress = "wss://puc-websocket-project.glitch.me/";

    const ws = new WebSocket(serverAddress);

    // ws.onopen = function () {
    //   ws.send("");
    // };

    ws.onmessage = function (event) {
      console.log("Received msg from the server: " + event.data);
      setMessages((prev) => [...prev, event.data]);
    };

    setWsInstance(ws);

    return () => {
      // Cleanup on unmount if ws wasn't closed already
      if (wsInstance?.readyState !== 3)
        setWsInstance((prev: any) => {
          return {
            ...prev,
            close: function (event: any) {
              console.log("Close socket", event);
            },
          };
        });
    };
  }, []);
  return (
    <div>
      Chat
      <ul>
        {messages.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/Home.module.css";
import Image from "next/image";

export default function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const [wsInstance, setWsInstance] = useState<any>(null);
  let duplicateUseEffectLocal = useRef<any>(false);

  const sendMessage = () => {
    console.log("AQUI");
    wsInstance.send(message);
  };

  function connect() {
    duplicateUseEffectLocal.current = true;
    const serverAddress = "wss://puc-websocket-project.glitch.me/";

    const ws = new WebSocket(serverAddress);

    ws.onmessage = function (event) {
      console.log("Received msg from the server: " + event.data);
      setMessages((prev) => [...prev, event.data]);
    };

    ws.onclose = function (e) {
      console.log(
        "Socket is closed. Reconnect will be attempted in 1 second.",
        e.reason
      );
      setTimeout(function () {
        connect();
      }, 1000);
    };

    setWsInstance(ws);
  }

  useEffect(() => {
    if (!duplicateUseEffectLocal.current) {
      connect();
    }
  }, []);

  return (
    <div className="p__4">
      <div className="flex justify__between align__center">
        <h1>Chat Júlio Moraes</h1>
        <h3>2023</h3>
      </div>
      <p className={`${styles.small__text} mt__1`}>Criando soluções</p>
      <hr></hr>
      <div className={`${styles.chat__container} mt__4`}>
        <h4 className="p__1">Chat em grupo</h4>
        <hr></hr>
        <div className={`${styles.message__container}`}>
          {messages.map((item, index) => {
            return (
              <div key={index} className={`${styles.messages}`}>
                {item}
              </div>
            );
          })}
        </div>
        <div className={`${styles.send__text__container}`}>
          <input
            type="text"
            name="message"
            placeholder="Digite uma mensagem"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              sendMessage();
            }}
          >
            <Image
              width={16}
              height={16}
              src="./paper.svg"
              alt={"Paper icon"}
            ></Image>
          </button>
        </div>
      </div>
    </div>
  );
}

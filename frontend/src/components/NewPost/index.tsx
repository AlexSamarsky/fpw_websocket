import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNewPostMutation } from "../../api/websocket";

export default function NewPost() {
  const [newPost] = useNewPostMutation();
  const [title, setTitle] = useState("Новая статья");
  const [text, setText] = useState("Пример статьи");

  const handleClick = () => {
    if (title && text) {
      newPost({ id: new Date().valueOf(), title: title, text: text });
      setTitle("");
      setText("");
    }
  };
  return (
    <>
      <div>Отправить новую новость</div>
      <Form.Control
        id="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Название статьи"
      ></Form.Control>
      <Form.Control
        id="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="Текст статьи"
      ></Form.Control>
      <Button onClick={handleClick}>Отправить</Button>
    </>
  );
}

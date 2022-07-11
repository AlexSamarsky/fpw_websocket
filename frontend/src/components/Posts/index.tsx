import React, { useEffect, useRef } from "react";
import { Button, Card } from "react-bootstrap";

import { useGetPostsQuery, getSocket } from "../../api/websocket";

import "./index.css";

export default function Posts() {
  const { data } = useGetPostsQuery();
  const timer: { current: NodeJS.Timeout | null } = useRef(null);

  const handleClick = () => {
    const ws = getSocket();
    ws.close();
    clearInterval(timer.current as NodeJS.Timeout);
    console.log("Socket closed");
  };

  useEffect(() => {
    timer.current = setInterval(() => {
      const ws = getSocket();
      console.log("check connection");
      if (ws) {
        try {
          ws.send("test");
        } catch (e) {
          console.log(e);
        }
      }
    }, 5000);
  }, []);

  return (
    <>
      <div className="content">
        <div className="center">
          <h1>Подписка на новости</h1>
        </div>
        <div>
          <Button className="" onClick={handleClick}>
            Close socket
          </Button>
        </div>
        <div className="posts_list">
          {data?.map((post) => {
            console.log(post.id);
            return (
              <div key={post.id}>
                <Card className="mt-2 mx-auto">
                  <Card.Title className="mt-2 mx-auto">
                    <h3 className="mx-auto">{post.title}</h3>
                  </Card.Title>
                  <Card.Body>{post.text}</Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8a5c2; /* Light pink */
`;

const Message = styled(motion.div)`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #333;
  margin-bottom: 20px;
`;

const Illustration = styled.img`
  max-width: 100%;
  height: auto;
`;

export default function ERR() {
  return (
    <>
      <Container>
        <Message
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title>Oops! Page not found</Title>
          <Illustration
            src="https://image.freepik.com/free-vector/cute-404-error-background-with-ghost_23-2148257387.jpg"
            alt="404 Illustration"
          />
        </Message>
      </Container>
    </>
  );
}

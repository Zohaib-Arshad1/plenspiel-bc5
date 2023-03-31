import React, { useState, useEffect } from "react";
import styled from "styled-components";

import InputField from "@/components/InputField";
import { useRouter } from "next/router";

const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  height: 100vh;
  display: flex;
  margin: 0 auto;
`;

const SideBar = styled.div`
  width: 40%;
  height: 100vh;
  background: url("/images/signup-img.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const MainArea = styled.div`
  width: 60%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-height: 588px;
  width: 440px;
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h1`
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 29px;
  color: #323b4b;
  margin-bottom: 10px;
`;

const SubHeading = styled.h4`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 29px;
  color: #8a94a6;
  margin-bottom: 42px;
`;

const Form = styled.form``;

const PasswordFill = styled.div`

  max-width: 90%;
  width: ${({ password }) => password.length * 10}%};
  height: 2px;
  background: ${({ password }) =>
    password.length > 6 ? "#38CB89" : "#FF5630"};
  border-radius: 15px;
  margin: 0 20px;
  margin-bottom: 20px;
  transition: width 0.5s ease-in-out;
`;

const index = () => {
  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    const isFormValid = Object.values(formData).every((value) => value);

    if (isFormValid && password.length >= 6) {
      console.log("Form is valid");
      setDisabled(false);
    }
  };

  const { email, name, password } = formData;

  useEffect(() => {
    // Check if auth token exists in cookie
    const authToken = document.cookie.authToken;
    if (authToken) {
      router.push("/dashboard");
    }
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Signup was successful, redirect the user to the dashboard
      const data = await response.json();

      // Store auth token in local storage
      localStorage.setItem("authToken", data.token);

      console.log(data);
      router.push("/dashboard");
    } else {
      // Signup failed, display an error message to the user
      const data = await response.json();
      console.error(data.message);
    }
  };

  return (
    <Container>
      <SideBar></SideBar>
      <MainArea>
        <Wrapper>
          <Heading>Getting Started</Heading>
          <SubHeading>Create an account to continue!</SubHeading>

          <Form onSubmit={handleFormSubmit}>
            <InputField
              name={"email"}
              type={"email"}
              placeholder={"Your Email"}
              value={email}
              handleChange={handleChange}
            />
            <InputField
              name={"name"}
              type={"text"}
              placeholder={"Your Name"}
              value={name}
              handleChange={handleChange}
            />
            <InputField
              name={"password"}
              type={"password"}
              placeholder={"Create Password"}
              handleChange={handleChange}
            />
            <PasswordFill password={password} />
            <InputField name={"Sign Up"} type={"submit"} disabled={disabled} />
          </Form>
        </Wrapper>
      </MainArea>
    </Container>
  );
};

export default index;

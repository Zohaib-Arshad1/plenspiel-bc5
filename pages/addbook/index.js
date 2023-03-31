import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";

import { useRouter } from "next/router";

import InputFieldD from "@/components/InputFieldD";

const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  height: 100vh;
  display: flex;
  margin: 0 auto;
`;

const SideBar = styled.div`
  width: 20%;
  height: 100vh;
  padding-left: 18px;
  border-right: 1px solid #f3f3f3;
`;

const MainArea = styled.div`
  width: 80%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 35px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  padding-top: 35px;
  display: block;
  margin: 0 auto;
  margin-bottom: 54px;
`;

const Navigation = styled.ul``;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding-left: 18px;
  width: 100%;
  height: 46px;
  cursor: pointer;
  margin-bottom: 5px;
  border-radius: 15px 0px 0px 15px;
  transition: 0.3s ease-in-out;

  &:hover {
    background: rgba(209, 192, 255, 0.44);
  }
`;

const NavIcon = styled.img`
  margin-right: 10px;
`;

const NavText = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 29px;
  color:color: #8A94A6;

  &:hover {
    color: #8053ff;
  }

`;

const Header = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 0px;
`;

const Username = styled.h4`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 23px;
  color: #323b4b;
`;

const Invert = styled.div`
  color: #b0b7c3;
`;

const Logout = styled.button`
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
`;

const LogoutIcon = styled.img``;

const NewBook = styled.div`
  width: 100%;
  height: 223px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafbfc;
  border-radius: 20px;
  padding: 35px;
  margin-bottom: 34px;
`;

const RegisteredBooks = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafbfc;
  border-radius: 20px;
  padding: 26px;
`;

const AddBook = styled.button`
  width: 100%;
  height: 152px;
  background: #ffffff;
  border: 1.5px dashed #c2c2c2;
  border-radius: 15px;
  cursor: pointer;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 29px;
  color: #b0b7c3;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #8053ff;
    border-color: #8053ff;
  }
`;

const Books = styled.div`
  position: relative;
  max-height: 845pxpx;
  max-width: 798px;
  width: 100%;
  background: #ffffff;
  border: 1px solid #bfbfbf;
  border-radius: 20px;
  padding 0px 67px 0px 67px;
`;

const Title = styled.div`
  height: 96px;
  display: flex;
  align-items: center;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: #0d2447;
  border-bottom: 1px solid #f3f3f3;
`;

const Form = styled.form`
  margin-top: 36px;
  margin-bottom: 200px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 26px;
`;

const SubmitButton = styled.input.attrs({ type: "submit" })`
  width: 798px;
  height: 97px;

  background: linear-gradient(270.65deg, #552ec5 1.37%, #8058f3 99.86%);
  border-radius: 0px 0px 20px 20px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 42px;
  color: #ffffff;
  border: none;
  outline: none;
  position: absolute;
  bottom: 0;
  left: 0;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color: #fff;
  }
`;

const Index = () => {
  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState({
    bookTitle: "",
    bookEdition: "",
    authorName: "",
    dob: "",
    isbn: "",
    country: "",
    yop: "",
    publisher: "",
    website: "",
  });

  const router = useRouter();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));

    const isFormValid = Object.values(formData).every((value) => value);

    if (isFormValid) {
      setDisabled(false);
    }
  };

  const { email, name } = formData;

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    //Get authToken form cookie
    const authToken = document.cookie.authToken;

    // Verify the token

    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);

    // Check if the token is valid
    if (!decodedToken || !decodedToken.id) {
      router.push("/signin");
    }

    const token = document.cookie.authToken;

    const response = await fetch("/api/addbook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Signup was successful, redirect the user to the dashboard
      const data = await response.json();

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
      <SideBar>
        <Logo src="/images/logo.svg" />
        <Navigation>
          <NavItem href="/dashboard">
            <NavIcon src="/images/dashboard-icon.svg" />
            <NavText>Dashboard</NavText>
          </NavItem>
          <NavItem href="/signup">
            <NavIcon src="/images/manage-copyright-icon.svg" />
            <NavText>Manage Copyrights</NavText>
          </NavItem>
          <NavItem href="/signup">
            <NavIcon src="/images/more-services-icon.svg" />
            <NavText>More Services</NavText>
          </NavItem>
          <NavItem href="/signup">
            <NavIcon src="/images/faq-icon.svg" />
            <NavText>FAQ</NavText>
          </NavItem>
          <NavItem href="/signup">
            <NavIcon src="/images/profile-icon.svg" />
            <NavText>Profile</NavText>
          </NavItem>
        </Navigation>
      </SideBar>

      <MainArea>
        <Header>
          <Username>
            Hi, John Doe <br />
            <Invert>Welcome back!</Invert>
          </Username>

          <Logout>
            <LogoutIcon src="/images/logout-icon.svg" />
          </Logout>
        </Header>
        <Wrapper>
          <RegisteredBooks>
            <Books>
              <Title>Add New Book</Title>
              <Form onSubmit={handleFormSubmit}>
                <InputWrapper>
                  <InputFieldD
                    name="bookTitle"
                    label={"Book Title"}
                    type={"text"}
                    onChange={handleChange}
                  />
                  <InputFieldD
                    name="bookEdition"
                    label={"Book Edition"}
                    type={"text"}
                    onChange={handleChange}
                  />
                </InputWrapper>

                <InputWrapper>
                  <InputFieldD
                    name="authorName"
                    label={"Author Name"}
                    type={"text"}
                    onChange={handleChange}
                  />
                  <InputFieldD
                    name="dob"
                    label={"Date of Birth"}
                    type={"date"}
                    onChange={handleChange}
                  />
                </InputWrapper>

                <InputWrapper>
                  <InputFieldD
                    name="isbn"
                    label={"ISBN Number"}
                    type={"text"}
                    onChange={handleChange}
                  />
                  <InputFieldD
                    name="country"
                    label={"Country/Origin"}
                    type={"text"}
                    onChange={handleChange}
                  />
                </InputWrapper>

                <InputWrapper>
                  <InputFieldD
                    name="yop"
                    label={"Year of publication"}
                    type={"text"}
                    onChange={handleChange}
                  />
                  <InputFieldD
                    name="publisher"
                    label={"Publisher"}
                    type={"text"}
                    onChange={handleChange}
                  />
                </InputWrapper>

                <InputWrapper>
                  <InputFieldD
                    name="website"
                    label={"Your Website"}
                    type={"url"}
                    fullWidth={true}
                    onChange={handleChange}
                  />
                </InputWrapper>

                <SubmitButton
                  type="submit"
                  value="ADD NOW"
                  name="submit"
                  disabled={disabled}
                />
              </Form>
            </Books>
          </RegisteredBooks>
        </Wrapper>
      </MainArea>
    </Container>
  );
};

export default React.memo(Index);

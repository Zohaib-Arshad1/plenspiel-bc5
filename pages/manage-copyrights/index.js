import React from "react";
import styled from "styled-components";
import Link from "next/link";
import jwt from "jsonwebtoken";
import PDFDocument from "pdfkit-browserify";
import blobStream from "blob-stream";

import SideBar from "@/components/SideBar";
import Header from "@/components/Header";

const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  height: 100vh;
  display: flex;
  margin: 0 auto;
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

const AddBook = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 100%;
  background: #ffffff;
  border-radius: 15px;
  padding: 31px 45px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  width: 100%;
  height: 51px;
  background: #fafbfc;
  border-radius: 15px;
`;

const HeadRow = styled.tr`
  height: 51px;
  background: #fafbfc;
  border-radius: 15px;
`;

const TableRow = styled.tr`
  height: 51px;

  border-radius: 15px;
  padding: 0px 48px;
`;

const TableHeading = styled.th`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 24px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #4e5d78;
  text-align: center;
`;

const SingleBook = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: 0px 4px 14px rgba(174, 174, 174, 0.15);
  border-radius: 15px;
  padding: 0px 20px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #f3f3f3;
  }
`;

const TableData = styled.td`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 51px;
  text-transform: capitalize;
  color: #4e5d78;
  text-align: center;
  padding-top: 20px;
`;
const Isbn = styled.div`
  max-width: 25%;
  width: 96px;
  height: 26px;
  background: #ebe3ff;
  border-radius: 15px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 29px;
  text-align: center;
  color: #5a33c9;
`;
const Certificate = styled.button`
  width: 140px;
  height: 52px;
  background: linear-gradient(97.85deg, #926cff 0%, #4b24bb 100%);
  border-radius: 10px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 29px;
  text-transform: uppercase;
  color: #ffffff;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
`;

const BookIcon = styled.img`
  margin-right: 20px;
`;

const DownloadButton = styled.button`
  width: 140px;
  height: 52px;
  background: linear-gradient(97.85deg, #926cff 0%, #4b24bb 100%);
  border-radius: 10px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 29px;
  outline: none;
  border: none;
  text-transform: uppercase;
  color: #ffffff;
  cursor: pointer;

  transition: all 0.3s ease-in-out;

  &:hover {
    background: linear-gradient(97.85deg, #4b24bb 0%, #926cff 100%);
  }
`;

const Index = ({ books, loggedInUser }) => {
  async function generateAndDownloadCertificate(
    bookTitle,
    bookEdition,
    dob,
    yop,
    publisher,
    website,
    country,
    publishingDate,
    authorName,
    isbn,
    hash,
    blockHash,
    transactionHash
  ) {
    try {
      //Block chain url
      const url = `https://goerli.etherscan.io/tx/${transactionHash}`;

      // Create a new PDF document
      const doc = new PDFDocument();

      // Set the document title
      doc.info.Title = "Block chain certificate";

      // Add some content to the document
      doc.fontSize(18).text("Block chain certificate", {
        align: "center",
      });
      doc
        .fontSize(14)
        .text(`User Data`, 100, 120, { fontWeight: "bold", underline: true });
      doc.fontSize(12).text(`Book Name:  ${bookTitle}`, 100, 150);
      doc.fontSize(12).text(`Author:  ${authorName}`, 100, 170);
      doc.fontSize(12).text(`Book Edition: ${bookEdition}`, 100, 190);
      doc.fontSize(12).text(`ISBN Number: ${isbn}`, 100, 210);
      doc.fontSize(12).text(`Year of Publication: ${yop}`, 100, 230);
      doc.fontSize(12).text(`Publishing Date: ${publishingDate}`, 100, 250);
      doc.fontSize(12).text(`Publisher: ${publisher}.`, 100, 270);
      doc.fontSize(12).text(`Country: ${country}.`, 100, 290);
      doc.fontSize(12).text(`Website: ${website}.`, 100, 310);

      doc.fontSize(14).text(`Transaction Data`, 100, 340, {
        fontWeight: "bold",
        underline: true,
      });
      doc.fontSize(12).text(`Book Hash: ${hash}.`, 100, 360);
      doc.fontSize(12).text(`Block Hash: ${blockHash}.`, 100, 400);
      doc.fontSize(12).text(`Transaction Hash: ${transactionHash}.`, 100, 440);
      doc
        .fontSize(12)
        .fillColor("blue")
        .text("Verify Transaction on BlockChain", 100, 480, {
          link: url,
          underline: true,
        });

      // Create a new blob stream
      const stream = doc.pipe(blobStream());

      // When the PDF is finished, generate a blob and download it
      stream.on("finish", () => {
        const url = stream.toBlobURL("application/pdf");
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = "certificate.pdf";
        a.click();
        document.body.removeChild(a);
      });

      // End the document to finalize the PDF
      doc.end();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container>
      <SideBar />
      <MainArea>
        <Header user={loggedInUser} />

        <Wrapper>
          <RegisteredBooks>
            <Books>
              <Table>
                <TableHead>
                  <HeadRow>
                    <TableHeading>Book Title</TableHeading>
                    <TableHeading>Registration Date</TableHeading>
                    <TableHeading>Author</TableHeading>
                    <TableHeading>ISBN</TableHeading>
                    <TableHeading>Certificate</TableHeading>
                  </HeadRow>
                </TableHead>
                <tbody>
                  {books &&
                    books.map((book) => (
                      <TableRow key={book._id}>
                        <TableData
                          style={{
                            display: "flex",
                            alignItem: "center",
                            justifyContent: "flex-start",
                            paddingLeft: "0px",
                          }}
                          key={book._id}
                        >
                          <BookIcon src="/images/book-icon.svg" />{" "}
                          {book.bookTitle}
                        </TableData>
                        <TableData>{book.publishingDate}</TableData>
                        <TableData>{book.authorName}</TableData>
                        <TableData>{book.isbn}</TableData>

                        <TableData>
                          <DownloadButton
                            onClick={() =>
                              generateAndDownloadCertificate(
                                book.bookTitle,
                                book.bookEdition,
                                book.dob,
                                book.yop,
                                book.publisher,
                                book.website,
                                book.country,
                                book.publishingDate,
                                book.authorName,
                                book.isbn,
                                book.hash,
                                book.txReceipt.blockHash,
                                book.txReceipt.transactionHash
                              )
                            }
                          >
                            Download
                          </DownloadButton>
                        </TableData>
                      </TableRow>
                    ))}
                </tbody>
              </Table>
            </Books>
          </RegisteredBooks>
        </Wrapper>
      </MainArea>
    </Container>
  );
};

export const getServerSideProps = async (ctx) => {
  const authToken = ctx.req.cookies.authToken;
  const userCookie = ctx.req.cookies.loggedInUser;
  let user = null;
  if (userCookie) {
    user = JSON.parse(userCookie);
  }

  if (authToken) {
    const verifyToken = jwt.verify(authToken, process.env.JWT_SECRET);

    if (!verifyToken || !verifyToken.id) {
      res.writeHead(302, { Location: "/signin" });
      res.end();
    }

    const result = await fetch(`${process.env.BASE_URL}/api/getbooks`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await result.json();

    return {
      props: {
        books: data.books,
        loggedInUser: user,
      },
    };
  } else {
    return {
      props: {
        books: [],
        loggedInUser: user,
      },
    };
  }
};

export default React.memo(Index);

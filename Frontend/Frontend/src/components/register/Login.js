import { useContext, useState } from "react";
import logo from "../pics/logo-no-background.png";
import axios from "axios";
import Form from "../form/Form";
import Label from "../form/Label";
import Input from "../form/Input";
import Image from "../form/Image";
import Button from "../form/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const encodedCredentials = btoa(email + ":" + password);
  const authHeader = "Basic " + encodedCredentials;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3117/login", null, {
        withCredentials: true,
        headers: {
          Authorization: authHeader,
        },
      })
      .then((data) => {
        const userName = data.data;
        login(userName);

        toast.success(
          `Welcome cute, ${userName.userName}. Have fun checking places to visit`,
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
          }
        );

        navigate("/");
      })
      .catch((error) => {
          toast.error("🤯 " + error.response.data , {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        ;
      });
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Image style={{  width: "90px",
     height: "90px", }} src={logo} alt="Logo" />
      <Form style={{ display: "flex", flexDirection: "column", alignItems: "center" }} onSubmit={handleSubmit}>
        <Label>Email:</Label>
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label>Password:</Label>
        <Input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button defaultColor="pink" activeColor="#623791">
          Log in
        </Button>
      </Form>
    </div>
  );
}

export default Login;

import { useState } from "react";
import logo from "../pics/logo-no-background.png";
import { useAddUserMutation } from "../../store";
import { useNavigate } from "react-router-dom";
import Form from "../form/Form";
import Label from "../form/Label";
import Input from "../form/Input";
import Image from "../form/Image";
import Button from "../form/Button";
import { toast } from "react-toastify";
import { useEffect } from "react";

const loading = new Promise((pending) => setTimeout(pending, 3000));
const success = new Promise((resolve) => setTimeout(resolve, 3000));

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const [AddUser, results] = useAddUserMutation();
  const user = { email, password, userName };
  const handleSubmit = (e) => {
    e.preventDefault();

    AddUser(user);
  };

  useEffect(() => {
    if (results.isLoading) {
      toast.promise(loading, {
        pending: "Registering...",
      });
    }

    if (results.isError) {
      Object.values(results.error.data.errors).map((err) =>
        toast.error("🤯 " + err, {
          position: "top-right",
          autoClose: true,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      );
    }
    if (results.isSuccess) {
      toast.promise(success, {
        success: "Registered successfully 👌",
      });
      setEmail("");
      setPassword("");
      setUserName("");
      navigate("/");
    }
  }, [results, navigate]);

  return (
    <div
    style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Image style={{  width: "90px",
     height: "90px", }} src={logo} alt="Logo" />
      <Form style={{ display: "flex", flexDirection: "column", alignItems: "center" }} onSubmit={handleSubmit}>
        <Label>Name:</Label>
        <Input value={userName} onChange={(e) => setUserName(e.target.value)} />
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
          Sign Up
        </Button>
      </Form>
    </div>
  );
}

export default Register;

import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from '../../../redux/slices/authSlice.ts';


const AuthRegister = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const dispatch: any = useDispatch();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    dispatch(register({ username, email, password }));
  };

  return (
    <>
      <form className="mt-6">
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name" />
          </div>
          <TextInput
            id="name"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            sizing="md"
            className="form-control"
          />
        </div>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="emadd" value="Email Address" />
          </div>
          <TextInput
            id="emadd"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            sizing="md"
            className="form-control"
          />
        </div>
        <div className="mb-6">
          <div className="mb-2 block">
            <Label htmlFor="userpwd" value="Password" />
          </div>
          <TextInput
            id="userpwd"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            sizing="md"
            className="form-control"
          />
        </div> 
        <Button color={'primary'} onClick={handleRegister} className="rounded-md  w-full">Sign Up</Button> 
        
      </form>
    </>
  )
}

export default AuthRegister

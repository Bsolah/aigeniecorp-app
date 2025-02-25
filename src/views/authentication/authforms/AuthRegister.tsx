import { Button, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, resetError } from '../../../redux/slices/authSlice.ts';
import ErrorBanner from "src/components/shared/ErrorBanner.tsx";

const AuthRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [organization, setOrganization] = useState('');
  const dispatch: any = useDispatch();
  const { error } = useSelector((state: any) => state.auth);

  const handleRegister = async (e: any) => {
    e.preventDefault();
    dispatch(register({ username, org: organization, email, password }));
  };

  return (
    <>
      {(error?.status) && (<ErrorBanner information={error.message} action={() => dispatch(resetError())} />)}

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
            <Label htmlFor="org" value="Organization" />
          </div>
          <TextInput
            id="org"
            type="text"
            onChange={(e) => setOrganization(e.target.value)}
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
        <Button color={'primary'} onClick={handleRegister} className="rounded-md  w-full">
          Sign Up
        </Button>
      </form >
    </>
  );
};

export default AuthRegister;

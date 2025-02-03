import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { login, resetError } from '../../../redux/slices/authSlice.ts';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import { AppDispatch } from '../../../redux/store.ts';
import { Link } from "react-router";
import ErrorBanner from "src/components/shared/ErrorBanner.tsx";


const AuthLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const { error } = useSelector((state: any) => state.auth);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <>
      {error && (<ErrorBanner information={'Failed to login'} action={() => dispatch(resetError())} />)}

      <form className="mt-6">
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="Username" value="Username" />
          </div>
          <TextInput
            id="username"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            sizing="md"
            className="form-control"
          />
        </div>
        <div className="mb-4">
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
        <div className="flex justify-between my-5">
          <div className="flex items-center gap-2">
            <Checkbox id="accept" className="checkbox" />
            <Label
              htmlFor="accept"
              className="opacity-90 font-normal cursor-pointer"
            >
              Remember this Device
            </Label>
          </div>
          <Link to={"/auth/auth1/forgot-password"} className="text-primary text-sm font-medium">
            Forgot Password ?
          </Link>
        </div>
        <Button color={"primary"} onClick={handleLogin} className="rounded-md w-full">
          Sign in
        </Button>
      </form>
    </>
  );
};

export default AuthLogin;

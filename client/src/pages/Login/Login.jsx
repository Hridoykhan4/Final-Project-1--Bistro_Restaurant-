import { Helmet } from "react-helmet-async";
import loginImg from "../../assets/others/authentication.gif";
const Login = () => {
  return (
    <section>
      <Helmet>
        <title>Bistro Boss - Login</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col sm:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitat
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body">
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Password"
                />

                <input
                  className="btn btn-neutral"
                  type="submit"
                  value="Login"
                />
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

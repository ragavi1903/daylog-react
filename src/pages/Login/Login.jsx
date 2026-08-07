import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDayLog } from "../../context/DayLogContext";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useDayLog();

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email) {
      alert("Please fill all fields");
      return;
    }

    setUser(form);
    localStorage.setItem("daylog_user", JSON.stringify(form));
    navigate("/");
  }

  return (
    <div className="login-page">
      <div className="login-container">
        
        <div className="login-left">
          <div className="brand">
            <h1>DAYLOG</h1>
            <p>Personal Productivity Dashboard</p>
          </div>

          <div className="hero-text">
            <h2>Track your day. Improve your habits.</h2>
            <p>
              DayLog helps you log daily activities, analyze your
              productivity, and discover where your time is spent.
            </p>
          </div>

          <div className="features">
            <div className="feature">
              <span>📊</span>
              <p>Analyze weekly and monthly activity patterns</p>
            </div>
            <div className="feature">
              <span>⏱️</span>
              <p>Track productive and unproductive time</p>
            </div>
            <div className="feature">
              <span>📈</span>
              <p>Monitor your personal improvement over time</p>
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="login-card">
            <h2>Welcome Back</h2>
            <p>Login to continue tracking your day.</p>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
              </div>

              <button type="submit">Login</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
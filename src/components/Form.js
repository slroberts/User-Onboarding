import React, {useState, useEffect} from "react";
import * as yup from "yup";
import axios from "axios";

const Form = () => {
  const [post, setPost] = useState([]);

  const [serverError, setServerError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    terms: true,
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  });

  const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    email: yup
      .string()
      .email("Must be a valid email address")
      .required("Email is a required field"),
    password: yup.string().required("Password is a required field"),
    terms: yup.boolean().oneOf([true]),
  });

  useEffect(() => {
    formSchema.isValid(formData).then((isFormValid) => {
      setButtonDisabled(!isFormValid);
    });
  }, [formData, formSchema]);

  const validateChange = (event) => {
    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then((inputIsValid) => {
        setErrors({
          ...errors,
          [event.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [event.target.name]: err.errors[0],
        });
      });
  };

  const formInputChange = (event) => {
    event.persist();
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    validateChange(event);
  };

  const formSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/users", formData)
      .then((res) => {
        setPost(res.data);

        setFormData({
          name: "",
          email: "",
          password: "",
          terms: true,
        });
        setServerError(null);
      })
      .catch((err) => {
        setServerError("oops! something's not right!");
      });
  };

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="name">
        Name
        <input
          id="name"
          type="text"
          name="name"
          onChange={formInputChange}
          value={formData.name}
        />
        {errors.name.length > 0 ? <p>{errors.name}</p> : null}
      </label>
      <label htmlFor="email">
        Email
        <input
          id="email"
          type="email"
          name="email"
          onChange={formInputChange}
          value={formData.email}
        />
        {errors.email.length > 0 ? <p>{errors.email}</p> : null}{" "}
      </label>
      <label htmlFor="password">
        Password
        <input
          id="password"
          type="password"
          name="password"
          onChange={formInputChange}
          value={formData.password}
        />
        {errors.password.length > 0 ? <p>{errors.password}</p> : null}
      </label>
      <label htmlFor="terms">
        <input
          id="terms"
          type="checkbox"
          name="terms"
          onChange={formInputChange}
          checked={formData.terms}
        />{" "}
        Terms of Service
        {errors.terms.length > 0 ? <p>{errors.terms}</p> : null}
      </label>
      <button type="submit" disabled={buttonDisabled}>
        Submit
      </button>

      <p>{JSON.stringify(post, null, 2)}</p>
    </form>
  );
};

export default Form;

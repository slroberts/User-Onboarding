import React, {useState, useEffect} from "react";
import * as yup from "yup";
import axios from "axios";
import {Form, Input, TextArea, Button, Label} from "semantic-ui-react";

const UserForm = () => {
  const [user, setUser] = useState([]);

  const [serverError, setServerError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    terms: true,
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    terms: "",
  });

  const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    email: yup
      .string()
      .email("Must be a valid email address")
      .required("Email is a required field"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is a required field"),
    role: yup.mixed().oneOf(["frontend", "backend", "ux", "pm"]),
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
        setUser(res.data);

        setFormData({
          name: "",
          email: "",
          password: "",
          role: "",
          terms: true,
        });
        setServerError(null);
      })
      .catch((err) => {
        setServerError("oops! something's not right!");
      });
  };

  return (
    <Form onSubmit={formSubmit}>
      <Form.Field>
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          placeholder="John/Jane Doe"
          name="name"
          onChange={formInputChange}
          value={formData.name}
        />
        {errors.name.length > 0 ? (
          <Label color="red" pointing>
            {errors.name}
          </Label>
        ) : null}
      </Form.Field>
      <Form.Field>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          placeholder="name@company.com"
          name="email"
          onChange={formInputChange}
          value={formData.email}
        />
        {errors.email.length > 0 ? (
          <Label color="red" pointing>
            {errors.email}
          </Label>
        ) : null}
      </Form.Field>
      <Form.Field>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          onChange={formInputChange}
          value={formData.password}
        />
        {errors.password.length > 0 ? (
          <Label color="red" pointing>
            {errors.password}
          </Label>
        ) : null}
      </Form.Field>
      <Form.Field>
        <label htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          onChange={formInputChange}
          value={formData.role}
        >
          <option value="">--Select Role--</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="ux">UX Designer</option>
          <option value="pm">Project Manager</option>
        </select>
      </Form.Field>

      <Form.Field
        label="Terms of Service"
        id="terms"
        control="input"
        type="checkbox"
        name="terms"
        onChange={formInputChange}
        checked={formData.terms}
      />
      {errors.terms.length > 0 ? <p>{errors.terms}</p> : null}

      <Button id="button" disabled={buttonDisabled} color="blue">
        Submit
      </Button>
      <p>{JSON.stringify(user, null, 2)}</p>
    </Form>
  );
};

export default UserForm;

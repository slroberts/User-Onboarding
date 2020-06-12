import React, {useState, useEffect} from "react";
import * as Yup from "yup";
import axios from "axios";
import {Form, Button, Label, Checkbox} from "semantic-ui-react";

const formSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name should be a minimun or two letters")
    .required("Name is a required field"),
  email: Yup.string()
    .email("Must be a valid email address")
    .required("Email is a required field"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is a required field"),
  role: Yup.mixed().oneOf(["frontend", "backend", "ux", "pm"]),
  terms: Yup.boolean().oneOf([true], "Please agree to terms of use"),
});

const UserForm = () => {
  const [user, setUser] = useState([]);

  const [serverError, setServerError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    terms: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    terms: "",
  });

  useEffect(() => {
    formSchema.isValid(formData).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formData]);

  const validateChange = (event) => {
    Yup.reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then((valid) => {
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
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    });
    validateChange(event);
  };

  const formSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/users", formData)
      .then((res) => {
        setUser([...user, res.data]);

        setFormData({
          name: "",
          email: "",
          password: "",
          role: "",
          terms: "",
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
          data-cy="name"
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
          data-cy="email"
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
          data-cy="password"
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
          data-cy="role"
          onChange={formInputChange}
          value={formData.role}
        >
          <option>--Select Role--</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="ux">UX Designer</option>
          <option value="pm">Project Manager</option>
        </select>
      </Form.Field>

      <Form.Field>
        <Checkbox
          label="Terms of Service"
          id="terms"
          control="input"
          name="terms"
          data-cy="terms"
          onChange={formInputChange}
          checked={formData.terms}
        />
        {/* {errors.terms.length > 0 ? <p>{errors.terms}</p> : null} */}
      </Form.Field>

      <Button
        id="button"
        data-cy="submit"
        disabled={buttonDisabled}
        color="blue"
      >
        Submit
      </Button>
      <p>{JSON.stringify(user, null, 2)}</p>
    </Form>
  );
};

export default UserForm;

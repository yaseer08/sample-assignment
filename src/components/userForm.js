import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "../App.css";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Radio,
  RadioGroup,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import createUserThunk from "../redux/actions/createUserAction";
import updateUserThunk from "../redux/actions/updateUserAction"

const Mode = {
  EDIT: "EDIT",
  ADD: "ADD",
};
const Role = {
  ADMIN: "Admin",
  REGULAR: "Regular",
};

export default function UserForm({ user, onDrawerOpen, onDrawerClose }) {
  const dispatch = useDispatch();
  const mode = Object.keys(user).length ? Mode.EDIT : Mode.ADD;

  const [userForm, setUserForm] = useState({
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    avatar: "",
    mobile_number: "",
    role: "",
  });

  useEffect(() => {
    setUserForm(
      mode === Mode.EDIT
        ? { ...user }
        : {
            id: "",
            first_name: "",
            email: "",
            last_name: "",
            avatar: "",
            mobile_number: "",
            role: "",
          }
    );
  }, [user]);

  const handleChange = (userObj) => {
    setUserForm(userObj);
    if (mode === Mode.ADD) {
      dispatch(createUserThunk(userObj));
    } else {
      dispatch(updateUserThunk(userObj));
    }
    onDrawerClose();
  };

  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Email is Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }

  function validateURL(value) {
    let error;
    const url_regex =
      "https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)";
    if (!url_regex.test(value)) {
      error = "Invalid Url address";
    }
    return error;
  }

  function validateMobileNumber(value) {
    let error;
    if (!value) {
      error = "Mobile Number Required";
    } else if (/^[0]?[789]\d{9}$/.test(value)) {
      error = "Invalid Mobile Number address";
    }
    return error;
  }

  return (
    <>
      <Drawer
        isOpen={onDrawerOpen}
        placement="right"
        onClose={onDrawerClose}
        sizes={"sm"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Create a new account
          </DrawerHeader>

          <DrawerBody>
            <Formik
              initialValues={userForm}
              onSubmit={(values, actions) => {
                handleChange(values);
              }}
            >
              {(props) => (
                <Form>
                  <Box p="2">
                    <Field name="first_name">
                      {({ field }) => (
                        <FormControl isRequired>
                          <FormLabel htmlFor="first_name">First name</FormLabel>
                          <Input {...field} id="first_name" />
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box p="2">
                    <Field name="last_name">
                      {({ field, form }) => (
                        <FormControl isRequired>
                          <FormLabel htmlFor="last_name">Last name</FormLabel>
                          <Input {...field} id="last_name" />
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box p="2">
                    <Field name="email" validate={validateEmail}>
                      {({ field, form }) => (
                        <FormControl
                          isRequired
                          isInvalid={form.errors.email && form.touched.email}
                        >
                          <FormLabel htmlFor="email">Email</FormLabel>
                          <Input {...field} id="email" />
                          <FormErrorMessage>
                            {form.errors.email}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box p="2">
                    <Field name="mobile_number">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.mobile_number &&
                            form.touched.mobile_number
                          }
                        >
                          <FormLabel htmlFor="mobile_number">Mobile Number</FormLabel>
                          <Input
                            {...field}
                            id="mobile_number"
                            type="tel"
                            placeholder="mobile number"
                          />
                          <FormErrorMessage>
                            {form.errors.mobile_number}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box p="2">
                    <Field name="role">
                      {({ field, form }) => (
                        <FormControl
                          isRequired
                          id="role"
                          isInvalid={!!form.errors.role && !!form.touched.role}
                        >
                          <FormLabel htmlFor="role">Role</FormLabel>
                          <RadioGroup {...field} id="role">
                            <Radio
                              {...field}
                              colorScheme="teal"
                              value={Role.ADMIN}
                            >
                              {Role.ADMIN}
                            </Radio>
                            <Radio
                              ml="3"
                              {...field}
                              colorScheme="teal"
                              value={Role.REGULAR}
                            >
                              {Role.REGULAR}
                            </Radio>
                          </RadioGroup>
                          <FormErrorMessage>
                            {form.errors.role}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <div className="form-button-container">
                    <Button
                      ml="1"
                      width="265px"
                      mt={4}
                      colorScheme="teal"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

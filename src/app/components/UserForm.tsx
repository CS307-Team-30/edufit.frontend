import axios from 'axios';
import { ErrorMessage,Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  subject: string;
  message: string;
  howDidYouHear: string;

}


const formatPhoneNumber = (value: string) => {
  const phoneNumber = value.replace(/[^\d]/g, '');
  const areaCode = phoneNumber.slice(0, 3);
  const firstPart = phoneNumber.slice(3, 6);
  const secondPart = phoneNumber.slice(6, 10);

  if (phoneNumber.length <= 3) {
    return areaCode;
  } else if (phoneNumber.length <= 6) {
    return `(${areaCode}) ${firstPart}`;
  } else {
    return `(${areaCode}) ${firstPart}-${secondPart}`;
  }
};


const initialValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address: '',
  subject: '',
  howDidYouHear: '',
  message: '',
};

const phoneRegExp = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$$/


const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Required'),
  address: Yup.string().required('Required'),
  subject: Yup.string().required('Required'),
  message: Yup.string().required('Required'),
  howDidYouHear: Yup.string(),
});

const UserForm: React.FC = () => {



  return (
    <div className="lg:grid lg:grid-cols-2  flex flex-col w-full bg-brown text-bg px-12 md:px-24 pb-16">
      <div className=" pt-16 flex flex-col w-full justify-center items-center">
        <h2 className='mb-8'>Update information</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={(values, actions) => {
            axios.post(JSON.stringify(values, null, 2)).then((response) => console.log(response)).catch((error) => console.log(error));
            actions.setSubmitting(false);
          }}
        >
          {({ errors, touched }: FormikProps<FormValues>) => (
            <Form className="">
              <div className='flex flex-row space-x-4 w-full'>

                <div className="mb-4">
                  <label className="block  text-sm font-bold mb-2" htmlFor="firstName">
                    First Name
                  </label>
                  <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" name="firstName" placeholder="John" />
                  <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="mb-4">
                  <label className="block  text-sm font-bold mb-2" htmlFor="lastName">
                    Last Name
                  </label>
                  <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" name="lastName" placeholder="Doe" />
                  <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>


              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" placeholder="john@doe.com" type="email" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>


              {/* Phone Number field */}
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <Field
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  render={({ field, form }: FieldProps<any>) => (
                    <input
                      {...field}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Phone Number"
                      value={formatPhoneNumber(field.value)}
                      onChange={(e) => {
                        const formattedValue = formatPhoneNumber(e.target.value);
                        form.setFieldValue('phoneNumber', formattedValue);
                      }}
                    />
                  )}
                />
                <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Address field */}
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="address">
                  Address
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="address"
                  name="address"
                  placeholder="Address"
                  type="text"
                />
                <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              {/* Subject field */}
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="subject">
                  Subject
                </label>
                <Field
                  as="select"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                >
                  <option value="" disabled hidden>
                    Select a subject
                  </option>
                  <option value="Option 1">Option 1</option>
                  <option value="Option 2">Option 2</option>
                  <option value="Option 3">Option 3</option>
                  <option value="Option 4">Option 4</option>
                  <option value="Option 5">Option 5</option>
                  <option value="Option 6">Option 6</option>
                  <option value="Option 7">Option 7</option>
                  <option value="Option 8">Option 8</option>
                </Field>
                <ErrorMessage name="subject" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/** Message field */}
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="message">
                  Message
                </label>
                <Field
                  className="h-20 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="message"
                  name="message"
                  placeholder="Message"
                  type="message"
                  component="textarea"
                />
                <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
              </div>

    

              <button
                type="submit"
                className=" bg-pink-300 bg-fg mt-4 hover:-translate-y-1 transition-transform duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
              <button
                type="reset"
                className="ml-4 bg-pink-300 bg-fg mt-4 hover:-translate-y-1 transition-transform duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Reset
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserForm;
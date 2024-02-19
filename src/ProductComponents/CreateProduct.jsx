import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form,Field,ErrorMessage } from "formik";
import { FormLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { FormControl } from "react-bootstrap";
import { FormCheck } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

function CreateProduct() {
  const initialValues = {
    name: "",
    description: "",
    price: "",
    category: "",
    style: "",
    color: "",
    size: "",
    quantity: "",
    shipping: false,
    image: null,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required"),
    category: Yup.string().required("Category is required"),
    style: Yup.string().required("Style is required"),
    color: Yup.string().required("Color is required"),
    size: Yup.string().required("Size is required").oneOf(["s", "m", "l", "xl"], "Invalid size"),
    quantity: Yup.number().required("Quantity is required"),
    shipping: Yup.boolean().required("Shipping is required"),
    image: Yup.mixed().required("Image is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/products/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      toast.success("Product created successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error creating product");
    }
    setSubmitting(false);
  };

  return (
    <div className="container products-text">
      <h1>Create Product</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Field
              type="text"
              name="name"
              as={FormControl}
              placeholder="Name"
            />
            <ErrorMessage name="name" component="div" />

            <FormLabel htmlFor="description">Description</FormLabel>
            <Field
              type="text"
              name="description"
              as={FormControl}
              placeholder="Description"
            />
            <ErrorMessage name="description" component="div" />

            <FormLabel htmlFor="price">Price</FormLabel>
            <Field
              type="number"
              name="price"
              as={FormControl}
              placeholder="Price"
            />
            <ErrorMessage name="price" component="div" />

            <FormLabel htmlFor="category">Category</FormLabel>
            <Field
              type="text"
              name="category"
              as={FormControl}
              placeholder="Category"
            />
            <ErrorMessage name="category" component="div" />

            <FormLabel htmlFor="style">Style</FormLabel>
            <Field
              type="text"
              name="style"
              as={FormControl}
              placeholder="Style"
            />
            <ErrorMessage name="style" component="div" />

            <FormLabel htmlFor="color">Color</FormLabel>
            <Field
              type="text"
              name="color"
              as={FormControl}
              placeholder="Color"
            />
            <ErrorMessage name="color" component="div" />
            {/* <Form.Label>Size</Form.Label>
<Field as="select" name="size" component={Form.Control}>
  <option value="">Select Size</option>
  <option value="s">Small</option>
  <option value="m">Medium</option>
  <option value="l">Large</option>
  <option value="xl">Extra Large</option>
</Field>
<ErrorMessage name="size" component="div" /> */}

            <FormLabel htmlFor="quantity">Quantity</FormLabel>
            <Field
              type="number"
              name="quantity"
              as={FormControl}
              placeholder="Quantity"
            />
            <ErrorMessage name="quantity" component="div" />

            <FormCheck>
              <FormLabel>Shipping</FormLabel>
              <Field type="checkbox" name="shipping" as={FormCheck.Input} />
            </FormCheck>
            <ErrorMessage name="shipping" component="div" />

            <FormLabel htmlFor="image">Image</FormLabel>
            <Field type="file" name="image" as={FormControl} />
            <ErrorMessage name="image" component="div" />

            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateProduct;

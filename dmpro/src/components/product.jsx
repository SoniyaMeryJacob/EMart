import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import AXIOS from 'axios';

export default function Product() {
  const [image, setImage] = useState({ preview: "", data: "" });
  const [pn, setpn] = useState("");
  const [price, setps] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const formdata = new FormData();

  useEffect(() => {
    // Fetch categories from the backend when the component mounts
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    AXIOS.get('http://localhost:9000/catgetdata')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleFile = (e) => {
    e.preventDefault();
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  const handlePro = (event) => {
    event.preventDefault();
    formdata.append("pname", pn);
    formdata.append("category", selectedCategory);
    formdata.append("price", price);
    formdata.append('file', image.data);
    AXIOS.post('http://localhost:9000/productform', formdata, { 'Content-Type': 'multipart/form-data' })
      .then((res) => {
        alert(res.data.msg);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Container>
        <Row className="mt-3 border p-3 bg-warning rounded">
          <h1 align="center"><u>Product Registration</u></h1>
          <Col>
            <Form onSubmit={handlePro} encType="multipart/form-data">
              <Form.Group>
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="pn"
                  onChange={(e) => setpn(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Product Category</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}>
                  <option value="" className="prodcategory">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.category}>
                      {category.category}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  onChange={(e) => setps(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Upload Product Photo</Form.Label>
                <Form.Control
                  type="file"
                  name="file"
                  required
                  onChange={handleFile}
                />
              </Form.Group>
              <Form.Group>
                <Button type="submit" variant="primary">Submit</Button>
              </Form.Group>
            </Form>
          </Col>
          <Col>
            {/* Display the preview of the uploaded image */}
            {image.preview && (
              <img
                src={image.preview}
                alt="Product Preview"
                style={{ width: '500px', height: '350px' }}
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import AXIOS from 'axios';

export default function UpdateProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [image, setImage] = useState({ preview: '', data: '' });
  const [pn, setPn] = useState('');
  const [idno, setId] = useState('');
  const [price, setPrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const formdata = new FormData();

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  const fetchProduct = () => {
    AXIOS.get(`http://localhost:9000/getproductById/${productId}`)
      .then((response) => {
        const fetchedProduct = response.data.result[0];
        setProduct(fetchedProduct);
        setPn(fetchedProduct.productName);
        setSelectedCategory(fetchedProduct.category);
        setPrice(fetchedProduct.price);
        setId(fetchedProduct._id);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    formdata.append('pname', pn);
    formdata.append('category', selectedCategory);
    formdata.append('price', price);
    formdata.append('file', image.data);
    formdata.append('idn', idno);
    AXIOS.post('http://localhost:9000/updateproductform/', formdata, {
      'Content-Type': 'multipart/form-data',
    })
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
        <h1> Update Product registration</h1>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Form.Group>
                <Form.Label> Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="pn"
                  value={pn}
                  onChange={(e) => setPn(e.target.value)}
                />
                <Form.Control
                  type="text"
                  name="idn"
                  value={idno}
                  onChange={(e) => setId(e.target.value)}
                  hidden
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Product Category</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="" className="prodcategory">
                    Select a category
                  </option>
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
                  name="pswd"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Upload product photo</Form.Label>
                <Form.Control
                  type="file"
                  name="file"
                  required
                  onChange={handleFile}
                />
              </Form.Group>

              <Button type="submit" variant="primary">
                Update Product
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

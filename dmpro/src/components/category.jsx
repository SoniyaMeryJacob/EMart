import {Row,Col, Container, Form,Button} from 'react-bootstrap';
import { useState } from 'react';
import AXIOS from 'axios';

function Category(){
    const [fc,setfc]=useState("")
    const formdata= new FormData()

    const handleCat = (e)=>{
       e.preventDefault()
        alert(fc)
        
    
        AXIOS.post("http://localhost:9000/cat",{'fcat':fc})
            .then((res)=>{
                alert(res.data.msg)
            })
    }
    return(
        <>
       
      <Container>
      <Row className="mt-3 border p-3 bg-success rounded">
            
            <Col lg={6} xs={12}>
                <Form className='mt-4'> 
                    <Form.Group>{/*className="mb-3" controlId="formBasicEmail"*/}
                        <Form.Label><h1><b>Category</b></h1></Form.Label>
                        <Form.Control type='text' 
                        name='fcat' 
                        placeholder='Enter the category' 
                        onChange={(e)=>setfc(e.target.value)}  onInput={(e) => e.target.value = ("" + e.target.value).toUpperCase()} />
                       
                    </Form.Group>
                        {fc}
                    <Form.Group align="right" className='mt-3 mb-3'>
                    <Button variant="primary" type="button" onClick={(e)=>{handleCat(e)}} >
                    Submit
                    </Button>
                    </Form.Group>
                    
                </Form>
                
            </Col>
        </Row>
      </Container>
        </>
    )
}
export default Category;
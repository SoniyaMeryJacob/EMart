const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
//express object
const api = express();
api.use(cors());
api.use(express.urlencoded({ extended: true }));
api.use(express.json());
api.use(express.static("upload"))

// Connect to MongoDB
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/prodDB');
  console.log('Database Connected');
}

//table structure
const empStructure=new mongoose.Schema({fname:String,email:String,password:String})
const prodStructure=new mongoose.Schema({productName:String,category:String,price:Number,fileurl:String})
const catgStructure=new mongoose.Schema({category:String})
const demo=mongoose.Schema({fname:String,email:String,password:String,fileurl:String});
//create model
const empModel = new mongoose.model('employees',empStructure)
const prodModel = new mongoose.model('products',prodStructure)
const catgModel = new mongoose.model('category',catgStructure)
const demoM=mongoose.model('demoTable',demo);

//multer
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{cb(null,'upload/')},
    filename:(req,file,cb)=>{cb(null,file.originalname)} 
});
//upload file
const uploads = multer({storage:storage})

api.post('/add', (req, res) => {
  var fname = req.body.fname;
  var email = req.body.email;
  var password = req.body.password;
  const obj = new empModel({ fname: fname, email: email, password: password });
  obj.save().then(() => {
      res.send({ "msg": "send successfully" });
  }).catch((error) => {
      res.status(500).send({ "error": "An error occurred while saving the object" });
  });
});

api.post('/uploadimg', uploads.single('file'), (req, res) => {
    const url = req.file.filename;
    console.log(url);
    res.send({ 'msg': 'success' });
  });

  api.post('/uploadform', uploads.single('file'), (req, res) => {
    
    var fname = req.body.fname;
    var email = req.body.email;
    var password = req.body.password;
    const url = req.file.filename;
    const obj = new demoM({ fname: fname, email: email, password: password,fileurl: url });
    obj.save().then(() => {
      res.send({ "msg": "send successfully" });
    }).catch((error) => {
      res.status(500).send({ "error": "An error occurred while saving the object" });
    });
  
  });

// category
api.post('/cat', (req, res) => {
  const fcat = req.body.fcat;

  // Check if the category already exists in the database
  catgModel.findOne({ category: fcat })
    .then((existingCategory) => {
      if (existingCategory) {
        // Category already exists, return an error response
        return res.send({ "error": "Category already exists" });
      }

      // If the category does not exist, save it to the database
      const obj = new catgModel({ category: fcat });
      obj.save()
        .then(() => {
          res.send({ "msg": "Category added successfully" });
        })
        .catch((error) => {
          res.status(500).send({ "error": "An error occurred while saving the object" });
        });
    })
    .catch((error) => {
      res.status(500).send({ "error": "An error occurred while checking for existing category" });
    });
});




api.get('/catgetdata',async(req,res)=>{
  var data=await catgModel.find()
  res.send(
      data)
})

//product
api.post('/proimg', uploads.single('file'), (req, res) => {
  const url = req.file.filename;
  console.log(url);
  res.send({ 'msg': 'success' });
});

api.post('/productform', uploads.single('file'), (req, res) => {
  var pname = req.body.pname;
  var category = req.body.category;
  var price = req.body.price;
  const url = req.file.filename;
  const obj = new prodModel({ productName: pname, category: category, price: price,fileurl: url });
  obj.save().then(() => {
    res.send({ "msg": "send successfully" });
  }).catch((error) => {
    res.status(500).send({ "error": "An error occurred while saving the object" });
  });

});
api.get('/getproduct',async(req,res)=>{
  var data=await prodModel.find()
  res.send({'result':data})
})

api.delete('/deleteproduct/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    // Find the product by ID and remove it
    await prodModel.findByIdAndRemove(productId);

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});



// Update product data
api.post('/updateproductform/', uploads.single('file'), async (req, res) => {
  const productId = req.body.idn;
  const { pname, category, price } = req.body;
  const url = req.file.filename;

  try {
    // Find the product by ID and update its data
    await prodModel.findByIdAndUpdate(productId, {
      productName: pname,
      category: category,
      price: price,
      fileurl: url,
    });

    res.send({ msg: 'Product updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to update product' });
  }
});


api.get('/getproductById/:idn',async(req,res)=>{
  const productId = req.params.idn; 

  var data=await prodModel.find({'_id':productId})
  res.send({'result':data})
})



//server creation 
api.listen(9000, () => {
  console.log('Server running at http://localhost:9000');
});
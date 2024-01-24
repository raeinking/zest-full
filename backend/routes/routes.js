const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../module/user');
const Project = require('../module/project.js');
const Apartment = require('../module/apartment.js');
const jwt = require( "jsonwebtoken")
const multer = require("multer")
const compressImages = require("compress-images")
const fs = require('fs');
const project = require('../module/project.js');
const path = require("path")
// const sharp = require('sharp');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/remove/");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `files/${file.fieldname}-${Date.now()}.${ext}`);
  },
  });
  
  const multerFilter = (req, file, cb) => {
    const validImageTypes = ["png", "svg", "webp", "jpg", "jpeg"];
    if (validImageTypes.includes(file.mimetype.split("/")[1])) {
      cb(null, true);
    } else {
      cb(new Error("Not a valid image file!"), false);
    }
  };
  
  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });




router.post('/login', async (req, res) => {
  try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) return res.status(404).send("User not found!");

      const isPasswordCorrect = await bcrypt.compare(
          req.body.password,
          user.password 
      );

      if (!isPasswordCorrect) {
          return res.status(400).send("Wrong password or username!");
      }

      const token = jwt.sign(
          { id: user._id },
          process.env.JWT
      );

      res.send({ token: token });

  } catch (error) {
      res.status(500).send(error.message);
  }
});

router.post('/signup', async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            roll: req.body.roll,
            password: hash,
        });
        const savedUser = await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).send({message: 'this email already exists', error: error});
    }
});




router.post('/token', async function(req, res) {
    try {
        const token = req.body.token;

        if (!token || token == undefined || token == null) {
            return res.status(404).send('error not verified');
        }
                
        jwt.verify(token, process.env.JWT, async (err, user) => {
            if (err || !user) {
                return res.status(404).send('error not verified');
            }

            const userid = await User.findOne({ _id: user.id });

            if (userid.band == true || !userid) {
                return res.status(404).send('error not verified');
            }

            return res.status(200).send('success');
        });
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        return res.status(404).send('Internal Server Error');
    }
}); 



router.post('/add_apartment', async function(req, res) {
    try {
        const token = req.body.token
        if (req.body.build == '' || req.body.meter == '' || req.body.price == '' || req.body.Owner == '' || req.body.phone == '' || req.body.project == '') {
            return res.status(404).send('error not verified');
        }
                
        jwt.verify(token, process.env.JWT, async (err, user) => {
            if (err || !user) {
                return res.status(404).send('error not verified');
            }

            const newApartment = new Apartment({
                build: req.body.build,
                meter: req.body.meter,
                price: req.body.price,
                Owner: req.body.Owner,
                type: req.body.type,
                phone: req.body.phone,
                project: req.body.project,
            });
            const savedUser = await newApartment.save();    

            return res.status(200).send({message: 'done'});
        });
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        return res.status(404).send('Internal Server Error');
    }
}); 



router.get('/all_apartment', async function(req, res) {
    try {
            const allApartment = await Apartment.find();
            return res.status(200).send(allApartment);
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        return res.status(404).send('Internal Server Error');
    }
}); 



// router.post('/projectadd', upload.single('filename'), async (req, res) => {
//     let imagePath, outputPath;
  
//     try {
//     //   if (!req.cookies.access_token) {
//     //     // Handle unauthorized access
//     //     return res.status(401).json('need admin');
//     //   }
  
//       imagePath = path.resolve(`./public/remove/${req.file.filename}`);
//       outputPath = path.resolve(`./public/${req.file.filename}`);
      
//       // Ensure the directory exists before writing the file
//       fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  
//     //   let sharpOperation;
//     //   const ext = req.file.mimetype.split("/")[1];
  
//     //   if (ext === "png" || ext === "jpeg" || ext === "jpg") {
//     //     // Handle PNG, JPEG, or JPG
//     //     sharpOperation = sharp(imagePath).toFormat(ext).toFile(outputPath);
//     //   } else {
//     //     throw new Error("Unsupported file format");
//     //   }
  
//     //   // Compress the image using sharp
//     //   await sharpOperation;
  
//     //   // Create a new product with just the name and image
//     //   const newProduct = await ProductSchema.create({
//     //     nameEnglish: req.body.nameEnglish,
//     //     image: req.file.filename,
//     //   });
  
//     //   // Fetch the newly created product from the database
//     //   const updatedProduct = await ProductSchema.findById(newProduct._id);
  
//     //   if (updatedProduct) {
//     //     // Update the image field with the compressed image path
//     //     updatedProduct.image = req.file.filename;
  
//     //     // Save the updated record back to the database
//     //     await updatedProduct.save();
//     //   } else {
//     //     // Handle the case where the product is not found
//     //     console.error('Product not found for update');
//     //     return res.status(404).json({ error: 'Product not found for update' });
//     //   }
  
//     //   // Redirect to the employee products page
//     //   res.status(200).redirect('/employeeproducts');
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Image compression and update failed' });
//     } finally {
//       // Clean up files
//     //   try {
//     //     if  (imagePath)
//     //     await fs.promises.unlink(`./public/remove/${req.file.filename}`);
//     //   } catch (cleanupError) {
//     //       console.error('Error cleaning up files:', cleanupError);
//     //     }
//     }
//   });
  




module.exports = router;

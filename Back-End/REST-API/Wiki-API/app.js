//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });

const wikiSchema = {
    title : String,
    content : String
};

const Wiki = mongoose.model("Wiki", wikiSchema);

app.use(express.urlencoded({
  extended: true
}));

app.use(express.static("public"));

//////////////////////////////////////////////////////GLOBAL SCOPE/////////////////////////////////////////////

// Penulisan pake chained route parameters, basically semua metodenya merupakan
// metode terpisah dan bisa diakses secara terpisah.
app.route("/articles")
  .get(function(req,res){  //GET disini adalah metode GET yg biasa dipake 
    Wiki.find({}, function(err, results){
      if(err){
        res.send(err);
      }
      else{
        // console.log(results);
        res.send(results);
      }
    });
  })
  .post(function(req, res){ //sama juga metode postnya yang biasa dipake
    const newTitle = req.body.title;
    const newContent = req.body.content;
    console.log(newTitle);
    console.log(newContent);

    const newWiki = new Wiki({
      title : newTitle,
      content : newContent
    });
    newWiki.save(function(err){
      if(err){
      res.send(err);
      }
      else{
        res.send("Successfully added an article!");
      }
    });
  })
  .delete(function(req, res){   //DELETE disini bakal menghapus semua dokumen yang ada pada sebuah address, termasuk pada child addressnya
    Wiki.deleteMany({}, function(err){
      if(!err){
        res.send("Successfully deleted all of the articles");
      }
      else{
        res.send(err);
      }
    });
}); 

///////////////////////////////////////////////////////////SPECIFIC SCOPE/////////////////////////////////////////////////////////////

app.route("/articles/:articleTitle")
  .get(function(req,res){
    Wiki.findOne({title : req.params.articleTitle}, function(err, result){
      if(err){
        res.send(err);
      }
      else{
        if(result){
          res.send(result);
        }
        else{
          res.send("No article was found");
        }
      }
    });
  })
  // PUT method bakalan mengganti sebuah dokumen dengan dokumen baru
  // jika ada keterangan yang tidak lengkap seperti dokumen sebelumnya, maka
  // key dan value dari bagian yang tidak diinput akan hilang.
  // kalo pengen ngeganti satu dokumen, mending pake PUT. selainnya, pake PATCH
  //PUT juga sebaiknya digunakan ketika mau nambahin atribut baru di dokumen
  .put(function(req, res){
    const articleTitle = req.params.articleTitle;
    Wiki.updateOne(   //update changed to updateOne() due to deprecation warning
      {title : articleTitle},
      {title : req.body.title,
      content: req.body.content
      },
      {overwrite: true},
      function(err){
        if(err){
          res.send(err);
        }
        else{
          res.send("Successfully send the update");
        }
      }  
    );  
  })
  // PATCH similar dengan PUT, bedanya PATCH bisa update sebuah bagian dari dokumen
  // tanpa ngeganti dokumen sebelum update dengan sebuah dokumen yang baru sepenuhnya
  // PATCH disini gabisa nambahin atribut baru pada dokumen
  .patch(function(req, res){
    const articleTitle = req.params.articleTitle;
    Wiki.updateOne(
      {title : articleTitle},
      {$set : req.body},
      function(err){
        if(err){
          res.send(err);
        }
        else{
          res.send("Successfully updated the article");
        }
      }
    )
  })
  .delete(function(req, res){
    const articleTitle = req.params.articleTitle;
    Wiki.deleteOne(
      {title : articleTitle},
      function(err){
        if(err){
          res.send(err);
        }
        else{
          res.send("Successfully deleted the article");
        }
      }
    )
  })


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
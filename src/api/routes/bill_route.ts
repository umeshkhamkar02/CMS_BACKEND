import { Router } from "express";
import bill_service from "../services/bill_service";
import { v4 as uuidv4 } from 'uuid';
import db from '../../db/db-connection';
import * as ejs from 'ejs';
import path from "path";
import * as pdf from 'html-pdf';
import fs from "fs"
import authorize from "../../middleware/authorize";


export const billrouter = (_router: Router, _billService : bill_service) => {

    _router.post("/generateReport", authorize, (req, res) => {
        const generatedUuid = uuidv4();
        const orderDetails = req.body;
        var productDetailsReport = JSON.parse(orderDetails.productDetails);
      
        var query =
          "insert into bill (name, uuid, email, contactNumber, paymentMethod, total,  productDetails, createdBy) value(?,?,?,?,?,?,?,?)";
        db.query(
          query,
          [
            orderDetails.name,
            generatedUuid,
            orderDetails.email,
            orderDetails.contactNumber,
            orderDetails.paymentMethod,
            orderDetails.totalAmount,
            orderDetails.productDetails,
            res.locals.email,
          ],
          (err, results) => {
            if (!err) {
              ejs.renderFile(
                path.join(__dirname, "", "report.ejs"),
                {
                  productDetails: productDetailsReport,
                  name: orderDetails.name,
                  email: orderDetails.email,
                  contactNumber: orderDetails.contactNumber,
                  paymentMethod: orderDetails.paymentMethod,
                  totalAmount: orderDetails.totalAmount,
                },
                (err, results) => {
                  if (err) {
                    console.log(err, "1");
                    return res.status(500).json(err);
                  } else {
                    pdf
                      .create(results)
                      .toFile(
                        "./generated_pdf/" + generatedUuid + ".pdf",
                        function (err, data) {
                          if (err) {
                            console.log(err, "!");
                            return res.status(500).json(err);
                          } else {
                            return res.status(200).json({ uuid: generatedUuid });
                          }
                        }
                      );
                  }
                }
              );
            } else {
                console.log(err, "!22");
              return res.status(500).json(err);
            }
          }
        );
      });

      _router.post("/getPdf", authorize, function (req, res) {
        const orderDetails = req.body;
        const pdfPath = "./generated_pdf/" + orderDetails.uuid + ".pdf";
        if (fs.existsSync(pdfPath)) {
          res.contentType("application/pdf");
          fs.createReadStream(pdfPath).pipe(res);
        } else {
          var productDetailsReport = JSON.parse(orderDetails.productDetails);
          ejs.renderFile(
            path.join(__dirname, "", "report.ejs"),
            {
              productDetails: productDetailsReport,
              name: orderDetails.name,
              email: orderDetails.email,
              contactNumber: orderDetails.contactNumber,
              paymentMethod: orderDetails.paymentMethod,
              totalAmount: orderDetails.totalAmount,
            },
            (err, results) => {
              if (err) {
                return res.status(500).json(err);
              } else {
                pdf
                  .create(results)
                  .toFile(
                    "./generated_pdf/" + orderDetails.uuid + ".pdf",
                    function (err, data) {
                      if (err) {
                        console.log(err);
                        return res.status(500).json(err);
                      } else {
                        res.contentType("application/pdf");
                        fs.createReadStream(pdfPath).pipe(res);
                      }
                    }
                  );
              }
            }
          );
        }
      });
      
      _router.get("/getBills",authorize, (req, res, next) => {
        var query = "select * from bill order by id DESC";
        db.query(query, (err, results) => {
          if (!err) {
            return res.status(200).json(results);
          } else {
            return res.status(500).json(err);
          }
        });
      });
      
      _router.delete("/delete/:id", authorize, (req, res, next) => {
        const id = req.params.id;
        var query = "delete from bill where id=?";
        db.query(query, [id], (err, results) => {
          if (!err) {
            if (results.affectedRows == 0) {
              return res.status(404).json({ message: "Bill id does not found." });
            }
            return res.status(200).json({ message: "Bill Deleted Successfully." });
          } else {
            return res.status(500).json(err);
          }
        });
      });

}
import { Component, Input, OnInit } from '@angular/core';

//PDF Make 
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'kt-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
  
export class PdfComponent implements OnInit {

  @Input() content: any
  @Input() disabled: boolean = true;

  constructor() { }

  ngOnInit(): void { }

  //PDF Work Here ....
  async generatePdf() {
    const imageUrl = await this.getBase64ImageFromURL("assets/media/logos/v-logo2.png")
    //const imageUrl = await this.getBase64ImageFromURL("assets/media/logos/favicon.png")
    const documentDefinition = {
     
      pageOrientation: 'landscape',
       background: {
          image: imageUrl,
          width: 850,
          height: 600,
          opacity: 0.04,
        },
      header: (page) => {
        if (page === 1) {
          return [
            {
              image: imageUrl,
              alignment: 'center',
              width: 70,
              height: 70,
            },
            {
              text: 'UNIVERSITY OF SINDH',
              bold: true,
              fontSize: 10,
              alignment: 'center',
              margin: [0, 60, 0, 10]
            }
          ]
        }
      },
      
      footer: (currentPage, pageCount) => {
        if (currentPage === pageCount)
          return {
            columns: [
              {
                stack: [
                  {
                    alignment: 'center',
                    text: 'Copyright © Vizalys, International. 2021 All Rights Reserved.',
                    margin: [0,0,0,8]
                  },
                  {
                    text: 'Page ' + currentPage.toString() + ' of ' + pageCount,
                    alignment: 'center',
                    fontSize: 10
                  },
                ]
              }
            ],
          };
        else {
          return {
            text: 'Page ' + currentPage.toString() + ' of ' + pageCount,
            alignment: 'center',
            fontSize: 10
          }
        }
    },
        
      // footer: {
      //   columns: [ 
      //       { 
      //         alignment: 'center',
      //         text: 'Copyright © University of Sindh, Jamshoro. 2021 All Rights Reserved.'
      //       },
      //   ],
      // },

      content: [
        this.content
      ],

      styles: {
        //for general ledger
        tableHeader: {
          fontSize: 13,
          bold: true,
        },
        //for balance sheet
        tableHeader1: {
          fontSize: 10,
          bold: true,
          margin: [50, 5, 50, 5],
        },
        //for trial balance
        tableHeader2: {
          fontSize: 12,
          bold: true,
          alignment: 'right',
        },
        underLine: {
          fontSize: 12,
          bold: true,
          alignment: 'right',
          decoration: 'underline',
          lineHeight: 2,
        },
        //for Income Expenditure
        tableHeader3: {
          fontSize: 13,
          bold: true,
          margin: [0, 3, 10, 3],
        },
      }
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  //Convert imageUrl in Base64Image
  getBase64ImageFromURL(url) {
      return new Promise((resolve, reject) => {
        var img = new Image();
        img.setAttribute("crossOrigin", "anonymous");
  
        img.onload = () => {
          var canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
  
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
  
          var dataURL = canvas.toDataURL("image/png");
          resolve(dataURL);
        };
  
        img.onerror = error => {
          reject(error);
        };
  
        img.src = url;
      });
  }

}

const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle } = require('docx');
const fs = require('fs');
const path = require('path');

// Invoice data
const invoiceData = {
  invoiceNumber: '1009-01',
  dueDate: '1 APRIL 2022',
  invoiceTo: {
    name: 'Bailey Dupont',
    company: 'Studio Shadowe',
    address: '123 Anywhere St.,',
    city: 'Any City, ST 12345'
  },
  company: {
    name: 'Wardiere Inc',
    address: '123 Anywhere St.,',
    city: 'Any City, ST 12345'
  },
  services: [
    { description: 'Digital Consulting Services', price: 1000 },
    { description: 'Application Management Services', price: 2470 },
    { description: 'Cloud Business Services', price: 3000 },
    { description: 'Business Analyst', price: 1700 }
  ],
  taxRate: 0.10,
  paymentMethod: {
    bankName: 'Thynk Unlimited Bank',
    accountNumber: '123-456-7890'
  },
  paymentTerms: 'Payment Terms Are Usually Stated on the Invoice. These May Specify That the Buyer Has a Maximum Number of Days in Which To Pay and Is Sometimes Offered a Discount if Paid Before the Due Date. The Buyer Could Have Already Paid for the Products or Services Listed on the Invoice.'
};

// Calculate totals
const subtotal = invoiceData.services.reduce((sum, service) => sum + service.price, 0);
const tax = subtotal * invoiceData.taxRate;
const total = subtotal + tax;

// Create document
const doc = new Document({
  sections: [{
    properties: {},
    children: [
      // Header
      new Paragraph({
        children: [
          new TextRun({
            text: `NO. ${invoiceData.invoiceNumber}`,
            size: 20,
            color: '808080'
          })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `DUE ${invoiceData.dueDate}`,
            size: 20,
            color: '808080'
          })
        ]
      }),
      new Paragraph({ text: '' }), // Spacing
      
      // Title
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [
          new TextRun({
            text: 'INVOICE',
            bold: true,
            size: 48
          })
        ]
      }),
      new Paragraph({ text: '' }), // Spacing
      
      // Billing Information
      new Paragraph({
        children: [
          new TextRun({
            text: 'INVOICE TO',
            bold: true,
            size: 22
          })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: invoiceData.invoiceTo.name,
            bold: true,
            size: 24
          })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: invoiceData.invoiceTo.company,
            size: 22
          })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: invoiceData.invoiceTo.address,
            size: 22
          })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: invoiceData.invoiceTo.city,
            size: 22
          })
        ]
      }),
      new Paragraph({ text: '' }), // Spacing
      
      // Company Information
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [
          new TextRun({
            text: 'COMPANY:',
            bold: true,
            size: 22
          })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [
          new TextRun({
            text: invoiceData.company.name,
            bold: true,
            size: 24
          })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [
          new TextRun({
            text: invoiceData.company.address,
            size: 22
          })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [
          new TextRun({
            text: invoiceData.company.city,
            size: 22
          })
        ]
      }),
      new Paragraph({ text: '' }), // Spacing
      
      // Services Table
      new Table({
        width: {
          size: 100,
          type: WidthType.PERCENTAGE
        },
        rows: [
          // Header row
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: 'Description',
                        bold: true,
                        color: 'FFFFFF',
                        size: 22
                      })
                    ],
                    alignment: AlignmentType.LEFT
                  })
                ],
                shading: {
                  fill: '2D5016'
                }
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: 'Price',
                        bold: true,
                        color: 'FFFFFF',
                        size: 22
                      })
                    ],
                    alignment: AlignmentType.RIGHT
                  })
                ],
                shading: {
                  fill: '2D5016'
                }
              })
            ]
          }),
          // Service rows
          ...invoiceData.services.map(service => 
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: service.description,
                          size: 22
                        })
                      ]
                    })
                  ]
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.RIGHT,
                      children: [
                        new TextRun({
                          text: `$ ${service.price.toLocaleString()}`,
                          size: 22
                        })
                      ]
                    })
                  ]
                })
              ]
            })
          )
        ]
      }),
      new Paragraph({ text: '' }), // Spacing
      
      // Summary Box
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [
          new TextRun({
            text: `Subtotal: $ ${subtotal.toLocaleString()}`,
            size: 22
          })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [
          new TextRun({
            text: `Tax (10%): $ ${tax.toLocaleString()}`,
            size: 22
          })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [
          new TextRun({
            text: `TOTAL: $ ${total.toLocaleString()}`,
            bold: true,
            size: 24
          })
        ]
      }),
      new Paragraph({ text: '' }), // Spacing
      
      // Payment Method
      new Paragraph({
        children: [
          new TextRun({
            text: 'PAYMENT METHOD',
            bold: true,
            size: 22
          })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `Bank Name: ${invoiceData.paymentMethod.bankName}`,
            size: 22
          })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `Bank Account: ${invoiceData.paymentMethod.accountNumber}`,
            size: 22
          })
        ]
      }),
      new Paragraph({ text: '' }), // Spacing
      
      // Payment Terms
      new Paragraph({
        children: [
          new TextRun({
            text: invoiceData.paymentTerms,
            size: 20
          })
        ]
      }),
      new Paragraph({ text: '' }), // Spacing
      
      // Signature lines
      new Paragraph({
        children: [
          new TextRun({
            text: 'Signature of Authorized Person',
            size: 20
          })
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [
          new TextRun({
            text: 'Date',
            size: 20
          })
        ]
      })
    ]
  }]
});

// Generate and save the document
async function generateInvoice() {
  try {
    const buffer = await Packer.toBuffer(doc);
    const outputPath = path.join(__dirname, '..', 'invoice.docx');
    fs.writeFileSync(outputPath, buffer);
    console.log(`Invoice generated successfully at: ${outputPath}`);
  } catch (error) {
    console.error('Error generating invoice:', error);
  }
}

generateInvoice();


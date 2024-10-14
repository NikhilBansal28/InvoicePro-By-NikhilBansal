document.getElementById('invoiceForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const billerName = document.getElementById('billerName').value;
    const billerEmail = document.getElementById('billerEmail').value;
    const billerMobile = document.getElementById('billerMobile').value;
    const billerAddress = document.getElementById('billerAddress').value;
    const billerGST = document.getElementById('billerGST').value;

    const clientName = document.getElementById('clientName').value;
    const clientEmail = document.getElementById('clientEmail').value;
    const clientMobile = document.getElementById('clientMobile').value;
    const clientAddress = document.getElementById('clientAddress').value;

    const itemDescription = document.getElementById('itemDescription').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;
    const tax = document.getElementById('tax').value;

    const invoiceDate = document.getElementById('invoiceDate').value; // This is the date you want to show
    const termsConditions = document.getElementById('termsConditions').value;

    const digitalSignature = document.getElementById('digitalSignature').files[0];

    // Generate a random invoice number (for the purpose of this example)
    const invoiceNumber = 'INV' + Math.floor(Math.random() * 1000000);

    // Update the Invoice Preview
    document.getElementById('invoiceNumber').textContent = invoiceNumber;
    document.getElementById('previewInvoiceDate').textContent = invoiceDate; // Show the entered date

    document.getElementById('previewBillerName').textContent = billerName;
    document.getElementById('previewBillerEmail').textContent = billerEmail;
    document.getElementById('previewBillerMobile').textContent = billerMobile;
    document.getElementById('previewBillerAddress').textContent = billerAddress;
    document.getElementById('previewBillerGST').textContent = billerGST;

    document.getElementById('previewClientName').textContent = clientName;
    document.getElementById('previewClientEmail').textContent = clientEmail;
    document.getElementById('previewClientMobile').textContent = clientMobile;
    document.getElementById('previewClientAddress').textContent = clientAddress;

    document.getElementById('previewItemDescription').textContent = itemDescription;
    document.getElementById('previewQuantity').textContent = quantity;
    document.getElementById('previewPrice').textContent = price;
    document.getElementById('previewTax').textContent = tax;

    const total = (parseFloat(price) * parseInt(quantity)) + (parseFloat(price) * parseInt(quantity) * parseFloat(tax) / 100);
    document.getElementById('previewTotal').textContent = total.toFixed(2);

    document.getElementById('previewTermsConditions').textContent = termsConditions;

    // If the user uploads a digital signature, display it in the preview
    if (digitalSignature) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('previewSignature').src = e.target.result;
        };
        reader.readAsDataURL(digitalSignature);
    } else {
        document.getElementById('previewSignature').style.display = 'none';
    }

    // Show the invoice preview
    document.getElementById('invoicePreview').style.display = 'block';
});

// Download PDF logic
document.getElementById('downloadInvoice').addEventListener('click', function () {
    const invoiceContent = document.getElementById('invoicePreview');
    const downloadButton = document.getElementById('downloadInvoice');

    // Hide the download button before converting to PDF
    downloadButton.style.display = 'none';

    // HTML2PDF options
    const options = {
        margin: [0.25, 0.25, 0.25, 0.25],  // Adjust margins further to fit content
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: true, letterRendering: true },  // Improved rendering for clarity
        jsPDF: {
            unit: 'in',
            format: 'letter',  // Letter size: 8.5 x 11 inches
            orientation: 'portrait',
            compressPDF: true,
            pageSize: 'letter',  // Set the page size to 'letter'
            autoPaging: true  // Avoid adding new pages
        }
    };

    // Using html2pdf to convert the HTML to PDF
    html2pdf().from(invoiceContent).set(options).save().then(() => {
        // After the PDF is generated, make the button visible again
        downloadButton.style.display = 'inline-block';
    });
});

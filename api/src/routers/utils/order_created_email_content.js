export const order_success_email_content = (name, orderId, orderDetails, themeColor = '#4CAF50') => {
    // Construct the URL for viewing order details
    const orderDetailsUrl = `${process.env.CLIENT}/order_details?orderId=${orderId}`;

    // Generate the HTML for order items
    let itemsHtml = '';
    let subtotal = 0;
    if (orderDetails && orderDetails.length > 0) {
        itemsHtml = `
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 20px; border-collapse: collapse;">
                <thead>
                    <tr style="background-color: #f9f9f9;">
                        <th style="padding: 10px; text-align: left; border-bottom: 1px solid #e0e0e0;">Item</th>
                        <th style="padding: 10px; text-align: center; border-bottom: 1px solid #e0e0e0;">Qty</th>
                        <th style="padding: 10px; text-align: right; border-bottom: 1px solid #e0e0e0;">Price</th>
                    </tr>
                </thead>
                <tbody>
        `;
        orderDetails.forEach(item => {
            const itemTotal = item.quantity * item.price;
            subtotal += itemTotal;
            itemsHtml += `
                <tr>
                    <td style="padding: 10px; text-align: left; border-bottom: 1px solid #f0f0f0;">${item.itemName}</td>
                    <td style="padding: 10px; text-align: center; border-bottom: 1px solid #f0f0f0;">${item.quantity}</td>
                    <td style="padding: 10px; text-align: right; border-bottom: 1px solid #f0f0f0;">$${item.price.toFixed(2)}</td>
                </tr>
            `;
        });
        itemsHtml += `
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2" style="padding: 10px; text-align: right; font-weight: 600;">Subtotal:</td>
                        <td style="padding: 10px; text-align: right; font-weight: 600;">$${subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="padding: 10px; text-align: right; font-weight: 600;">Shipping:</td>
                        <td style="padding: 10px; text-align: right; font-weight: 600;">$0.00</td> <!-- Assuming free shipping for simplicity -->
                    </tr>
                    <tr>
                        <td colspan="2" style="padding: 10px; text-align: right; font-weight: 700; font-size: 18px;">Total:</td>
                        <td style="padding: 10px; text-align: right; font-weight: 700; font-size: 18px;">$${subtotal.toFixed(2)}</td>
                    </tr>
                </tfoot>
            </table>
        `;
    } else {
        itemsHtml = '<p>No items found in your order details.</p>';
    }


    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        /* Basic styles for email client compatibility */
        body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', sans-serif;
            background-color: #f4f4f7;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid #e0e0e0;
        }
        .content {
            padding: 40px;
            color: #333333;
            line-height: 1.6;
        }
        .header {
            background-color: ${themeColor};
            color: #ffffff;
            padding: 20px 40px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .button {
            display: inline-block;
            background-color: ${themeColor};
            color: #ffffff !important; /* Important for overriding link styles */
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: 600;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #888888;
        }
    </style>
</head>
<body>
    <table width="100%" border="0" cellspacing="0" cellpadding="20" style="background-color: #f4f4f7;">
        <tr>
            <td>
                <table class="container" border="0" cellspacing="0" cellpadding="0" align="center">
                    <!-- Header -->
                    <tr>
                        <td class="header">
                            <h1>Order Confirmation</h1>
                        </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td class="content">
                            <h2 style="font-size: 20px; margin-top: 0;">Hello, ${name}!</h2>
                            <p>Thank you for your order with <strong>Aiksava</strong>! Your order <strong>#${orderId}</strong> has been successfully placed.</p>
                            <p>We're preparing your items for shipment and will notify you once they have been dispatched.</p>

                            <h3 style="font-size: 18px; margin-top: 30px; margin-bottom: 15px;">Order Summary:</h3>
                            ${itemsHtml}

                            <p style="margin-top: 30px;">You can view the full details of your order and track its status by clicking the button below:</p>
                            <a href="${orderDetailsUrl}" class="button" target="_blank" style="color: #ffffff;">View Your Order</a>
                            <p>If you have any questions, please don't hesitate to contact our support team.</p>
                            <p>Thanks,<br>The Aiksava Team</p>
                        </td>
                    </tr>
                </table>
                <!-- Footer -->
                <table class="container" border="0" cellspacing="0" cellpadding="0" align="center" style="background: none; border: none;">
                    <tr>
                        <td class="footer">
                            <p>&copy; ${new Date().getFullYear()} Aiksava. All rights reserved.</p>
                            <p>If you're having trouble with the button above, copy and paste the URL below into your web browser:</p>
                            <p style="word-break: break-all; color: #aaaaaa;">${orderDetailsUrl}</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
};

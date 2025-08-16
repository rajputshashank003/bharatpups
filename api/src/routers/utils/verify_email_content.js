export const themeColor = '#D32F2F';
export const verify_email_content = (name, id) => {
    const verificationUrl = `${process.env.CLIENT}/email_verification?id=${id}`;

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
                            <h1>Email Verification</h1>
                        </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td class="content">
                            <h2 style="font-size: 20px; margin-top: 0;">Hello, ${name}!</h2>
                            <p>Thank you for signing up with <strong>Aiksava</strong>. Please verify your email address to complete your registration and secure your account.</p>
                            <p>Click the button below to confirm your email:</p>
                            <a href="${verificationUrl}" class="button" target="_blank" style="color: #ffffff;">Verify My Email</a>
                            <p>If you did not create an account with Aiksava, no further action is required.</p>
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
                            <p style="word-break: break-all; color: #aaaaaa;">${verificationUrl}</p>
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

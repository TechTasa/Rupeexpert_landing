const Loan = require('../models/Loan');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

exports.showApplyForm = (req, res) => {
  res.render('apply');
};


exports.apply = async (req, res) => {
  try {
    // Validate and create the loan application
    const { fullName, contactNo,email='', occupation, monthlyNetSalary, yearlyTurnover } = req.body;

    const loan = new Loan({
      fullName,
      contactNo,
      email:email ? email : "NA",
      occupation,
      ...(occupation === 'Job' ? { monthlyNetSalary } : { yearlyTurnover }), // Concise conditional assignment
    });
    await loan.validate(); // Explicit validation for data integrity

    const savedLoan = await loan.save();

    // **Email Notification Logic**

    const transporter = nodemailer.createTransport({
      service: 'gmail', // Replace with your email service if needed
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>RupeeXpert</title>
    </head>
    
    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8" leftmargin="0">
        <!-- 100% body table -->
        <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="
            @import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700);
            font-family: 'Open Sans', sans-serif;
          ">
            <tr>
                <td>
                    <table style="background-color: #f2f3f8; max-width: 670px; margin: 0 auto" width="100%" border="0"
                        align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="height: 80px">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="text-align: center">
                                <a href="https://demo.rupeexpert.com/loan/apply" title="logo" target="_blank">
                                    <img style="mix-blend-mode:multiply;" width="200" src="https://scontent-del1-1.xx.fbcdn.net/v/t39.30808-6/369794385_617530500493075_6712611100528465381_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=J6jAPKhG6lYAX83tTpN&_nc_ht=scontent-del1-1.xx&oh=00_AfC6SsjKCQgDCsv4fxazeTtg1xXwW5svwEYgJNBOGzLbbQ&oe=65E9BB5A" title="logo"
                                        alt="logo" />
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td style="height: 20px">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>
                                <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="
                        max-width: 670px;
                        background: #fff;
                        border-radius: 3px;
                        text-align: center;
                        -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                        -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                        box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                      ">
                                    <tr>
                                        <td style="height: 40px">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 0 35px">
                                            <h1 style="
                              color: #1e1e2d;
                              font-weight: 500;
                              margin: 0;
                              font-size: 32px;
                              font-family: 'Rubik', sans-serif;
                            ">
                                                New Loan Application Received
                                            </h1>
    
                                            <span style="
                              display: inline-block;
                              vertical-align: middle;
                              margin: 29px 0 26px;
                              border-bottom: 1px solid #cecece;
                              width: 100px;
                            "></span>
                                            <p style="
                              color: #455056;
                              font-size: 18px;
                              line-height: 20px;
                              margin: 0;
                              font-weight: 500;
                            ">
                                                <strong style="
                                display: block;
                                font-size: 13px;
                                margin: 0 0 4px;
                                color: rgba(0, 0, 0, 0.64);
                                font-weight: normal;
                              ">Loan Applicant</strong>${savedLoan.fullName}
                                                <strong style="
                                display: block;
                                font-size: 13px;
                                margin: 24px 0 4px 0;
                                font-weight: normal;
                                color: rgba(0, 0, 0, 0.64);
                              ">Contact</strong>${savedLoan.contactNo}
                              <strong style="
                                display: block;
                                font-size: 13px;
                                margin: 24px 0 4px 0;
                                font-weight: normal;
                                color: rgba(0, 0, 0, 0.64);
                              ">Email</strong>${savedLoan.email}
                                                <strong style="
                                display: block;
                                font-size: 13px;
                                margin: 24px 0 4px 0;
                                font-weight: normal;
                                color: rgba(0, 0, 0, 0.64);
                              ">Occupation</strong>${savedLoan.occupation}
                              <strong style="
                              display: block;
                              font-size: 13px;
                              margin: 24px 0 4px 0;
                              font-weight: normal;
                              color: rgba(0, 0, 0, 0.64);
                            ">${occupation === 'Job' ? 'Monthly Net Salary' : 'Yearly Turnover'}</strong>${savedLoan.monthlyNetSalary || savedLoan.yearlyTurnover}
                                                <strong style="
                                display: block;
                                font-size: 13px;
                                margin: 24px 0 4px 0;
                                font-weight: normal;
                                color: rgba(0, 0, 0, 0.64);
                              ">Date Of Submission</strong>${savedLoan.createdAt}
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height: 40px">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="height: 20px">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="text-align: center">
                                <p style="
                        font-size: 14px;
                        color: rgba(69, 80, 86, 0.7411764705882353);
                        line-height: 18px;
                        margin: 0 0 0;
                      ">
                                    &copy;<strong>www.techtasa.com</strong>
                                </p>
                            </td>
                        </tr>
                        <tr>
                        <td style="text-align: center">
                            <p style="
                    font-size: 14px;
                    color: rgba(69, 80, 86, 0.7411764705882353);
                    line-height: 18px;
                    margin: 0 0 0;
                  ">
                                 This email was sent automatically by Tech Tasa servers
                            </p>
                        </td>
                    </tr>
                        <tr>
                            <td style="height: 80px">&nbsp;</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!--/100% body table-->
    </body>
    
    </html>
  `;


  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: ['digital@rupeexpert.com','mohammadtasaduqkhan@oceanone.co.in'], // Replace with the intended recipient
    subject: `New Loan Application Received From ${savedLoan.fullName}`,
    text: `
      A new loan application has been submitted:

      **Loan Applicant:** ${savedLoan.fullName}
      **Contact:** ${savedLoan.contactNo}
      **Email:** ${savedLoan.email}
      **Occupation:** ${savedLoan.occupation}

      **Details:**
      ${occupation === 'Job' ? `- Monthly Net Salary: ${savedLoan.monthlyNetSalary}`
         : `- Yearly Turnover: ${savedLoan.yearlyTurnover}`}

      **Date Of Submission:** ${savedLoan.createdAt}
    `,
    html: htmlContent, // Include well-defined HTML content
  };


    await transporter.sendMail(mailOptions);

    res.status(201).send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Success</title>
        <style>
        
            @supports (animation: grow .5s cubic-bezier(.25, .25, .25, 1) forwards) {
            .tick {
               stroke-opacity: 0;
               stroke-dasharray: 29px;
               stroke-dashoffset: 29px;
               animation: draw .5s cubic-bezier(.25, .25, .25, 1) forwards;
               animation-delay: .6s
            }
            
            .circle {
               fill-opacity: 0;
               stroke: #219a00;
               stroke-width: 16px;
               transform-origin: center;
               transform: scale(0);
               animation: grow 1s cubic-bezier(.25, .25, .25, 1.25) forwards;   
            }   
            }
            
            @keyframes grow {
            60% {
               transform: scale(.8);
               stroke-width: 4px;
               fill-opacity: 0;
            }
            100% {
               transform: scale(.9);
               stroke-width: 8px;
               fill-opacity: 1;
               fill: #219a00;
            }
            }
            
            @keyframes draw {
            0%, 100% { stroke-opacity: 1; }
            100% { stroke-dashoffset: 0; }
            }
            :root {
            --theme-color: var(--color-purple);
            }
            *{
            margin:0;
            padding:0;
            box-sizing:border-box;
            }
            body{
            margin:0;
            padding:0;
            box-sizing:border-box;
            overflow:hidden;
            height: 100vh;
            width:100vw;
            }
            .svg-container{
            box-sizing:border-box;
            
            height: 100vh;
            width:100vw;
            margin:0;
            padding:0;
            display: flex;
            flex-direction:column;
            justify-content: center;
            align-items: center;
            }
            </style>
    </head>
    <body>
        <div class="svg-container">    
        <svg class="ft-green-tick" xmlns="http://www.w3.org/2000/svg" height="100" width="100" viewBox="0 0 48 48" aria-hidden="true">
            <circle class="circle" fill="#5bb543" cx="24" cy="24" r="22"/>
            <path class="tick" fill="none" stroke="#FFF" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M14 27l5.917 4.917L34 17"/>
        </svg>
        <p>Thanks Our Agent Will Contact You Shortly<p>
      </div>
          <script>
            setTimeout(function(){
              window.location.href = '/loan/apply';
            }, 5000);
          </script>
        </body>
    </html>`);
  } catch (err) {
    console.error('Error saving loan or sending email:', err);

    if (err.name === 'ValidationError') {
      const validationErrors = Object.values(err.errors) // Extract validation errors
        .map(error => error.message) // Convert to user-friendly messages
        .join(', ');
      res.status(400).json({ status: 'error', message: validationErrors });
    } else {
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  }
};




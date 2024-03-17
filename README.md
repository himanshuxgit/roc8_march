# Roc8 March 

## Description

Roc8 March assignment

### Live Link: [Roc8 March](https://roc8-march.vercel.app/)

## Installation

To clone and run this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone <https://github.com/himanshuxgit/roc8_march.git>
    ```
    

2. Navigate to the project directory:  
    ```bash
    cd roc8_march
    ```
    

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Create a `.env.local` file in the root directory and add the following environment variables:
    ```bash
    DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database  
    ``` 

5. Run the development server:
    ```bash
    npm run dev
    ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



    
## Technologies Used
- Next.js
- PostgreSQL (Neon)
- Prisma
- Tailwind CSS
- NodeMailer
- Faker.js


## Approach


I was assigned to develop four screens based on designs provided in Figma for a project, opting to use the T3 stack but I replaced the API approach with Next.js API routes and Prisma for database interactions. For styling, I used Tailwind CSS, PostgreSQL hosted by Neon as database and for the frontend framework, I chose Next.js.

Firstly, I tackled the signup screen, which required users to enter their email, password, and name. Upon submission, the information led users to an OTP screen. To implement this, I generated an  eight-digit OTP and utilized NodeMailer to send the otp to the user's email. This OTP, along with the user's email, was stored in the PostgreSQL database using Prisma for future verification.

Once the user received and input the OTP on the OTP screen, a verification process ensued. If successful, a notification indicated the OTP was verified; otherwise, a message informed the user of verification failure. Successful verification redirected users to the login screen.

On the login screen, users were prompted to enter their email and password. These credentials were then verified against the stored data in the database. If matched, the user was directed to a protected route named "choices" that could not be accessed without logging in. This choices screen displayed a list of categories generated with Faker.js. The list displayed is a paginated list.Users could select a category, which was then saved to the database. Upon returning, selected categories were retrieved and displayed to the user, ensuring a personalized experience.
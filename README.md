# AI-PoweredJobMatchPlatform

This project is a full-stack web app that helps users to find most relevant jobs based on their skills, experience, preferred job type, and location — all matched intelligently using the Gemini AI API.

_Setup Instructions_

  _Prerequisites_
    Node.js
    MongoDB (local or cloud)
    Gemini API key (from Google AI Studio)

  _Installation_
    1-> Clone the repository 

    2 -> Install dependencies
            cd AI-PoweredJobMatchPlatform -> npm install
            cd server -> npm install

    3 -> Add 2 .env file one inside AI-PoweredJobMatchPlatform and another inside server as shown in example.env

    4 -> Start app from AI-PoweredJobMatchPlatform (as concurrently will start both frontend and backend) -> npm run dev
_


_Explanation of AI Usage and Prompt Design_

    When a user creates an account and fills in their profile details, only then can they use the AI to find their best job match. After completing the profile section, they can go to the "Find Job" section, where some jobs are already listed. If they want the help of AI to find the best job, they can click the "Find My Matches" button, and the AI will return the 3 best-matching jobs at the top.

    Complete Flow: How AI Works and Displays Jobs:-
        We’ll start with the ideal flow (not edge cases). When the user clicks the "Find My Matches" button, their profile data and all available jobs from the database are passed to the matchJob function in jobAPI.js.

        This function sends both datasets to the backend using apiConnector (a centralized helper that wraps Axios and handles all API requests). It takes the HTTP method, the API endpoint (from apis.js), and the request body.

        The request then follows the backend routing path:
            It first lands in index.js (entry point of the server),
            Then moves to routes/job.js, where the /match route is linked to the aiMatch controller.

        Inside the aiMatch controller:
            userProfile and jobs are extracted from req.body.
            A prompt is dynamically generated using these inputs, with clear instructions for formatting the AI response.
            This prompt is sent to the Gemini AI model.

        Once the response is received:
            It's parsed from text to JSON (if parsing fails, an error is thrown).
            The parsed JSON includes matched jobs, along with matchScore and matchReason for each.

        We then:
            Filter and structure the top 3 jobs,
            Format them into a new object,
            Return the response to the frontend.

        Finally, the top 3 matched jobs appear at the top of the job listing section, complete with their match scores.
    _

    I designed the prompt by combining the user's profile data with an instruction to select the best job from all those available in the database. After receiving the response from the AI, I parsed it into text and extracted the JSON part, which contains the matchScore and matchReason.
_    

_API_Documentation_
    Method	       Endpoint	                 Description

    POST	      /api/v1/auth/signup	         Register a new user
    POST	      /api/v1/auth/login	         Login user
    GET   	      /api/v1/auth/getprofile	     Get user profile
    POST          /api/v1/auth/update            Update user Profile   
    POST	      /api/v1/job/create	         Create a new job listing
    GET	          /api/v1/job/getjob	         Get all job listings
    POST	      /api/v1/job/jobmatch	         Match user with top 3 jobs using AI
_


AI-PoweredJobMatchPlatform
│
├── public
|
├── src
|   ├──asset          
│   ├── components     
│   ├── pages          
│   ├── reducer 
|   ├── services         
│   ├── slices  
|   ├── App.js  
|   └── index.js        
│
├── server
|   ├── config             
│   ├── controllers 
|   ├── middleware   
│   ├── routes         
│   ├── models         
│   ├── utils  
|   ├── .env
|   ├── index.js
|
|
├── package.json
├── README.md
├── tailwind.config.js
├── .env


There may be many trade-off such as if there are plenty of job than the prompt will become large which will be out of limit
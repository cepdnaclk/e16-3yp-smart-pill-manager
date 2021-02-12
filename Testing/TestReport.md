# TEST REPORT



## Penetration Testing

Since our system contains vital Medical information of our clients we had to take speacial security measures to ensure safety of the system and also 
availability of the system 24/7 is essential without any downtime

We ran port analysis in both FRONTEND and BACKEND machines and make sure only the required ports are open.
        -for FRONTEND only port 80 is configured to open
        -for BACKEND machine listening in only port 3900
        -for the load balancer listening in port 80 

furthermore, We configured AWS security Groups to allow only http/https traffic to Inbound the FRONTEND and BACKEND,thus reducing vulnerability of DOS/DDOS attacks using another protocols and ports.

Using AWS Network ACL we configured an additional application level filteration of traffic to the FRONTEND and BACKEND allowing before mentioned protocols and ports only.

## Authentication Testing

Authentication is vital for our System. That's how our backend identify to which table it should write data and to which table it should retrieve data from. If someone authenticated for wrong credintials he/she would be getting different Medical information for different patients and also he/she would be entering routines for some other patient not relevent. This collapse whole Usecase and may lead to severe issue.
therefore, we tested our system for correct authentication both BACKEND and FRONTEND.

Done manually by testing these possibilities.

What was tested ,Results and findings:

- Can user register with same email or DeviceID again 
     No, error message "Device ID or email already exists" displayed.
     tested 10 times - all passed

- Can user login without Registering
     No, error message "Device ID or email already exists" displayed.
     tested 10 times - all passed

- Can user leave behind required fields when registering
     No, error message "* fields Required" displayed.
     tested 10 times - all passed
     
- Can user give very large garbage data for the fields when registering 
     Yes, 
     test failed.
     Issue corrected to allow only 50 charachters. error message "Name is too long" displayed.
     tested 10 times - all passed

<!-- Can user log in before user verification ○ No ○ Verification mail goes to the provided mail ○ Works smoothly

● What if user forgot the password ○ Can go the forgot password option

● What happens if the user enter the wrong password or email ○ No error message.Fixed that

● Can user log in with multi devices at the same time ○ Yes can ○ What happen if both try to enter the same match ■ Can't create two players at the same time ■ Both or more will see the same screen

● The limit of the sign-up quota ○ Set sign up quota to 100 per hour currently ○ (from the same ip address)

● Sign up with a valid email ■ Results: Waits until the verification is done.(no instruction message displayed)

● Sign up with an invalid email ■ Results: error msg displayed

● Did not refresh the register screen when logged in ○ Fixed that issue -->

## User abnormal Behaviour Testing

here we tested how our FRONTEND will behaviour if user performs abnormal tasks. Since we offer this webapplication to general Public it should be foolproof. some abnormal behaviors are expected 

Done manually by testing these possibilities.

What was tested ,Results and findings:

- What if user tries to ADD containers without adding patients
     No, No error message display. User have to fill a required field of Patient which should be selected from a dropdown list only have names of already added patients
     tested 2 times - all passed

- What if user tries to enter to home page by changing URL instead logging in
     Yes, 
     test failed.
     The issue was corrected to redirect to login page if user tries changing urls and entering
     tested 2 times - all passed

## Browser/Device Compatibility Testing

Our webapplication should be perfectly working despite of the device and also which browser used. So we tested our webapplication using Polypane Tool to check how it work in different Devices and also We checked this in all main browsers widely used in the world today such as Chrome,Edge,Safari,UC,Operamini etc.  

## Backend API Unit Testing

We tested our Backend for expected responses for all kind of requests
we used [jest](https://pip.pypa.io/en/stable/) library for this.

Following results were obtained.










Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

```python
pip install foobar
```

## Usage

```python
import foobar

foobar.pluralize('word') # returns 'words'
foobar.pluralize('goose') # returns 'geese'
foobar.singularize('phenomena') # returns 'phenomenon'
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)